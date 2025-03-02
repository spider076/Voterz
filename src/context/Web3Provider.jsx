import { createContext, useEffect, useState } from "react";
import { getCurrentWallet, getWeb3state } from "../utils/walletConnection";

export const Web3context = createContext();

export default function Web3Provider({ children }) {
  const [web3state, setWeb3state] = useState({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
    status: false,
  });

  const [error, setError] = useState();

  async function handleConnect() {
    const states = await getWeb3state();

    if (!states.status && states.error) {
      setError(states.error);
      return;
    }

    setWeb3state(states);
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        // this acts like an event listener for any wallet changes that a user do, with this we can update the ui accordingly.
        if (accounts.length > 0) {
          const currentWallet = await getCurrentWallet();
          if (!currentWallet?.error) {
            setWeb3state(currentWallet);
            return;
          }

          setError(currentWallet?.error);
        } else {
          setWeb3state((prev) => ({ ...prev, status: false }));
          setError("Somsething went wrong !");
        }
      });

      window.ethereum.on("chainChanged", async (accounts) => {
        // this acts like an event listener for any wallet changes that a user do, with this we can update the ui accordingly.
        if (accounts.length > 0) {
          const currentWallet = await getCurrentWallet();
          if (!currentWallet?.error) {
            setWeb3state(currentWallet);
            return;
          }

          setError(currentWallet?.error);
        } else {
          setWeb3state((prev) => ({ ...prev, status: false }));
          setError("Somsething went wrong !");
        }
      });
    } else {
      setWeb3state((prev) => ({ ...prev, status: false }));
      setError("please kindly install the damn wallet !");
    }
  }

  useEffect(() => {
    (async () => {
      console.log("page reloading !");
      try {
        const current = await getCurrentWallet();
        if (!current?.error) {
          setWeb3state(current);
        }
      } catch (err) {
        console.error(err);
        console.info("not workign !  ");
      }
    })();

    addWalletListener();
  }, []);

  useEffect(() => {
    console.log("state changed : ", web3state);
  }, [web3state]);

  return (
    <Web3context.Provider value={web3state}>
      {error && error}
      {children}
      <span>
        <button disabled={web3state.selectedAccount} onClick={handleConnect}>
          {web3state.selectedAccount
            ? web3state.selectedAccount
            : "connect wallet"}
        </button>
        {/* {web3state.selectedAccount && <button onClick={handleDisconnect}>Disconnect</button>  } */}
      </span>
    </Web3context.Provider>
  );
}
