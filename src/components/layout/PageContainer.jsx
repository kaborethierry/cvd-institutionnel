/**
 * PageContainer
 * Conteneur central commun.
 * - largeur max via --container-width
 * - marges automatiques
 * - espacement horizontal responsive
 * - variante `narrow` pour la lecture longue
 *
 * Props :
 * - children : contenu
 * - narrow   : largeur réduite (760px) pour articles
 * - as       : balise HTML (défaut "div")
 * - className: classe additionnelle (optionnelle)
 */

import styles from "./PageContainer.module.css";

export default function PageContainer({
  children,
  narrow = false,
  as: Tag = "div",
  className = "",
}) {
  const combined = [
    styles.container,
    narrow ? styles.narrow : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={combined}>{children}</Tag>;
}