function calculateCPI(player, performance, stage) {
  let impact = 0;

  if (player.role === "Batsman") {
    impact += performance.runs *
      (performance.strikeRate > 130 ? 1.3 : 1);
  }

  if (stage === "final") impact += 25;
  else if (stage === "knockout") impact += 15;

  const history = player.recentPerformances;
  if (history.length > 0) {
    const avg =
      history.reduce((a, b) => a + b, 0) / history.length;
    impact += avg * 0.1;
  }

  return impact;
}

module.exports = calculateCPI;
