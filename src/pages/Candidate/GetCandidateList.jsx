import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const GetCandidateList = () => {
  const { web3state } = useWeb3Context();
  const { contractInstance: contract } = web3state;
  const [candidateList, setCandidateList] = useState();
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchCandidateList = async () => {
      try {
        const candidates = await contract.getCandidateList();
        const partyWinner = await contract.winner();

        if (partyWinner != "0x0000000000000000000000000000000000000000") {
          setWinner(partyWinner);
        }

        setCandidateList(candidates);
      } catch (err) {
        console.error(err);
      }
    };

    contract && fetchCandidateList();
  }, [contract]);

  return (
    <main>
      <h2>Candidate List : </h2>
      <table border={"1"}>
        <th>
          <td>Name</td>
          <td>Party</td>
          <td>Age</td>
          <td>Gender</td>
        </th>
        {candidateList?.length > 0 &&
          candidateList.map((candidate, index) => (
            <tr id={index}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.age}</td>
              <td>{candidate.gender}</td>
            </tr>
          ))}
      </table>
      {winner != null ? (
        <>
          <h1>Party Winner is announced</h1>
          <span>{winner}</span>
        </>
      ) : (
        <span>The Winner is not declared yet</span>
      )}
      {/* <DisplayWinner /> */}
    </main>
  );
};

export default GetCandidateList;
