"use client";

import { useParams } from "next/navigation";
import DomainForm from "@/components/admin/DomainForm";

export default function EditDomainPage() {
  const { id } = useParams();
  return <DomainForm id={id} />;
}