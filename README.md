# Spirit Island Companion

Minimal vanilla JS + Firebase/Firestore companion for one shared Spirit Island game.

## Files

- `public/setup.html` — host/admin panel.
- `public/setup.css` — admin styles.
- `public/setup.js` — Firestore game state, setup, phase timing and admin controls.
- `public/play.html` — player screen.
- `public/play.css` — player styles.
- `public/play.js` — player selection, spirit selection, READY, elements, fear and phase controls.
- `public/locales/` — retained localization files for future shared translations.
- `firebase.json` — Firebase Hosting/Firestore configuration.
- `firestore.rules` — intentionally open development rules; secure these before production.

## Firebase setup

1. Create a Firebase project.
2. Enable Firestore Database.
3. Replace `firebaseConfig` in both `public/setup.js` and `public/play.js` with the config from Firebase Console.
4. Deploy with Firebase CLI:

```bash
firebase login
firebase use YOUR_PROJECT_ID
firebase deploy
```

Open `/setup` first to initialize the shared game, configure players and start the game. Players then open `/play`.

## Timing model

- `phase_index`: `0 spirit`, `1 fast`, `2 invader`, `3 slow`, `4 time_passes`.
- READY records elapsed time from phase start for that player.
- Players who never press READY receive the full phase duration when the phase advances.
- Invader and Time Passes always count the full phase duration for every real player.
- Player `0` stores whole-game elapsed time only.
- Entering Time Passes resets all real players' element counters.
- END GAME finalizes the current phase and freezes timers.
