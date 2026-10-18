/**
 * EmptyState
 * Affiche un message clair lorsqu'aucune donnée n'est disponible.
 * Utilisé par les grilles (projets, partenaires, actualités) en cas de
 * résultat vide ou de contenu non publié.
 *
 * Props :
 * - icon        : composant lucide-react (optionnel)
 * - title       : titre principal (obligatoire)
 * - description : texte explicatif (optionnel)
 * - action      : objet { label, href } ou { label, onClick } (optionnel)
 * - variant     : "default" | "compact" (défaut "default")
 */

import Link from "next/link";
import { Inbox } from "lucide-react";
import styles from "./EmptyState.module.css";

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  variant = "default",
}) {
  const hasHref = action?.href;
  const hasOnClick = typeof action?.onClick === "function";

  return (
    <div
      className={`${styles.wrapper} ${styles[variant]}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <Icon size={28} strokeWidth={1.75} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      {description ? (
        <p className={styles.description}>{description}</p>
      ) : null}

      {action && action.label ? (
        <div className={styles.action}>
          {hasHref ? (
            <Link href={action.href} className={styles.actionLink}>
              {action.label}
            </Link>
          ) : hasOnClick ? (
            <button
              type="button"
              className={styles.actionLink}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}