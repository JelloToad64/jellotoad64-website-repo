async function loadToad64Stats() {
  const statsContainer = document.getElementById("tetrio-stats");
  statsContainer.innerText = "Loading...";

  try {
    const res = await fetch("https://tetr-io-proxy.onrender.com/toad64");
    const data = await res.json();
    const user = data.data.user;

    statsContainer.innerHTML = `
      <h2>${user.username}</h2>
      <p><strong>TR:</strong> ${user.league.rating.toFixed(2)}</p>
      <p><strong>Rank:</strong> ${user.league.rank}</p>
      <p><strong>Games Played:</strong> ${user.gamesplayed}</p>
    `;
  } catch (err) {
    statsContainer.innerHTML = "<p style='color:red;'>Failed to load stats.</p>";
    console.error("Error loading stats:", err);
  }
}

// Automatically run when page loads
window.addEventListener("DOMContentLoaded", loadToad64Stats);
