"use client";

/**
 * Partie cliente de la page Projets.
 * Gère l'état des filtres et la liste filtrée.
 */

import { useMemo, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import {
  filterProjects,
  getProjectFunders,
  getProjectStatuses,
} from "@/services/projectsService";
import { domains } from "@/data/domains";
import styles from "./projets.module.css";

export default function ProjectsPageClient() {
  const [filters, setFilters] = useState({});

  const allFunders = useMemo(() => getProjectFunders(), []);
  const allStatuses = useMemo(() => getProjectStatuses(), []);
  const filteredProjects = useMemo(
    () => filterProjects(filters),
    [filters]
  );

  return (
    <>
      <section
        className={styles.filtersSection}
        aria-label="Filtres des projets"
      >
        <PageContainer>
          <ProjectFilters
            filters={filters}
            onChange={setFilters}
            domains={domains}
            funders={allFunders}
            statuses={allStatuses}
          />
        </PageContainer>
      </section>

      <section className={styles.gridSection} aria-label="Liste des projets">
        <PageContainer>
          <ProjectsGrid
            projects={filteredProjects}
            emptyTitle="Aucun projet ne correspond aux filtres sélectionnés"
            emptyDescription="Essayez de modifier ou de réinitialiser les filtres."
          />
        </PageContainer>
      </section>
    </>
  );
}