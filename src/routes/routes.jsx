import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetCandidateList from "../pages/Candidate/GetCandidateList";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import ElectionCommision from "../pages/ElectionCommision/ElectionCommision";
import CastVote from "../pages/Voter/CastVote";
import GetVoterList from "../pages/Voter/GetVoterList";
import RegisterVoter from "../pages/Voter/RegisterVoter";
import Wallet from "../components/Wallet/Wallet";

const AppRouter = () => {
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
