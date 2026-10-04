import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, runTransaction, arrayUnion } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAghGIes3l1tri3LDifzjo0WFqRGyrG4nE",
  authDomain: "spirit-island-fb793.firebaseapp.com",
  projectId: "spirit-island-fb793",
  storageBucket: "spirit-island-fb793.firebasestorage.app",
  messagingSenderId: "482069817782",
  appId: "1:482069817782:web:1123c809e5dc50d375f917"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const gameRef = doc(db, "games", "current");
export const PHASES = ["spirit", "fast", "invader", "slow", "time_passes"];

const SPIRITS = [
  // Core Set
 { id: "river_surges_in_sunlight", pl: "Skąpana Słońcem Rzeka", en: "River Surges in Sunlight" },
  { id: "lightnings_swift_strike", pl: "Błyskawica z Serca Burzy", en: "Lightning's Swift Strike" },
  { id: "bringer_of_dreams_and_nightmares", pl: "Zsyłający Sny i Koszmary", en: "Bringer of Dreams and Nightmares" },
  { id: "vital_strength_of_the_earth", pl: "Kolosalna Siła Ziemi", en: "Vital Strength of the Earth" },
  { id: "thunderspeaker", pl: "Głos Burzy", en: "Thunderspeaker" },
  { id: "shadows_flicker_like_flame", pl: "Cień Migoczący Niczym Płomień", en: "Shadows Flicker Like Flame" },
  { id: "ocean_hungry_grasp", pl: "Zryw Wygłodnialego Oceanu", en: "Ocean's Hungry Grasp" },
  { id: "a_spreading_heart_of_green", pl: "Nieokiełznany Siewca Zieleni", en: "A Spread of Rampant Green" },
  
  // Branch & Claw
  { id: "keeper_of_the_forbidden_wilds", pl: "Strażnik Zakazanej Dziczy", en: "Keeper of the Forbidden Wilds" },
  { id: "sharp_fangs_behind_the_leaves", pl: "Ostre Kły Za Liśćmi", en: "Sharp Fangs Behind the Leaves" },
  
  // Jagged Earth
  { id: "grinning_trickster_stirs_up_trouble", pl: "Uśmiechnięty Psotnik Wywołuje Kłopoty", en: "Grinning Trickster Stirs Up Trouble" },
  { id: "lure_of_the_deep_wilderness", pl: "Wabik Głębokiej Dziczy", en: "Lure of the Deep Wilderness" },
  { id: "many_minds_move_as_one", pl: "Wiele Umysłów Porusza się jak Jeden", en: "Many Minds Move as One" },
  { id: "shifting_memory_of_ages", pl: "Zmienna Pamięć Wieków", en: "Shifting Memory of Ages" },
  { id: "stones_unyielding_defiance", pl: "Niezłomny Opór Kamienia", en: "Stone's Unyielding Defiance" },
  { id: "volcano_looming_high", pl: "Wyniosły Wulkan", en: "Volcano Looming High" },
  { id: "shroud_of_silent_mist", pl: "Całun Cichej Mgły", en: "Shroud of Silent Mist" },
  { id: "vengeance_as_a_burning_plague", pl: "Zemsta jako Płonąca Plaga", en: "Vengeance as a Burning Plague" },
  { id: "fractured_days_split_the_sky", pl: "Rozbite Dni Rozdzierają Niebo", en: "Fractured Days Split the Sky" },
  { id: "starlight_seeks_its_form", pl: "Światło Gwiazd Szuka Swojej Formy", en: "Starlight Seeks Its Form" },
  
  // Promo / Feather & Flame
  { id: "heart_of_the_wildfire", pl: "Serce Pożogi", en: "Heart of the Wildfire" },
  { id: "serpent_slumbering_beneath_the_island", pl: "Wąż Śpiący Pod Wyspą", en: "Serpent Slumbering Beneath the Island" },
  { id: "downpour_drenches_the_world", pl: "Ulewa Zalewająca Świat", en: "Downpour Drenches the World" },
  { id: "finder_of_paths_unseen", pl: "Odkrywca Niewidocznych Ścieżek", en: "Finder of Paths Unseen" },
  
  // Horizons of Spirit Island
  { id: "devouring_teeth_lurk_underfoot", pl: "Pożerające Zęby Czają się Pod Stopami", en: "Devouring Teeth Lurk Underfoot" },
  { id: "eyes_watch_from_the_trees", pl: "Oczy Obserwujące z Drzew", en: "Eyes Watch from the Trees" },
  { id: "fathomless_mud_of_the_swamp", pl: "Bezdenne Błoto Bagna", en: "Fathomless Mud of the Swamp" },
  { id: "rising_heat_of_stone_and_sand", pl: "Wzrastający Żar Kamienia i Piasku", en: "Rising Heat of Stone and Sand" },
  { id: "sun_bright_whirlwind", pl: "Słoneczny Wicher", en: "Sun-Bright Whirlwind" },

  // Nature Incarnate
  { id: "ember_eyed_behemoth", pl: "Behemot o Oczach Żaru", en: "Ember-Eyed Behemoth" },
  { id: "hearth_vigil", pl: "Czuwanie Domowego Ogniska", en: "Hearth-Vigil" },
  { id: "towering_roots_of_the_jungle", pl: "Strzeliste Korzenie Dżungli", en: "Towering Roots of the Jungle" },
  { id: "breath_of_darkness_down_your_spine", pl: "Oddech Ciemności Wzdłuż Kręgosłupa", en: "Breath of Darkness Down Your Spine" },
  { id: "relentless_gaze_of_the_sun", pl: "Nieustępliwe Spojrzenie Słońca", en: "Relentless Gaze of the Sun" },
  { id: "wandering_voice_keens_delirium", pl: "Błądzący Głos Wyje Obłęd", en: "Wandering Voice Keens Delirium" },
  { id: "wounded_waters_bleeding", pl: "Zranione Wody Krwawią", en: "Wounded Waters Bleeding" },
  { id: "dances_up_earthquakes", pl: "Tańczy na Trzęsieniach Ziemi", en: "Dances Up Earthquakes" }
];

