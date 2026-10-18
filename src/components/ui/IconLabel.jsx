/**
 * IconLabel
 * Associe une icône lucide-react à un court libellé.
 * Utilisé pour les coordonnées, méta-informations, statuts de carte.
 *
 * Props :
 * - icon      : composant lucide-react (obligatoire)
 * - children  : libellé (obligatoire)
 * - label     : alternative textuelle complète, si différente de children
 * - variant   : "default" | "muted" (défaut "default")
 * - size      : "sm" | "md" (défaut "md")
 * - as        : "span" | "div" (défaut "span")
 * - iconHidden: masque l'icône aux lecteurs d'écran (défaut true)
 */

import styles from "./IconLabel.module.css";

export default function IconLabel({
  icon: Icon,
  children,
  label,
  variant = "default",
  size = "md",
  as: Tag = "span",
  iconHidden = true,
}) {
  if (!Icon) return null;

  return (
    <Tag
      className={`${styles.wrapper} ${styles[variant]} ${styles[size]}`}
      aria-label={label}
    >
      <Icon
        size={size === "sm" ? 14 : 16}
        strokeWidth={2}
        className={styles.icon}
        aria-hidden={iconHidden ? "true" : undefined}
        focusable="false"
      />
      <span className={styles.text}>{children}</span>
    </Tag>
  );
}