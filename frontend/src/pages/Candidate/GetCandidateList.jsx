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
        console.log("HIIII");
        console.log(candidates);

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
      <h2 className="mb-4">Candidate List : </h2>
      <table className="min-w-full mb-20 border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Party</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
          </tr>
        </thead>
        <tbody>
          {candidateList?.length > 0 &&
            candidateList.map((candidate, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{candidate.name}</td>
                <td className="border border-gray-300 px-4 py-2">{candidate.party}</td>
                <td className="border border-gray-300 px-4 py-2">{candidate.age}</td>
                <td className="border border-gray-300 px-4 py-2">{candidate.gender}</td>
              </tr>
            ))}
        </tbody>
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
