import React, { useRef } from "react";
import { ethers } from "ethers";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const RegisterCandidate = () => {
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const partyRef = useRef(null);

  const { contractInstance: contract } = useWeb3Context();

  const handleCandidateRegister = async (e) => {
    try {
      e.preventDefault();
      const name = nameRef.current.value; // this will act similar to the useState hook but here we are doing it with the hlep of useRef to fetch the value of input data
      const age = ageRef.current.value;
      const gender = genderRef.current.value;
      const party = partyRef.current.value;

      const response = await contract.registerCandidate(
        name,
        party,
        age,
        gender
      );
      console.log({ response });
      console.log("registration succesfull ");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleCandidateRegister}>
      <div>
        <label htmlFor="name">Name :</label>
        <input name="name" ref={nameRef} type="text" />
        <label htmlFor="age">Age :</label>
        <input name="age" ref={ageRef} type="text" />
        <label htmlFor="gender">Gender :</label>
        <input name="gender" ref={genderRef} type="text" />
        <label htmlFor="party">Party :</label>
        <input name="party" ref={partyRef} type="text" />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterCandidate;
