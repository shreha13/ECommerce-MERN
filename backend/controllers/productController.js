
const productModel = require("../models/productModel");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find().populate("user", ["name"]);

    return res.json({ products });
  } catch (error) {
    return next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id).populate("user", ["name"]);
    if (product) return res.json({ product });
    else return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    return next(error);
  }
};
