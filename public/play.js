import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, onSnapshot, runTransaction } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAghGIes3l1tri3LDifzjo0WFqRGyrG4nE",
  authDomain: "spirit-island-fb793.firebaseapp.com",
  projectId: "spirit-island-fb793",
  storageBucket: "spirit-island-fb793.firebasestorage.app",
  messagingSenderId: "482069817782",
  appId: "1:482069817782:web:1123c809e5dc50d375f917"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gameRef = doc(db, "games", "current");
const PHASES = ["spirit", "fast", "invader", "slow", "time_passes"];
const ELEMENTS = ["sun", "moon", "fire", "air", "water", "earth", "plant", "animal"];

const SPIRITS = [
  {
    id: "river_surges_in_sunlight",
    pl: "Rzeka Sunie w Blasku Słońca",
    en: "River Surges in Sunlight",
    image: "/images/spirits/132px-River_Surges_in_Sunlight.png"
  },
  {
    id: "lightnings_swift_strike",
    pl: "Szybki Grom",
    en: "Lightning's Swift Strike",
    image: "/images/spirits/132px-Lightning's_Swift_Strike.png"
  },
  {
    id: "bringer_of_dreams_and_nightmares",
    pl: "Siewca Snów i Koszmarów",
    en: "Bringer of Dreams and Nightmares",
    image: "/images/spirits/110px-Bringer_of_Dreams_and_Nightmares.png"
  },
  {
    id: "vital_strength_of_the_earth",
    pl: "Żywotna Siła Ziemi",
    en: "Vital Strength of the Earth",
    image: "/images/spirits/132px-Vital_Strength_of_the_Earth.png"
  },
  {
    id: "thunderspeaker",
    pl: "Głosiciel Gromu",
    en: "Thunderspeaker",
    image: "/images/spirits/128px-Thunderspeaker.png"
  },
  {
    id: "shadows_flicker_like_flame",
    pl: "Cienie Migoczące jak Płomień",
    en: "Shadows Flicker Like Flame",
    image: "/images/spirits/132px-Shadows_Flicker_Like_Flame.png"
  },
  {
    id: "ocean_hungry_grasp",
    pl: "Ocean Głodnego Uścisku",
    en: "Ocean's Hungry Grasp",
    image: "/images/spirits/131px-Ocean's_Hungry_Grasp.png"
  },
  {
    id: "a_spreading_heart_of_green",
    pl: "Rozrastające się Zielone Serce",
    en: "A Spread of Rampant Green",
    image: "/images/spirits/132px-A_Spread_of_Rampant_Green.png"
  },

  {
    id: "keeper_of_the_forbidden_wilds",
    pl: "Strażnik Zakazanej Dziczy",
    en: "Keeper of the Forbidden Wilds",
    image: "/images/spirits/132px-Keeper_of_the_Forbidden_Wilds.png"
  },
  {
    id: "sharp_fangs_behind_the_leaves",
    pl: "Ostre Kły Za Liśćmi",
    en: "Sharp Fangs Behind the Leaves",
    image: "/images/spirits/132px-Sharp_Fangs_Behind_the_Leaves.png"
  },

  {
    id: "heart_of_the_wildfire",
    pl: "Serce Pożogi",
    en: "Heart of the Wildfire",
    image: "/images/spirits/132px-Heart_of_the_Wildfire.png"
  },
  {
    id: "serpent_slumbering_beneath_the_island",
    pl: "Wąż Śpiący Pod Wyspą",
    en: "Serpent Slumbering Beneath the Island",
    image: "/images/spirits/132px-Serpent_Slumbering_Beneath_the_Island.png"
  },
  {
    id: "downpour_drenches_the_world",
    pl: "Ulewa Zalewająca Świat",
    en: "Downpour Drenches the World",
    image: "/images/spirits/132px-Downpour_Drenches_the_World.png"
  },
  {
    id: "finder_of_paths_unseen",
    pl: "Odkrywca Niewidocznych Ścieżek",
    en: "Finder of Paths Unseen",
    image: "/images/spirits/132px-Finder_of_Paths_Unseen.png"
  },

  {
    id: "devouring_teeth_lurk_underfoot",
    pl: "Pożerające Zęby Czają się Pod Stopami",
    en: "Devouring Teeth Lurk Underfoot",
    image: "/images/spirits/117px-Devouring_Teeth_Lurk_Underfoot.png"
  },
  {
    id: "eyes_watch_from_the_trees",
    pl: "Oczy Obserwujące z Drzew",
    en: "Eyes Watch from the Trees",
    image: "/images/spirits/117px-Eyes_Watch_from_the_Trees.png"
  },
  {
    id: "fathomless_mud_of_the_swamp",
    pl: "Bezdenne Błoto Bagna",
    en: "Fathomless Mud of the Swamp",
    image: "/images/spirits/117px-Fathomless_Mud_of_the_Swamp.png"
  },
  {
    id: "rising_heat_of_stone_and_sand",
    pl: "Wzrastający Żar Kamienia i Piasku",
    en: "Rising Heat of Stone and Sand",
    image: "/images/spirits/136px-Rising_Heat_of_Stone_and_Sand.png"
  },
  {
    id: "sun_bright_whirlwind",
    pl: "Słoneczny Wicher",
    en: "Sun-Bright Whirlwind",
    image: "/images/spirits/136px-Sun-Bright_Whirlwind.png"
  },

  {
    id: "grinning_trickster_stirs_up_trouble",
    pl: "Uśmiechnięty Psotnik Wywołuje Kłopoty",
    en: "Grinning Trickster Stirs Up Trouble",
    image: "/images/spirits/132px-Grinning_Trickster_Stirs_Up_Trouble.png"
  },
  {
    id: "lure_of_the_deep_wilderness",
    pl: "Wabik Głębokiej Dziczy",
    en: "Lure of the Deep Wilderness",
    image: "/images/spirits/132px-Lure_of_the_Deep_Wilderness.png"
  },
  {
    id: "many_minds_move_as_one",
    pl: "Wiele Umysłów Porusza się jak Jeden",
    en: "Many Minds Move as One",
    image: "/images/spirits/132px-Many_Minds_Move_as_One.png"
  },
  {
    id: "shifting_memory_of_ages",
    pl: "Zmienna Pamięć Wieków",
    en: "Shifting Memory of Ages",
    image: "/images/spirits/132px-Shifting_Memory_of_Ages.png"
  },
  {
    id: "stones_unyielding_defiance",
    pl: "Niezłomny Opór Kamienia",
    en: "Stone's Unyielding Defiance",
    image: "/images/spirits/132px-Stone's_Unyielding_Defiance.png"
  },
  {
    id: "volcano_looming_high",
    pl: "Wyniosły Wulkan",
    en: "Volcano Looming High",
    image: "/images/spirits/132px-Volcano_Looming_High.png"
  },
  {
    id: "shroud_of_silent_mist",
    pl: "Całun Cichej Mgły",
    en: "Shroud of Silent Mist",
    image: "/images/spirits/132px-Shroud_of_Silent_Mist.png"
  },
  {
    id: "vengeance_as_a_burning_plague",
    pl: "Zemsta jako Płonąca Plaga",
    en: "Vengeance as a Burning Plague",
    image: "/images/spirits/132px-Vengeance_as_a_Burning_Plague.png"
  },
  {
    id: "fractured_days_split_the_sky",
    pl: "Rozbite Dni Rozdzierają Niebo",
    en: "Fractured Days Split the Sky",
    image: "/images/spirits/132px-Fractured_Days_Split_the_Sky.png"
  },
  {
    id: "starlight_seeks_its_form",
    pl: "Światło Gwiazd Szuka Swojej Formy",
    en: "Starlight Seeks Its Form",
    image: "/images/spirits/132px-Starlight_Seeks_Its_Form.png"
  },

  {
    id: "ember_eyed_behemoth",
    pl: "Behemot o Oczach Żaru",
    en: "Ember-Eyed Behemoth",
    image: "/images/spirits/132px-Ember-Eyed_Behemoth.png"
  },
  {
    id: "hearth_vigil",
    pl: "Czuwanie Domowego Ogniska",
    en: "Hearth-Vigil",
    image: "/images/spirits/132px-Hearth-Vigil.png"
  },
  {
    id: "towering_roots_of_the_jungle",
    pl: "Strzeliste Korzenie Dżungli",
    en: "Towering Roots of the Jungle",
    image: "/images/spirits/132px-Towering_Roots_of_the_Jungle.png"
  },
  {
    id: "breath_of_darkness_down_your_spine",
    pl: "Oddech Ciemności Wzdłuż Kręgosłupa",
    en: "Breath of Darkness Down Your Spine",
    image: "/images/spirits/132px-Breath_of_Darkness_Down_Your_Spine.png"
  },
  {
    id: "relentless_gaze_of_the_sun",
    pl: "Nieustępliwe Spojrzenie Słońca",
    en: "Relentless Gaze of the Sun",
    image: "/images/spirits/132px-Relentless_Gaze_of_the_Sun.png"
  },
  {
    id: "wandering_voice_keens_delirium",
    pl: "Błądzący Głos Wyje Obłęd",
    en: "Wandering Voice Keens Delirium",
    image: "/images/spirits/127px-Wandering_Voice_Keens_Delirium.png"
  },
  {
    id: "wounded_waters_bleeding",
    pl: "Zranione Wody Krwawią",
    en: "Wounded Waters Bleeding",
    image: "/images/spirits/132px-Wounded_Waters_Bleeding.png"
  },
  {
    id: "dances_up_earthquakes",
    pl: "Tańczy na Trzęsieniach Ziemi",
    en: "Dances Up Earthquakes",
    image: "/images/spirits/132px-Dances_Up_Earthquakes.png"
  }
];

