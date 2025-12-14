const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async function (req, res) {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).send("Invalid credentials");
  }

  const isMatch = bcrypt.compareSync(password, admin.password);
  if (!isMatch) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
