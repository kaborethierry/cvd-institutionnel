/**
 * PrimaryButton
 * Action principale, fond vert institutionnel.
 * Peut être rendu comme <button> ou comme <a>/<Link> si `href` est fourni.
 *
 * Props :
 * - children  : contenu du bouton (obligatoire)
 * - href      : si fourni, rend un <Link> Next.js
 * - type      : type du bouton si rendu en <button> (défaut "button")
 * - onClick   : gestionnaire si rendu en <button>
 * - disabled  : désactive le bouton (uniquement si rendu en <button>)
 * - size      : "md" | "lg" (défaut "md")
 * - fullWidth : booléen
 * - icon      : composant lucide-react (optionnel, affiché à droite)
 * - ariaLabel : nom accessible si le texte seul ne suffit pas
 */

import Link from "next/link";
import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({
  children,
  href,
  type = "button",
  onClick,
  disabled = false,
  size = "md",
  fullWidth = false,
  icon: Icon,
  ariaLabel,
}) {
  const className = [
    styles.button,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {Icon ? (
        <Icon
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}