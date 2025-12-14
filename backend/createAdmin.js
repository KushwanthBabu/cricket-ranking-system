require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ username: "admin" });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = bcrypt.hashSync("admin123", 10);

  await Admin.create({
    username: "admin",
    password: hashedPassword
  });

  console.log("Admin created successfully");
  process.exit(0);
}

createAdmin();
