/**
 * Page de détail d'un projet.
 * Server Component. Slugs inconnus → notFound().
 * Métadonnées générées depuis les données du projet.
 */

import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { getProjectBySlug, getProjects } from "@/services/projectsService";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projet introuvable" };
  }

  const description = project.summary || project.description || "";

  return {
    title: project.shortTitle || project.title,
    description:
      description.length > 160 ? `${description.slice(0, 157)}…` : description,
  };
}

export default async function ProjetPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Projets", href: "/projets" },
            { label: project.shortTitle || project.title },
          ]}
        />
      </PageContainer>

      <ProjectDetail project={project} />
    </>
  );
}