/**
 * Page Équipe dirigeante.
 * Composition circulaire sur desktop (TeamCircle), grille classique
 * sur mobile et tablette (TeamGrid). Basé sur le CSS, pas de JS.
 */

import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamCircle from "@/components/team/TeamCircle";
import TeamGrid from "@/components/team/TeamGrid";
import { teamMembers } from "@/data/team";
import styles from "./equipe.module.css";

export const metadata = {
  title: "Équipe dirigeante de la CVD",
  description:
    "Les cinq responsables qui composent l'équipe dirigeante de la Coordination des Volontaires de Dédougou.",
};

export default function EquipePage() {
  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "L'association", href: "/association" },
            { label: "Équipe dirigeante" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="equipe-title">
        <PageContainer>
          <SectionHeading
            id="equipe-title"
            eyebrow="Équipe dirigeante"
            title="Les responsables de la Coordination"
            description="La Coordination des Volontaires de Dédougou est portée par une équipe de cinq responsables élus, chacun investi d'une mission spécifique au service des communautés."
          />
        </PageContainer>
      </section>

      <section
        className={styles.circleSection}
        aria-label="Représentation circulaire de l'équipe"
      >
        <PageContainer>
          <TeamCircle members={teamMembers} />
        </PageContainer>
      </section>

      <section className={styles.gridSection} aria-label="Grille de l'équipe">
        <PageContainer>
          <TeamGrid members={teamMembers} />
        </PageContainer>
      </section>
    </>
  );
}