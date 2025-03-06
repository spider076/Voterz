import { BrowserRouter } from "react-router-dom";
import "./App.css";
import VotingStatus from "./components/ElectionCommision/VotingStatus.jsx";
import Navigation from "./components/Navigation.jsx";
import AppRouter from "./routes/routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen w-full p-0 m-0 ">
        <Navigation />
        <VotingStatus />
        <div className="mt-20">
          <AppRouter />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
