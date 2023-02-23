const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const options = { useUnifiedTopology: true };

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(uri, options);
    console.log("database connection established");
  } catch (err) {
    console.log(err);
  }
};

const close = async () => {
  await mongoose.connection.close();
};

module.exports = { uri, connectDB, close };
