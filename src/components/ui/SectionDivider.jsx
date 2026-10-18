/**
 * SectionDivider
 * Sépare deux sections quand cela améliore réellement la lecture.
 * Par défaut : simple ligne horizontale, sobre.
 *
 * Props :
 * - spacing : "sm" | "md" | "lg" (défaut "md")
 * - variant : "line" | "accent" (défaut "line")
 *             "accent" affiche un petit trait rouge institutionnel,
 *             utilisé avec parcimonie.
 */

import styles from "./SectionDivider.module.css";

export default function SectionDivider({
  spacing = "md",
  variant = "line",
}) {
  return (
    <div
      className={`${styles.wrapper} ${styles[spacing]} ${styles[variant]}`}
      aria-hidden="true"
      role="presentation"
    />
  );
}