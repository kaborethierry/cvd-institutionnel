/**
 * Service des projets.
 *
 * Version initiale : lit les données locales de src/data/projects.js.
 * Une future version pourra appeler une API sans réécrire les composants.
 *
 * Toutes les fonctions sont pures et synchrones dans cette version.
 */

import { projects as localProjects } from "@/data/projects";
import { filterByCriteria, sortByKey } from "@/lib/utils";

/**
 * Retourne la liste complète des projets.
 * @returns {Array<Object>}
 */
export function getProjects() {
  return Array.isArray(localProjects) ? [...localProjects] : [];
}

/**
 * Retourne un projet à partir de son slug.
 * @param {string} slug
 * @returns {Object|null}
 */
export function getProjectBySlug(slug) {
  if (typeof slug !== "string" || slug.trim().length === 0) return null;
  const list = getProjects();
  return list.find((p) => p.slug === slug) ?? null;
}

/**
 * Retourne les projets marqués comme mis en avant.
 * @returns {Array<Object>}
 */
export function getFeaturedProjects() {
  return getProjects().filter((p) => p.featured === true);
}

/**
 * Retourne les projets associés à un domaine donné.
 * @param {string} domainSlug
 * @returns {Array<Object>}
 */
export function getProjectsByDomain(domainSlug) {
  if (typeof domainSlug !== "string" || domainSlug.trim().length === 0) {
    return [];
  }
  return getProjects().filter(
    (p) => Array.isArray(p.domainSlugs) && p.domainSlugs.includes(domainSlug)
  );
}

/**
 * Filtre les projets selon plusieurs critères.
 * Les critères vides sont ignorés.
 * @param {Object} [filters]
 * @param {string} [filters.domainSlug]
 * @param {string} [filters.funder]
 * @param {string} [filters.status]
 * @param {string} [filters.areaSlug]
 * @returns {Array<Object>}
 */
export function filterProjects(filters = {}) {
  let list = getProjects();

  if (filters.domainSlug) {
    list = list.filter(
      (p) =>
        Array.isArray(p.domainSlugs) &&
        p.domainSlugs.includes(filters.domainSlug)
    );
  }

  if (filters.areaSlug) {
    list = list.filter(
      (p) =>
        Array.isArray(p.interventionAreaSlugs) &&
        p.interventionAreaSlugs.includes(filters.areaSlug)
    );
  }

  if (filters.funder) {
    list = list.filter(
      (p) =>
        Array.isArray(p.funders) && p.funders.includes(filters.funder)
    );
  }

  if (filters.status) {
    list = list.filter((p) => p.status === filters.status);
  }

  return list;
}

/**
 * Retourne la liste des bailleurs uniques présents dans les projets.
 * @returns {Array<string>}
 */
export function getProjectFunders() {
  const set = new Set();
  for (const project of getProjects()) {
    if (Array.isArray(project.funders)) {
      for (const f of project.funders) set.add(f);
    }
  }
  return Array.from(set).sort();
}

/**
 * Retourne la liste des statuts uniques présents dans les projets.
 * @returns {Array<string>}
 */
export function getProjectStatuses() {
  const set = new Set();
  for (const project of getProjects()) {
    if (project.status) set.add(project.status);
  }
  return Array.from(set);
}

/**
 * Retourne les projets triés par date de début décroissante.
 * @returns {Array<Object>}
 */
export function getProjectsSortedByDate() {
  return sortByKey(getProjects(), "startDate", "desc");
}