const ELEMENT_ICONS = {
  sun: "./images/elements/sun.png",
  moon: "./images/elements/moon.png",
  fire: "./images/elements/fire.png",
  air: "./images/elements/air.png",
  water: "./images/elements/water.png",
  earth: "./images/elements/earth.png",
  plant: "./images/elements/plant.png",
  animal: "./images/elements/animal.png"
};

const PHASE_STEPS = {
  spirit: { pl: ["Wzrost", "Zyskaj energię", "Zagraj i opłać karty Mocy"], en: ["Growth", "Gain Energy", "Play and Pay for Power Cards"] },
  fast: { pl: ["Szybkie Moce z kart", "Szybkie Zdolności Wrodzone"], en: ["Fast Power Cards", "Fast Innate Powers"] },
  invader: { pl: ["Efekt Skażonej Wyspy", "Efekty Strachu", "Ruchy Najeźdźców: Najechanie, Budowa, Eksploracja", "Przesuń karty Najeźdźców"], en: ["Blighted Island Effect", "Fear Effects", "Invader Actions: Ravage, Build, Explore", "Advance Invader Cards"] },
  slow: { pl: ["Wolne Moce z kart", "Wolne Zdolności Wrodzone"], en: ["Slow Power Cards", "Slow Innate Powers"] },
  time_passes: { pl: ["Odrzuć zagrane karty Mocy", "Odnów zużyte karty", "Przesuń się do następnej tury"], en: ["Discard played Power Cards", "Recover spent cards", "Move to the next turn"] }
};

