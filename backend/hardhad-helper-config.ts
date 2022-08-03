import { ethers } from "hardhat";

export interface networkConfigItem {
  name: string;
  subscriptionId?: string;
  gasLane?: string;
  entranceFee?: string;
  callbackGasLimit?: string;
  vrfCoordinatorV2?: string;
  interval?: string;
  blockConfirmations?: number;
}

export interface networkConfigInfo {
  [key: number]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  31337: {
    name: "hardhat",
    entranceFee: ethers.utils.parseEther("0.1").toString(),
    gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    callbackGasLimit: "500000", //500,000
    interval: "30",
    blockConfirmations: 1,
  },
  4: {
    name: "rinkeby",
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    entranceFee: ethers.utils.parseEther("0.1").toString(),
    gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    subscriptionId: "9027",
    callbackGasLimit: "500000", //500,000
    interval: "30",
    blockConfirmations: 6,
  },
  80001: {
    name: "mumbai",
    vrfCoordinatorV2: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
    entranceFee: ethers.utils.parseEther("1").toString(),
    gasLane: "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f",
    subscriptionId: "1220",
    callbackGasLimit: "500000", //500,000
    interval: "30",
    blockConfirmations: 6,
  },
};

export const developmentChains = ["hardhat", "localhost"];
