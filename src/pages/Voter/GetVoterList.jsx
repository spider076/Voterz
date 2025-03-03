import React, { useState } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const GetVoterList = () => {
  const { contractInstance: contract } = useWeb3Context();
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
