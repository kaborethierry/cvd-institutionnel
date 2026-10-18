/**
 * DomainGrid
 * Grille responsive des domaines d'intervention.
 * Reçoit `domains` par props.
 */

import DomainCard from "./DomainCard";
import EmptyState from "@/components/ui/EmptyState";
import { LayoutGrid } from "lucide-react";
import styles from "./DomainGrid.module.css";

export default function DomainGrid({ domains, emptyTitle, emptyDescription }) {
  const list = Array.isArray(domains) ? domains : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon={LayoutGrid}
        title={emptyTitle || "Aucun domaine disponible"}
        description={
          emptyDescription ||
          "Les domaines d'intervention seront publiés prochainement."
        }
      />
    );
  }

  return (
    <ul className={styles.grid}>
      {list.map((domain) => (
        <li key={domain.slug} className={styles.item}>
          <DomainCard domain={domain} />
        </li>
      ))}
    </ul>
  );
}