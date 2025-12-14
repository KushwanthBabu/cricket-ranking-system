const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  country: String,
  role: String,
  format: String,
  photoUrl: String,
  rating: {
    type: Number,
    default: 500
  },
  recentPerformances: {
    type: [Number],
    default: []
  }
});

module.exports = mongoose.model("Player", playerSchema);
