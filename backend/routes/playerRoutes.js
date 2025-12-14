const express = require("express");
const Player = require("../models/Player");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", async function (req, res) {
  const players = await Player.find().sort({ rating: -1 });
  res.json(players);
});

// Admin only
router.post("/", auth, async function (req, res) {
  await Player.create(req.body);
  res.send("Player added");
});

module.exports = router;