const ADVERSARIES = [{ id: null, pl: "Brak", en: "None", cardText: "" },
                     { id: "brandenburg_prussia", pl: "Brandenburgia-Prusy", en: "Brandenburg-Prussia" },
                     { id: "england", pl: "Anglia", en: "England" }, { id: "sweden", pl: "Szwecja", en: "Sweden" },
                     { id: "france", pl: "Francja", en: "France (Plantation Colony)" },
                     { id: "habsburg_monarchy", pl: "Monarchia Habsburgów", en: "Habsburg Monarchy (Livestock Colony)" },
                     { id: "russia", pl: "Rosja", en: "Russia" }, { id: "scotland", pl: "Szkocja", en: "Scotland" },
                     { id: "habsburg_mining_expedition", pl: "Habsburska Ekspedycja Górnicza", en: "Habsburg Mining Expedition" }
                    ];

const I18N = {
  pl: {
    "play.choosePlayer": "Wybierz gracza",
    "play.chooseSpirit": "Wybierz ducha",
    "play.changePlayer": "Zmień gracza",
    "play.currentPhase": "AKTUALNA FAZA",
    "play.advance": "ADVANCE PHASE",
    "play.ready": "GOTOWY",
    "play.readyState": "GOTOWY",
    "play.notReady": "NIE GOTOWY",
    "play.fear.cards": "kart zdobytych",
    "phase.spirit": "Faza Ducha",
    "phase.fast": "Szybkie Moce",
    "phase.invader": "Faza Najeźdźcy",
    "phase.slow": "Wolne Moce",
    "phase.time_passes": "Czas Płynie",
    "status.setup": "SETUP",
    "status.active": "ACTIVE",
    "status.finished": "FINISHED",
    "message.error": "Wystąpił błąd."
    "play.elements.reset":"RESETUJ ŻYWIOŁY"
  },
  en: {
    "play.choosePlayer": "Choose player",
    "play.chooseSpirit": "Choose spirit",
    "play.changePlayer": "Change player",
    "play.currentPhase": "CURRENT PHASE",
    "play.advance": "ADVANCE PHASE",
    "play.ready": "READY",
    "play.readyState": "READY",
    "play.notReady": "NOT READY",
    "play.fear.cards": "cards earned",
    "phase.spirit": "Spirit Phase",
    "phase.fast": "Fast Powers",
    "phase.invader": "Invader Phase",
    "phase.slow": "Slow Powers",
    "phase.time_passes": "Time Passes",
    "status.setup": "SETUP",
    "status.active": "ACTIVE",
    "status.finished": "FINISHED",
    "message.error": "Something went wrong."
    "play.elements.reset":"RESET ELEMENTS"
  }
};

