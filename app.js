// app.js - boutons désactivés pendant l'envoi, messages d'info/erreur visibles
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

/* ----------------- Config Firebase (copie depuis ta console) ----------------- */
const firebaseConfig = {
  apiKey: "AIzaSyBkVeGaXwMjYTA8Jr8SsyeSths5fTZ8hP8",
  authDomain: "projet-vr-8866a.firebaseapp.com",
  databaseURL: "https://projet-vr-8866a-default-rtdb.firebaseio.com",
  projectId: "projet-vr-8866a",
  storageBucket: "projet-vr-8866a.appspot.com",
  messagingSenderId: "308323943444",
  appId: "1:308323943444:web:6a487eaee2f3760d8ad301",
  measurementId: "G-TMCG9K4N3W"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* ----------------- Utilitaires UI ----------------- */
function getOrCreateConfirmationEl() {
  let el = document.getElementById("confirmation");
  if (!el) {
    el = document.createElement("p");
    el.id = "confirmation";
    el.style.marginTop = "10px";
    el.style.fontWeight = "600";
    const container = document.querySelector(".vote") || document.body;
    container.appendChild(el);
  }
  return el;
}

/**
 * Affiche un message sur la page.
 * type: "info" | "success" | "error"
 * autoHideMs: durée avant disparition (0 = ne pas auto-hide)
 */
function showMessage(text, type = "info", autoHideMs = 4000) {
  const el = getOrCreateConfirmationEl();
  el.innerText = text;
  if (type === "success") el.style.color = "#16a34a";
  else if (type === "error") el.style.color = "#b91c1c";
  else el.style.color = "#374151";

  if (autoHideMs > 0) {
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => { if (type !== "error") el.innerText = ""; }, autoHideMs);
  }
}

function setButtonsDisabled(disabled) {
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  if (btn1) btn1.disabled = disabled;
  if (btn2) btn2.disabled = disabled;
}

/* ----------------- Fonction d'écriture ----------------- */
async function writeVote(pseudoValue, voteValue) {
  const pseudo = (pseudoValue || "").trim();
  if (!pseudo) {
    showMessage("⚠️ Entre ton pseudo avant de voter.", "error", 6000);
    return;
  }

  // Indicateur en cours
  showMessage("Enregistrement en cours…", "info", 0);
  setButtonsDisabled(true);

  try {
    const votesRef = ref(db, "votes");
    const newVoteRef = push(votesRef);
    await set(newVoteRef, {
      pseudo,
      vote: voteValue,
      createdAt: Date.now()
    });

    showMessage("✔️ Vote enregistré avec succès !", "success", 5000);
    console.log("Écriture réussie, key:", newVoteRef.key);
    // Optionnel : vider le champ pseudo
    // document.getElementById("pseudo").value = "";
  } catch (err) {
    console.error("Erreur écriture Firebase :", err);
    const msg = err?.code || err?.message || String(err);
    if (String(msg).toLowerCase().includes("permission")) {
      showMessage("❌ Accès refusé : vérifie les règles Realtime Database (permission_denied).", "error", 10000);
    } else if (String(msg).toLowerCase().includes("network") || String(msg).toLowerCase().includes("fetch")) {
      showMessage("❌ Erreur réseau / CORS : vérifie ta connexion et l'accès via http://localhost.", "error", 10000);
    } else {
      showMessage("❌ Erreur lors de l'enregistrement : " + msg, "error", 10000);
    }
  } finally {
    setButtonsDisabled(false);
  }
}

/* ----------------- Attachement des événements ----------------- */
document.addEventListener("DOMContentLoaded", () => {
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const pseudoInput = document.getElementById("pseudo");

  // Si éléments manquants, on crée l'élément message et on avertit dans la console.
  if (!btn1 || !btn2 || !pseudoInput) {
    console.warn("HTML attendu : éléments #btn1, #btn2, #pseudo introuvables.");
    getOrCreateConfirmationEl();
    return;
  }

  btn1.addEventListener("click", () => {
    writeVote(pseudoInput.value, "Choix 1");
  });

  btn2.addEventListener("click", () => {
    writeVote(pseudoInput.value, "Choix 2");
  });
});

/* ----------------- (Optionnel) fonction pour afficher les votes dans la console ----------------- */
export async function showVotesInConsole() {
  try {
    const snap = await get(ref(db, "votes"));
    console.log("Votes:", snap.val());
    showMessage("Vérifie la console (F12) pour la liste des votes.", "info", 5000);
  } catch (e) {
    console.error(e);
    showMessage("Erreur lecture votes : " + (e?.message || e), "error", 8000);
  }
}