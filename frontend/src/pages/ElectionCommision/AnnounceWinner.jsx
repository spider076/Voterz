import React, { useState } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const AnnounceWinner = () => {
  const [winner, setWinner] = useState(null);

  const { web3state } = useWeb3Context();
  const { contractInstance: contract } =
    web3state;

  async function handleaAnnounceWinner() {
    const response = await contract.announceVotingResult();

    console.log("response : ", response);
  }

  return (
    <>
      <button onClick={handleaAnnounceWinner}>AnnounceWinner</button>
    </>
  );
};

export default AnnounceWinner;
