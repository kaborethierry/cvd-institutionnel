/**
 * Directives d'indexation et lien vers le sitemap.
 * Toutes les pages publiques sont indexables.
 * Les routes réservées à un futur espace privé seraient exclues ici.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}