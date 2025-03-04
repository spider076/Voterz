import React from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const Wallet = () => {
  const { web3state, handleWallet } = useWeb3Context();

  return (
    <main>
      <button disabled={web3state.status} onClick={handleWallet}>
        {web3state.status ? web3state.selectedAccount : "connect wallet"}
      </button>
      {/* {web3state.selectedAccount && <button onClick={handleDisconnect}>Disconnect</button>  } */}
    </main>
  );
};

export default Wallet;
