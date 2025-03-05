const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "learning-english-app",
    });

    console.log("DB connected");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
