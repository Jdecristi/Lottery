/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Lottery, LotteryInterface } from "../../contracts/Lottery";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "vrfCoordinatorV2",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "entranceFee",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "gasLane",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Lotter__TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Lottery__LotteryNotOpen",
    type: "error",
  },
  {
    inputs: [],
    name: "Lottery__NotEoughETHEntered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numPlayers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raffleState",
        type: "uint256",
      },
    ],
    name: "Lottery__UpkeepNotNeeded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "LotteryEnter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestedLotteryWinnner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "WinnerPicked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enterLottery",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntranceFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLotteryState",
    outputs: [
      {
        internalType: "enum Lottery.LotteryState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumWords",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfPlayers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecentWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestConfirmations",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101606040523480156200001257600080fd5b5060405162001924380380620019248339818101604052810190620000389190620002a0565b858073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050508573ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508467ffffffffffffffff166101008167ffffffffffffffff1660c01b815250508360a081815250508260e081815250508163ffffffff166101208163ffffffff1660e01b815250508061014081815250506000600160146101000a81548160ff021916908360018111156200012257620001216200033c565b5b0217905550426002819055505050505050506200036b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200016c826200013f565b9050919050565b6200017e816200015f565b81146200018a57600080fd5b50565b6000815190506200019e8162000173565b92915050565b600067ffffffffffffffff82169050919050565b620001c381620001a4565b8114620001cf57600080fd5b50565b600081519050620001e381620001b8565b92915050565b6000819050919050565b620001fe81620001e9565b81146200020a57600080fd5b50565b6000815190506200021e81620001f3565b92915050565b6000819050919050565b620002398162000224565b81146200024557600080fd5b50565b60008151905062000259816200022e565b92915050565b600063ffffffff82169050919050565b6200027a816200025f565b81146200028657600080fd5b50565b6000815190506200029a816200026f565b92915050565b60008060008060008060c08789031215620002c057620002bf6200013a565b5b6000620002d089828a016200018d565b9650506020620002e389828a01620001d2565b9550506040620002f689828a016200020d565b94505060606200030989828a0162000248565b93505060806200031c89828a0162000289565b92505060a06200032f89828a016200020d565b9150509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60805160601c60a05160c05160601c60e0516101005160c01c6101205160e01c6101405161153d620003e76000396000818161067c01526107250152600061051f015260006104fc015260006104db0152600061049f0152600081816102fa015261074b01526000818161032a015261037e015261153d6000f3fe6080604052600436106100c25760003560e01c80635f1b0fd81161007f57806391ad27b41161005957806391ad27b414610259578063c1af578514610284578063e55ae4e81461028e578063fd6673f5146102cb576100c2565b80635f1b0fd8146101c55780636b68c03c146101f05780636e04ff0d1461021b576100c2565b806309bc33a7146100c7578063188ec356146100f25780631fe543e31461011d5780634585e33b14610146578063473f1ddc1461016f57806353a2c19a1461019a575b600080fd5b3480156100d357600080fd5b506100dc6102f6565b6040516100e99190610c68565b60405180910390f35b3480156100fe57600080fd5b5061010761031e565b6040516101149190610c68565b60405180910390f35b34801561012957600080fd5b50610144600480360381019061013f9190610e1c565b610328565b005b34801561015257600080fd5b5061016d60048036038101906101689190610ed3565b6103e8565b005b34801561017b57600080fd5b506101846105e7565b6040516101919190610f61565b60405180910390f35b3480156101a657600080fd5b506101af610611565b6040516101bc9190610f99565b60405180910390f35b3480156101d157600080fd5b506101da61061a565b6040516101e79190610f99565b60405180910390f35b3480156101fc57600080fd5b50610205610623565b604051610212919061102b565b60405180910390f35b34801561022757600080fd5b50610242600480360381019061023d91906110fb565b61063a565b6040516102509291906111e7565b60405180910390f35b34801561026557600080fd5b5061026e610721565b60405161027b9190610c68565b60405180910390f35b61028c610749565b005b34801561029a57600080fd5b506102b560048036038101906102b09190611217565b6108b8565b6040516102c29190610f61565b60405180910390f35b3480156102d757600080fd5b506102e06108ff565b6040516102ed9190610c68565b60405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600254905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103da57337f00000000000000000000000000000000000000000000000000000000000000006040517f1cf993f40000000000000000000000000000000000000000000000000000000081526004016103d1929190611244565b60405180910390fd5b6103e4828261090b565b5050565b60006104026040518060200160405280600081525061063a565b509050806104715747600080549050600160149054906101000a900460ff16600181111561043357610432610fb4565b5b6040517f6e195f250000000000000000000000000000000000000000000000000000000081526004016104689392919061126d565b60405180910390fd5b60018060146101000a81548160ff0219169083600181111561049657610495610fb4565b5b021790555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635d3b1d307f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060037f000000000000000000000000000000000000000000000000000000000000000060036040518663ffffffff1660e01b815260040161056095949392919061133a565b602060405180830381600087803b15801561057a57600080fd5b505af115801561058e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b291906113a2565b9050807f1bad35fdae2e39874ff5f5c6efbd7ec60c205341a68815ea9e58abd9cd1424e660405160405180910390a250505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006003905090565b60006003905090565b6000600160149054906101000a900460ff16905090565b60006060600080600181111561065357610652610fb4565b5b600160149054906101000a900460ff16600181111561067557610674610fb4565b5b14905060007f0000000000000000000000000000000000000000000000000000000000000000600254426106a991906113fe565b119050600080600080549050119050600080471190508380156106c95750825b80156106d25750815b80156106db5750805b9550856040518060400160405280600381526020017f30783000000000000000000000000000000000000000000000000000000000008152509550955050505050915091565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b7f00000000000000000000000000000000000000000000000000000000000000003410156107a3576040517f1facc11600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060018111156107b7576107b6610fb4565b5b600160149054906101000a900460ff1660018111156107d9576107d8610fb4565b5b14610810576040517f823ea8bb00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f1d64fb5ba9f2548c5b98468d58f25b87b9e866afee0122e92d9fe722bf85076c60405160405180910390a2565b60008082815481106108cd576108cc611432565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008080549050905090565b600080805490508260008151811061092657610925611432565b5b60200260200101516109389190611490565b9050600080828154811061094f5761094e611432565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008173ffffffffffffffffffffffffffffffffffffffff16476040516109a2906114f2565b60006040518083038185875af1925050503d80600081146109df576040519150601f19603f3d011682016040523d82523d6000602084013e6109e4565b606091505b5050905081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff02191690836001811115610a4f57610a4e610fb4565b5b021790555042600281905550600067ffffffffffffffff811115610a7657610a75610cd9565b5b604051908082528060200260200182016040528015610aa45781602001602082028036833780820191505090505b5060009080519060200190610aba929190610ba8565b506000600160146101000a81548160ff02191690836001811115610ae157610ae0610fb4565b5b021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080610b5e576040517fe711a87700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff167f5b690ec4a06fe979403046eaeea5b3ce38524683c3001f662c8b5a829632f7df60405160405180910390a25050505050565b828054828255906000526020600020908101928215610c21579160200282015b82811115610c205782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610bc8565b5b509050610c2e9190610c32565b5090565b5b80821115610c4b576000816000905550600101610c33565b5090565b6000819050919050565b610c6281610c4f565b82525050565b6000602082019050610c7d6000830184610c59565b92915050565b6000604051905090565b600080fd5b600080fd5b610ca081610c4f565b8114610cab57600080fd5b50565b600081359050610cbd81610c97565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610d1182610cc8565b810181811067ffffffffffffffff82111715610d3057610d2f610cd9565b5b80604052505050565b6000610d43610c83565b9050610d4f8282610d08565b919050565b600067ffffffffffffffff821115610d6f57610d6e610cd9565b5b602082029050602081019050919050565b600080fd5b6000610d98610d9384610d54565b610d39565b90508083825260208201905060208402830185811115610dbb57610dba610d80565b5b835b81811015610de45780610dd08882610cae565b845260208401935050602081019050610dbd565b5050509392505050565b600082601f830112610e0357610e02610cc3565b5b8135610e13848260208601610d85565b91505092915050565b60008060408385031215610e3357610e32610c8d565b5b6000610e4185828601610cae565b925050602083013567ffffffffffffffff811115610e6257610e61610c92565b5b610e6e85828601610dee565b9150509250929050565b600080fd5b60008083601f840112610e9357610e92610cc3565b5b8235905067ffffffffffffffff811115610eb057610eaf610e78565b5b602083019150836001820283011115610ecc57610ecb610d80565b5b9250929050565b60008060208385031215610eea57610ee9610c8d565b5b600083013567ffffffffffffffff811115610f0857610f07610c92565b5b610f1485828601610e7d565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f4b82610f20565b9050919050565b610f5b81610f40565b82525050565b6000602082019050610f766000830184610f52565b92915050565b600061ffff82169050919050565b610f9381610f7c565b82525050565b6000602082019050610fae6000830184610f8a565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610ff457610ff3610fb4565b5b50565b600081905061100582610fe3565b919050565b600061101582610ff7565b9050919050565b6110258161100a565b82525050565b6000602082019050611040600083018461101c565b92915050565b600080fd5b600067ffffffffffffffff82111561106657611065610cd9565b5b61106f82610cc8565b9050602081019050919050565b82818337600083830152505050565b600061109e6110998461104b565b610d39565b9050828152602081018484840111156110ba576110b9611046565b5b6110c584828561107c565b509392505050565b600082601f8301126110e2576110e1610cc3565b5b81356110f284826020860161108b565b91505092915050565b60006020828403121561111157611110610c8d565b5b600082013567ffffffffffffffff81111561112f5761112e610c92565b5b61113b848285016110cd565b91505092915050565b60008115159050919050565b61115981611144565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561119957808201518184015260208101905061117e565b838111156111a8576000848401525b50505050565b60006111b98261115f565b6111c3818561116a565b93506111d381856020860161117b565b6111dc81610cc8565b840191505092915050565b60006040820190506111fc6000830185611150565b818103602083015261120e81846111ae565b90509392505050565b60006020828403121561122d5761122c610c8d565b5b600061123b84828501610cae565b91505092915050565b60006040820190506112596000830185610f52565b6112666020830184610f52565b9392505050565b60006060820190506112826000830186610c59565b61128f6020830185610c59565b61129c6040830184610c59565b949350505050565b6000819050919050565b6112b7816112a4565b82525050565b600067ffffffffffffffff82169050919050565b6112da816112bd565b82525050565b600063ffffffff82169050919050565b6112f9816112e0565b82525050565b6000819050919050565b600061132461131f61131a84610f7c565b6112ff565b6112e0565b9050919050565b61133481611309565b82525050565b600060a08201905061134f60008301886112ae565b61135c60208301876112d1565b6113696040830186610f8a565b61137660608301856112f0565b611383608083018461132b565b9695505050505050565b60008151905061139c81610c97565b92915050565b6000602082840312156113b8576113b7610c8d565b5b60006113c68482850161138d565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061140982610c4f565b915061141483610c4f565b925082821015611427576114266113cf565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061149b82610c4f565b91506114a683610c4f565b9250826114b6576114b5611461565b5b828206905092915050565b600081905092915050565b50565b60006114dc6000836114c1565b91506114e7826114cc565b600082019050919050565b60006114fd826114cf565b915081905091905056fea2646970667358221220e1819adf69e648b2fdb22bfec9da1e0b17bc5619806732bc42e01d4001af569164736f6c63430008080033";

type LotteryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LotteryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Lottery__factory extends ContractFactory {
  constructor(...args: LotteryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    vrfCoordinatorV2: PromiseOrValue<string>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    entranceFee: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Lottery> {
    return super.deploy(
      vrfCoordinatorV2,
      subscriptionId,
      entranceFee,
      gasLane,
      callbackGasLimit,
      interval,
      overrides || {}
    ) as Promise<Lottery>;
  }
  override getDeployTransaction(
    vrfCoordinatorV2: PromiseOrValue<string>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    entranceFee: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      vrfCoordinatorV2,
      subscriptionId,
      entranceFee,
      gasLane,
      callbackGasLimit,
      interval,
      overrides || {}
    );
  }
  override attach(address: string): Lottery {
    return super.attach(address) as Lottery;
  }
  override connect(signer: Signer): Lottery__factory {
    return super.connect(signer) as Lottery__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LotteryInterface {
    return new utils.Interface(_abi) as LotteryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Lottery {
    return new Contract(address, _abi, signerOrProvider) as Lottery;
  }
}