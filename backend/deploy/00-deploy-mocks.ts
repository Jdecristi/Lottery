import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../hardhad-helper-config";

const deployMocks: DeployFunction = async ({ deployments, getNamedAccounts, network }: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (developmentChains.includes(network.name)) {
    log("Local network! Deploying Mocks...");

    const BASE_FEE = ethers.utils.parseEther("0.25");
    const GAS_PRICE_LINK = 1e9;

    await deploy("VRFCoordinatorV2Mock", { from: deployer, log: true, args: [BASE_FEE, GAS_PRICE_LINK] });

    log("Mocks Deployed!");
    log("----------------------------------------------------------------------------------------------------");
  }
};

export default deployMocks;
deployMocks.tags = ["all", "mocks"];
