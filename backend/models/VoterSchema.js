const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  voterId: {
    type: Number,
    // required: true,
  },
  gender: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  voteCandidateId: {
    type: Number,
    ref: "Candidate",
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
});

const Voter = mongoose.model("voters", voterSchema);

module.exports = { Voter };
