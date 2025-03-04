import React from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const EmergencyDeclare = () => {
  const { web3state } = useWeb3Context();
  const { contractInstance: contract } =
    web3state;

  async function handleEmergency() {
    const response = await contract.emergencyStopVoting();

    console.log("response : ", response);
  }

  return (
    <>
      <button onClick={handleEmergency}>Emergency Stop Votine</button>
    </>
  );
};

export default EmergencyDeclare;
