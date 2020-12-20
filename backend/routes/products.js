const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
  editProduct,
} = require("../controllers/productController");
const { check } = require("express-validator");
const router = express.Router();

//@desc Fetch all products
//@route GET/api/products
//@access public
router.get("/", getProducts);

//@desc Fetch product by id
//@route GET/api/products/:id
//@access public
router.get("/:id", getProductById);

//@desc Delete product by id
//@route GET/api/products/:id
//@access pricvate, admin
router.delete("/:id", adminMiddleware, deleteProduct);

//@desc add product
//@route post/api/products
//@access private, admin
router.post(
  "/",
  [
    check("name", "Name is required").trim().not().isEmpty(),
    check("description", "Description is required").trim().not().isEmpty(),
    check("price", "Price is required").trim().not().isEmpty(),
    check("brand", "Brand is required").trim().not().isEmpty(),
    check("category", "Category is required").trim().not().isEmpty(),
    check("image", "Image is required").trim().not().isEmpty(),
    check("countInStock", "Count In Stock is required").trim().not().isEmpty(),
  ],
  adminMiddleware,
  addProduct
);

//@desc update product
//@route PUT/api/products/:id
//@access pricvate, admin
router.put("/:id", adminMiddleware, editProduct);

module.exports = router;
