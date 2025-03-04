import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation.jsx";
import { Web3context } from "./context/Web3Provider";
import AppRouter from "./routes/routes.jsx";
import VotingStatus from "./components/ElectionCommision/VotingStatus.jsx";

function App() {
  const web3state = useContext(Web3context);

  console.log("webstate from the app.js ", web3state);

  return (
    <BrowserRouter>
      <main className="min-h-screen w-full p-0 m-0 ">
        <Navigation />
        <VotingStatus />
        <div className="mt-20"><AppRouter /></div>
      </main>
    </BrowserRouter>
  );
}

export default App;
