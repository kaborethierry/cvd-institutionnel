/**
 * Page Domaines d'intervention.
 * Server Component.
 */

import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import DomainGrid from "@/components/domains/DomainGrid";
import { domains } from "@/data/domains";
import styles from "./domaines.module.css";

export const metadata = {
  title: "Domaines d'intervention de la CVD",
  description:
    "Les neuf domaines d'intervention de la Coordination des Volontaires de Dédougou : santé communautaire, nutrition, santé sexuelle et reproductive, sécurité alimentaire, protection sociale, WASH, entrepreneuriat, cohésion sociale et environnement.",
};

export default function DomainesPage() {
  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Domaines d'intervention" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="domaines-title">
        <PageContainer>
          <SectionHeading
            id="domaines-title"
            eyebrow="Nos domaines"
            title="Neuf domaines pour agir au plus près des besoins"
            description="La CVD structure son action autour de neuf domaines complémentaires, en cohérence avec sa mission de promotion de la santé et d'amélioration durable des conditions de vie des populations."
          />
        </PageContainer>
      </section>

      <section className={styles.gridSection} aria-label="Liste des domaines">
        <PageContainer>
          <DomainGrid domains={domains} />
        </PageContainer>
      </section>
    </>
  );
}