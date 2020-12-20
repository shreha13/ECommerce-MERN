const { validationResult } = require("express-validator");
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

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const products = productModel.find();
    const product = (await products).findIndex(
      (i) => i._id.toString() === id.toString()
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await productModel.deleteOne({ _id: id });
    const otherProducts = (await products).filter(
      (i) => i._id.toString() !== id.toString()
    );
    return res.json(otherProducts);
  } catch (error) {
    next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({ mesage: errors.array()[0].msg });
  }

  const user = req.user;
  const name = req.body.name;
  const image = req.body.image || "/images/phone.jpg";
  const description = req.body.description;
  const brand = req.body.brand;
  const category = req.body.category;
  const price = req.body.price;
  const countInStock = req.body.countInStock || 0;
  const rating = req.body.rating || 0;
  const numReviews = req.body.numReviews || 0;

  try {
    const product = new productModel({
      user,
      name,
      image,
      description,
      brand,
      category,
      numReviews,
      rating,
      price,
      countInStock,
    });

    const createdProduct = await product.save();
    return res.json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.editProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await productModel.findById(id);

    if(!product) {
      return res.status(404).json({message: 'Product not found.'})
    }

    product.user = req.user;
    product.name = req.body.name || product.name;
    product.image = req.body.image || product.image;
    product.description = req.body.description || product.description;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.rating = req.body.rating || product.rating;
    product.numReviews = req.body.numReviews || product.numReviews;

    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
