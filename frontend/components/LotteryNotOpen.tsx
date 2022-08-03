import { Typography } from '@web3uikit/core';

const LotteryNotOpen: React.FC = () => (
  <>
    <Typography variant="h1" color="#555555" weight="normal" style={{ margin: '25px', textAlign: 'center' }}>
      This lottery is Currently not open
    </Typography>
    <Typography variant="h4" color="#555555" style={{ fontSize: '16px', margin: '2.5px 0', textAlign: 'center' }}>
      Please wait it will open soon...
    </Typography>
  </>
);

export default LotteryNotOpen;
