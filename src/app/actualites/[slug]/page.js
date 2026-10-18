// src/app/actualites/[slug]/page.js — variante sans CSS Module
// (remplace le fichier complet ci-dessus si tu préfères)

import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import NewsArticle from "@/components/news/NewsArticle";
import { getNews, getNewsBySlug } from "@/services/newsService";

export async function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const article = getNewsBySlug(slug);

  if (!article) return { title: "Actualité introuvable" };

  const description = article.excerpt || "";

  return {
    title: article.title,
    description:
      description.length > 160 ? `${description.slice(0, 157)}…` : description,
  };
}

export default async function ActualitePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const article = getNewsBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Actualités", href: "/actualites" },
            { label: article.title },
          ]}
        />
      </PageContainer>

      <PageContainer>
        <NewsArticle article={article} />
      </PageContainer>
    </>
  );
}