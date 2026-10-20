/**
 * DomainCard
 * Carte d'un domaine d'intervention avec image.
 */

import Link from "next/link";
import Image from "next/image";
import { HeartPulse, Droplets, Leaf, ArrowRight } from "lucide-react";
import styles from "./DomainCard.module.css";

// Mapping mis à jour pour les 3 grands domaines
const ICONS = {
  sante: HeartPulse,
  "eau-hygiene-assainissement": Droplets,
  environnement: Leaf,
};

export default function DomainCard({ domain }) {
  if (!domain || !domain.slug || !domain.title) return null;

  const Icon = ICONS[domain.slug] || Leaf;
  const summary = domain.summary || domain.shortDescription || "";
  const hasImage = typeof domain.image === "string" && domain.image.trim().length > 0;

  return (
    <article className={styles.card}>
      {/* Affichage de l'image si elle existe */}
      {hasImage ? (
        <div className={styles.imageWrap}>
          <Image
            src={domain.image}
            alt={domain.imageAlt || domain.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
      ) : null}

      <div className={styles.content}>
        <div className={styles.iconWrap} aria-hidden="true">
          <Icon size={28} strokeWidth={1.75} />
        </div>

        <h3 className={styles.title}>
          <Link href={`/domaines/${domain.slug}`} className={styles.titleLink}>
            {domain.title}
          </Link>
        </h3>

        {summary ? <p className={styles.summary}>{summary}</p> : null}

        <div className={styles.action}>
          <Link
            href={`/domaines/${domain.slug}`}
            className={styles.actionLink}
            aria-label={`En savoir plus sur le domaine : ${domain.title}`}
          >
            <span>En savoir plus</span>
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              focusable="false"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}