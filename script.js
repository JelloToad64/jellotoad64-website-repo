fetch("https://tetr-io-proxy.onrender.com/toad64")
  .then(res => res.json())
  .then(data => {
    const user = data.data.user;
    const league = user.league || {};
    const records = user.records || {};

    document.querySelector("#level").textContent = user.xp_level || "N/A";
    document.querySelector("#rank").textContent = league.rank || "N/A";
    document.querySelector("#tr").textContent = Math.round(league.rating || 0);
    document.querySelector("#pb40l").textContent =
      records["40l"] && records["40l"].record
        ? (records["40l"].record.time / 1000).toFixed(3) + "s"
        : "N/A";
    document.querySelector("#blitzpb").textContent =
      records.blitz && records.blitz.record
        ? records.blitz.record.score.toLocaleString()
        : "N/A";
  })
  .catch(err => console.error("Failed to fetch stats:", err));
