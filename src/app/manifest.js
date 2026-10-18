/**
 * Manifeste de base pour l'installation PWA.
 * Aucune fonctionnalité hors ligne n'est annoncée tant qu'elle
 * n'est pas développée.
 */

import { site } from "@/data/site";

export default function manifest() {
  return {
    name: site.name || "Coordination des Volontaires de Dédougou",
    short_name: site.shortName || "CVD",
    description: site.description || "",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7f5",
    theme_color: "#145c3a",
    lang: site.language || "fr",
    dir: "ltr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}