# Copilot / AI agent guide — Projet-VR-Vote

Purpose
- Small single-page voting app that records user votes (pseudo + choice) to Firebase Realtime Database.
- Minimal setup (no build step): authors use direct imports of Firebase SDK via CDN and standard DOM APIs.

Big picture / architecture
- Frontend-only single-page app: `index.html` + `style.css` + `app.js`.
- No backend or build pipeline in repo; all logic is client-side and uses Firebase Realtime Database as persistence.
- Firebase config is in `app.js` (dev-friendly but not production-safe). The app writes to the `votes` node.

Key files
- `index.html` — UI markup. Elements the JS expects:
  - Input: `#pseudo`
  - Buttons: `#btn1` and `#btn2` (event handlers attached in `app.js`)
  - `#confirmation` element is either present or created at runtime.
- `app.js` — Main logic
  - Firebase modular SDK import (v9 via CDN) and `initializeApp(firebaseConfig)`.
  - Functions:
    - `writeVote(pseudoValue, voteValue)` — validates `pseudo`, writes to `votes` in RTDB using `push()`/`set()` and displays UI messages.
    - `showMessage(text, type, autoHideMs)` — consistent status and error messages on UI.
    - `setButtonsDisabled(disabled)` — disables/enables vote buttons while writing.
    - `showVotesInConsole()` — helper to list votes for manual testing/debugging.
- `style.css` — Simple appearance styling; classes used: `.vote`, `.buttons`, `.btn1`, `.btn2`.

Important runtime & developer workflows
- No npm or build tool is required. To run locally use a local HTTP server so Firebase requests are allowed (avoid file:// CORS issues):
  - If you have Python installed:
    ```powershell
    python -m http.server 8000
    ```
  - With Node.js available:
    ```powershell
    npx http-server -c-1 .
    ```
- Open `http://localhost:8000/` then use F12 to debug console and network traffic.
- Manual testing workflow:
  - Enter a pseudo in the input, click a choice button. In DevTools Console you’ll see logs and the push key, and UI messages appear via `showMessage()`.
  - If you need to inspect stored data, open Firebase Console > Realtime Database > `votes` to view entries.

Firebase / integration specifics
- Realtime DB: data is pushed to `votes` node using `push()` and `set()`.
  - Record shape: `{ pseudo, vote, createdAt }` where `createdAt` is `Date.now()`.
- Permission errors will surface in the UI: `permission_denied` is mapped in `writeVote` catch block.
- CORS/network errors are also detected and surfaced.
- Because Firebase config is in `app.js`, be careful: this is likely a dev/test environment; for production, move config to a safe runtime or server.

Coding patterns & conventions
- DOM usage is plain vanilla JS. Avoid frameworks unless adding a new build system and explicitly documenting it.
- Use `id` selectors for elements the app expects (`#btn1`, `#btn2`, `#pseudo`); to add more choices, create new button ids and wire them in `DOMContentLoaded` with `writeVote`.
- Use `showMessage()` for all user-facing statuses and errors – it centralizes color and timed auto-hide behavior.
- Keep functions small and single-purpose: UI helpers vs persisted operations are already separated.

Extending the app / common changes
- To add a results page: use `get()` from `firebase-database` (see `showVotesInConsole()` example) and render votes in a DOM container.
- To add more vote buttons: duplicate HTML button markup with new ids and call `writeVote(pseudoInput.value, "New Choice")` from the event handler.
- To run local unit or E2E tests, add a simple test harness (e.g. a Jest setup or Playwright), but note that the repo currently has none.

Debugging tips & common issues
- If writes fail with `permission_denied`, check Realtime Database rules in Firebase Console: `Database > Rules`.
- If network/CORS errors occur, ensure the page is served from `http://localhost` (not `file://`) and check DevTools Network tab.
- Check the browser console for logs emitted by `console.log()`/`console.error()` in `app.js`.
- When adding new UI elements, double-check their `id` and event listeners in `DOMContentLoaded` in `app.js`.

PRs & code hygiene
- Minimal changes preferred: small, focused PRs are easier to review.
- If you introduce a build system, update `README.md` with run/test/build commands and revise these instructions.
- Avoid committing production Firebase secrets; prefer instructions for using environment variables or separate dev config files.

If anything above is unclear or you want additional actionable items (tests, CI, environment setup), tell me which part you want next and I’ll update this file accordingly.
