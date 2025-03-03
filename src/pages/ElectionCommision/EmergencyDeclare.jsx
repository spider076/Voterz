import React from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const EmergencyDeclare = () => {
  const { contractInstance: contract } = useWeb3Context();

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
