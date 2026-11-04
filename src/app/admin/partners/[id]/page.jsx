"use client";

import { useParams } from "next/navigation";
import PartnerForm from "@/components/admin/PartnerForm";

export default function EditPartnerPage() {
  const { id } = useParams();
  return <PartnerForm id={id} />;
}