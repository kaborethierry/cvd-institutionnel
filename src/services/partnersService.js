/**
 * Service des partenaires.
 * Lit les données locales de src/data/partners.js.
 */

import { partners as localPartners } from "@/data/partners";
import { normalizeForSearch } from "@/lib/utils";

/**
 * Retourne la liste complète des partenaires.
 * @returns {Array<Object>}
 */
export function getPartners() {
  return Array.isArray(localPartners) ? [...localPartners] : [];
}

/**
 * Retourne un partenaire à partir de son slug.
 * @param {string} slug
 * @returns {Object|null}
 */
export function getPartnerBySlug(slug) {
  if (typeof slug !== "string" || slug.trim().length === 0) return null;
  return getPartners().find((p) => p.slug === slug) ?? null;
}

/**
 * Retourne les partenaires associés à un projet donné.
 * @param {string} projectSlug
 * @returns {Array<Object>}
 */
export function getPartnersByProject(projectSlug) {
  if (typeof projectSlug !== "string" || projectSlug.trim().length === 0) {
    return [];
  }
  return getPartners().filter(
    (p) =>
      Array.isArray(p.relatedProjectSlugs) &&
      p.relatedProjectSlugs.includes(projectSlug)
  );
}

/**
 * Recherche des partenaires par nom (recherche insensible aux accents).
 * @param {string} query
 * @returns {Array<Object>}
 */
export function searchPartners(query) {
  const normalized = normalizeForSearch(query);
  if (!normalized) return getPartners();
  return getPartners().filter((p) => {
    const name = normalizeForSearch(p.name ?? "");
    const fullName = normalizeForSearch(p.fullName ?? "");
    return name.includes(normalized) || fullName.includes(normalized);
  });
}