/**
 * Service des actualités.
 * La liste peut être vide sans faire échouer le site.
 */

import { news as localNews } from "@/data/news";
import { sortByKey } from "@/lib/utils";

/**
 * Retourne la liste complète des actualités, triées par date décroissante.
 * @returns {Array<Object>}
 */
export function getNews() {
  if (!Array.isArray(localNews) || localNews.length === 0) return [];
  return sortByKey(localNews, "date", "desc");
}

/**
 * Retourne une actualité par son slug.
 * @param {string} slug
 * @returns {Object|null}
 */
export function getNewsBySlug(slug) {
  if (typeof slug !== "string" || slug.trim().length === 0) return null;
  const list = getNews();
  return list.find((n) => n.slug === slug) ?? null;
}

/**
 * Retourne les dernières actualités (limitées à un nombre donné).
 * @param {number} [limit]
 * @returns {Array<Object>}
 */
export function getLatestNews(limit = 3) {
  const list = getNews();
  if (!Number.isFinite(limit) || limit <= 0) return list;
  return list.slice(0, limit);
}

/**
 * Indique si des actualités sont disponibles.
 * @returns {boolean}
 */
export function hasNews() {
  return getNews().length > 0;
}