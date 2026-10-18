/**
 * NewsGrid
 * Affiche une collection de NewsCard dans une grille responsive.
 * Gère proprement une liste vide en affichant un EmptyState professionnel.
 *
 * Props :
 * - articles : tableau d'articles
 * - emptyTitle       : titre du message vide (optionnel)
 * - emptyDescription : description du message vide (optionnel)
 */

import NewsCard from "./NewsCard";
import EmptyState from "@/components/ui/EmptyState";
import { Newspaper } from "lucide-react";
import styles from "./NewsGrid.module.css";

export default function NewsGrid({
  articles,
  emptyTitle = "Aucune actualité publiée pour le moment",
  emptyDescription = "Les actualités de la CVD seront publiées ici dès qu'elles seront confirmées.",
}) {
  const list = Array.isArray(articles) ? articles : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon={Newspaper}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <ul className={styles.grid}>
      {list.map((article) => (
        <li key={article.slug} className={styles.item}>
          <NewsCard article={article} />
        </li>
      ))}
    </ul>
  );
}