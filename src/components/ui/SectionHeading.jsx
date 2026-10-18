/**
 * SectionHeading
 * Affiche un surtitre, un titre, une description et éventuellement
 * un lien d'action. Utilisé en tête de section dans tout le site.
 *
 * Props :
 * - eyebrow   : surtitre (optionnel)
 * - title     : titre de section (obligatoire)
 * - description : texte descriptif (optionnel)
 * - align     : "left" | "center" (défaut "left")
 * - level     : 2 | 3 (niveau de titre HTML, défaut 2)
 * - action    : objet { label, href } (optionnel)
 * - id        : identifiant du titre, utilisé pour aria-labelledby
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = 2,
  action,
  id,
}) {
  const HeadingTag = level === 3 ? "h3" : "h2";

  return (
    <header
      className={`${styles.wrapper} ${styles[align]}`}
      aria-labelledby={id}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

      <HeadingTag id={id} className={styles.title}>
        {title}
      </HeadingTag>

      {description ? (
        <p className={styles.description}>{description}</p>
      ) : null}

      {action && action.href && action.label ? (
        <div className={styles.action}>
          <Link href={action.href} className={styles.actionLink}>
            <span>{action.label}</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
          </Link>
        </div>
      ) : null}
    </header>
  );
}