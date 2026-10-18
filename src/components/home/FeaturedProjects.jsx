/**
 * FeaturedProjects
 * Aperçu de projets sélectionnés.
 * Server Component.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/services/projectsService";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <section className={styles.section} aria-labelledby="featured-title">
      <PageContainer>
        <SectionHeading
          id="featured-title"
          eyebrow="Projets"
          title="Une sélection de nos interventions"
          description="Découvrez quelques-unes des actions menées par la CVD aux côtés de ses partenaires."
          action={{ label: "Tous les projets", href: "/projets" }}
        />

        {featured.length > 0 ? (
          <ul className={styles.grid}>
            {featured.map((project) => (
              <li key={project.slug} className={styles.item}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            Les projets seront publiés prochainement.
          </p>
        )}

        <div className={styles.footer}>
          <Link href="/projets" className={styles.link}>
            <span>Voir tous les projets</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}