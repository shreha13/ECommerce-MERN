const express = require("express");
const { getProducts, getProductById } = require("../controllers/productController");
const router = express.Router();

//@desc Fetch all products
//@route GET/api/products
//@access public
router.get("/", getProducts);

//@desc Fetch product by id
//@route GET/api/products/:id
//@access public
router.get("/:id", getProductById);

module.exports = router;
