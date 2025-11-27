# Projet-VR-Vote

Petite application de vote single-page destinée aux projets VR — une application frontend minimale qui enregistre les votes dans Firebase Realtime Database.

Démarrage rapide (développement)

1. Lancez un serveur HTTP statique local (requis — évitez file:// qui bloque les requêtes Firebase).
   - Avec Python :
     ```powershell
     python -m http.server 8000
     ```
   - Avec Node (http-server) :
     ```powershell
     npx http-server -c-1 .
     ```
2. Ouvrez la page dans votre navigateur :
   - http://localhost:8000/
3. Utilisez les outils de développement (F12) pour vérifier le réseau et la console.

Fichiers et responsabilités
- `index.html` — balisage UI (attend `#pseudo`, `#btn1`, `#btn2`, `#confirmation`).
- `app.js` — logique principale. Utilise la SDK Firebase modulaire v9 via CDN ; écrit dans le noeud RTDB `votes` avec `push()`/`set()`.
- `style.css` — styles UI.

Détails Firebase
- L'application contient une configuration Firebase directement dans `app.js` pour faciliter le développement.
  - Noeud de données : `votes`
  - Format d'un enregistrement : `{ pseudo, vote, createdAt }`
- Sécurité : n'incluez pas de clés de production dans `app.js`. En production, utilisez un serveur, des variables d'environnement et des règles sécurisées.
- Si les écritures échouent avec `permission_denied`, vérifiez les règles de la base de données dans la console Firebase : `Realtime Database > Rules`.

Tests & débogage
- `app.js` exporte `showVotesInConsole()` pour récupérer et afficher les votes (utile lors des tests) :
  - Ouvrez la Console (F12) puis appelez `showVotesInConsole()` si vous avez importé le module dans un environnement de test.
- Si vous observez des soucis CORS ou réseau : assurez-vous d'avoir ouvert le site via `http://localhost` et non `file://`.
- Quand vous ajoutez des éléments UI, vérifiez que les IDs correspondent à `#btn1`/`#btn2`/`#pseudo` et que les gestionnaires d'événements sont attachés sur `DOMContentLoaded`.

Contribution & PRs
- Gardez les modifications petites et ciblées — les petites PRs sont plus faciles à relire.
- Conventions : JS vanilla pour le DOM et import direct du SDK via CDN (pas de pipeline de build par défaut).

Besoin de plus ?
- Si vous le souhaitez, je peux ajouter un test d'acceptation minimal avec Playwright (ou un petit CI) : dites-moi quelle solution vous préférez et j’ajouterai un exemple.
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
