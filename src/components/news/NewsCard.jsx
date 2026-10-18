/**
 * NewsCard
 * Affiche une actualité individuelle sous forme de carte.
 * Aucune donnée fictive : si une information manque, elle n'est pas affichée.
 *
 * Props :
 * - article : objet { slug, title, date, excerpt, image, imageAlt }
 */

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import ImageFrame from "@/components/ui/ImageFrame";
import { formatLongDate } from "@/lib/formatters";
import styles from "./NewsCard.module.css";

export default function NewsCard({ article }) {
  if (!article || !article.slug || !article.title) return null;

  const dateDisplay = article.date ? formatLongDate(article.date) : null;

  return (
    <article className={styles.card}>
      <Link
        href={`/actualites/${article.slug}`}
        className={styles.imageLink}
        aria-label={`Lire l'actualité : ${article.title}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ImageFrame
          src={article.image || null}
          alt={article.imageAlt || ""}
          ratio="card"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          label="Actualité"
        />
      </Link>

      <div className={styles.body}>
        {dateDisplay ? (
          <p className={styles.date}>
            <CalendarDays
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
            <time dateTime={article.date}>{dateDisplay}</time>
          </p>
        ) : null}

        <h3 className={styles.title}>
          <Link href={`/actualites/${article.slug}`} className={styles.titleLink}>
            {article.title}
          </Link>
        </h3>

        {article.excerpt ? (
          <p className={styles.excerpt}>{article.excerpt}</p>
        ) : null}

        <div className={styles.action}>
          <Link
            href={`/actualites/${article.slug}`}
            className={styles.actionLink}
          >
            <span>Lire l'article</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}