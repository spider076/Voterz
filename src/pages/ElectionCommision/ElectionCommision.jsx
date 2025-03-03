import React, { useEffect, useState } from "react";
import AnnounceWinner from "./AnnounceWinner";
import EmergencyDeclare from "./EmergencyDeclare";
import VotingTimePeriod from "../../components/ElectionCommision/VotingTimePeriod";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const ElectionCommision = () => {
  const { selectedAccount } = useWeb3Context();
  const [user, setUser] = useState(selectedAccount);

  useEffect(() => {
    setUser(selectedAccount);
  }, [selectedAccount]);

  const electionCommisionAddress = import.meta.env
    .VITE_API_ELECTIONCOMMISSION_ADDR;

  const [allow, setAllow] = useState(false);

  console.log({ electionCommisionAddress });

  useEffect(() => {
    console.log("updating chillos");
    if (
      String(user).toUpperCase() ==
      String(electionCommisionAddress).toUpperCase()
    ) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [user]);

  if (!allow) {
    return <span>You are restricted to use this page.</span>;
  }

  return (
    <main>
      <h1>Election Commision Inclusive</h1>
      <AnnounceWinner />
      <EmergencyDeclare />
      <VotingTimePeriod />
    </main>
  );
};

export default ElectionCommision;
