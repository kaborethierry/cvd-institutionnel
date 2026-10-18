/**
 * Construction des métadonnées SEO.
 */

import { truncate } from "@/lib/utils";

export function buildPageMetadata({
  title,
  description = "",
  path = "",
  siteName = "",
  baseUrl = "",
  image = "",
  type = "website",
}) {
  const cleanTitle = typeof title === "string" ? title.trim() : "";
  const cleanDescription = truncate(description, 160);
  const canonicalUrl = joinUrl(baseUrl, path);
  const imageUrl = image ? joinUrl(baseUrl, image) : undefined;

  return {
    title: cleanTitle,
    description: cleanDescription || undefined,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title: cleanTitle,
      description: cleanDescription || undefined,
      url: canonicalUrl || undefined,
      siteName: siteName || undefined,
      type,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export function buildDetailMetadata({
  entity,
  titleField = "title",
  summaryField = "summary",
  pathPrefix = "",
  siteName = "",
  baseUrl = "",
}) {
  if (!entity || typeof entity !== "object") {
    return buildPageMetadata({ title: "", siteName, baseUrl });
  }

  const title = entity[titleField] || entity.title || entity.name || "";
  const description =
    entity[summaryField] || entity.description || entity.excerpt || "";
  const slug = entity.slug || entity.id || "";
  const path = pathPrefix && slug ? `${pathPrefix}/${slug}` : pathPrefix;
  const image = entity.image || entity.coverImage || "";

  return buildPageMetadata({
    title,
    description,
    path,
    siteName,
    baseUrl,
    image,
    type: "article",
  });
}

function joinUrl(base, path) {
  if (!base) return path || "";
  if (!path) return base;
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}