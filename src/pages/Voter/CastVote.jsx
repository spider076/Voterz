import React from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";
import { useGetVoter } from "../../hooks/useGetVoter";

const CastVote = () => {
  const voter = useGetVoter();

  return <div>CastVote sir : {voter?.voterAddress}</div>;
};

export default CastVote;