let lang = localStorage.getItem("sic_language") || "pl";
let currentGame = null;
let selectedPlayer = null;
let selectedSpirit = null;
let unsubscribe = null;

const $ = id => document.getElementById(id);
const emptyElements = () => ({ sun: 0, moon: 0, fire: 0, air: 0, water: 0, earth: 0, plant: 0, animal: 0 });
const getSpiritObj = id => SPIRITS.find(x => x.id === id);
const spiritName = id => { const s = getSpiritObj(id); if (!s) return "—";return lang === "pl" ? s.pl : s.en;};
const t = k => I18N[lang]?.[k] ?? I18N.pl[k] ?? k;

function setConnection(text, ok = true) {
  $("connectionBadge").textContent = text;
  $("connectionBadge").className = `badge${ok ? "" : " alert-error"}`;
}

function error(message) {
  const el = $("messageBox");
  el.textContent = message;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 5000);
}

function formatAdversary(g) {
  const adv = g.adversary;
  if (!adv || !adv.id || adv.id === "none") return lang === "pl" ? "Brak" : "None";
  const name = adv.id === "prussia" ? (lang === "pl" ? "Królestwo Prus" : "Kingdom of Prussia") : adv.id;
  const level = adv.level !== undefined ? ` / Poziom ${adv.level}` : "";
  return `${name}${level}`;
}

function phaseName(id) {
  return t(`phase.${id}`);
}

function applyTranslations() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  $("languageToggle").textContent = lang === "pl" ? "EN" : "PL";
  if (currentGame) render(currentGame);
}

function showPlayerPicker() {
  $("playerPicker").classList.remove("hidden");
  $("spiritPicker").classList.add("hidden");
  $("gameView").classList.add("hidden");
}

function showSpiritPicker() {
  $("playerPicker").classList.add("hidden");
  $("spiritPicker").classList.remove("hidden");
  $("gameView").classList.add("hidden");
}

function showGame() {
  $("playerPicker").classList.add("hidden");
  $("spiritPicker").classList.add("hidden");
  $("gameView").classList.remove("hidden");
}

/* 1. Wybór Gracza z przypisanym duchem mniejszą czcionką */
function renderPlayerButtons(g) {
  const totalPlayers = g.player_count || 0;
  let html = "";
  for (let i = 1; i <= totalPlayers; i++) {
    const p = g.players?.[String(i)];
    const assignedSpiritId = p?.spirit_id;
    const assignedSpiritName = assignedSpiritId ? spiritName(assignedSpiritId) : "";
    
    html += `
      <button class="player-button" data-player="${i}" type="button">
        <span class="player-number">${i}</span>
        ${assignedSpiritName ? `<span class="player-assigned-spirit">${assignedSpiritName}</span>` : ""}
      </button>
    `;
  }
  $("playerButtons").innerHTML = html;
}

