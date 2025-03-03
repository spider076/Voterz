import { createBrowserRouter } from "react-router-dom";
import RegisterVoter from "../pages/Voter/RegisterVoter";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import GetVoterList from "../pages/Voter/GetVoterList";
import GetCandidateList from "../pages/Candidate/GetCandidateList";
import ElectionCommision from "../pages/ElectionCommision/ElectionCommision";
import CastVote from "../pages/Voter/CastVote";

export const routes = createBrowserRouter([
  { path: "/", element: <h1>HOLAAA</h1> },
  { path: "register-voter", element: <RegisterVoter /> },
  { path: "register-candidate", element: <RegisterCandidate /> },
  { path: "voter-list", element: <GetVoterList /> },
  { path: "candidate-list", element: <GetCandidateList /> },
  { path: "electioncommision", element: <ElectionCommision /> },
  { path: "cast-vote", element: <CastVote /> },
]);
