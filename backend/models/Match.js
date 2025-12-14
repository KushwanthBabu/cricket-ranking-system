const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  matchId: String,
  processed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Match", matchSchema);
