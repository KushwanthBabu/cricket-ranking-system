const API_URL = "http://localhost:3000/api/players";

let currentFormat = "ODI";
let allPlayers = [];

/* =========================
   LOAD ALL PLAYERS ONCE
========================= */
async function loadPlayers() {
  try {
    const response = await fetch(API_URL);
    allPlayers = await response.json();
    renderTable();
  } catch (error) {
    console.error("Error fetching players:", error);
  }
}

/* =========================
   FORMAT TAB HANDLER
========================= */
function setFormat(format) {
  currentFormat = format;

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  event.target.classList.add("active");
  renderTable();
}

/* =========================
   RENDER TABLE
========================= */
function renderTable() {
  const tbody = document.getElementById("rankingBody");
  tbody.innerHTML = "";

  const filteredPlayers = allPlayers
    .filter(player => player.format === currentFormat)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));

  if (filteredPlayers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; padding:20px;">
          No players available
        </td>
      </tr>
    `;
    return;
  }

  filteredPlayers.forEach((player, index) => {
    const row = document.createElement("tr");

    const name = player.name || "Unknown Player";
    const country = player.country || "-";
    const rating = Math.round(player.rating || 0);

    row.innerHTML = `
      <td class="rank">${index + 1}</td>

      <td class="player-name">${name}</td>

      <td>
        <div class="country-cell">
          <img class="flag" src="${getFlag(country)}" alt="${country}" />
          ${country}
        </div>
      </td>

      <td class="rating">${rating}</td>
    `;

    tbody.appendChild(row);
  });
}

/* =========================
   COUNTRY FLAG MAP
========================= */
function getFlag(country) {
  const flags = {
    India: "https://flagcdn.com/w40/in.png",
    Pakistan: "https://flagcdn.com/w40/pk.png",
    England: "https://flagcdn.com/w40/gb.png",
    Australia: "https://flagcdn.com/w40/au.png",
    "New Zealand": "https://flagcdn.com/w40/nz.png",
    "South Africa": "https://flagcdn.com/w40/za.png",
    SriLanka: "https://flagcdn.com/w40/lk.png",
    Bangladesh: "https://flagcdn.com/w40/bd.png",
    Afghanistan: "https://flagcdn.com/w40/af.png",
    Ireland: "https://flagcdn.com/w40/ie.png",
    "West Indies": "https://flagcdn.com/w40/jm.png"
  };

  return flags[country] || "https://flagcdn.com/w40/un.png";
}

/* =========================
   INITIAL LOAD
========================= */
loadPlayers();
