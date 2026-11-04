// Server Component — désactive la validation "instant navigation"
// pour cette page qui utilise useParams dans un Client Component.

export const instant = false;

export default function DomainEditLayout({ children }) {
  return <>{children}</>;
}