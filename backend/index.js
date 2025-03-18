const express = require("express");
const cors = require("cors-express");
const cookieParser = require("cookie-parser");
const { authenticateJwt } = require("../backend/utils/jwtVerify.js");

const app = express();
require("dotenv").config();

const { connectDb } = require("./db/connect.js");
// const candidateRoutes = require("./routes/candidateRoutes.js");
const authenticationRoutes = require("./routes/authenticationRoutes.js");
const { candidateRoutes } = require("./routes/candidateRoutes.js");
const { voterRoutes } = require("./routes/voterRoutes.js");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", authenticationRoutes);
app.use("/api/candidate", authenticateJwt, candidateRoutes);
app.use("/api/voter", authenticateJwt, voterRoutes);

connectDb().then(() => {
  console.log("connected to db");
});

app.get("/check", authenticateJwt, (req, res) => {
  console.log("CHECKKK ENDPOINT !!!");
  console.log("req.user", req.user);
  return res.json({ message: "Authentication successful", user: req.user });
});

app.get("/", (req, res) => {
  return res.send("hello hello !");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
