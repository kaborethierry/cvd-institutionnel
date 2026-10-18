/**
 * Page Histoire de la CVD.
 * N'affiche QUE les dates confirmées (1996, 2002, 2008).
 * Aucune date inventée.
 */

import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import HistoryTimeline from "@/components/association/HistoryTimeline";
import styles from "./histoire.module.css";

export const metadata = {
  title: "Histoire de la CVD",
  description:
    "Découvrez les étapes confirmées de l'histoire de la Coordination des Volontaires de Dédougou, depuis sa création en 1996 jusqu'à sa distinction nationale en 2008.",
};

export default function HistoirePage() {
  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "L'association", href: "/association" },
            { label: "Histoire" },
          ]}
        />
      </PageContainer>

      <section className={styles.intro} aria-labelledby="histoire-title">
        <PageContainer>
          <SectionHeading
            id="histoire-title"
            eyebrow="Notre histoire"
            title="Un engagement continu depuis 1996"
            description="La Coordination des Volontaires de Dédougou inscrit son action dans la durée, aux côtés des communautés. Les étapes ci-dessous sont celles communiquées et confirmées par l'association."
          />
        </PageContainer>
      </section>

      <HistoryTimeline />
    </>
  );
}