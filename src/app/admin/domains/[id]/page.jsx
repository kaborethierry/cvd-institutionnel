import { Suspense } from "react";
import DomainForm from "@/components/admin/DomainForm";

// On enveloppe le composant client qui utilise useParams dans un Suspense
function DomainEditContent({ id }) {
  return <DomainForm id={id} />;
}

export default async function EditDomainPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<div className={styles.loadingState}>Chargement…</div>}>
      <DomainEditContent id={id} />
    </Suspense>
  );
}