const ADVERSARIES = [
  { id: null, pl: "Brak", en: "None" },
  { id: "prussia", pl: "Królestwo Prus", en: "Kingdom of Prussia" },
  { id: "britain", pl: "Królestwo Wielkiej Brytanii", en: "Kingdom of Great Britain" },
  { id: "sweden", pl: "Królestwo Szwecji", en: "Kingdom of Sweden" },
  { id: "france", pl: "Królestwo Francji", en: "Kingdom of France" },
  { id: "habsburg", pl: "Monarchia Habsburgów", en: "Habsburg Monarchy" },
  { id: "russia", pl: "Carstwo Rosyjskie", en: "Tsardom of Russia" },
  { id: "habsburg_mining", pl: "Monarchia Habsburgów (Górnictwo)", en: "Habsburg Mining Expedition" }
];

const I18N = {
  pl: {
    "app.eyebrow": "HOST / ADMIN",
    "app.title": "SPIRIT ISLAND HELPER - SETUP",
    "status.connecting": "Łączenie…",
    "status.connected": "Połączono",
    "status.error": "Błąd połączenia",
    "setup.players.title": "Gracze",
    "setup.players.count": "Liczba graczy",
    "setup.players.noSpirit": "— wybierz ducha —",
    "setup.global.title": "Tracker żywiołów",
    "setup.global.elements": "Status trackera",
    "setup.adversary.title": "Adwersarz",
    "setup.adversary.name": "Adwersarz",
    "setup.adversary.level": "Poziom",
    "setup.fear.title": "Strach",
    "setup.fear.total": "Wygenerowano",
    "setup.fear.cards": "Zdobyte karty",
    "setup.fear.pool": "Pula",
    "stats.title": "Statystyki czasu",
    "stats.description": "Czas jest zapisywany przy READY, zmianie fazy i zakończeniu gry.",
    "stats.currentPhase": "Aktualna faza",
    "stats.total": "Łącznie",
    "stats.spirit": "Duch",
    "stats.fast": "Szybkie",
    "stats.invader": "Najeźdźcy",
    "stats.slow": "Wolne",
    "stats.time_passes": "Czas płynie",
    "stats.game": "Cała gra",
    "history.title": "Historia faz",
    "history.description": "Zapisane czasy zakończonych faz.",
    "history.empty": "Brak zakończonych faz.",
    "history.turn": "Tura",
    "history.phase": "Faza",
    "history.duration": "Czas",
    "reset.title": "Reset gry",
    "reset.description": "Kasuje bieżący stan, statystyki, strach, wybory duchów i historię.",
    "common.cancel": "Anuluj",
    "common.confirm": "Potwierdź",
    "common.enabled": "Włączony",
    "common.disabled": "Wyłączony",
    "phase.setup": "Konfiguracja gry",
    "phase.spirit": "Faza Ducha",
    "phase.fast": "Szybkie Moce",
    "phase.invader": "Faza Najeźdźcy",
    "phase.slow": "Wolne Moce",
    "phase.time_passes": "Czas Płynie",
    "status.setup": "SETUP",
    "status.active": "ACTIVE",
    "status.finished": "FINISHED",
    "button.start": "START GAME",
    "button.advance": "ADVANCE PHASE",
    "button.finish": "END GAME / STOP TIMERS",
    "button.reset": "RESET GAME",
    "permission.fear": "Zmiana strachu",
    "permission.advance": "Zmiana fazy",
    "setup.ready": "Ustaw graczy i parametry, a następnie uruchom grę.",
    "setup.active": "Gra trwa — konfiguracja jest zablokowana.",
    "setup.finished": "Gra zakończona — statystyki są zamrożone.",
    "confirm.start": "Uruchomić grę? Zostanie rozpoczęta tura 1 i pierwsza faza.",
    "confirm.finish": "Zakończyć grę i zatrzymać wszystkie timery?",
    "confirm.reset": "Na pewno zresetować całą grę? Tej operacji nie można cofnąć."
  },
  en: {
    "app.eyebrow": "HOST / ADMIN",
    "app.title": "SPIRIT ISLAND HELPER - SETUP",
    "status.connecting": "Connecting…",
    "status.connected": "Connected",
    "status.error": "Connection error",
    "setup.players.title": "Players",
    "setup.players.count": "Player count",
    "setup.players.noSpirit": "— select spirit —",
    "setup.global.title": "Elemental tracker",
    "setup.global.elements": "Tracker status",
    "setup.adversary.title": "Adversary",
    "setup.adversary.name": "Adversary",
    "setup.adversary.level": "Level",
    "setup.fear.title": "Fear",
    "setup.fear.total": "Generated",
    "setup.fear.cards": "Cards earned",
    "setup.fear.pool": "Pool",
    "stats.title": "Time statistics",
    "stats.description": "Time is recorded on READY, phase changes and game end.",
    "stats.currentPhase": "Current phase",
    "stats.total": "Total",
    "stats.spirit": "Spirit",
    "stats.fast": "Fast",
    "stats.invader": "Invader",
    "stats.slow": "Slow",
    "stats.time_passes": "Time Passes",
    "stats.game": "Whole game",
    "history.title": "Phase history",
    "history.description": "Recorded durations of completed phases.",
    "history.empty": "No completed phases.",
    "history.turn": "Turn",
    "history.phase": "Phase",
    "history.duration": "Time",
    "reset.title": "Reset game",
    "reset.description": "Clears current state, statistics, fear, spirit selections and history.",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.enabled": "Enabled",
    "common.disabled": "Disabled",
    "phase.setup": "Game Setup",
    "phase.spirit": "Spirit Phase",
    "phase.fast": "Fast Powers",
    "phase.invader": "Invader Phase",
    "phase.slow": "Slow Powers",
    "phase.time_passes": "Time Passes",
    "status.setup": "SETUP",
    "status.active": "ACTIVE",
    "status.finished": "FINISHED",
    "button.start": "START GAME",
    "button.advance": "ADVANCE PHASE",
    "button.finish": "END GAME / STOP TIMERS",
    "button.reset": "RESET GAME",
    "permission.fear": "Change fear",
    "permission.advance": "Advance phase",
    "setup.ready": "Set up players and settings, then start the game.",
    "setup.active": "Game is running — configuration is locked.",
    "setup.finished": "Game finished — statistics are frozen.",
    "confirm.start": "Start the game? Turn 1 and the first phase will begin.",
    "confirm.finish": "End the game and stop all timers?",
    "confirm.reset": "Reset the entire game? This cannot be undone."
  }
};

