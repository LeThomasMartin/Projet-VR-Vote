# Projet-VR-Vote
# README édité par AI

Petite application de vote single-page destinée au projet 2025 du club de jeux vidéo de l'université Laval — une application frontend minimale qui enregistre les votes dans Firebase Realtime Database. L'application recoit également des données depuis unity.

Lien du site: [https://lethomasmartin.github.io/Projet-VR-Vote/](https://lethomasmartin.github.io/Projet-VR-Vote/)

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
  - Le pseudo (`#pseudo`) est limité à 30 caractères.
- `app.js` — logique principale. Utilise la SDK Firebase modulaire v9 via CDN ; écrit dans le noeud RTDB `votes` avec `push()`/`set()`.
- `style.css` — styles UI.

Ajuster l'échelle UI
- Pour augmenter/diminuer globalement la taille de l'interface, modifiez la variable `--scale` dans `style.css` (valeur par défaut : 1.2 pour +20%).

Détails Firebase
- L'application contient une configuration Firebase directement dans `app.js` pour faciliter le développement.
  - Noeud de données : `votes`
  - Format d'un enregistrement : `{ pseudo, vote }`
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

Interop Unity (contrôle des votes)
- L'état d'ouverture des votes peut être contrôlé depuis un script Unity (WebGL) via une API JS exposée globalement :
  - `window.setVotingEnabled(true|false)` — active/désactive la possibilité de voter.
  - `window.getVotingEnabled()` — obtient l'état actuel (true = ouvert, false = fermé).
  - Exemple : depuis Unity WebGL, appelez `Application.ExternalEval("window.setVotingEnabled(false);");` ou utilisez l'interop adaptée à votre build.