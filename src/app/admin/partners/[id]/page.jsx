import { Suspense } from "react";
import PartnerForm from "@/components/admin/PartnerForm";

function EditPartnerContent({ id }) {
  return <PartnerForm id={id} />;
}

export default async function EditPartnerPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Chargement…</div>}>
      <EditPartnerContent id={id} />
    </Suspense>
  );
}