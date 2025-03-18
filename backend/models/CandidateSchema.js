const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  candidateId: {
    type: Number,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = { Candidate };
