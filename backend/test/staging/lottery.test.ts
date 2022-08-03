import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../hardhad-helper-config";
import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { Lottery } from "../../typechain-types";

developmentChains.includes(network.name)
   ? describe.skip
   : describe("Lottery Staging Test", () => {
        let lottery: Lottery;
        let deployer: string;
        let entranceFee: BigNumber;

        beforeEach(async () => {
           lottery = await ethers.getContract("Lottery", deployer);
           deployer = (await getNamedAccounts()).deployer;
           entranceFee = await lottery.getEntranceFee();
        });

        describe("fullfillRandomWords", () => {
           it("Works with live Chainlink Keepers and VRFCoordinatorV2", async () => {
              console.log("Setting up test...");

              const startingTimestamp = await lottery.getTimestamp();
              const accounts: SignerWithAddress[] = await ethers.getSigners();

              console.log("Setting up Listener...");

              await new Promise<void>(async (resolve, reject) => {
                 lottery.once("WinnerPicked", async () => {
                    console.log("Winner Picked!");
                    try {
                       const endingTimeStamp = await lottery.getTimestamp();
                       const recentWinner = await lottery.getRecentWinner();
                       const lotteryState = await lottery.getLotteryState();
                       const winnerEndingBalance = await accounts[0].getBalance();

                       await expect(lottery.getPlayer(0)).to.be.reverted;
                       assert(endingTimeStamp > startingTimestamp);
                       assert.equal(recentWinner.toString(), accounts[0].address);
                       assert.equal(lotteryState.toString(), "0");
                       assert.equal(winnerEndingBalance.toString(), winnerStartingBalance.add(entranceFee).toString());

                       resolve();
                    } catch (err) {
                       console.error(err);
                       reject(err);
                    }
                 });
                 console.log("Entering Lottery...");

                 const tx = await lottery.enterLottery({ value: entranceFee });
                 await tx.wait(1);

                 const winnerStartingBalance = await accounts[0].getBalance();

                 console.log("Waiting for Chainlink keepers...");
              });
           });
        });
     });
