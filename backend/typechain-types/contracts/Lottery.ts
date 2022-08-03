/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface LotteryInterface extends utils.Interface {
  functions: {
    "checkUpkeep(bytes)": FunctionFragment;
    "enterLottery()": FunctionFragment;
    "getEntranceFee()": FunctionFragment;
    "getInterval()": FunctionFragment;
    "getLotteryState()": FunctionFragment;
    "getNumWords()": FunctionFragment;
    "getNumberOfPlayers()": FunctionFragment;
    "getPlayer(uint256)": FunctionFragment;
    "getRecentWinner()": FunctionFragment;
    "getRequestConfirmations()": FunctionFragment;
    "getTimestamp()": FunctionFragment;
    "performUpkeep(bytes)": FunctionFragment;
    "rawFulfillRandomWords(uint256,uint256[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkUpkeep"
      | "enterLottery"
      | "getEntranceFee"
      | "getInterval"
      | "getLotteryState"
      | "getNumWords"
      | "getNumberOfPlayers"
      | "getPlayer"
      | "getRecentWinner"
      | "getRequestConfirmations"
      | "getTimestamp"
      | "performUpkeep"
      | "rawFulfillRandomWords"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkUpkeep",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "enterLottery",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEntranceFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInterval",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLotteryState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumWords",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberOfPlayers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlayer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRecentWinner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRequestConfirmations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "performUpkeep",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "rawFulfillRandomWords",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enterLottery",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntranceFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInterval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLotteryState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumWords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumberOfPlayers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPlayer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRecentWinner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRequestConfirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "performUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rawFulfillRandomWords",
    data: BytesLike
  ): Result;

  events: {
    "LotteryEnter(address)": EventFragment;
    "RequestedLotteryWinnner(uint256)": EventFragment;
    "WinnerPicked(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LotteryEnter"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestedLotteryWinnner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WinnerPicked"): EventFragment;
}

export interface LotteryEnterEventObject {
  player: string;
}
export type LotteryEnterEvent = TypedEvent<[string], LotteryEnterEventObject>;

export type LotteryEnterEventFilter = TypedEventFilter<LotteryEnterEvent>;

export interface RequestedLotteryWinnnerEventObject {
  requestId: BigNumber;
}
export type RequestedLotteryWinnnerEvent = TypedEvent<
  [BigNumber],
  RequestedLotteryWinnnerEventObject
>;

export type RequestedLotteryWinnnerEventFilter =
  TypedEventFilter<RequestedLotteryWinnnerEvent>;

export interface WinnerPickedEventObject {
  winner: string;
}
export type WinnerPickedEvent = TypedEvent<[string], WinnerPickedEventObject>;

export type WinnerPickedEventFilter = TypedEventFilter<WinnerPickedEvent>;

export interface Lottery extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LotteryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { upkeepNeeded: boolean }>;

    enterLottery(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getEntranceFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getInterval(overrides?: CallOverrides): Promise<[BigNumber]>;

    getLotteryState(overrides?: CallOverrides): Promise<[number]>;

    getNumWords(overrides?: CallOverrides): Promise<[number]>;

    getNumberOfPlayers(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRecentWinner(overrides?: CallOverrides): Promise<[string]>;

    getRequestConfirmations(overrides?: CallOverrides): Promise<[number]>;

    getTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  checkUpkeep(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[boolean, string] & { upkeepNeeded: boolean }>;

  enterLottery(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

  getInterval(overrides?: CallOverrides): Promise<BigNumber>;

  getLotteryState(overrides?: CallOverrides): Promise<number>;

  getNumWords(overrides?: CallOverrides): Promise<number>;

  getNumberOfPlayers(overrides?: CallOverrides): Promise<BigNumber>;

  getPlayer(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRecentWinner(overrides?: CallOverrides): Promise<string>;

  getRequestConfirmations(overrides?: CallOverrides): Promise<number>;

  getTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  performUpkeep(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rawFulfillRandomWords(
    requestId: PromiseOrValue<BigNumberish>,
    randomWords: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { upkeepNeeded: boolean }>;

    enterLottery(overrides?: CallOverrides): Promise<void>;

    getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

    getInterval(overrides?: CallOverrides): Promise<BigNumber>;

    getLotteryState(overrides?: CallOverrides): Promise<number>;

    getNumWords(overrides?: CallOverrides): Promise<number>;

    getNumberOfPlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRecentWinner(overrides?: CallOverrides): Promise<string>;

    getRequestConfirmations(overrides?: CallOverrides): Promise<number>;

    getTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "LotteryEnter(address)"(
      player?: PromiseOrValue<string> | null
    ): LotteryEnterEventFilter;
    LotteryEnter(
      player?: PromiseOrValue<string> | null
    ): LotteryEnterEventFilter;

    "RequestedLotteryWinnner(uint256)"(
      requestId?: PromiseOrValue<BigNumberish> | null
    ): RequestedLotteryWinnnerEventFilter;
    RequestedLotteryWinnner(
      requestId?: PromiseOrValue<BigNumberish> | null
    ): RequestedLotteryWinnnerEventFilter;

    "WinnerPicked(address)"(
      winner?: PromiseOrValue<string> | null
    ): WinnerPickedEventFilter;
    WinnerPicked(
      winner?: PromiseOrValue<string> | null
    ): WinnerPickedEventFilter;
  };

  estimateGas: {
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    enterLottery(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

    getInterval(overrides?: CallOverrides): Promise<BigNumber>;

    getLotteryState(overrides?: CallOverrides): Promise<BigNumber>;

    getNumWords(overrides?: CallOverrides): Promise<BigNumber>;

    getNumberOfPlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRecentWinner(overrides?: CallOverrides): Promise<BigNumber>;

    getRequestConfirmations(overrides?: CallOverrides): Promise<BigNumber>;

    getTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    enterLottery(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getEntranceFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInterval(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLotteryState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNumWords(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNumberOfPlayers(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRecentWinner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRequestConfirmations(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
