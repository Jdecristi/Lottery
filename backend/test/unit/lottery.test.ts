import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains, networkConfig } from "../../hardhad-helper-config";
import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { Lottery, VRFCoordinatorV2Mock } from "../../typechain-types";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Lottery", () => {
      const chainId = network.config.chainId!;

      let lottery: Lottery;
      let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock;
      let deployer: string;
      let interval: number;
      let entranceFee: BigNumber;

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;

        await deployments.fixture(["all"]);
        lottery = await ethers.getContract("Lottery", deployer);
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer);
        interval = (await lottery.getInterval()).toNumber();
        entranceFee = await lottery.getEntranceFee();
      });

      describe("constructor", () => {
        it("Lottery is in OPEN state", async () => {
          const lotteryState = await lottery.getLotteryState();

          assert.equal(lotteryState.toString(), "0"); // '0' = OPEN, '1' = CALCULATING
        });

        it("Lottery interval is set correctly", async () => {
          const lotteryInterval = await lottery.getInterval();

          assert.equal(lotteryInterval.toString(), networkConfig[chainId]["interval"]);
        });
      });

      describe("enterLottery", () => {
        it("Revert when not paid enough", async () => {
          await expect(lottery.enterLottery()).to.be.revertedWith("Lottery__NotEoughETHEntered");
        });

        it("Records players when they enter", async () => {
          await lottery.enterLottery({ value: entranceFee });
          const playerFromContract = await lottery.getPlayer(0);
          assert.equal(playerFromContract, deployer);
        });

        it("Emits an event on enter", async () => {
          await expect(lottery.enterLottery({ value: entranceFee })).to.emit(lottery, "LotteryEnter");
        });

        it("Doesn't allow entrance when Lottery is in CALCULATING state", async () => {
          await lottery.enterLottery({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);

          await lottery.performUpkeep([]);
          await expect(lottery.enterLottery({ value: entranceFee })).to.be.revertedWith("Lottery__LotteryNotOpen");
        });
      });

      describe("checkUpkeep", () => {
        it("Returns false if no ETH was sent", async () => {
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);
          const { upkeepNeeded } = await lottery.callStatic.checkUpkeep([]);

          assert(!upkeepNeeded);
        });

        it("Returns if lottery isn't OPEN", async () => {
          await lottery.enterLottery({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);
          await lottery.performUpkeep([]);
          const lotteryState = await lottery.getLotteryState();
          const { upkeepNeeded } = await lottery.callStatic.checkUpkeep([]);

          assert.notEqual(lotteryState.toString(), "0"); // '0' = OPEN, '1' = CALCULATING
          assert.equal(upkeepNeeded, false);
        });

        it("Returns false if not enough time has passed", async () => {
          await lottery.enterLottery({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval - 1]);
          await network.provider.send("evm_mine", []);
          const { upkeepNeeded } = await lottery.callStatic.checkUpkeep("0x");
          assert(!upkeepNeeded);
        });

        it("Returns true if enough time has passed, has players, ETH, and is OPEN", async () => {
          await lottery.enterLottery({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);
          const { upkeepNeeded } = await lottery.callStatic.checkUpkeep("0x");
          assert(upkeepNeeded);
        });
      });

      describe("performUpkeep", () => {
        it("Only returns if checkupkeep is true", async () => {
          await lottery.enterLottery({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);
          const txn = await lottery.performUpkeep([]);

          assert(txn);
        });

        it("Reverts when checkUpkeep is false", async () => {
          await expect(lottery.performUpkeep("0x")).to.be.revertedWith("Lottery__UpkeepNotNeeded");
        });

        it("updates the raffle state and emits a requestId", async () => {
          await lottery.enterLottery({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);
          const txResponse = await lottery.performUpkeep([]);
          const txReceipt = await txResponse.wait(1);
          const lotteryState = await lottery.getLotteryState();
          const requestId = txReceipt!.events![1].args!.requestId;

          assert(requestId.toNumber() > 0);
          assert.equal(lotteryState.toString(), "1"); // '0' = OPEN, '1' = CALCULATING
        });
      });

      describe("fulfillRandomWords", () => {
        beforeEach(async () => {
          await lottery.enterLottery({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);
        });

        it("Only called after performUpkeep", async () => {
          await expect(vrfCoordinatorV2Mock.fulfillRandomWords(0, lottery.address)).to.be.revertedWith("nonexistent request");
        });

        it("picks a winner, resets the lottery, and sends money", async () => {
          const additionalAccounts = 3;
          const startingAccountIndex = 1; //deployer = 0
          const accounts: SignerWithAddress[] = await ethers.getSigners();
          const startingTimestamp = await lottery.getTimestamp();

          for (let i = startingAccountIndex; i < startingAccountIndex + additionalAccounts; i++) {
            const accountConnected = lottery.connect(accounts[i]);
            await accountConnected.enterLottery({ value: entranceFee });
          }

          await new Promise(async (resolve, reject) => {
            lottery.once("WinnerPicked", async () => {
              try {
                const endingTimeStamp = await lottery.getTimestamp();
                const numPlayers = await lottery.getNumberOfPlayers();
                const lotteryState = await lottery.getLotteryState();
                const recentWinner = await lottery.getRecentWinner();
                const winnerEndingBalance = await accounts[1].getBalance();

                assert(endingTimeStamp > startingTimestamp);
                assert.equal(numPlayers.toString(), "0");
                assert.equal(lotteryState.toString(), "0");
                assert.equal(winnerEndingBalance.toString(), winnerStartingBalance.add(entranceFee.mul(additionalAccounts).add(entranceFee)).toString());

                resolve("");
              } catch (err) {
                reject(err);
              }
            });

            const txn = await lottery.performUpkeep([]);
            const txnReceipt = await txn.wait(1);
            const winnerStartingBalance = await accounts[1].getBalance();

            await vrfCoordinatorV2Mock.fulfillRandomWords(txnReceipt!.events![1].args!.requestId, lottery.address);
          });
        });
      });
    });
