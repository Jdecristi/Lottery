// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//Imports
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

//Error
error Lottery__NotEoughETHEntered();
error Lottery__LotteryNotOpen();
error Lottery__UpkeepNotNeeded(uint256 currentBalance, uint256 numPlayers, uint256 raffleState);
error Lotter__TransferFailed();

/** @title A sample Lottery contract
 *  @author Joshua DeCristi
 *  @notice This Contract is for creatign a decentralized lottery
 *  @dev This implements Chainling VRF v2 and Chainlink Keepers
 */
contract Lottery is VRFConsumerBaseV2, KeeperCompatibleInterface {
   //Types
   enum LotteryState {
      OPEN,
      CALCULATING
   }

   //State Variables
   uint16 private constant REQUEST_CONFIRMATIONs = 3;
   uint16 private constant NUM_WORDS = 3;

   uint256 private immutable i_entranceFee;
   VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
   bytes32 private immutable i_gasLane;
   uint64 private immutable i_subscriptionId;
   uint32 private immutable i_callbackGasLimit;

   address payable[] private s_players;

   //Loter Variables
   uint256 private immutable i_interval;
   address private s_recentWinner;
   LotteryState private s_lotteryState;
   uint256 private s_lastTimestamp;

   //Events
   event LotteryEnter(address indexed player);
   event RequestedLotteryWinnner(uint256 indexed requestId);
   event WinnerPicked(address indexed winner);

   //Constructor
   constructor(
      address vrfCoordinatorV2,
      uint64 subscriptionId,
      uint256 entranceFee,
      bytes32 gasLane,
      uint32 callbackGasLimit,
      uint256 interval
   ) VRFConsumerBaseV2(vrfCoordinatorV2) {
      i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
      i_subscriptionId = subscriptionId;
      i_entranceFee = entranceFee;
      i_gasLane = gasLane;
      i_callbackGasLimit = callbackGasLimit;
      i_interval = interval;
      s_lotteryState = LotteryState.OPEN;
      s_lastTimestamp = block.timestamp;
   }

   //Public Functions
   function enterLottery() public payable {
      if (msg.value < i_entranceFee) revert Lottery__NotEoughETHEntered();
      if (s_lotteryState != LotteryState.OPEN) revert Lottery__LotteryNotOpen();

      s_players.push(payable(msg.sender));
      emit LotteryEnter(msg.sender);
   }

   /**
    * @dev This is the function that the Chainlink Keeper nodes call
    * they look for `upkeepNeeded` to return True.
    * the following should be true for this to return true:
    * 1. The time interval has passed between raffle runs.
    * 2. The lottery is open.
    * 3. The contract has ETH.
    * 4. Implicity, your subscription is funded with LINK.
    */

   //External Functions
   function checkUpkeep(bytes memory) public view override returns (bool upkeepNeeded, bytes memory) {
      bool isOpen = s_lotteryState == LotteryState.OPEN;
      bool enoughTimePassed = (block.timestamp - s_lastTimestamp) > i_interval;
      bool hasPlayers = s_players.length > 0;
      bool hasBalance = address(this).balance > 0;

      upkeepNeeded = isOpen && enoughTimePassed && hasPlayers && hasBalance;
      return (upkeepNeeded, "0x0");
   }

   /**
    * @dev Once `checkUpkeep` is returning `true`, this function is called
    * and it kicks off a Chainlink VRF call to get a random winner.
    */
   function performUpkeep(bytes calldata) external override {
      (bool upkeepNeeded, ) = checkUpkeep("");
      if (!upkeepNeeded) revert Lottery__UpkeepNotNeeded(address(this).balance, s_players.length, uint256(s_lotteryState));

      s_lotteryState = LotteryState.CALCULATING;
      uint256 requestId = i_vrfCoordinator.requestRandomWords(i_gasLane, i_subscriptionId, REQUEST_CONFIRMATIONs, i_callbackGasLimit, NUM_WORDS);

      emit RequestedLotteryWinnner(requestId);
   }

   function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override {
      uint256 indexOfWinner = randomWords[0] % s_players.length;
      address payable recentWinner = s_players[indexOfWinner];
      (bool success, ) = recentWinner.call{value: address(this).balance}("");

      s_recentWinner = recentWinner;
      s_lotteryState = LotteryState.OPEN;
      s_lastTimestamp = block.timestamp;
      s_players = new address payable[](0);

      s_lotteryState = LotteryState.OPEN;
      s_recentWinner = recentWinner;

      if (!success) revert Lotter__TransferFailed();

      emit WinnerPicked(recentWinner);
   }

   //View / Pure Functions
   function getLotteryState() public view returns (LotteryState) {
      return s_lotteryState;
   }

   function getNumWords() public pure returns (uint16) {
      return NUM_WORDS;
   }

   function getRequestConfirmations() public pure returns (uint16) {
      return REQUEST_CONFIRMATIONs;
   }

   function getRecentWinner() public view returns (address) {
      return s_recentWinner;
   }

   function getPlayer(uint256 index) public view returns (address) {
      return s_players[index];
   }

   function getTimestamp() public view returns (uint256) {
      return s_lastTimestamp;
   }

   function getInterval() public view returns (uint256) {
      return i_interval;
   }

   function getEntranceFee() public view returns (uint256) {
      return i_entranceFee;
   }

   function getNumberOfPlayers() public view returns (uint256) {
      return s_players.length;
   }
}
