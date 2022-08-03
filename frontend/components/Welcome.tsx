import { useState, useEffect } from 'react';
import { Typography } from '@web3uikit/core';

const Welcome: React.FC = () => {
  return (
    <>
      <Typography variant="h1" color="#2e7daf" weight="normal" style={{ marginBottom: '25px', textAlign: 'center' }}>
        Welcome to the crypto Lottery
      </Typography>
      <Typography variant="h4" color="#555555" style={{ fontSize: '20px', margin: '2.5px 0', textAlign: 'center' }}>
        This is a trustless lottery built using blockchain and smart contract technology.
      </Typography>
      <Typography variant="h4" color="#555555" style={{ fontSize: '16px', margin: '2.5px 0', textAlign: 'center' }}>
        To get started please connect your wallet using on one of the supported networks (Rinkeby and Mumbai) and enter!
      </Typography>
    </>
  );
};

export default Welcome;
