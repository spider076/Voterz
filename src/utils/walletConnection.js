import { ethers } from "ethers";
import abi from '../constants/contractAbi.json';

const getWeb3state = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("No Web3 Provider found");
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        const chainHex = await window.ethereum.request({
            method: "eth_chainId"
        })

        const chainId = parseInt(chainHex, 16);

        // contract initialization
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = "0x48087234ed7bc38e04347176b08B860E643806e2";

        const contractInstance = new ethers.Contract(contractAddress, abi, signer);

        return { selectedAccount: accounts[0], chainId, contractInstance, status: true }
    } catch (error) {
        console.error("Error : ", error);
        return {
            status: false,
            error: error.message,
        }
    }
}

const getCurrentWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts", // this method returns the metamask connected accounts in realtime(altho you have to call it wraped up in the function)
            })

            const chainHex = await window.ethereum.request({
                method: "eth_chainId"
            })

            const chainId = parseInt(chainHex, 16);

            // contract initialization
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractAddress = "0x48087234ed7bc38e04347176b08B860E643806e2";
            const contractInstance = new ethers.Contract(contractAddress, abi, signer);

            if (addressArray.length > 0) {
                return {
                    selectedAccount: addressArray[0],
                    contractInstance,
                    chainId,
                    status: true
                }
            } else {
                return {
                    status: false,
                    error: "please have atleast one account !"
                }
            }
        } catch (err) {
            return {
                status: false,
                error: err.message,
            }
        }
    } else {
        return {
            status: false,
            error: "please install metamask and come back !",
        }
    }
}

export { getWeb3state, getCurrentWallet }