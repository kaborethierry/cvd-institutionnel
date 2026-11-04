/**
 * Configuration centralisée de l'API.
 * Changez l'URL de base ici pour la production.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Origine du backend (sans /api) : sert à afficher les images uploadées
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

/**
 * Retourne l'URL affichable d'une image stockée en base.
 * - "/uploads/..."  → servi par le backend
 * - "/images/..."   → fichier statique du frontend (dossier public)
 * - "http(s)://..." → inchangé
 */
export function imageUrl(path) {
  if (typeof path !== 'string' || path.trim() === '') return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('/uploads/')) return `${API_ORIGIN}${path}`;
  return path;
}

/**
 * Fonction générique pour les appels API.
 * Gère automatiquement le token JWT et les erreurs.
 */
export async function apiFetch(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('cvd_token') : null;

  const headers = {
    ...options.headers,
  };

  // Si on envoie un fichier (FormData), le navigateur définit lui-même le Content-Type
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      cache: 'no-store',
      ...options,
      headers,
    });
  } catch (networkError) {
    throw new Error('Impossible de joindre le serveur. Vérifiez votre connexion.');
  }

  if (!response.ok) {
    // Token expiré ou invalide : retour à la connexion (uniquement si un token existait)
    if (response.status === 401 && token && typeof window !== 'undefined') {
      localStorage.removeItem('cvd_token');
      localStorage.removeItem('cvd_user');
      window.location.href = '/admin/login';
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Une erreur est survenue.');
  }

  if (response.status === 204) return null;

  return response.json();
}