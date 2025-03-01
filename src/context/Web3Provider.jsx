import { createContext, useEffect, useState } from "react";
import { getCurrentWallet, getWeb3state } from "../utils/walletConnection";


export const Web3context = createContext();

export default function Web3Provider({ children }) {
    const [web3state, setWeb3state] = useState({
        contractInstance: null,
        selectedAccount: null,
        chainId: null,
        status: "not connected"
    })

    const [status, setStatus] = useState();
    const [walletStatus, setWalletStatus] = useState(false);

    async function handleConnect() {
        const states = await getWeb3state();
        console.log('states chilos : ', states);

        setWeb3state(states.data);
    }

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => { // this acts like an event listener for any wallet changes that a user do, with this we can update the ui accordingly.
                if (accounts.length > 0) {
                    setWeb3state((prev) => ({ ...prev, selectedAccount: accounts[0] }))
                    setStatus("👆🏽 Write a message in the text-field above.")
                } else {
                    setWeb3state((prev) => ({ ...prev, selectedAccount: "" }))
                    setStatus("🦊 Connect to MetaMask using the top right button.")
                }
            })
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
                        You must install MetaMask, a virtual Ethereum wallet, in your browser.
                    </a>
                </p>
            )
        }
    }

    useEffect(() => {
        (async () => {
            console.log('page reloading !');
            try {
                const { address, walletStatus, chainId } = await getCurrentWallet();
                setStatus(walletStatus);
                if(address) {
                    setWeb3state({selectedAccount: address, chainId, walletStatus, contractInstance: 29 });
                    console.log('status : ', addr);

                }
            } catch (err) {
                console.error(err);
                console.info('not workign !  ');
            }

        })();

        addWalletListener();
    }, []);

    return (
        <Web3context.Provider value={web3state}>
            {/* header */}
            {status}
            {children}
            <span>
                <button disabled={web3state.selectedAccount} onClick={handleConnect}>{web3state.selectedAccount ? web3state.selectedAccount : "connect wallet"}</button>
                {/* {web3state.selectedAccount && <button onClick={handleDisconnect}>Disconnect</button>  } */}
            </span>
        </Web3context.Provider>
    )
}