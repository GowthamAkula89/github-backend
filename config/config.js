const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;
