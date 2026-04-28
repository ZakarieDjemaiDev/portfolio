// ============================================================
// contact-form.js — Validation + envoi Formspree (AJAX)
// Sécurité : honeypot, sanitisation, regex, rate-limit client
// Zakarie Djemai · Portfolio
// ============================================================

const REGEX = {
  name:    /^[a-zA-ZÀ-ÿ\-' ]{2,50}$/,
  email:   /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  message: /^[\s\S]{10,1000}$/
};

const MESSAGES = {
  firstname: { valueMissing: "Le prénom est obligatoire.", patternError: "Prénom invalide (2–50 lettres)." },
  lastname:  { valueMissing: "Le nom est obligatoire.",    patternError: "Nom invalide (2–50 lettres)." },
  email:     { valueMissing: "L'adresse email est obligatoire.", patternError: "Email invalide. Exemple : nom@domaine.fr" },
  sujet:     { valueMissing: "Veuillez choisir un sujet." },
  message:   { valueMissing: "Le message est obligatoire.", patternError: "Le message doit contenir entre 10 et 1000 caractères." }
};

// ─── UTILITAIRES ─────────────────────────────────────────────
function showError(input, message) {
  const group = input.closest(".form-group");
  if (!group) return; // Sécurité si pas de parent
  group.classList.add("error");
  group.classList.remove("success");
  let el = group.querySelector(".error-message");
  if (!el) {
    el = document.createElement("p");
    el.classList.add("error-message");
    el.setAttribute("role", "alert");
    el.id = "err-" + input.id;
    input.insertAdjacentElement("afterend", el);
  }
  el.textContent = message;
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", el.id);
}

function showSuccess(input) {
  const group = input.closest(".form-group");
  if (!group) return; // Sécurité si pas de parent
  group.classList.remove("error");
  group.classList.add("success");
  group.querySelector(".error-message")?.remove();
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
}

function clearState(input) {
  const group = input.closest(".form-group");
  if (!group) return; // Sécurité si pas de parent
  group.classList.remove("error", "success");
  group.querySelector(".error-message")?.remove();
  input.removeAttribute("aria-invalid");
}

function validateField(input) {
  const name  = input.name;
  const value = input.value.trim();
  if (input.required && !value) {
    showError(input, MESSAGES[name]?.valueMissing || "Ce champ est obligatoire.");
    return false;
  }
  if (value && REGEX[name] && !REGEX[name].test(value)) {
    showError(input, MESSAGES[name]?.patternError || "Valeur invalide.");
    return false;
  }
  if (value) showSuccess(input);
  else clearState(input);
  return true;
}

// ─── COMPTEUR CARACTÈRES ─────────────────────────────────────
const textarea    = document.getElementById("message");
const charCount   = document.getElementById("char-count");
const charCounter = document.querySelector(".char-counter");

if (textarea && charCount) {
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    charCount.textContent = len;
    charCounter?.classList.toggle("over-limit", len > 1000);
  });
}

// ─── VALIDATION TEMPS RÉEL ───────────────────────────────────
const form = document.getElementById("contact-form");

if (form) {
  form.querySelectorAll("input:not([name='_gotcha']), select, textarea").forEach(input => {
    input.addEventListener("blur", () => {
      if (input.value.trim() || input.required) validateField(input);
    });

    input.addEventListener("input", () => {
      const formGroup = input.closest(".form-group");
      if (formGroup && formGroup.classList.contains("error")) {
        validateField(input);
      }
    });

    if (input.tagName === "SELECT") {
      input.addEventListener("change", () => validateField(input));
    }
  });

  // ─── ENVOI AJAX FORMSPREE ────────────────────────────────
  let lastSubmit = 0;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot : champ caché rempli = bot, on ignore silencieusement
    if (form.querySelector("input[name='_gotcha']")?.value) return;

    // Rate-limit client : 5 secondes entre deux tentatives
    if (Date.now() - lastSubmit < 5000) return;

    // Validation complète
    let hasError = false;
    form.querySelectorAll("input[required], select[required], textarea[required]").forEach(input => {
      if (!validateField(input)) hasError = true;
    });

    if (hasError) {
      form.querySelector(".form-group.error input, .form-group.error select, .form-group.error textarea")?.focus();
      return;
    }

    // Bouton en chargement
    const btn     = form.querySelector(".btn-submit-contact");
    const btnText = btn.querySelector(".btn-text");
    btn.disabled       = true;
    btnText.textContent = "Envoi en cours...";

    document.getElementById("form-success")?.setAttribute("hidden", "");
    document.getElementById("form-error")?.setAttribute("hidden", "");

    try {
      const response = await fetch(form.action, {
        method:  "POST",
        body:    new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        lastSubmit = Date.now();
        form.hidden = true;
        const success = document.getElementById("form-success");
        if (success) { success.removeAttribute("hidden"); success.focus(); }
      } else {
        throw new Error("HTTP " + response.status);
      }

    } catch (err) {
      console.error("Erreur envoi :", err);
      btn.disabled        = false;
      btnText.textContent = "Envoyer le message";
      document.getElementById("form-error")?.removeAttribute("hidden");
    }
  });
}