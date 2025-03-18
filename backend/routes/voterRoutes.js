const mongoose = require("mongoose");
const { Voter } = require("../models/VoterSchema");
const voterRoutes = require("express").Router();

voterRoutes.post("/create", async (req, res) => {
  try {
    const { name, age, gender, address } = req.body;
    if (!name || !age || !gender || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newVoter = new Voter({
      name,
      age,
      gender,
      address,
    });

    const savedVoter = await newVoter.save();
    return res.status(200).json({ message: "Voter created successfully", voter: savedVoter });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create voter" });
  }
});

module.exports = { voterRoutes };
