/**
 * NewsArticle
 * Affiche le contenu complet d'une actualité sur sa page individuelle.
 * Reçoit les données par props — ne recherche rien lui-même.
 *
 * Props :
 * - article : objet complet { slug, title, date, excerpt, content, image, imageAlt }
 */

import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import ImageFrame from "@/components/ui/ImageFrame";
import { formatLongDate } from "@/lib/formatters";
import styles from "./NewsArticle.module.css";

export default function NewsArticle({ article }) {
  if (!article || !article.title) return null;

  const dateDisplay = article.date ? formatLongDate(article.date) : null;

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        {dateDisplay ? (
          <p className={styles.meta}>
            <CalendarDays
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
            <time dateTime={article.date}>{dateDisplay}</time>
          </p>
        ) : null}

        <h1 className={styles.title}>{article.title}</h1>

        {article.excerpt ? (
          <p className={styles.excerpt}>{article.excerpt}</p>
        ) : null}
      </header>

      {article.image ? (
        <div className={styles.cover}>
          <ImageFrame
            src={article.image}
            alt={article.imageAlt || ""}
            ratio="hero"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>
      ) : null}

      {article.content ? (
        <div className={`${styles.content} prose`}>
          {typeof article.content === "string" ? (
            article.content
              .split("\n")
              .filter((p) => p.trim().length > 0)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
          ) : Array.isArray(article.content) ? (
            article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : null}
        </div>
      ) : null}

      <footer className={styles.footer}>
        <Link href="/actualites" className={styles.backLink}>
          <ArrowLeft
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          />
          <span>Retour aux actualités</span>
        </Link>
      </footer>
    </article>
  );
}