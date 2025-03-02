import { useContext } from "react";
import "./App.css";
import { Web3context } from "./context/Web3Provider";
import RegisterCandidate from "./pages/Candidate/RegisterCandidate";
import GetCandidateList from "./pages/Candidate/GetCandidateList";
function App() {
  const web3state = useContext(Web3context);

  console.log("webstate from the app.js ", web3state);

  return (
    <main>
      <h1>HOLAAA !</h1>
      <RegisterCandidate />
      <GetCandidateList />
    </main>
  );
}

export default App;
