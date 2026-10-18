/**
 * Fonctions de validation réutilisables.
 */

export function validateText(value, options = {}) {
  const { min = 0, max = Infinity, required = true } = options;
  const v = typeof value === "string" ? value.trim() : "";

  if (required && v.length === 0) return "Ce champ est obligatoire.";
  if (!required && v.length === 0) return null;
  if (v.length < min) return `Ce champ doit contenir au moins ${min} caractères.`;
  if (v.length > max) return `Ce champ ne doit pas dépasser ${max} caractères.`;
  return null;
}

export function validateEmail(value) {
  const v = typeof value === "string" ? value.trim() : "";
  if (v.length === 0) return "L'adresse email est obligatoire.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) return "L'adresse email n'est pas valide.";
  if (v.length > 254) return "L'adresse email est trop longue.";
  return null;
}

export function validatePhone(value) {
  const v = typeof value === "string" ? value.trim() : "";
  if (v.length === 0) return "Le numéro de téléphone est obligatoire.";
  const cleaned = v.replace(/[\s().-]/g, "");
  if (!/^\+?\d{6,15}$/.test(cleaned)) {
    return "Le numéro de téléphone n'est pas valide.";
  }
  return null;
}

export function validateMessage(value, options = {}) {
  const { min = 10, max = 5000 } = options;
  return validateText(value, { min, max, required: true });
}

export function validateEnum(value, allowed, label = "valeur") {
  if (!Array.isArray(allowed)) return `La ${label} n'est pas valide.`;
  if (!allowed.includes(value)) return `La ${label} n'est pas valide.`;
  return null;
}

export function validateBoolean(value) {
  if (typeof value !== "boolean") return "Ce choix est obligatoire.";
  return null;
}

export function validateConsent(value) {
  if (value !== true) return "Votre consentement est requis.";
  return null;
}

export function validateForm(values, rules) {
  const errors = {};
  if (!values || typeof values !== "object") return errors;
  if (!rules || typeof rules !== "object") return errors;

  for (const [field, validator] of Object.entries(rules)) {
    if (typeof validator !== "function") continue;
    const error = validator(values[field], values);
    if (error) errors[field] = error;
  }
  return errors;
}

export function isFormValid(errors) {
  return !errors || Object.keys(errors).length === 0;
}