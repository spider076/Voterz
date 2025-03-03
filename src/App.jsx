import { useContext } from "react";
import {
  RouterProvider
} from "react-router-dom";
import "./App.css";
import { Web3context } from "./context/Web3Provider";
import { routes } from "./routes/routes.jsx";

function App() {
  const web3state = useContext(Web3context);

  console.log("webstate from the app.js ", web3state);

  return (
    <main>
      <h1>Navbar</h1>
      <RouterProvider router={routes} />
      {/* <RegisterVoter /> */}
    </main>
  );
}

export default App;
