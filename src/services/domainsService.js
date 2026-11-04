/**
 * Service des domaines.
 * Lit les données depuis l'API backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Récupère tous les domaines
export async function getDomains() {
  try {
    const res = await fetch(`${API_URL}/domains`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

// Récupère un domaine par slug
export async function getDomainBySlug(slug) {
  if (typeof slug !== "string" || slug.trim() === "") return null;
  try {
    const res = await fetch(`${API_URL}/domains/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}