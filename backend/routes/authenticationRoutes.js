const express = require("express");
const authenticationRoutes = express.Router();
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");

authenticationRoutes.post("/auth/:accountAddress", async (req, res) => {
  try {
    const { accountAddress } = req.params;
    const { signature } = req.query;

    if (!signature || !accountAddress) {
      res.status(500).json({ message: "Authentication failed!" });
      throw new Error("Signature or accountAddres is not provided !");
    }

    console.log({ accountAddress, signature });

    const message =
      "Welcome to Voterzz. you accept our terms and conditions and that is we can access any of your data without your consent :)";

    const recoverAddress = ethers.verifyMessage(message, signature);

    console.log("recover address : ", recoverAddress);

    if (recoverAddress.toLowerCase() == accountAddress.toLowerCase()) {
      const token = jwt.sign({ accountAddress }, "secret");
      return res
        .status(200)
        .json({ message: "Authentication successful", token: token });
    } else {
      throw new Error("recored address not same as account address");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "authentication failed !", error: error.message });
  }
});

module.exports = authenticationRoutes;
