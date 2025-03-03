import React, { useRef } from "react";
import { useWeb3Context } from "../../hooks/useWeb3Context";

const VotngTimePeriod = () => {
  const { contractInstance: contract } = useWeb3Context();

  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  async function handleSubmit() {
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;

    try {
      const response = contract.setVotingPeriod(
        Number(startTime),
        Number(endTime)
      );

      console.log("response : ", response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>StartTime</label>
        <input type="text" ref={startTimeRef} />
        <label>EndTime</label>
        <input type="text" ref={endTimeRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default VotngTimePeriod;
