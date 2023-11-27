const mongodb = require("./database/mongodb");
const productsModel = require("./models/productsModel");

require("dotenv").config();
const productJSON = require("./products.json");

const start = async () => {
  try {
    await mongodb(process.env.MONGODB_URI);
    // await productsModel.deleteMany();
    await productsModel.create(productJSON);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();
