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
{ id: "river_surges_in_sunlight", pl: "Rzeka Sunie w Blasku Słońca", en: "River Surges in Sunlight" },
{ id: "lightnings_swift_strike", pl: "Szybki Grom", en: "Lightning's Swift Strike" },
{ id: "bringer_of_dreams_and_nightmares", pl: "Siewca Snów i Koszmarów", en: "Bringer of Dreams and Nightmares" },
{ id: "vital_strength_of_the_earth", pl: "Żywotna Siła Ziemi", en: "Vital Strength of the Earth" },
{ id: "thunderspeaker", pl: "Głosiciel Gromu", en: "Thunderspeaker" },
{ id: "shadows_flicker_like_flame", pl: "Cienie Migoczące jak Płomień", en: "Shadows Flicker Like Flame" },
{ id: "ocean_hungry_grasp", pl: "Ocean Głodnego Uścisku", en: "Ocean's Hungry Grasp" },
{ id: "a_spreading_heart_of_green", pl: "Rozrastające się Zielone Serce", en: "A Spread of Rampant Green" },

{ id: "keeper_of_the_forbidden_wilds", pl: "Strażnik Zakazanej Dziczy", en: "Keeper of the Forbidden Wilds" },
{ id: "sharp_fangs_behind_the_leaves", pl: "Ostre Kły Za Liśćmi", en: "Sharp Fangs Behind the Leaves" },

{ id: "heart_of_the_wildfire", pl: "Serce Pożogi", en: "Heart of the Wildfire" },
{ id: "serpent_slumbering_beneath_the_island", pl: "Wąż Śpiący Pod Wyspą", en: "Serpent Slumbering Beneath the Island" },
{ id: "downpour_drenches_the_world", pl: "Ulewa Zalewająca Świat", en: "Downpour Drenches the World" },
{ id: "finder_of_paths_unseen", pl: "Odkrywca Niewidocznych Ścieżek", en: "Finder of Paths Unseen" },

{ id: "devouring_teeth_lurk_underfoot", pl: "Pożerające Zęby Czają się Pod Stopami", en: "Devouring Teeth Lurk Underfoot" },
{ id: "eyes_watch_from_the_trees", pl: "Oczy Obserwujące z Drzew", en: "Eyes Watch from the Trees" },
{ id: "fathomless_mud_of_the_swamp", pl: "Bezdenne Błoto Bagna", en: "Fathomless Mud of the Swamp" },
{ id: "rising_heat_of_stone_and_sand", pl: "Wzrastający Żar Kamienia i Piasku", en: "Rising Heat of Stone and Sand" },
{ id: "sun_bright_whirlwind", pl: "Słoneczny Wicher", en: "Sun-Bright Whirlwind" },

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

{ id: "ember_eyed_behemoth", pl: "Behemot o Oczach Żaru", en: "Ember-Eyed Behemoth" },
{ id: "hearth_vigil", pl: "Czuwanie Domowego Ogniska", en: "Hearth-Vigil" },
{ id: "towering_roots_of_the_jungle", pl: "Strzeliste Korzenie Dżungli", en: "Towering Roots of the Jungle" },
{ id: "breath_of_darkness_down_your_spine", pl: "Oddech Ciemności Wzdłuż Kręgosłupa", en: "Breath of Darkness Down Your Spine" },
{ id: "relentless_gaze_of_the_sun", pl: "Nieustępliwe Spojrzenie Słońca", en: "Relentless Gaze of the Sun" },
{ id: "wandering_voice_keens_delirium", pl: "Błądzący Głos Wyje Obłęd", en: "Wandering Voice Keens Delirium" },
{ id: "wounded_waters_bleeding", pl: "Zranione Wody Krwawią", en: "Wounded Waters Bleeding" },
{ id: "dances_up_earthquakes", pl: "Tańczy na Trzęsieniach Ziemi", en: "Dances Up Earthquakes" }
];

