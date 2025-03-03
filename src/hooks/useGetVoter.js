import { useEffect, useState } from "react";
import { useWeb3Context } from "./useWeb3Context";

export const useGetVoter = () => {
  const [voter, setVoter] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { contractInstance: contract, selectedAccount: voterAddress } =
    useWeb3Context();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        if (contract) {
          const response = await contract.getVoter(voterAddress);
          setVoter(response);
          console.log("response : ", response);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { voter, loading, error };
};
