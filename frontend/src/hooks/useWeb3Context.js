import { useContext } from "react";
import { Web3context } from "../context/Web3Provider";

export const useWeb3Context = () => {
  return useContext(Web3context);
};
