const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Make sure MONGO_URI is set in your .env file
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI not found in .env file");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
   console.log("✅ MongoDB Connected Successfully");
   console.log("Connected to DB:", mongoose.connection.name);
   console.log("Connected Host:", mongoose.connection.host);

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

