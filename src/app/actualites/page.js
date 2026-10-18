/**
 * Page Actualités.
 * Server Component.
 * Affiche un état vide professionnel si aucune actualité n'est publiée.
 */

import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import NewsGrid from "@/components/news/NewsGrid";
import { getNews } from "@/services/newsService";
import styles from "./actualites.module.css";

export const metadata = {
  title: "Actualités de la CVD",
  description:
    "Retrouvez les actualités et communiqués officiels de la Coordination des Volontaires de Dédougou.",
};

export default function ActualitesPage() {
  const articles = getNews();

  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Actualités" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="actualites-title">
        <PageContainer>
          <SectionHeading
            id="actualites-title"
            eyebrow="Actualités"
            title="La vie de la CVD"
            description="Retrouvez les communiqués, événements et temps forts de la Coordination des Volontaires de Dédougou."
          />
        </PageContainer>
      </section>

      <section className={styles.gridSection} aria-label="Liste des actualités">
        <PageContainer>
          <NewsGrid articles={articles} />
        </PageContainer>
      </section>
    </>
  );
}