/* 2. Wybór ducha w nowym formacie z grafiką i dwujęzyczną nazwą */
function renderSpiritPicker(g) {
  const selected = g.players?.[String(selectedPlayer)]?.spirit_id || null;
  $("spiritGrid").innerHTML = SPIRITS.map(s => {
    const isSelected = s.id === selected;
    const name = lang === "pl" ? s.pl : s.en;
    return `
      <button class="spirit-button ${isSelected ? "selected" : ""}" data-spirit="${s.id}" type="button">
        ${s.img ? `<img src="${s.img}" alt="${s.pl}" class="spirit-img" onerror="this.style.display='none'">` : ""}
        <div class="spirit-names">
          <strong>${s.pl}</strong>
          <small>${s.en}</small>
        </div>
      </button>
    `;
  }).join("");
}

function renderPhaseSteps(phase) {
  const steps = PHASE_STEPS[phase]?.[lang] || [];
  $("phaseSteps").innerHTML = steps.map((x, i) => `
    <div class="phase-step">
      <span class="num">${i + 1}</span>
      <div><strong>${x}</strong></div>
    </div>
  `).join("");
}

/* 3. Tracker Żywiołów w formacie: < liczba ikonka > */
function renderElements(g) {
  const enabled = !!g.elements_tracker_enabled;
  $("elementsCard").classList.toggle("hidden", !enabled);
  if (!enabled) return;

  const elements = g.players?.[String(selectedPlayer)]?.elements || emptyElements();
  $("elementsGrid").innerHTML = ELEMENTS.map(key => `
    <div class="element-compact">
      <button data-element="${key}" data-delta="-1" type="button" aria-label="-1">&lt;</button>
      <div class="element-display">
        <span>${Number(elements[key] || 0)}</span>
        <img src="${ELEMENT_ICONS[key]}" alt="${key}" class="element-icon" onerror="this.style.display='none'">
      </div>
      <button data-element="${key}" data-delta="1" type="button" aria-label="+1">&gt;</button>
    </div>
  `).join("");
}

/* 4. Box Strachu z paskiem postępu x/y i ukrywaniem elementów bez uprawnień */
function renderFear(g) {
  const can = !!g.players?.[String(selectedPlayer)]?.permissions?.can_change_fear;
  const total = Number(g.fear?.total_generated || 0);
  const per = Number(g.fear?.per_card || 0);
  const cards = per ? Math.floor(total / per) : 0;
  const pool = per ? total % per : 0;

  $("fearCards").textContent = `${cards} ${t("play.fear.cards")}`;

  // Wypełnienie paska postępu
  const fearBarFill = $("fearProgressBar");
  const fearBarText = $("fearProgressText");
  const percentage = per > 0 ? Math.min(100, (pool / per) * 100) : 0;
  fearBarFill.style.width = `${percentage}%`;
  fearBarText.textContent = `${pool}/${per}`;

  // Przyciski widoczne wyłącznie dla osób z uprawnieniami
  const fearControls = $("fearControls");
  if (!can) {
    fearControls.classList.add("hidden");
    fearControls.innerHTML = "";
  } else {
    fearControls.classList.remove("hidden");
    fearControls.innerHTML = [-1, +1, +3, +5].map(n => `
      <button class="fear-button" data-fear="${n}" type="button" ${g.game_status === "active" ? "" : "disabled"}>
        ${n}
      </button>
    `).join("");
  }
}

/* Renderowanie adwersarza i opcjonalnej grafiki planszy */
function renderAdversary(g) {
  $("adversaryTitle").textContent = formatAdversary(g);
  const boardImgContainer = $("adversaryBoard");
  if (g.adversary?.board_img) {
    boardImgContainer.innerHTML = `<img src="${g.adversary.board_img}" alt="Adversary Board">`;
    boardImgContainer.classList.remove("hidden");
  } else {
    boardImgContainer.innerHTML = "";
    boardImgContainer.classList.add("hidden");
  }
}

