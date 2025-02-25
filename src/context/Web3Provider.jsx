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

    async function handleConnect() {
        const states = await getWeb3state();
        console.log('states chilos : ', states);

        setWeb3state(states.data);
    }

    useEffect(() => {
        (async () => {
            console.log('page reloading !');
            const { address, status } = await getCurrentWallet();
            console.log('status : ', status);

            setStatus(status);
            setWeb3state((prev) => ({ ...prev, selectedAccount: address }))
        })();
    }, []);

    return (
        <Web3context.Provider value={web3state}>
            {/* header */}
            {status}
            {children}
            <button disabled={web3state.selectedAccount} onClick={handleConnect}>{web3state.selectedAccount ? web3state.selectedAccount : "connect wallet"}</button>
        </Web3context.Provider>
    )
}