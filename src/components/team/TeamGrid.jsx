/**
 * TeamGrid
 * Grille responsive des membres de l'équipe.
 * Reçoit `members` par props — n'importe pas de données lui-même.
 */

import TeamMemberCard from "./TeamMemberCard";
import EmptyState from "@/components/ui/EmptyState";
import { Users } from "lucide-react";
import styles from "./TeamGrid.module.css";

export default function TeamGrid({ members, emptyTitle, emptyDescription }) {
  const list = Array.isArray(members) ? members : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title={emptyTitle || "L'équipe sera présentée prochainement"}
        description={
          emptyDescription ||
          "Les informations sur l'équipe dirigeante sont en cours de validation."
        }
      />
    );
  }

  return (
    <ul className={styles.grid}>
      {list.map((member) => (
        <li key={member.id} className={styles.item}>
          <TeamMemberCard member={member} />
        </li>
      ))}
    </ul>
  );
}