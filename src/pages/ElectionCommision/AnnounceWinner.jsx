import React, { useState } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const AnnounceWinner = () => {
  const [winner, setWinner] = useState(null);

  const { contractInstance: contract } = useWeb3Context();

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
