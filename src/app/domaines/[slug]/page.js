/**
 * Page de détail d'un domaine.
 * Server Component. Slugs inconnus → notFound().
 * Métadonnées générées depuis les données.
 */

import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DomainDetail from "@/components/domains/DomainDetail";
import { domains } from "@/data/domains";

export async function generateStaticParams() {
  return domains.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const domain = domains.find((d) => d.slug === slug);

  if (!domain) {
    return {
      title: "Domaine introuvable",
    };
  }

  const description = domain.summary || domain.description || "";

  return {
    title: domain.title,
    description:
      description.length > 160 ? `${description.slice(0, 157)}…` : description,
  };
}

export default async function DomainPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const domain = domains.find((d) => d.slug === slug);

  if (!domain) {
    notFound();
  }

  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Domaines", href: "/domaines" },
            { label: domain.title },
          ]}
        />
      </PageContainer>

      <DomainDetail domain={domain} />
    </>
  );
}