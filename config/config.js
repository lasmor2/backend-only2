const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDb;
