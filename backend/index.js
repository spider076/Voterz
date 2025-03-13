const express = require("express");
const cors = require("cors-express");

const app = express();
require("dotenv").config();

const { connectDb } = require("./db/connect.js");
// const candidateRoutes = require("./routes/candidateRoutes.js");
const authenticationRoutes = require("./routes/authenticationRoutes.js");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", authenticationRoutes);
// app.use("/api/authentication", authenticationRoutes);

connectDb().then(() => {
  console.log("connected to db");
});

app.get("/", (req, res) => {
  return res.send("hello hello !");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
