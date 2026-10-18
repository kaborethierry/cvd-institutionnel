/**
 * Service de contact.
 *
 * IMPORTANT : aucune transmission réelle n'est effectuée dans cette version.
 * Tant qu'aucune API ni aucun fournisseur d'envoi n'est configuré,
 * le service retourne un statut explicite "not-configured".
 * Il ne simule jamais un succès.
 *
 * Lorsqu'un backend sera disponible, la fonction `sendContactMessage`
 * appellera l'API sans que les composants n'aient à être réécrits.
 */

/**
 * Envoie un message de contact.
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} payload.subject
 * @param {string} payload.message
 * @returns {Promise<{ok: boolean, status: string, message: string}>}
 */
export async function sendContactMessage(payload) {
  // Aucune configuration d'envoi n'est fournie à ce stade.
  // On ne simule JAMAIS un succès.
  return {
    ok: false,
    status: "not-configured",
    message:
      "Le formulaire de contact n'est pas encore connecté à un service d'envoi. Veuillez utiliser le téléphone ou l'adresse électronique indiqués sur la page Contact.",
  };
}

/**
 * Indique si un service d'envoi est configuré.
 * @returns {boolean}
 */
export function isContactServiceConfigured() {
  return false;
}

/**
 * Retourne un lien mailto de repli, utilisable tant que le service
 * d'envoi n'est pas configuré.
 * @param {string} email
 * @param {string} [subject]
 * @returns {string}
 */
export function buildMailtoLink(email, subject = "") {
  if (typeof email !== "string" || email.trim().length === 0) return "";
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${params}`;
}