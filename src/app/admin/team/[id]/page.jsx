"use client";

import { useParams } from "next/navigation";
import TeamForm from "@/components/admin/TeamForm";

export default function EditTeamMemberPage() {
  const { id } = useParams();
  return <TeamForm id={id} />;
}