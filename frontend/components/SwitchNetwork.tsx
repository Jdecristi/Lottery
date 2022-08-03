import { Typography } from '@web3uikit/core';

const SwitchNetwork: React.FC = () => (
  <>
    <Typography variant="h1" color="#555555" weight="normal" style={{ margin: '25px', textAlign: 'center' }}>
      This network is not supported
    </Typography>
    <Typography variant="h4" color="#555555" style={{ fontSize: '16px', margin: '2.5px 0', textAlign: 'center' }}>
      please switch to a supported network (Rinkeby and Mumbai).
    </Typography>
  </>
);

export default SwitchNetwork;
