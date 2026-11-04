// Ce fichier est un Server Component (pas de "use client")
// Il désactive la validation "instant navigation" pour ce segment

export const instant = false;

export default function DomainEditLayout({ children }) {
  return <>{children}</>;
}