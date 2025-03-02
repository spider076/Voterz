import React, { useEffect } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const GetCandidateList = () => {
  const { contractInstance: contract } = useWeb3Context();

  useEffect(() => {
    const fetchCandidateList = async () => {
      try {
        const candidateList = await contract.getCandidateList();
        console.log({ candidateList });
      } catch (err) {
        console.error(err);
      }
    };

    contract && fetchCandidateList();
  }, [contract]);

  return <>Candiate List</>;
};

export default GetCandidateList;
