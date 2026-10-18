/**
 * Sitemap généré à partir des routes publiques et des données disponibles.
 * N'inclut PAS de routes inexistantes ni de brouillons.
 *
 * L'URL de production doit être définie via NEXT_PUBLIC_SITE_URL.
 * Tant qu'elle n'est pas confirmée, une URL de repli est utilisée.
 */

import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { domains } from "@/data/domains";
import { news } from "@/data/news";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const now = new Date();

  // Routes institutionnelles statiques (sans les pages dynamiques)
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/association", priority: 0.9, changeFrequency: "monthly" },
    { path: "/association/histoire", priority: 0.8, changeFrequency: "monthly" },
    { path: "/association/missions", priority: 0.8, changeFrequency: "monthly" },
    { path: "/association/equipe", priority: 0.8, changeFrequency: "monthly" },
    {
      path: "/association/zones-intervention",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/domaines", priority: 0.9, changeFrequency: "monthly" },
    { path: "/projets", priority: 0.9, changeFrequency: "weekly" },
    { path: "/partenaires", priority: 0.7, changeFrequency: "monthly" },
    { path: "/actualites", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    {
      path: "/politique-de-confidentialite",
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  const staticEntries = staticRoutes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Pages dynamiques : projets
  const projectEntries = (Array.isArray(projects) ? projects : [])
    .filter((p) => p && p.slug)
    .map((p) => ({
      url: `${BASE_URL}/projets/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Pages dynamiques : domaines
  const domainEntries = (Array.isArray(domains) ? domains : [])
    .filter((d) => d && d.slug)
    .map((d) => ({
      url: `${BASE_URL}/domaines/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Pages dynamiques : actualités publiées uniquement
  const newsEntries = (Array.isArray(news) ? news : [])
    .filter((n) => n && n.slug && n.confirmed !== false)
    .map((n) => ({
      url: `${BASE_URL}/actualites/${n.slug}`,
      lastModified: n.date ? new Date(n.date) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [
    ...staticEntries,
    ...projectEntries,
    ...domainEntries,
    ...newsEntries,
  ];
}