import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentWallet, getWeb3state } from "../utils/walletConnection";

export const Web3context = createContext();

export default function Web3Provider({ children }) {
  const [web3state, setWeb3state] = useState({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
    status: false,
  });

  const TOKEN = localStorage.getItem("token");

  useEffect(() => {
    if (TOKEN != null && TOKEN != undefined) {
      setWeb3state((prev) => ({ ...prev, token: TOKEN, status: true }));
    }
  }, []);

  async function handleWallet() {
    const states = await getWeb3state(web3state.status);

    if (!states.status && states.error) {
      setWeb3state((prev) => ({ ...prev, status: false }));
      toast(states.error);
      return;
    }

    setWeb3state(states);
  }

  const disconnectWallet = () => {
    setWeb3state((prev) => ({ ...prev, status: false }));
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        // this acts like an event listener for any wallet changes that a user do, with this we can update the ui accordingly.
        if (accounts.length > 0) {
          const currentWallet = await getCurrentWallet(web3state.status);
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
          const currentWallet = await getCurrentWallet(web3state.statu);
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
        const current = await getCurrentWallet(web3state.statu);
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
    console.log("status : ", web3state.status);
  }, [web3state]);

  return (
    <Web3context.Provider value={{ web3state, handleWallet, disconnectWallet }}>
      {children}
      <ToastContainer theme="dark" />
    </Web3context.Provider>
  );
}
