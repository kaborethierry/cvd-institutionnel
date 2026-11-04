import { Suspense } from "react";
import NewsForm from "@/components/admin/NewsForm";

function EditNewsContent({ id }) {
  return <NewsForm id={id} />;
}

export default async function EditNewsPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<div>Chargement…</div>}>
      <EditNewsContent id={id} />
    </Suspense>
  );
}