let lang = localStorage.getItem("sic_language") || "pl";
let currentGame = null;

const $ = (id) => document.getElementById(id);
const emptyElements = () => ({ sun: 0, moon: 0, fire: 0, air: 0, water: 0, earth: 0, plant: 0, animal: 0 });
const emptyPhaseTimes = () => ({ spirit: 0, fast: 0, invader: 0, slow: 0, time_passes: 0 });
const player = (type = "player") => ({
  type,
  ...(type === "player" ? { spirit_id: null, ready: false, permissions: { can_change_fear: false, can_advance_phase: false }, elements: emptyElements() } : {}),
  time_tracking: { total_seconds: 0, phase_times: emptyPhaseTimes() }
});

export function createInitialGame(playerCount = 1) {
  const players = { "0": player("game") };
  for (let i = 1; i <= playerCount; i++) players[String(i)] = player();
  return {
    game_status: "setup", turn: 1, phase_index: 0, phase_start_time: null,
    player_count: playerCount, players, elements_tracker_enabled: true,
    adversary: { id: null, level: 0, card_text: null },
    fear: { total_generated: 0, per_card: playerCount * 4, log: [] }, phase_history: [],
    timing: { setup_started_at: Date.now(), game_started_at: null, game_finished_at: null }
  };
}

export async function ensureGameExists() {
  const snap = await getDoc(gameRef);
  if (!snap.exists()) await setDoc(gameRef, createInitialGame(1));
  return (await getDoc(gameRef)).data();
}