/* Renderowanie statusu wszystkich graczy */
function renderPlayersStatus(g) {
  const listContainer = $("playersStatusList");
  const totalPlayers = g.player_count || 0;
  let html = "";

  for (let i = 1; i <= totalPlayers; i++) {
    const p = g.players?.[String(i)] || {};
    const isMe = i === selectedPlayer;
    const isReady = !!p.ready;
    const spiritText = p.spirit_id ? spiritName(p.spirit_id) : (lang === "pl" ? "Brak ducha" : "No spirit");

    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border);">
        <div>
          <strong>Gracz ${i} ${isMe ? "(Ty)" : ""}</strong>
          <div style="font-size: 12px; color: var(--muted);">${spiritText}</div>
        </div>
        <span class="ready-badge ${isReady ? "ready-yes" : "ready-no"}">
          ${isReady ? t("play.readyState") : t("play.notReady")}
        </span>
      </div>
    `;
  }

  listContainer.innerHTML = html;
}

function render(g) {
  if (!selectedPlayer) {
    showPlayerPicker();
    renderPlayerButtons(g);
    return;
  }
  if (!selectedSpirit) {
    showSpiritPicker();
    renderSpiritPicker(g);
    return;
  }
  showGame();

  const p = g.players?.[String(selectedPlayer)] || {};
  const phase = PHASES[g.phase_index] || "spirit";

  // Nazwa ducha
  $("spiritName").textContent = spiritName(selectedSpirit);

  // Box adwersarza
  renderAdversary(g);

  // Faza
  $("phaseTitle").textContent = phaseName(phase);
  renderPhaseSteps(phase);

  const ready = !!p.ready;
  const readyEligible = phase !== "invader" && phase !== "time_passes";
  $("readyState").textContent = ready ? t("play.readyState") : t("play.notReady");
  $("readyState").className = `ready-badge ${ready ? "ready-yes" : "ready-no"}`;
  $("readyButton").textContent = ready ? t("play.readyState") : t("play.ready");
  $("readyButton").disabled = g.game_status !== "active" || !readyEligible || ready;

  // Przycisk "Advance Phase" – tylko dla uprawnionych
  const canAdvance = !!p.permissions?.can_advance_phase;
  const advanceBtn = $("advanceButton");
  if (canAdvance) {
    advanceBtn.classList.remove("hidden");
    advanceBtn.disabled = g.game_status !== "active";
  } else {
    advanceBtn.classList.add("hidden");
  }

  renderFear(g);
  renderElements(g);
}

/* Akcje Firebase */
async function chooseSpirit(id) {
  if (!selectedPlayer) return;
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(gameRef);
      if (!s.exists()) throw Error("Game does not exist.");
      const g = s.data();
      if (g.game_status !== "setup") throw Error("Spirit can only be selected during setup.");
      const players = structuredClone(g.players);
      players[String(selectedPlayer)].spirit_id = id;
      tx.update(gameRef, { players });
    });
    selectedSpirit = id;
    render(currentGame);
  } catch (e) {
    error(e.message);
  }
}

async function setReady() {
  if (!selectedPlayer) return;
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(gameRef);
      if (!s.exists()) throw Error("Game does not exist.");
      const g = s.data();
      if (g.game_status !== "active") throw Error("Game is not active.");
      const phase = PHASES[g.phase_index];
      if (phase === "invader" || phase === "time_passes") throw Error("READY is not used in this phase.");
      const players = structuredClone(g.players);
      const p = players[String(selectedPlayer)];
      if (!p) throw Error("Player not found.");
      if (p.ready === true) return;
      const now = Date.now();
      const start = Number(g.phase_start_time);
      const seconds = Math.max(0, Math.floor((now - start) / 1000));
      p.ready = true;
      p.ready_at = now;
      p.time_tracking.total_seconds += seconds;
      p.time_tracking.phase_times[phase] += seconds;
      tx.update(gameRef, { players });
    });
  } catch (e) {
    error(e.message);
  }
}

async function advancePhase() {
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(gameRef);
      if (!s.exists()) throw Error("Game does not exist.");
      const g = s.data();
      if (g.game_status !== "active") throw Error("Game is not active.");
      const me = g.players?.[String(selectedPlayer)];
      if (!me?.permissions?.can_advance_phase) throw Error("You cannot advance the phase.");
      
      const phase = PHASES[g.phase_index];
      const now = Date.now();
      const start = Number(g.phase_start_time);
      const seconds = Math.max(0, Math.floor((now - start) / 1000));
      const players = structuredClone(g.players);

      for (let i = 1; i <= g.player_count; i++) {
        const p = players[String(i)];
        if (!p) continue;
        const full = phase === "invader" || phase === "time_passes" || p.ready !== true;
        if (full) {
          p.time_tracking.total_seconds += seconds;
          p.time_tracking.phase_times[phase] += seconds;
        }
        p.ready = false;
        delete p.ready_at;
      }

      const last = g.phase_index === PHASES.length - 1;
      const next = last ? 0 : g.phase_index + 1;

      if (next === 4) {
        for (let i = 1; i <= g.player_count; i++) {
          if (players[String(i)]) players[String(i)].elements = emptyElements();
        }
      }

      if (players["0"]) {
        players["0"].time_tracking.total_seconds += seconds;
      }

      const history = [...(g.phase_history || []), { turn: g.turn, phase, duration_seconds: seconds, recorded_at: now }];
      tx.update(gameRef, {
        phase_index: next,
        turn: last ? g.turn + 1 : g.turn,
        phase_start_time: now,
        players,
        phase_history: history
      });
    });
  } catch (e) {
    error(e.message);
  }
}

async function changeFear(amount) {
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(gameRef);
      if (!s.exists()) throw Error("Game does not exist.");
      const g = s.data();
      if (g.game_status !== "active") throw Error("Game is not active.");
      const p = g.players?.[String(selectedPlayer)];
      if (!p?.permissions?.can_change_fear) throw Error("You cannot change fear.");
      const log = [...(g.fear?.log || []), { player: selectedPlayer, amount, phase_index: g.phase_index, turn: g.turn, timestamp: Date.now() }];
      tx.update(gameRef, {
        "fear.total_generated": Number(g.fear?.total_generated || 0) + amount,
        "fear.log": log
      });
    });
  } catch (e) {
    error(e.message);
  }
}

async function changeElement(element, delta) {
  try {
    await runTransaction(db, async tx => {
      const s = await tx.get(gameRef);
      if (!s.exists()) throw Error("Game does not exist.");
      const g = s.data();
      if (g.game_status !== "active") throw Error("Game is not active.");
      const players = structuredClone(g.players);
      const p = players[String(selectedPlayer)];
      if (!p) throw Error("Player not found.");
      p.elements = p.elements || emptyElements();
      p.elements[element] = Math.max(0, Number(p.elements[element] || 0) + delta);
      tx.update(gameRef, { players });
    });
  } catch (e) {
    error(e.message);
  }
}

/* Event listenery */
$("languageToggle").addEventListener("click", () => {
  lang = lang === "pl" ? "en" : "pl";
  localStorage.setItem("sic_language", lang);
  applyTranslations();
});

$("playerButtons").addEventListener("click", e => {
  const btn = e.target.closest("[data-player]");
  if (!btn) return;
  selectedPlayer = Number(btn.dataset.player);
  selectedSpirit = currentGame?.players?.[String(selectedPlayer)]?.spirit_id || null;
  if (selectedSpirit) showGame();
  else showSpiritPicker();
  render(currentGame);
});

$("spiritGrid").addEventListener("click", e => {
  const btn = e.target.closest("[data-spirit]");
  if (btn) chooseSpirit(btn.dataset.spirit);
});

$("backToPlayers").addEventListener("click", () => {
  selectedPlayer = null;
  selectedSpirit = null;
  showPlayerPicker();
  render(currentGame);
});

$("readyButton").addEventListener("click", setReady);
$("advanceButton").addEventListener("click", advancePhase);

$("elementsGrid").addEventListener("click", e => {
  const b = e.target.closest("[data-element]");
  if (b) changeElement(b.dataset.element, Number(b.dataset.delta));
});

$("fearControls").addEventListener("click", e => {
  const b = e.target.closest("[data-fear]");
  if (b) changeFear(Number(b.dataset.fear));
});

async function boot() {
  applyTranslations();
  try {
    const snap = await getDoc(gameRef);
    if (!snap.exists()) throw Error("Game has not been initialized on /setup yet.");
    setConnection(lang === "pl" ? "Połączono" : "Connected");
    unsubscribe = onSnapshot(gameRef, s => {
      if (!s.exists()) return;
      currentGame = s.data();
      render(currentGame);
    }, e => {
      console.error(e);
      setConnection(t("message.error"), false);
      error(e.message);
    });
  } catch (e) {
    setConnection(t("message.error"), false);
    error(e.message);
  }
}

boot();
