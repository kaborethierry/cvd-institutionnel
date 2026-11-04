"use client";

import { useParams } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";

export default function EditNewsPage() {
  const { id } = useParams();
  return <NewsForm id={id} />;
}