export async function setPlayerCount(n) {
  if (!Number.isInteger(n) || n < 1 || n > 8) throw Error("Player count must be 1-8.");
  await runTransaction(db, async tx => {
    const s = await tx.get(gameRef); if (!s.exists()) throw Error("Game does not exist.");
    const g = s.data(); if (g.game_status !== "setup") throw Error("Player count can only change during setup.");
    const players = { "0": g.players?.["0"] ?? player("game") };
    for (let i = 1; i <= n; i++) players[String(i)] = g.players?.[String(i)] ?? player();
    tx.update(gameRef, { player_count: n, players, "fear.per_card": n * 4 });
  });
}

async function saveSetupConfig() {
  if (!currentGame || currentGame.game_status !== "setup") return;
  const players = structuredClone(currentGame.players);
  for (let i = 1; i <= currentGame.player_count; i++) {
    const row = $(`player-${i}`); if (!row) continue;
    const p = players[String(i)] ?? player();
    p.spirit_id = row.querySelector("select")?.value || null;
    p.permissions = {
      can_change_fear: !!row.querySelector('[data-permission="fear"]')?.checked,
      can_advance_phase: !!row.querySelector('[data-permission="advance"]')?.checked
    };
    players[String(i)] = p;
  }
  const advId = $("adversarySelect").value || null;
  const adversary = ADVERSARIES.find(a => a.id === advId) || ADVERSARIES[0];
  const level = adversary.id ? Number($("adversaryLevel").value) : 0;
  await updateDoc(gameRef, {
    players,
    elements_tracker_enabled: $("elementsTracker").value === "true",
    adversary: { id: adversary.id, level }
  });
}

export async function startGame() {
  await runTransaction(db, async tx => {
    const s = await tx.get(gameRef); if (!s.exists()) throw Error("Game does not exist.");
    const g = s.data(); if (g.game_status !== "setup") throw Error("Game must be in setup state.");
    const now = Date.now();
    tx.update(gameRef, { game_status: "active", turn: 1, phase_index: 0, phase_start_time: now, "timing.game_started_at": now, "timing.game_finished_at": null });
  });
}

function duration(start, end) { return Math.max(0, Math.floor((end - start) / 1000)); }

function applyPhaseTime(g, now, players) {
  const phase = PHASES[g.phase_index], start = Number(g.phase_start_time), seconds = duration(start, now);
  for (let i = 1; i <= g.player_count; i++) {
    const p = players[String(i)]; if (!p) continue;
    const full = phase === "invader" || phase === "time_passes" || p.ready !== true;
    if (full) { p.time_tracking.total_seconds += seconds; p.time_tracking.phase_times[phase] += seconds; }
    p.ready = false;
  }
  players["0"].time_tracking.total_seconds += seconds;
  return { phase, seconds };
}

export async function advancePhase() {
  await runTransaction(db, async tx => {
    const s = await tx.get(gameRef); if (!s.exists()) throw Error("Game does not exist.");
    const g = s.data(); if (g.game_status !== "active") throw Error("Game is not active.");
    const now = Date.now(), players = structuredClone(g.players);
    const { phase, seconds } = applyPhaseTime(g, now, players);
    const last = g.phase_index === PHASES.length - 1;
    const next = last ? 0 : g.phase_index + 1;
    if (next === 4) for (let i = 1; i <= g.player_count; i++) if (players[String(i)]) players[String(i)].elements = emptyElements();
    tx.update(gameRef, { phase_index: next, turn: last ? g.turn + 1 : g.turn, phase_start_time: now, players, phase_history: arrayUnion({ turn: g.turn, phase, duration_seconds: seconds, recorded_at: now }) });
  });
}

