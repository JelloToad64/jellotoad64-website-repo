/* === DROPDOWN MENU OPEN/CLOSE === */
const settingsToggleBtn = document.getElementById('settingsToggleBtn');
const settingsDropdown = settingsToggleBtn.parentElement;

settingsToggleBtn.addEventListener('click', () => {
  const isOpen = settingsDropdown.classList.toggle('open');
  settingsToggleBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
  if (!settingsDropdown.contains(e.target)) {
    settingsDropdown.classList.remove('open');
    settingsToggleBtn.setAttribute('aria-expanded', false);
  }
});


/* === CRT FILTER TOGGLE === */
const crtToggle = document.getElementById('crtToggle');
const crtDiv = document.querySelector('.crt');

window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('crtFilterEnabled');
  if (savedState === 'false') {
    crtToggle.checked = false;
    crtDiv.classList.remove('crt');
  } else {
    crtToggle.checked = true;
    crtDiv.classList.add('crt');
  }
});

crtToggle.addEventListener('change', () => {
  if (crtToggle.checked) {
    crtDiv.classList.add('crt');
    localStorage.setItem('crtFilterEnabled', 'true');
  } else {
    crtDiv.classList.remove('crt');
    localStorage.setItem('crtFilterEnabled', 'false');
  }
});


/* === KILL THE POWER BUTTON TOGGLE === */
const killPowerBtn = document.getElementById('killPowerBtn');
const mainWrapper = document.querySelector('body');

// On load: apply saved state from localStorage
const savedPower = localStorage.getItem('killPower');
if (savedPower === 'true') {
  mainWrapper.classList.add('kill-power');
  killPowerBtn.textContent = 'Power Up';
} else {
  killPowerBtn.textContent = 'Power Down';
}

// On click: toggle class, update button label, and store state
killPowerBtn.addEventListener('click', () => {
  const isNowKilled = mainWrapper.classList.toggle('kill-power');
  killPowerBtn.textContent = isNowKilled ? 'Power Up' : 'Power Down';
  localStorage.setItem('killPower', isNowKilled);
});


/* === TETR.IO STATS FETCH & UPDATE === */
function formatTime(ms) {
  if (ms === undefined || ms === null) return 'N/A';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

async function fetchTetrioStats() {
  try {
    const res = await fetch('https://tetr-io-proxy.onrender.com/toad64');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    const leagueRank = data.data.league?.rank || 'N/A';
    const leagueTRValue = data.data.league?.tr;
    const leagueTR = leagueTRValue !== undefined ? leagueTRValue.toFixed(2).toLocaleString() : 'N/A';

    const blitzRaw = data.data.blitz?.record?.p?.pri;
    const blitzScore = blitzRaw !== undefined ? blitzRaw.toLocaleString() : 'N/A';

    const finalTimeMs = data.data["40l"]?.record?.results?.stats?.finaltime;
    const time40L = formatTime(finalTimeMs);

    const accountLevelRaw = data.data.zen?.level;
    const accountLevel = accountLevelRaw !== undefined ? accountLevelRaw.toLocaleString() : 'N/A';

    if (leagueRank !== 'N/A') {
      const rankImage = document.getElementById('leagueImage');
      rankImage.src = `https://tetr.io/res/league-ranks/${leagueRank}.png`;
      rankImage.alt = `${leagueRank} Rank Icon`;
      rankImage.title = leagueRank;
    }

    document.getElementById('leagueTR').textContent = leagueTR;
    document.getElementById('blitzScore').textContent = blitzScore;
    document.getElementById('time40L').textContent = time40L;
    document.getElementById('accountLevel').textContent = accountLevel;
  } catch (e) {
    console.error(e);
    const container = document.getElementById('tetrio-stats');
    container.innerHTML = `<li>Error loading stats: ${e.message}</li>`;
  }
}

fetchTetrioStats();
