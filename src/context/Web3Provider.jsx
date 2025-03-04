import { createContext, useEffect, useState } from "react";
import { getCurrentWallet, getWeb3state } from "../utils/walletConnection";
import { ToastContainer, toast } from "react-toastify";

export const Web3context = createContext();

export default function Web3Provider({ children }) {
  const [web3state, setWeb3state] = useState({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
    status: false,
  });
  async function handleWallet() {
    const states = await getWeb3state();

    if (!states.status && states.error) {
      toast(states.error);
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

          toast(currentWallet?.error);
        } else {
          setWeb3state((prev) => ({ ...prev, status: false }));
          toast("Wallet Disconnected !");
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

          toast(currentWallet?.error);
        } else {
          setWeb3state((prev) => ({ ...prev, status: false }));
          // toast("Wallet Disconnected");
        }
      });
    } else {
      setWeb3state((prev) => ({ ...prev, status: false }));
      toast("please kindly install the damn wallet !");
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
    <Web3context.Provider value={{ web3state, handleWallet }}>
      {children}
      <ToastContainer />
    </Web3context.Provider>
  );
}
