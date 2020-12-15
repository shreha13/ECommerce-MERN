const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
});

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
});

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    orderItems: [orderItemSchema],
    shippingAddress: addressSchema,
    paymentMethod: { type: String, required: true },
    brand: {
      id: { type: String },
      status: String,
      update_time: String,
      email_address: String,
    },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    itemPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
