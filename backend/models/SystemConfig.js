const mongoose = require("mongoose");

const systemConfigSchema = new mongoose.Schema({
  key: String,
  lastRun: Date
});

module.exports = mongoose.model("SystemConfig", systemConfigSchema);
