/**
 * StatusBadge
 * Affiche un statut textuel, par exemple « Terminé » ou « À confirmer ».
 * La couleur n'est jamais le seul moyen de communiquer l'information :
 * le libellé textuel est toujours visible.
 *
 * Props :
 * - status  : clé technique ("en-cours", "termine", "a-confirmer",
 *              "planifie", "inconnu") OU libellé libre.
 * - label   : libellé personnalisé (prioritaire sur la normalisation)
 * - size    : "sm" | "md" (défaut "sm")
 */

import { formatStatusLabel, normalizeStatusKey } from "@/lib/formatters";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status, label, size = "sm" }) {
  const key = normalizeStatusKey(status);
  const display = label || formatStatusLabel(key);

  return (
    <span
      className={`${styles.badge} ${styles[key]} ${styles[size]}`}
      role="status"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>{display}</span>
    </span>
  );
}