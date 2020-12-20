const express = require("express");
const path = require("path");
const users = require("./routes/users");
const products = require("./routes/products");
const orders = require("./routes/orders");
const uploads = require("./routes/uploads");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("./models/productModel");
require("./models/userModel");

const app = express();

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

  next();
  0;
});

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/upload", uploads);

app.get("/api/config/paypal", (req, res) =>
  res.json(process.env.PAYPAL_CLIENT_ID)
);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.w4iha.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));
