/**
 * Page Partenaires.
 * Server Component.
 */

import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import PartnerGrid from "@/components/partners/PartnerGrid";
import { getPartners } from "@/services/partnersService";
import styles from "./partenaires.module.css";

export const metadata = {
  title: "Partenaires institutionnels de la CVD",
  description:
    "Découvrez les partenaires techniques, financiers et institutionnels qui accompagnent la Coordination des Volontaires de Dédougou.",
};

export default function PartenairesPage() {
  const partners = getPartners();

  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Partenaires" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="partenaires-title">
        <PageContainer>
          <SectionHeading
            id="partenaires-title"
            eyebrow="Nos partenaires"
            title="Un réseau de coopération institutionnelle"
            description="La Coordination des Volontaires de Dédougou agit aux côtés de partenaires techniques, financiers et institutionnels, nationaux et internationaux."
          />
        </PageContainer>
      </section>

      <section className={styles.gridSection} aria-label="Liste des partenaires">
        <PageContainer>
          <PartnerGrid partners={partners} />
        </PageContainer>
      </section>

      <section className={styles.note} aria-label="Note éditoriale">
        <PageContainer>
          <p className={styles.noteText}>
            Les logos officiels des partenaires seront ajoutés dès qu&apos;ils
            seront transmis. En attendant, une présentation typographique est
            utilisée.
          </p>
        </PageContainer>
      </section>
    </>
  );
}