import { BrowserRouter } from "react-router-dom";
import "./App.css";
import VotingStatus from "./components/ElectionCommision/VotingStatus.jsx";
import Navigation from "./components/Navigation.jsx";
import AppRouter from "./routes/routes.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    (async () => {
      try {
        console.log("localstre : ", localStorage.getItem("token"));
        const response = await axios.get(
          import.meta.env.VITE_API_BACKEND_URL + "/check",
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
    axios
      .get(import.meta.env.VITE_API_BACKEND_URL + "/check", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
