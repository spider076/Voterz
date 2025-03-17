const jwt = require("jsonwebtoken");

const authenticateJwt = (req, res, next) => {
  const token = String(req.headers.authorization).split(" ")[1];

  console.log('token : ', token);

  if (!token) {
    return res.status(401).json({ message: "Please Provide the Token" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    console.log('decoeded : ', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log({error})
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { authenticateJwt };
