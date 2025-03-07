import React, { useRef } from "react";
import { ethers } from "ethers";
import { useWeb3Context } from "../../hooks/useWeb3Context";
import { toast } from "react-toastify";

const RegisterVoter = () => {
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);

  const { web3state } = useWeb3Context();
  const { contractInstance: contract } = web3state;

  const handleVoterRegister = async (e) => {
    try {
      e.preventDefault();
      const name = nameRef.current.value; // this will act similar to the useState hook but here we are doing it with the hlep of useRef to fetch the value of input data
      const age = ageRef.current.value;
      const gender = genderRef.current.value;

      const response = await contract.registerVoter(name, age, gender);
      console.log({ response });
      console.log("registration succesfull ");
    } catch (err) {
      if (err && err.revert && err.revert.args && err.revert.args.length > 0) {
        const reason = err.revert.args[0]; // Get the reason from args[0]
        console.log("Error ", reason);
        toast.warning(reason);
      } else {
        console.log("Error: ", err.message);
        toast.error(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleVoterRegister}>
      <div>
        <label htmlFor="name">Name :</label>
        <input name="name" ref={nameRef} type="text" />
        <label htmlFor="age">Age :</label>
        <input name="age" ref={ageRef} type="text" />
        <select ref={genderRef}>
          <option value="" disabled>
            --Choose your gender--
          </option>
          <option value="2">Male</option>
          <option value="3">Female</option>
          <option value="4">Other</option>
          <option value="1">Not Specified</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterVoter;
