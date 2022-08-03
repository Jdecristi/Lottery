import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { networkConfig, developmentChains } from "../hardhad-helper-config";
import verify from "../utils/verify";

const deployRaffle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
   const { deployments, getNamedAccounts, network, ethers } = hre;
   const { deploy, log } = deployments;
   const { deployer } = await getNamedAccounts();
   const chainId = network.config.chainId;

   let vrfCoordinatorV2Address, subscriptionId;

   if (developmentChains.includes(network.name)) {
      const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");

      vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
      const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
      const transactionReceipt = await transactionResponse.wait();
      subscriptionId = transactionReceipt.events[0].args.subId;

      await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, ethers.utils.parseEther("5"));
   } else {
      vrfCoordinatorV2Address = networkConfig[chainId!]["vrfCoordinatorV2"];
      subscriptionId = networkConfig[chainId!]["subscriptionId"];
   }

   const args: any[] = [
      vrfCoordinatorV2Address,
      subscriptionId,
      networkConfig[chainId!]["entranceFee"],
      networkConfig[chainId!]["gasLane"],
      networkConfig[chainId!]["callbackGasLimit"],
      networkConfig[chainId!]["interval"],
   ];

   const raffle = await deploy("Lottery", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: networkConfig[chainId!]["blockConfirmations"],
   });

   if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      log("Verifying...");
      await verify(raffle.address, args);
   }

   log("----------------------------------------------------------------------------------------------------");
};
export default deployRaffle;
deployRaffle.tags = ["all", "raffle"];
