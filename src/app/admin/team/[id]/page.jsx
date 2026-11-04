import { Suspense } from "react";
import TeamForm from "@/components/admin/TeamForm";

function EditTeamMemberContent({ id }) {
  return <TeamForm id={id} />;
}

export default async function EditTeamMemberPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Chargement…</div>}>
      <EditTeamMemberContent id={id} />
    </Suspense>
  );
}