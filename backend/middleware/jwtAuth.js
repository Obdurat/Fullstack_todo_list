const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['token'];
    const credentials = jwt.verify(token, process.env.JWT_SECRET);
    req.credentials = credentials;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Wrong Credentials" });
  }
};

module.exports = verifyToken;