const ELEMENT_LABELS = {
  sun:{pl:"Słońce",en:"Sun"}, moon:{pl:"Księżyc",en:"Moon"}, fire:{pl:"Ogień",en:"Fire"}, air:{pl:"Powietrze",en:"Air"},
  water:{pl:"Woda",en:"Water"}, earth:{pl:"Ziemia",en:"Earth"}, plant:{pl:"Roślina",en:"Plant"}, animal:{pl:"Zwierzę",en:"Animal"}
};
const PHASE_STEPS = {
  spirit:{pl:["Wzrost","Zyskaj energię","Zagraj i opłać karty Mocy"],en:["Growth","Gain Energy","Play and Pay for Power Cards"]},
  fast:{pl:["Szybkie Moce z kart","Szybkie Zdolności Wrodzone"],en:["Fast Power Cards","Fast Innate Powers"]},
  invader:{pl:["Efekt Skażonej Wyspy","Efekty Strachu","Ruchy Najeźdźców: Najechanie, Budowa, Eksploracja","Przesuń karty Najeźdźców"],en:["Blighted Island Effect","Fear Effects","Invader Actions: Ravage, Build, Explore","Advance Invader Cards"]},
  slow:{pl:["Wolne Moce z kart","Wolne Zdolności Wrodzone"],en:["Slow Power Cards","Slow Innate Powers"]},
  time_passes:{pl:["Odrzuć zagrane karty Mocy","Odnów zużyte karty","Przesuń się do następnej tury"],en:["Discard played Power Cards","Recover spent cards","Move to the next turn"]}
};
const I18N={
  pl:{"play.choosePlayer":"Wybierz gracza","play.choosePlayerHint":"Numer gracza jest używany tylko w tej karcie przeglądarki i znika po odświeżeniu.",
      "play.chooseSpirit":"Wybierz ducha","play.chooseSpiritHint":"Wybór ducha zostanie zapisany w bieżącej grze, ale nie lokalnie.","play.changePlayer":"Zmień gracza",
      "play.currentPhase":"AKTUALNA FAZA","play.advance":"ADVANCE PHASE","play.ready":"GOTOWY","play.readyState":"GOTOWY","play.notReady":"NIE GOTOWY",
      "play.permissionFear":"Możesz zmieniać strach","play.permissionAdvance":"Możesz zmieniać fazę","play.permissionNone":"Brak dodatkowych uprawnień",
      "play.elements.eyebrow":"TRACKER","play.elements.title":"Żywioły","play.elements.description":"Śledź aktywne żywioły swojego ducha.","play.elements.reset":"Resetuj",
      "play.fear.eyebrow":"STRACH","play.fear.title":"Strach","play.fear.cards":"kart","play.fear.change":"Zmień strach","play.fear.noPermission":"Nie masz uprawnienia do zmiany strachu.",
      "play.overview.eyebrow":"GRA","play.overview.title":"Przegląd","play.overview.players":"Gracze","play.overview.adversary":"Adwersarz","play.overview.elements":"Tracker żywiołów",
      "play.permissions.eyebrow":"UPRAWNIENIA","play.permissions.title":"Twoje uprawnienia","common.on":"WŁĄCZONY","common.off":"WYŁĄCZONY","phase.spirit":"Faza Ducha","phase.fast":"Szybkie Moce",
      "phase.invader":"Faza Najeźdźcy","phase.slow":"Wolne Moce","phase.time_passes":"Czas Płynie","status.setup":"SETUP","status.active":"ACTIVE","status.finished":"FINISHED",
      "message.wait":"Gra nie została jeszcze uruchomiona.","message.finished":"Gra została zakończona. Timery są zatrzymane.","message.noSpirit":"Wybierz ducha, aby wejść do gry.",
      "message.saved":"Zapisano.","message.error":"Wystąpił błąd.","permission.fear":"Zmiana strachu","permission.advance":"Zmiana fazy","play.adversary":"PRZECIWNIK"},
  
  en:{"play.choosePlayer":"Choose player","play.choosePlayerHint":"The player number is used only in this browser tab and is cleared on refresh.",
      "play.chooseSpirit":"Choose spirit","play.chooseSpiritHint":"The spirit selection is saved in the current game, not locally.","play.changePlayer":"Change player",
      "play.currentPhase":"CURRENT PHASE","play.advance":"ADVANCE PHASE","play.ready":"READY","play.readyState":"READY","play.notReady":"NOT READY",
      "play.permissionFear":"You can change fear","play.permissionAdvance":"You can advance the phase","play.permissionNone":"No additional permissions",
      "play.elements.eyebrow":"TRACKER","play.elements.title":"Elements","play.elements.description":"Track your spirit's active elements.","play.elements.reset":"Reset",
      "play.fear.eyebrow":"FEAR","play.fear.title":"Fear","play.fear.cards":"cards","play.fear.change":"Change fear","play.fear.noPermission":"You do not have permission to change fear.",
      "play.overview.eyebrow":"GAME","play.overview.title":"Overview","play.overview.players":"Players","play.overview.adversary":"Adversary","play.overview.elements":"Elements tracker",
      "play.permissions.eyebrow":"PERMISSIONS","play.permissions.title":"Your permissions","common.on":"ON","common.off":"OFF","phase.spirit":"Spirit Phase","phase.fast":"Fast Powers",
      "phase.invader":"Invader Phase","phase.slow":"Slow Powers","phase.time_passes":"Time Passes","status.setup":"SETUP","status.active":"ACTIVE","status.finished":"FINISHED",
      "message.wait":"The game has not started yet.","message.finished":"The game has ended. Timers are stopped.","message.noSpirit":"Choose a spirit to enter the game.",
      "message.saved":"Saved.","message.error":"Something went wrong.","permission.fear":"Change fear","permission.advance":"Advance phase","play.adversary":"ADVERSARY"}
};