export async function finishGame() {
  await runTransaction(db, async tx => {
    const s = await tx.get(gameRef); if (!s.exists()) throw Error("Game does not exist.");
    const g = s.data(); if (g.game_status !== "active") throw Error("Game is not active.");
    const now = Date.now(), players = structuredClone(g.players);
    const { phase, seconds } = applyPhaseTime(g, now, players);
    tx.update(gameRef, { game_status: "finished", "timing.game_finished_at": now, players, phase_history: arrayUnion({ turn: g.turn, phase, duration_seconds: seconds, recorded_at: now, ended_with_game: true }) });
  });
}

export async function resetGame(playerCount = 1) { await setDoc(gameRef, createInitialGame(playerCount)); }

function t(key) { return I18N[lang]?.[key] ?? I18N.pl[key] ?? key; }
function formatSeconds(total) { total = Math.max(0, Number(total) || 0); const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60; return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m ${String(s).padStart(2, "0")}s`; }
function formatDate(ms) { return ms ? new Date(Number(ms)).toLocaleString(lang === "pl" ? "pl-PL" : "en-US", { dateStyle: "short", timeStyle: "short" }) : "—"; }
function spiritName(id) { const s = SPIRITS.find(x => x.id === id); return s ? s[lang] : t("setup.players.noSpirit"); }
function phaseName(id) { return t(`phase.${id}`); }

function applyTranslations() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  $("languageToggle").textContent = lang === "pl" ? "EN" : "PL";
  $("startGameButton").textContent = t("button.start"); $("advancePhaseButton").textContent = t("button.advance"); $("finishGameButton").textContent = t("button.finish"); $("resetGameButton").textContent = t("button.reset");
  if (currentGame) render(currentGame);
}

function renderStatus(g) {
  const badge = $("statusBadge"); badge.textContent = t(`status.${g.game_status}`); badge.className = `status-pill status-${g.game_status}`;
  $("startGameButton").disabled = g.game_status !== "setup";
  $("advancePhaseButton").disabled = g.game_status !== "active";
  $("finishGameButton").disabled = g.game_status !== "active";
  const editable = g.game_status === "setup";
  $("playerCount").disabled = !editable;
  $("elementsTracker").disabled = !editable;
  $("adversarySelect").disabled = !editable;
  $("adversaryLevel").disabled = !editable || !g.adversary?.id;
  
  $("phaseTitle").textContent = g.game_status === "setup" ? t("phase.setup") : phaseName(PHASES[g.phase_index]);
  $("phaseSubtitle").textContent = t(g.game_status === "setup" ? "setup.ready" : g.game_status === "active" ? "setup.active" : "setup.finished");
}

function renderPlayers(g) {
  const editable = g.game_status === "setup";
  $("playerCount").innerHTML = Array.from({ length: 8 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("");
  $("playerCount").value = String(g.player_count);
  $("playersContainer").innerHTML = Array.from({ length: g.player_count }, (_, idx) => {
    const i = idx + 1, p = g.players?.[String(i)] ?? player(), options = [`<option value="">${t("setup.players.noSpirit")}</option>`, ...SPIRITS.map(s => `<option value="${s.id}" ${s.id === p.spirit_id ? "selected" : ""}>${s[lang]}</option>`)].join("");
    return `<div class="player-row" id="player-${i}"><div class="player-number">${i}</div><label class="field"><select ${editable ? "" : "disabled"}>${options}</select></label><label class="permission"><input type="checkbox" data-permission="fear" ${p.permissions?.can_change_fear ? "checked" : ""} ${editable ? "" : "disabled"}>${t("permission.fear")}</label><label class="permission"><input type="checkbox" data-permission="advance" ${p.permissions?.can_advance_phase ? "checked" : ""} ${editable ? "" : "disabled"}>${t("permission.advance")}</label></div>`;
  }).join("");
}

function renderAdversary(g) {
  $("adversarySelect").innerHTML = ADVERSARIES.map(a => `<option value="${a.id ?? ""}">${a[lang]}</option>`).join("");
  $("adversarySelect").value = g.adversary?.id ?? "";
  
  $("adversaryLevel").innerHTML = Array.from({ length: 7 }, (_, i) => `<option value="${i}">${i}</option>`).join("");
  $("adversaryLevel").value = String(g.adversary?.level ?? 0);
}

function renderFear(g) {
  const total = Number(g.fear?.total_generated || 0), per = Number(g.fear?.per_card || 0), cards = per ? Math.floor(total / per) : 0, pool = per ? total % per : 0;
  $("fearTotal").textContent = String(total); $("fearCards").textContent = String(cards); $("fearPool").textContent = `${pool} / ${per}`;
}

function renderStats(g) {
  $("currentPhaseLabel").textContent = g.game_status === "setup" ? "—" : phaseName(PHASES[g.phase_index]); $("phaseStartedAt").textContent = g.phase_start_time ? formatDate(g.phase_start_time) : "—";
  const headers = [t("stats.total"), t("stats.spirit"), t("stats.fast"), t("stats.invader"), t("stats.slow"), t("stats.time_passes")];
  const rows = [];
  rows.push(`<tr><th>0 · ${t("stats.game")}</th><td>${formatSeconds(g.players?.["0"]?.time_tracking?.total_seconds)}</td><td colspan="5">—</td></tr>`);
  for (let i = 1; i <= g.player_count; i++) {
    const p = g.players?.[String(i)] ?? player(), times = p.time_tracking?.phase_times || emptyPhaseTimes();
    rows.push(`<tr><th>${i} · ${spiritName(p.spirit_id)}</th><td>${formatSeconds(p.time_tracking?.total_seconds)}</td>${PHASES.map(ph => `<td>${formatSeconds(times[ph])}</td>`).join("")}</tr>`);
  }
  $("playerStats").innerHTML = `<table class="stats-table"><thead><tr><th>Player</th>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table>`;
}

function renderHistory(g) {
  const history = g.phase_history || [];
  if (!history.length) {
    $("phaseHistory").innerHTML = `<p class="muted tiny">${t("history.empty")}</p>`;
    return;
  }
  $("phaseHistory").innerHTML = history.slice().reverse().map(item => `
    <div class="history-item">
      <div><strong>${t("history.turn")} ${item.turn}</strong></div>
      <div>${phaseName(item.phase)} <small>(${formatDate(item.recorded_at)})</small></div>
      <div class="history-duration">${formatSeconds(item.duration_seconds)}</div>
    </div>
  `).join("");
}

function render(g) {
  currentGame = g;
  renderStatus(g);
  renderPlayers(g);
  renderAdversary(g);
  renderFear(g);
  renderStats(g);
  renderHistory(g);
  $("elementsTracker").value = String(!!g.elements_tracker_enabled);
}

function showConfirmDialog(titleKey, textKey) {
  return new Promise((resolve) => {
    const dialog = $("confirmDialog");
    $("confirmTitle").textContent = t(titleKey);
    $("confirmText").textContent = t(textKey);
    
    const handleClose = () => {
      dialog.removeEventListener("close", handleClose);
      resolve(dialog.returnValue === "confirm");
    };
    
    dialog.addEventListener("close", handleClose);
    dialog.showModal();
  });
}

function initEvents() {
  $("languageToggle").addEventListener("click", () => {
    lang = lang === "pl" ? "en" : "pl";
    localStorage.setItem("sic_language", lang);
    applyTranslations();
  });

  $("playerCount").addEventListener("change", async (e) => {
    const val = Number(e.target.value);
    await setPlayerCount(val);
  });

  $("playersContainer").addEventListener("change", saveSetupConfig);
  $("adversarySelect").addEventListener("change", saveSetupConfig);
  $("adversaryLevel").addEventListener("change", saveSetupConfig);
  $("elementsTracker").addEventListener("change", saveSetupConfig);

  $("startGameButton").addEventListener("click", async () => {
    if (await showConfirmDialog("button.start", "confirm.start")) {
      await startGame();
    }
  });

  $("advancePhaseButton").addEventListener("click", async () => {
    await advancePhase();
  });

  $("finishGameButton").addEventListener("click", async () => {
    if (await showConfirmDialog("button.finish", "confirm.finish")) {
      await finishGame();
    }
  });

  $("resetGameButton").addEventListener("click", async () => {
    if (await showConfirmDialog("reset.title", "confirm.reset")) {
      await resetGame(currentGame?.player_count || 1);
    }
  });
}

ensureGameExists().then(() => {
  onSnapshot(gameRef, (snapshot) => {
    if (snapshot.exists()) {
      render(snapshot.data());
      $("connectionBadge").textContent = t("status.connected");
      $("connectionBadge").className = "badge badge-success";
    }
  }, (err) => {
    console.error(err);
    $("connectionBadge").textContent = t("status.error");
    $("connectionBadge").className = "badge badge-danger";
  });
});

initEvents();
applyTranslations();
