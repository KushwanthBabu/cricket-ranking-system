const Match = require("../models/Match");

async function storeMatches(matches) {
  for (let i = 0; i < matches.length; i++) {
    const exists = await Match.findOne({ matchId: matches[i].id });
    if (!exists) {
      await Match.create({ matchId: matches[i].id });
    }
  }
}

module.exports = storeMatches;
