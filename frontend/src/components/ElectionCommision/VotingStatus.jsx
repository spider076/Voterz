import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const VotingStatus = () => {
  const { web3state } = useWeb3Context();
  const { contractInstance } = web3state;
  const [status, setStatus] = useState();

  function getStatus(id) {
    switch (id) {
      case 0:
        setStatus("Not Started");
        return;
      case 1:
        setStatus("In Progress");
        return;
      case 2:
        setStatus("Ended");
        return;
      default:
        setStatus(id + " : something is wrong");
        return;
    }
  }

  useEffect(() => {
    async function statusHandler() {
      const votingStatus = await contractInstance.getVotingStatus();

      getStatus(Number(votingStatus));
    }

    contractInstance && statusHandler();
  }, [contractInstance]);

  return (
    <div>
      <span>{status}</span>
    </div>
  );
};

export default VotingStatus;
