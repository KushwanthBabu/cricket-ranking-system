const cron = require("node-cron");
const fetchLiveMatches = require("./liveMatchFetcher");
const storeMatches = require("./storeMatches");
const SystemConfig = require("../models/SystemConfig");

function startScheduler() {
  // Check every hour, but call API only if 48h passed
  cron.schedule("0 * * * *", async function () {
    const config = await SystemConfig.findOne({ key: "SPORTMONKS_FETCH" });

    const now = new Date();

    if (config) {
      const diffHours =
        (now - config.lastRun) / (1000 * 60 * 60);

      if (diffHours < 48) {
        console.log("Skipping API call (within 48h)");
        return;
      }
    }

    console.log("48h passed, calling API");

    try {
      const matches = await fetchLiveMatches();
      await storeMatches(matches);

      await SystemConfig.updateOne(
        { key: "SPORTMONKS_FETCH" },
        { lastRun: now },
        { upsert: true }
      );

      console.log("API call successful, timestamp saved");
    } catch (err) {
      console.log("API failed, will retry later");
    }
  });
}

module.exports = startScheduler;
