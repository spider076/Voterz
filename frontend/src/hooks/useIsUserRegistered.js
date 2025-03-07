// this is doesn't make sense ?  or does it

// import { useEffect } from "react";
// import { useWeb3Context } from "./useWeb3Context";

// export const isUserRegistered = () => {
//   const { contractInstance: contract, web3state } = useWeb3Context();
//   const { selectedAccount } = web3state;
//   const [isRegistered, setIsRegistered] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (contract) {
//         try {
//           const response = await contract.isVoter(selectedAccount);
//           console.log("response : ", response);
//           setIsRegistered(response);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     })();
//   }, [web3state]);

//   return isRegistered;
// };
