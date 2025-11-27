# Projet-VR-Vote

Small single-page voting demo for VR projects — a minimal frontend app that writes votes to Firebase Realtime Database.

Quick start (dev)

1. Run a simple static HTTP server locally (required — avoid file:// which breaks Firebase requests).
   - Using Python:
     ```powershell
     python -m http.server 8000
     ```
   - Using Node (http-server):
     ```powershell
     npx http-server -c-1 .
     ```
2. Open the page in your browser:
   - http://localhost:8000/
3. Use browser DevTools (F12) to inspect Network and Console logs.

Files & responsibilities
- `index.html` — UI markup (expects `#pseudo`, `#btn1`, `#btn2`, `#confirmation`).
- `app.js` — Main logic. Uses the Firebase modular v9 CDN SDK; writes to RTDB `votes` node using `push()`/`set()`.
- `style.css` — UI styles.

Firebase details
- The app uses a Firebase config injected directly in `app.js` for development convenience.
  - Data node: `votes`
  - Shape of a record: `{ pseudo, vote, createdAt }`
- Security consideration: do not keep production credentials in `app.js`. For production, host a server or use environment variables & secure rules.
- If writes fail with `permission_denied`, check Database Rules in Firebase Console `Realtime Database > Rules`.

Testing & debugging tips
- `app.js` exports `showVotesInConsole()` to fetch and log stored votes, useful when testing:
  - Open the Console (F12) then invoke `showVotesInConsole()` from the Console (if you imported as module in a test harness).
- If you see CORS or network issues: make sure you served the page from `http://localhost` and not `file://`.
- If you add UI elements, ensure IDs match `#btn1`/`#btn2`/`#pseudo` and that handlers are wired on `DOMContentLoaded`.

Contributing & PRs
- Keep changes minimal and focused — small PRs are easier to review.
- Follow the project conventions: vanilla JS DOM, direct CDN SDK imports (no build pipeline included).

Need more?
- If you'd like, I can add a small acceptance test using Playwright or a tiny CI config — tell me which you'd prefer and I’ll add an example.
