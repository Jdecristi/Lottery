import fs from "fs";
import { network, ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const FRONT_END_ADDRESS_FILE = `${process.env.PATH_TO_FRONT_END}/constants/contractAddress.json`;
const FRONT_END_ABI_FILE = `${process.env.PATH_TO_FRONT_END}/constants/contractABIs.json`;

const updateFrontend: DeployFunction = async () => {
   if (process.env.UPDATE_FRONT_END) console.log("Updating then frontend...");

   await updateContractAddress(network.config.chainId!);
   await updatecontractABIs();

   console.log("Front end written!");
};

const updateContractAddress = async (chainId: number) => {
   const lottery = await ethers.getContract("Lottery");
   const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESS_FILE, "utf8"));

   if (chainId in currentAddresses) {
      if (!currentAddresses[chainId].includes(lottery.address)) {
         currentAddresses[chainId].push(lottery.address);
      }
   } else {
      currentAddresses[chainId] = [lottery.address];
   }
   console.log(currentAddresses);
   fs.writeFileSync(FRONT_END_ADDRESS_FILE, JSON.stringify(currentAddresses));
};

const updatecontractABIs = async () => {
   const lottery = await ethers.getContract("Lottery");
   fs.writeFileSync(FRONT_END_ABI_FILE, lottery.interface.format(ethers.utils.FormatTypes.json) as string);
};

export default updateFrontend;
updateFrontend.tags = ["all", "frontend"];