let lang=localStorage.getItem("sic_language")||"pl";
let currentGame=null;
let selectedPlayer=null;
let selectedSpirit=null;
let unsubscribe=null;
const $=id=>document.getElementById(id);
const emptyElements=()=>({sun:0,moon:0,fire:0,air:0,water:0,earth:0,plant:0,animal:0});
const spiritName=id=>{const s=SPIRITS.find(x=>x.id===id);return s?s[lang]:"—";};
const t=k=>I18N[lang]?.[k]??I18N.pl[k]??k;

function setConnection(text,ok=true){$("connectionBadge").textContent=text;$("connectionBadge").className=`badge${ok?"":" alert-error"}`;}
function error(message){const el=$("messageBox");el.textContent=message;el.classList.remove("hidden");setTimeout(()=>el.classList.add("hidden"),5000);}
function formatAdversary(g){const id=g.adversary?.id;if(!id)return lang==="pl"?"Brak":"None";return id==="prussia"?(lang==="pl"?"Królestwo Prus":"Kingdom of Prussia")+` · ${g.adversary.level}`:id;}
function phaseName(id){return t(`phase.${id}`);}
function applyTranslations(){document.documentElement.lang=lang;document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=t(el.dataset.i18n));$("languageToggle").textContent=lang==="pl"?"EN":"PL";if(currentGame)render(currentGame);}
function showPlayerPicker(){ $("playerPicker").classList.remove("hidden");$("spiritPicker").classList.add("hidden");$("gameView").classList.add("hidden"); }
function showSpiritPicker(){ $("playerPicker").classList.add("hidden");$("spiritPicker").classList.remove("hidden");$("gameView").classList.add("hidden"); }
function showGame(){ $("playerPicker").classList.add("hidden");$("spiritPicker").classList.add("hidden");$("gameView").classList.remove("hidden"); }
function renderPlayerButtons(g){$("playerButtons").innerHTML=Array.from({length:g.player_count||0},(_,i)=>`<button class="player-button" data-player="${i+1}" type="button">${i+1}</button>`).join("");}
function renderSpiritPicker(g){$("selectedPlayerLabel").textContent=`PLAYER ${selectedPlayer}`;const selected=g.players?.[String(selectedPlayer)]?.spirit_id||null;$("spiritGrid").innerHTML=SPIRITS.map(s=>`<button class="spirit-button ${s.id===selected?"selected":""}" data-spirit="${s.id}" type="button"><strong>${s[lang]}</strong><small>${s.id}</small></button>`).join("");}
function renderPhaseSteps(phase){const steps=PHASE_STEPS[phase]?.[lang]||[];$("phaseSteps").innerHTML=steps.map((x,i)=>`<div class="phase-step"><span class="num">${i+1}</span><div><strong>${x}</strong></div></div>`).join("");}
function renderElements(g){const enabled=!!g.elements_tracker_enabled;$("elementsCard").classList.toggle("hidden",!enabled);if(!enabled)return;const elements=g.players?.[String(selectedPlayer)]?.elements||emptyElements();$("elementsGrid").innerHTML=ELEMENTS.map(key=>`<div class="element"><div class="element-name">${ELEMENT_LABELS[key][lang]}</div><div class="element-controls"><button data-element="${key}" data-delta="-1" type="button" aria-label="-1">−</button><span class="element-value">${Number(elements[key]||0)}</span><button data-element="${key}" data-delta="1" type="button" aria-label="+1">+</button></div></div>`).join("");}
function renderFear(g){const total=Number(g.fear?.total_generated||0),per=Number(g.fear?.per_card||0),cards=per?Math.floor(total/per):0,pool=per?total%per:0;$("fearPool").textContent=`${pool} / ${per}`;$("fearCards").textContent=`${cards} ${t("play.fear.cards")}`;const can=!!g.players?.[String(selectedPlayer)]?.permissions?.can_change_fear;$("fearControls").innerHTML=[1,3,5].map(n=>`<button class="fear-button" data-fear="${n}" type="button" ${can&&g.game_status==="active"?"":"disabled"}>+${n}</button>`).join("");$("fearPermission").textContent=can?t("play.permissionFear"):t("play.fear.noPermission");}
function renderPermissions(g){const p=g.players?.[String(selectedPlayer)]||{};const canFear=!!p.permissions?.can_change_fear,canAdvance=!!p.permissions?.can_advance_phase;$("permissionsList").innerHTML=`<li class="${canFear?"permission-on":"permission-off"}">${canFear?"✓":"—"} ${t("permission.fear")}</li><li class="${canAdvance?"permission-on":"permission-off"}">${canAdvance?"✓":"—"} ${t("permission.advance")}</li>`;}
function render(g){
  if(!selectedPlayer){renderPlayerButtons(g);return;}
  if(!selectedSpirit){renderSpiritPicker(g);return;}
  showGame();
  const p=g.players?.[String(selectedPlayer)]||{};
  const phase=PHASES[g.phase_index]||"spirit";
  $("playerIdentity").textContent=`PLAYER ${selectedPlayer}`;
  $("spiritName").textContent=spiritName(selectedSpirit);
  $("adversarySummary").textContent=formatAdversary(g);
  $("gameStatus").textContent=t(`status.${g.game_status}`);$("gameStatus").className=`status-pill status-${g.game_status}`;
  $("phaseName").textContent=g.game_status==="setup"?t("status.setup"):phaseName(phase);$("turnLabel").textContent=g.game_status==="setup"?"":`Turn ${g.turn}`;
  $("phaseTitle").textContent=phaseName(phase);renderPhaseSteps(phase);
  const ready=!!p.ready;const readyEligible=phase!=="invader"&&phase!=="time_passes";
  $("readyState").textContent=ready?t("play.readyState"):t("play.notReady");$("readyState").className=`ready-badge ${ready?"ready-yes":"ready-no"}`;
  $("readyButton").textContent=ready?t("play.readyState"):t("play.ready");$("readyButton").disabled=g.game_status!=="active"||!readyEligible||ready;
  const canAdvance=!!p.permissions?.can_advance_phase;$("advanceButton").disabled=g.game_status!=="active"||!canAdvance;
  $("permissionHint").textContent=canAdvance?t("play.permissionAdvance"):t("play.permissionNone");
  $("overviewPlayers").textContent=String(g.player_count||0);$("overviewAdversary").textContent=formatAdversary(g);$("overviewElements").textContent=g.elements_tracker_enabled?t("common.on"):t("common.off");
  renderElements(g);renderFear(g);renderPermissions(g);
}

