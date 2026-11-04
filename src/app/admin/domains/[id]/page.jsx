import { Suspense } from "react";
import DomainForm from "@/components/admin/DomainForm";

function EditDomainContent({ id }) {
  return <DomainForm id={id} />;
}

export default async function EditDomainPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Chargement…</div>}>
      <EditDomainContent id={id} />
    </Suspense>
  );
}