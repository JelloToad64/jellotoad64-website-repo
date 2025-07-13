document.addEventListener('DOMContentLoaded', async () => {
    const statsContainer = document.getElementById('tetrio-stats');
    statsContainer.innerText = "Loading...";

    try {
        const response = await fetch('/api/tetrio?user=Toad64'); // Make sure this hits your proxy
        const json = await response.json();

        if (!json.success || !json.data) {
            throw new Error("Invalid response structure");
        }

        const data = json.data;
        const user = data.user || {};
        const league = data.league || {};
        const sprint = data['40l']?.record?.endcontext?.finalTime;
        const blitz = data.blitz?.record?.endcontext?.score;
        const zenLevel = data.zen?.level;

        const rank = league.rank || 'Unranked';
        const tr = league.rating ? league.rating.toFixed(2) : 'N/A';
        const level = user.xp ? Math.floor(Math.sqrt(user.xp + 1)) : 'N/A';

        statsContainer.innerHTML = `
            <div class="tetrio-widget">
                <h2>TETR.IO Stats</h2>
                <ul>
                    <li><strong>League Rank:</strong> ${rank}</li>
                    <li><strong>TR:</strong> ${tr}</li>
                    <li><strong>Level:</strong> ${level}</li>
                    <li><strong>40L PB:</strong> ${sprint ? (sprint / 1000).toFixed(2) + "s" : "No Record"}</li>
                    <li><strong>Blitz PB:</strong> ${blitz ? blitz.toLocaleString() + " pts" : "No Record"}</li>
                    <li><strong>Zen Level:</strong> ${zenLevel ?? "N/A"}</li>
                </ul>
            </div>
        `;
    } catch (err) {
        statsContainer.innerHTML = `<p style="color:red;">Failed to load TETR.IO stats.</p>`;
        console.error("Error loading stats:", err);
    }
});
