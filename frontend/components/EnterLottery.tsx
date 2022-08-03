import { useState, useEffect } from 'react';
import { BigNumber, ethers, ContractTransaction } from 'ethers';
import { useMoralis, useWeb3Contract, Web3ExecuteFunctionParameters } from 'react-moralis';
import { Row, Button, Typography, useNotification } from '@web3uikit/core';
import { Reload, Bell } from '@web3uikit/icons';
import { contractAddresses, contractABIs } from '../constants';
import LotteryNotOpen from './LotteryNotOpen';

interface IContractAddresses {
  [key: string]: string[];
}

const EnterLottery: React.FC = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex!).toString();
  const addresses: IContractAddresses = contractAddresses;
  const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null;
  const LotteryContract = { abi: contractABIs, contractAddress: lotteryAddress!, params: {} };
  const dispatch = useNotification();

  const [isOpen, setIsOpen] = useState<boolean | undefined>();
  const [entranceFee, setEntranceFee] = useState<string>('');
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0);
  const [recentWinner, setRecentWinner] = useState<string>('');
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { runContractFunction: getLotteryState } = useWeb3Contract({ ...LotteryContract, functionName: 'getLotteryState' });
  const { runContractFunction: getEntranceFee } = useWeb3Contract({ ...LotteryContract, functionName: 'getEntranceFee' });
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({ ...LotteryContract, functionName: 'getNumberOfPlayers' });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({ ...LotteryContract, functionName: 'getRecentWinner' });
  const { runContractFunction: enterLottery } = useWeb3Contract({ ...LotteryContract, functionName: 'enterLottery', msgValue: entranceFee });

  useEffect(() => {
    if (isWeb3Enabled) initialLoad();
  }, [isWeb3Enabled]);

  const initialLoad = async () => {
    if ((await getLotteryState()) !== 0) return setIsOpen(false);

    const [entranceFeeFromCall, numberOfPlayersFromCall, recentWinnerFromCall] = await Promise.all([getEntranceFee(), getNumberOfPlayers(), getRecentWinner()]);

    setEntranceFee((entranceFeeFromCall as BigNumber).toString());
    setNumberOfPlayers(parseInt(numberOfPlayersFromCall as string) as number);
    setRecentWinner(recentWinnerFromCall as string);

    setIsOpen(true);
    setDataLoaded(true);
  };

  const handleClick = async () => {
    setIsLoading(true);
    enterLottery({ onSuccess: (txn) => handleSuccess(txn as ContractTransaction), onError: (err) => handleError(err) });

    const handleSuccess = async (txn: ContractTransaction) => {
      await txn.wait(1);

      dispatch({ type: 'success', title: 'Transaction notification', message: 'Transaction Complete!', position: 'topR', icon: <Bell fontSize="50px" /> });
      initialLoad();
      setIsLoading(false);
    };

    const handleError = (err: Error) => {
      console.error(err);
      setIsLoading(false);
    };
  };

  return (
    <>
      {isOpen === false ? <LotteryNotOpen /> : null}
      {dataLoaded && isOpen === true ? (
        <>
          <Row justifyItems="center" alignItems="baseline">
            <Typography variant="h3" color="#55555">
              Last Winner:
            </Typography>
            <Typography variant="h3" color="#55555">
              {recentWinner.slice(0, 6) + '...' + recentWinner.slice(recentWinner.length - 3, recentWinner.length)}
            </Typography>
          </Row>

          <Typography variant="h4" color="#333333" style={{ textAlign: 'center', margin: '25px 0' }}>
            There are currently {numberOfPlayers} players in the Lottery, and a total prize amount of {numberOfPlayers * parseFloat(ethers.utils.formatEther(entranceFee))} ETH.
          </Typography>

          <div className="button-wrapper">
            <Button
              customize={{
                backgroundColor: '#ffffff',
                fontSize: 20,
                onHover: 'lighten',
                textColor: '#2e7daf',
              }}
              icon={
                isLoading ? (
                  <Reload
                    key={0}
                    fontSize="20px"
                    style={{
                      animationName: 'spin',
                      animationDuration: '1000ms',
                      animationIterationCount: 'infinite',
                      animationTimingFunction: 'linear',
                    }}
                  />
                ) : undefined
              }
              text="Enter"
              theme="custom"
              size="xl"
              onClick={handleClick}
            />
            <Typography variant="body16" color="#55555">
              Entrance Fee: {ethers.utils.formatEther(entranceFee)} ETH
            </Typography>
          </div>
        </>
      ) : null}

      <style jsx global>{`
        .button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        /* 
        .text {
          text-align: center;
          margin: 25px 0;
        } */

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default EnterLottery;
