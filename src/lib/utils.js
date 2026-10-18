/**
 * Fonctions utilitaires génériques.
 * Aucune donnée institutionnelle ici.
 */

export function normalizeForSearch(value) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ");
}

export function slugifyAnchor(label) {
  if (typeof label !== "string") return "";
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugify(label) {
  return slugifyAnchor(label);
}

export function isDefined(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function withFallback(value, fallback = null) {
  return isDefined(value) ? value : fallback;
}

export function truncate(text, maxLength = 160) {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}…`;
}

export function unique(array) {
  if (!Array.isArray(array)) return [];
  return Array.from(new Set(array));
}

export function groupBy(array, key) {
  if (!Array.isArray(array)) return {};
  return array.reduce((acc, item) => {
    const group = item?.[key];
    if (group === undefined || group === null) return acc;
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

export function filterByCriteria(array, criteria = {}) {
  if (!Array.isArray(array)) return [];
  const activeCriteria = Object.entries(criteria).filter(([, value]) =>
    isDefined(value)
  );
  if (activeCriteria.length === 0) return array;

  return array.filter((item) =>
    activeCriteria.every(([key, value]) => {
      if (Array.isArray(item?.[key])) {
        return item[key].includes(value);
      }
      return item?.[key] === value;
    })
  );
}

export function sortByKey(array, key, direction = "asc") {
  if (!Array.isArray(array)) return [];
  const sorted = [...array].sort((a, b) => {
    const va = a?.[key];
    const vb = b?.[key];
    if (va === vb) return 0;
    if (va === undefined || va === null) return 1;
    if (vb === undefined || vb === null) return -1;
    return va < vb ? -1 : 1;
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

export function keyBy(array, key) {
  const map = new Map();
  if (!Array.isArray(array)) return map;
  for (const item of array) {
    const k = item?.[key];
    if (k !== undefined && k !== null) map.set(k, item);
  }
  return map;
}

export function firstDefined(...values) {
  for (const value of values) {
    if (isDefined(value)) return value;
  }
  return undefined;
}