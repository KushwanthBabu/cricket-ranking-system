const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", function () {
    console.log("MongoDB connected to cricketDB");
  });

  mongoose.connection.on("error", function (err) {
    console.log("MongoDB error:", err);
  });
}

module.exports = connectDB;
