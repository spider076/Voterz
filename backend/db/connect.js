// connectDb.js
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL;

async function connectDb() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fail fast if connection is bad
    });
    console.log("You successfully connected to MongoDB with Mongoose!");
    // No client.close() here—keep connection open for the app
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Let the caller handle the error
  }
}

// Optional: Add connection event listeners for debugging
mongoose.connection.on("connected", () => console.log("Mongoose connected"));
mongoose.connection.on("error", (err) => console.error("Mongoose error:", err));
mongoose.connection.on("disconnected", () =>
  console.log("Mongoose disconnected")
);

module.exports = { connectDb };
