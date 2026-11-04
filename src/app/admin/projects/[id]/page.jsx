import { Suspense } from "react";
import ProjectForm from "@/components/admin/ProjectForm";

function EditProjectContent({ id }) {
  return <ProjectForm id={id} />;
}

export default async function EditProjectPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Chargement…</div>}>
      <EditProjectContent id={id} />
    </Suspense>
  );
}