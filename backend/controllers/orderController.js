const orderModel = require("../models/orderModel");

exports.createOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    shippingPrice,
    itemPrice,
    taxPrice,
    paymentMethod,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order iems found." });
    }
    const order = new orderModel({
      orderItems,
      user: req.user,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find({ user: req.user })
      .populate("user", ["name", "email"]);

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await orderModel
      .findById(orderId)
      .populate("user", ["name", "email"]);

    if (!order) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (order.user._id.toString() !== req.user.toString()) {
      return res.status(401).json({ message: "Authorization failed." });
    }
    res.json(order);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Not Found." });
    }
    next(error);
  }
};

exports.updatePaidStatus = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order = await orderModel.findOne(
      {
        _id: id,
        user: req.user,
      },
      { isPaid: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Not Found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentStatus = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    return res.json(updatedOrder);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Not Found." });
    }
    next(error);
  }
};

exports.updateDeliveredStatus = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order = await orderModel.findOne(
      {
        _id: id,
        user: req.user,
      },
      { isPaid: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Not Found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();


    const updatedOrder = await order.save();

    return res.json(updatedOrder);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Not Found." });
    }
    next(error);
  }
};
