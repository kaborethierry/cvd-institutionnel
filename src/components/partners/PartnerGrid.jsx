import PartnerCard from "./PartnerCard";
import EmptyState from "@/components/ui/EmptyState";
import { Handshake } from "lucide-react";
import styles from "./PartnerGrid.module.css";

export default function PartnerGrid({ partners, emptyTitle, emptyDescription }) {
  const list = Array.isArray(partners) ? partners : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon={Handshake}
        title={emptyTitle || "Aucun partenaire disponible"}
        description={
          emptyDescription ||
          "Les partenaires de la CVD seront présentés prochainement."
        }
      />
    );
  }

  return (
    <ul className={styles.grid}>
      {list.map((partner, index) => (
        <li key={partner.slug || partner.id} className={styles.item}>
          <PartnerCard partner={partner} index={index} />
        </li>
      ))}
    </ul>
  );
}