async function chooseSpirit(id){
  if(!selectedPlayer)return;
  try{await runTransaction(db,async tx=>{const s=await tx.get(gameRef);if(!s.exists())throw Error("Game does not exist.");const g=s.data();if(g.game_status!=="setup")throw Error("Spirit can only be selected during setup.");const players=structuredClone(g.players);players[String(selectedPlayer)].spirit_id=id;tx.update(gameRef,{players});});selectedSpirit=id;render(currentGame);}catch(e){error(e.message);}}
async function setReady(){if(!selectedPlayer)return;try{await runTransaction(db,async tx=>{const s=await tx.get(gameRef);if(!s.exists())throw Error("Game does not exist.");const g=s.data();if(g.game_status!=="active")throw Error("Game is not active.");const phase=PHASES[g.phase_index];if(phase==="invader"||phase==="time_passes")throw Error("READY is not used in this phase.");const players=structuredClone(g.players);const p=players[String(selectedPlayer)];if(!p)throw Error("Player not found.");if(p.ready===true)return;const now=Date.now();const start=Number(g.phase_start_time);const seconds=Math.max(0,Math.floor((now-start)/1000));p.ready=true;p.ready_at=now;p.time_tracking.total_seconds+=seconds;p.time_tracking.phase_times[phase]+=seconds;tx.update(gameRef,{players});});}catch(e){error(e.message);}}
async function advancePhase(){try{await runTransaction(db,async tx=>{const s=await tx.get(gameRef);if(!s.exists())throw Error("Game does not exist.");const g=s.data();if(g.game_status!=="active")throw Error("Game is not active.");const me=g.players?.[String(selectedPlayer)];if(!me?.permissions?.can_advance_phase)throw Error("You cannot advance the phase.");const phase=PHASES[g.phase_index],now=Date.now(),start=Number(g.phase_start_time),seconds=Math.max(0,Math.floor((now-start)/1000)),players=structuredClone(g.players);for(let i=1;i<=g.player_count;i++){const p=players[String(i)];if(!p)continue;const full=phase==="invader"||phase==="time_passes"||p.ready!==true;if(full){p.time_tracking.total_seconds+=seconds;p.time_tracking.phase_times[phase]+=seconds;}p.ready=false;delete p.ready_at;}const last=g.phase_index===PHASES.length-1,next=last?0:g.phase_index+1;if(next===4)for(let i=1;i<=g.player_count;i++)if(players[String(i)])players[String(i)].elements=emptyElements();players["0"].time_tracking.total_seconds+=seconds;const history=[...(g.phase_history||[]),{turn:g.turn,phase,duration_seconds:seconds,recorded_at:now}];tx.update(gameRef,{phase_index:next,turn:last?g.turn+1:g.turn,phase_start_time:now,players,phase_history:history});});}catch(e){error(e.message);}}
async function changeFear(amount){try{await runTransaction(db,async tx=>{const s=await tx.get(gameRef);if(!s.exists())throw Error("Game does not exist.");const g=s.data();if(g.game_status!=="active")throw Error("Game is not active.");const p=g.players?.[String(selectedPlayer)];if(!p?.permissions?.can_change_fear)throw Error("You cannot change fear.");const log=[...(g.fear?.log||[]),{player:selectedPlayer,amount,phase_index:g.phase_index,turn:g.turn,timestamp:Date.now()}];tx.update(gameRef,{"fear.total_generated":Number(g.fear?.total_generated||0)+amount,"fear.log":log});});}catch(e){error(e.message);}}
async function changeElement(element,delta){try{await runTransaction(db,async tx=>{const s=await tx.get(gameRef);if(!s.exists())throw Error("Game does not exist.");const g=s.data();if(g.game_status!=="active")throw Error("Game is not active.");const players=structuredClone(g.players);const p=players[String(selectedPlayer)];if(!p)throw Error("Player not found.");p.elements=p.elements||emptyElements();p.elements[element]=Math.max(0,Number(p.elements[element]||0)+delta);tx.update(gameRef,{players});});}catch(e){error(e.message);}}
async function resetElements(){try{await runTransaction(db,async tx=>{const s=await tx.get(gameRef);if(!s.exists())throw Error("Game does not exist.");const g=s.data();const players=structuredClone(g.players);if(!players[String(selectedPlayer)])throw Error("Player not found.");players[String(selectedPlayer)].elements=emptyElements();tx.update(gameRef,{players});});}catch(e){error(e.message);}}

