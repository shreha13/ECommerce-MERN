const mongoose = require("mongoose");
const { default: products } = require("./data/products");
const { default: users } = require("./data/users");
const orderModel = require("./models/orderModel");
const productModel = require("./models/productModel");
const userModel = require("./models/userModel");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.w4iha.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {})
  .catch((err) => console.log(err));

const importData = async () => {
  try {

    const createUsers = await userModel.insertMany(users);
    const adminUser = createUsers[0]._id;

    const sampleProducts = products.map((i) => {
      return {
        ...i,
        user: adminUser,
      };
    });
    await productModel.insertMany(sampleProducts);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await orderModel.deleteMany();

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
