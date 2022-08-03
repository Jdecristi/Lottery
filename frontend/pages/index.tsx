import { NextPage } from 'next';
import Head from 'next/head';
import { useMoralis } from 'react-moralis';
import { contractAddresses } from '../constants';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import EnterLottery from '../components/EnterLottery';
import SwitchNetwork from '../components/SwitchNetwork';

const Home: NextPage = () => {
  const { chainId, isWeb3Enabled } = useMoralis();

  const mainContent = () => {
    if (!isWeb3Enabled) return <Welcome />;

    if (parseInt(chainId!).toString() in contractAddresses != true) return <SwitchNetwork />;

    return <EnterLottery />;
  };

  return (
    <>
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Descentralized Lottery" />
      </Head>

      <Header />
      <main>{mainContent()}</main>

      <style jsx>{`
        main {
          margin: auto;
          padding: 50px;
          width: 50vw;
          background-color: #f2f6ff;
          border-radius: 10px;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @media (max-width: 600px) {
          main {
            width: 75vw;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
