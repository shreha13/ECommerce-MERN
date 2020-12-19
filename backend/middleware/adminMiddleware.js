const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  const authHeader = req.get("x-auth-header");
  if (!authHeader) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const token = authHeader.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  req.user = decodedToken.userId;

  const user = await userModel.findById(req.user);

  if(user && user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Not Authorized." });
  }
};