$("languageToggle").addEventListener("click",()=>{lang=lang==="pl"?"en":"pl";localStorage.setItem("sic_language",lang);applyTranslations();});
$("playerButtons").addEventListener("click",e=>{const btn=e.target.closest("[data-player]");if(!btn)return;selectedPlayer=Number(btn.dataset.player);selectedSpirit=currentGame?.players?.[String(selectedPlayer)]?.spirit_id||null;if(selectedSpirit)showGame();else showSpiritPicker();render(currentGame);});
$("spiritGrid").addEventListener("click",e=>{const btn=e.target.closest("[data-spirit]");if(btn)chooseSpirit(btn.dataset.spirit);});
$("backToPlayers").addEventListener("click",()=>{selectedPlayer=null;selectedSpirit=null;showPlayerPicker();render(currentGame);});
$("readyButton").addEventListener("click",setReady);$("advanceButton").addEventListener("click",advancePhase);$("resetElementsButton").addEventListener("click",resetElements);
$("elementsGrid").addEventListener("click",e=>{const b=e.target.closest("[data-element]");if(b)changeElement(b.dataset.element,Number(b.dataset.delta));});
$("fearControls").addEventListener("click",e=>{const b=e.target.closest("[data-fear]");if(b)changeFear(Number(b.dataset.fear));});

async function boot(){applyTranslations();try{const snap=await getDoc(gameRef);if(!snap.exists())throw Error("Game has not been initialized on /setup yet.");setConnection(lang==="pl"?"Połączono":"Connected");unsubscribe=onSnapshot(gameRef,s=>{if(!s.exists())return;currentGame=s.data();render(currentGame);},e=>{console.error(e);setConnection(t("message.error"),false);error(e.message);});}catch(e){setConnection(t("message.error"),false);error(e.message);}}
boot();
