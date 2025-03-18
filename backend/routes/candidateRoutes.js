const mongoose = require("mongoose");
const { Candidate } = require("../models/CandidateSchema");
const candidateRoutes = require("express").Router();

candidateRoutes.post("/create", async (req, res) => {
  try {
    const { name, party, age, gender, address, candidateId } = req.body;
    // if (!name || !party || !age || !gender || !address || !candidateId) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    const candidate = new Candidate({
      name,
      party,
      age,
      gender,
      address,
    });

    await candidate.save();
    return res.status(200).json({ message: "Candidate created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create candidate" });
  }
});

module.exports = { candidateRoutes };
