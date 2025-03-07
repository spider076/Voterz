import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const GetVoterList = () => {
  const { web3state } = useWeb3Context();
  const { contractInstance: contract } =
    web3state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getList() {
      try {
        const voters = await contract.getVoterList();

        console.log("valotes : ", voters);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    contract && getList();
    setLoading(false);
  }, []);

  return (
    <main>
      {loading && "loading..."}
      <span>Voter lists</span>
    </main>
  );
};

export default GetVoterList;
