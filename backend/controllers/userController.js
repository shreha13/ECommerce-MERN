const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors.array()[0].msg });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Please enter a valid email address or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(404)
        .json({ message: "Please enter a valid email address or password." });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Profile not found." });
    }

    return res.json({
      name: user.name,
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const name = req.body.name;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors.array()[0].msg });
  }
  try {
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPswd = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      name,
      email,
      password: hashedPswd,
      isAdmin,
    });

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const name = req.body.name;
  const errors = validationResult(req);
  console.log(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors.array()[0].msg });
  }
  try {
    const userExists = await userModel.findById(req.user);

    if (!userExists) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    let hashedPswd = userExists.password;
    if (password) {
      hashedPswd = await bcrypt.hash(password, 12);
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user },
      {
        name,
        email,
        password: hashedPswd,
        isAdmin,
      }
    );

    const token = jwt.sign(
      { userId: updatedUser._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  } catch (error) {
    next(error);
  }
};
