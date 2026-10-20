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
    "La Coordination des Volontaires de Dédougou structure son action autour de trois grands domaines : Santé, Eau-Hygiène-Assainissement et Environnement.",
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
            title="Trois grands piliers d'intervention"
            description="La CVD concentre son action autour de trois domaines fondamentaux : la Santé, l'Eau, l'Hygiène et l'Assainissement, et l'Environnement. Découvrez les activités concrètes menées dans chacun de ces piliers."
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