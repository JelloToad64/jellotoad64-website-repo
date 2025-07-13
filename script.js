document.addEventListener('DOMContentLoaded', async () => {
    const statsContainer = document.getElementById('tetrio-stats');
    statsContainer.innerText = "Loading...";

    try {
        const res = await fetch("https://tetr-io-proxy.onrender.com/toad64");
        const data = await res.json();
        const user = data.data.user;

        const league = user.league || {};
        const records = user.records || {};
        const zen = user.zen || {};

        const rank = league.rank || 'Unranked';
        const tr = league.rating ? league.rating.toFixed(2) : 'N/A';
        const level = user.xp ? Math.floor(Math.sqrt(user.xp + 1)) : 'N/A';

        const sprint = records['40l']?.endcontext?.finalTime
            ? `${(records['40l'].endcontext.finalTime / 1000).toFixed(2)}s`
            : 'No Record';

        const blitz = records.blitz?.endcontext?.score
            ? `${records.blitz.endcontext.score.toLocaleString()} pts`
            : 'No Record';

        const zenLevel = zen.level !== undefined ? zen.level : 'N/A';

        statsContainer.innerHTML = `
            <div class="tetrio-widget">
                <h2>TETR.IO Stats for ${user.username}</h2>
                <ul>
                    <li><strong>League Rank:</strong> ${rank}</li>
                    <li><strong>TR:</strong> ${tr}</li>
                    <li><strong>Level:</strong> ${level}</li>
                    <li><strong>40L PB:</strong> ${sprint}</li>
                    <li><strong>Blitz PB:</strong> ${blitz}</li>
                    <li><strong>Zen Level:</strong> ${zenLevel}</li>
                </ul>
            </div>
        `;
    } catch (err) {
        statsContainer.innerHTML = "<p style='color:red;'>Failed to load stats.</p>";
        console.error("Error loading stats:", err);
    }
});
