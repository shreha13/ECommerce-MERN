const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  login,
  getProfile,
  registerUser,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

//@desc login user
//@route Post /api/users/login
//@access public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email address or password.").isEmail(),
    check("password", "Please enter a valid email address or password.")
      .trim()
      .isLength({ min: 6 }),
  ],
  login
);

//@desc GEt user profile
//@route Get /api/users/profile
//@access private
router.get("/profile", authMiddleware, getProfile);

//@desc Update user profile
//@route Put /api/users/profile
//@access private
router.put(
  "/profile",
  authMiddleware,
  [
    check("email", "Please enter a valid email address.").isEmail(),
    check("password", "abc").optional(),
    check("name", "Name is required").trim().not().isEmpty(),
  ],
  updateProfile
);

//@desc register user
//@route Post /api/users/register
//@access private
router.post(
  "/register",
  [
    check("email", "Please enter a valid email address.").isEmail(),
    check("password", "Please enter a password with min of 6 characters.")
      .trim()
      .isLength({ min: 6 }),
    check("name", "Name is required").trim().not().isEmpty(),
  ],
  registerUser
);

//@desc GEt all users
//@route GET /api/users
//@access private
router.get("/", adminMiddleware, getUsers);

//@desc delete  user
//@route delete /api/users/:user
//@access private
router.delete("/:user", adminMiddleware, deleteUser);

//@desc get  user by id
//@route get /api/users/:id
//@access private/admin
router.get("/:id", adminMiddleware, getUserById);

//@desc  update  user by id
//@route put /api/users/:id
//@access private/admin
router.put("/:id", adminMiddleware, updateUser);

module.exports = router;
