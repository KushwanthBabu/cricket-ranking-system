const axios = require("axios");

async function fetchLiveMatches() {
  const response = await axios.get(
    "https://api.sportmonks.com/v2/cricket/fixtures/live",
    {
      params: {
        api_token: process.env.CRICKET_API_KEY
      }
    }
  );

  return response.data.data;
}

module.exports = fetchLiveMatches;
