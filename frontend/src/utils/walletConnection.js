import { ethers } from "ethers";
import abi from "../constants/contractAbi.json";
import axios from "axios";

const getWeb3state = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("No Web3 Provider found");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const chainHex = await window.ethereum.request({
      method: "eth_chainId",
    });

    const chainId = parseInt(chainHex, 16);

    // contract initialization
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = import.meta.env.VITE_API_VOTING_CONTRACTADDRESS;
    console.log({ contractAddress });

    const contractInstance = new ethers.Contract(contractAddress, abi, signer);

    const message =
      "Welcome to Voterzz. you accept our terms and conditions and that is we can access any of your data without your consent :)";

    const signature = await signer.signMessage(message);

    const response = await axios.post(
      import.meta.env.VITE_API_BACKEND_URL +
        `/api/auth/${accounts[0]}?signature=${signature}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);

      return {
        token: response.data.token,
        selectedAccount: accounts[0],
        chainId,
        contractInstance,
        status: true,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error : ", error);

    return {
      status: false,
      error: error.message,
    };
  }
};

const getCurrentWallet = async (walletStatus) => {
  if (window.ethereum || !walletStatus) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts", // this method returns the metamask connected accounts in realtime(altho you have to call it wraped up in the function)
      });

      if (addressArray.length > 0) {
        const chainHex = await window.ethereum.request({
          method: "eth_chainId",
        });

        const chainId = parseInt(chainHex, 16);

        // contract initialization
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = import.meta.env.VITE_API_VOTING_CONTRACTADDRESS;
        const contractInstance = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

        return {
          selectedAccount: addressArray[0],
          contractInstance,
          chainId,
          status: true,
        };
      } else {
        return {
          status: false,
          error: "please have atleast one account !",
        };
      }
    } catch (err) {
      return {
        status: false,
        error: err.message,
      };
    }
  } else {
    return {
      status: false,
      error: "please install metamask and come back !",
    };
  }
};

export { getWeb3state, getCurrentWallet };
