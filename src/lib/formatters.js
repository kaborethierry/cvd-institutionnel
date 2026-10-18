/**
 * Fonctions de formatage des dates, périodes et statuts.
 */

const MONTHS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export function formatLongDate(value) {
  const date = toDate(value);
  if (!date) return "";
  const day = date.getDate();
  const month = MONTHS_FR[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatShortDate(value) {
  const date = toDate(value);
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatYear(value) {
  const date = toDate(value);
  if (!date) return "";
  return String(date.getFullYear());
}

export function formatPeriod(period) {
  if (!period || typeof period !== "object") return "Période à confirmer";

  const start = period.start ? formatYear(period.start) : null;
  const end = period.end ? formatYear(period.end) : null;

  if (!start && !end) {
    return period.confirmed === false
      ? "Période à confirmer"
      : "Période non renseignée";
  }
  if (start && !end) return `Depuis ${start}`;
  if (!start && end) return `Jusqu'en ${end}`;
  if (start === end) return start;
  return `${start} — ${end}`;
}

export function normalizeStatusKey(status) {
  if (typeof status !== "string") return "inconnu";
  const normalized = status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (normalized.includes("cours") || normalized.includes("actif")) {
    return "en-cours";
  }
  if (normalized.includes("termin") || normalized.includes("clotur")) {
    return "termine";
  }
  if (
    normalized.includes("confirmer") ||
    normalized.includes("verifier") ||
    normalized.includes("attente")
  ) {
    return "a-confirmer";
  }
  if (normalized.includes("planifi") || normalized.includes("prevu")) {
    return "planifie";
  }
  return "inconnu";
}

export function formatStatusLabel(key) {
  const labels = {
    "en-cours": "En cours",
    termine: "Terminé",
    "a-confirmer": "À confirmer",
    planifie: "Planifié",
    inconnu: "Statut non renseigné",
  };
  return labels[key] ?? labels.inconnu;
}

export function formatVerifiedDate(value, verified = true) {
  const formatted = formatLongDate(value) || formatYear(value);
  if (!formatted) return "Date non renseignée";
  return verified ? formatted : `${formatted} (à confirmer)`;
}

function toDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  if (typeof value === "string") {
    const isoMatch = value.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/);
    if (isoMatch) {
      const [, y, m = "01", d = "01"] = isoMatch;
      const date = new Date(Number(y), Number(m) - 1, Number(d));
      return Number.isNaN(date.getTime()) ? null : date;
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}