import { Route, Routes, useNavigate } from "react-router-dom";
import Wallet from "../components/Wallet/Wallet";
import GetCandidateList from "../pages/Candidate/GetCandidateList";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import ElectionCommision from "../pages/ElectionCommision/ElectionCommision";
import CastVote from "../pages/Voter/CastVote";
import GetVoterList from "../pages/Voter/GetVoterList";
import RegisterVoter from "../pages/Voter/RegisterVoter";
import { useEffect } from "react";
import { useWeb3Context } from "../hooks/useWeb3Context";

const AppRouter = () => {
  const { web3state } = useWeb3Context();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const account = await web3state.selectedAccount;

      if (account) {
        navigate("/cast-vote");
      } else {
        navigate("/working");
      }
    })();
  }, [web3state]);

  return (
    <Routes>
      <Route path="/" element={<Wallet />} />
      <Route path="/register-voter" element={<RegisterVoter />} />
      <Route path="/register-candidate" element={<RegisterCandidate />} />
      <Route path="/voter-list" element={<GetVoterList />} />
      <Route path="/candidate-list" element={<GetCandidateList />} />
      <Route path="/electioncommision" element={<ElectionCommision />} />
      <Route path="/cast-vote" element={<CastVote />} />
    </Routes>
  );
};

export default AppRouter;
