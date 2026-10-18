import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectsPageClient from "./ProjectsPageClient";
import styles from "./projets.module.css";

export const metadata = {
  title: "Projets et actions de la CVD",
  description:
    "Découvrez les projets de la Coordination des Volontaires de Dédougou aux côtés de ses partenaires techniques et financiers.",
};

export default function ProjetsPage() {
  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Projets" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="projets-title">
        <PageContainer>
          <SectionHeading
            id="projets-title"
            eyebrow="Nos projets"
            title="Des interventions concrètes sur le terrain"
            description="Découvrez les projets menés par la Coordination des Volontaires de Dédougou aux côtés de ses partenaires techniques et financiers."
          />
        </PageContainer>
      </section>

      <ProjectsPageClient />
    </>
  );
}