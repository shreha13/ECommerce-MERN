const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrderById,
  getOrders,
  updatePaidStatus,
  updateDeliveredStatus,
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

//@desc create order
//@route POST /api/orders
//@access private
router.post("/", authMiddleware, createOrder);

//@desc get orders
//@route Get /api/orders
//@access private
router.get("/", authMiddleware, getOrders);

//@desc get orders by id
//@route GET /api/orders/:id
//@access private
router.get("/:id", authMiddleware, getOrderById);

//@desc get orders by id and pay
//@route GET /api/orders/:id/pay
//@access private
router.put("/:id/pay", authMiddleware, updatePaidStatus);

//@desc get orders by id and deliver
//@route GET /api/orders/:id/deliver
//@access private
router.put("/:id/deliver", authMiddleware, updateDeliveredStatus);

module.exports = router;
