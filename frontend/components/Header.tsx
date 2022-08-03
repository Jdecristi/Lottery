import { Row } from '@web3uikit/core';
import { ConnectWallet } from '@web3uikit/web3';

interface Props {}

const Header: React.FC<Props> = (props) => {
  return (
    <>
      <div className="header">
        <Row justifyItems="flex-end" alignItems="center">
          <ConnectWallet />
        </Row>
      </div>

      <style jsx>{`
        .header {
          padding: 20px;
        }
      `}</style>
    </>
  );
};

export default Header;
