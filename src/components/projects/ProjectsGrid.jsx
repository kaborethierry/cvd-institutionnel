/**
 * ProjectsGrid
 * Grille responsive des projets.
 * Reçoit `projects` par props. Affiche un EmptyState si la liste est vide.
 */

import ProjectCard from "./ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import { FolderSearch } from "lucide-react";
import styles from "./ProjectsGrid.module.css";

export default function ProjectsGrid({
  projects,
  emptyTitle,
  emptyDescription,
}) {
  const list = Array.isArray(projects) ? projects : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon={FolderSearch}
        title={emptyTitle || "Aucun projet trouvé"}
        description={
          emptyDescription ||
          "Essayez de modifier les filtres ou revenez plus tard."
        }
      />
    );
  }

  return (
    <ul className={styles.grid}>
      {list.map((project) => (
        <li key={project.slug} className={styles.item}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}