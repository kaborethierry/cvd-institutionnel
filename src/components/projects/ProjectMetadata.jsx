/**
 * ProjectMetadata
 * Affiche les métadonnées d'un projet sous forme structurée.
 * Omets tout champ non renseigné.
 *
 * Props :
 * - project : objet projet
 * - layout  : "inline" | "stacked" (défaut "inline")
 */

import { Calendar, Building2, MapPin, Users } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatPeriod } from "@/lib/formatters";
import styles from "./ProjectMetadata.module.css";

export default function ProjectMetadata({ project, layout = "inline" }) {
  if (!project) return null;

  const period = formatPeriod(project.period);
  const funders = Array.isArray(project.funders) ? project.funders : [];
  const partners = Array.isArray(project.partners) ? project.partners : [];
  const locations = Array.isArray(project.locations) ? project.locations : [];
  const hasStatus =
    typeof project.status === "string" && project.status.length > 0;

  const items = [];

  if (hasStatus) {
    items.push({
      key: "status",
      type: "status",
      value: project.status,
    });
  }

  if (period) {
    items.push({
      key: "period",
      icon: Calendar,
      label: "Période",
      value: period,
    });
  }

  if (funders.length > 0) {
    items.push({
      key: "funders",
      icon: Building2,
      label: funders.length > 1 ? "Bailleurs" : "Bailleur",
      value: funders.join(", "),
    });
  }

  if (partners.length > 0) {
    items.push({
      key: "partners",
      icon: Users,
      label: partners.length > 1 ? "Partenaires" : "Partenaire",
      value: partners.join(", "),
    });
  }

  if (locations.length > 0) {
    items.push({
      key: "locations",
      icon: MapPin,
      label: locations.length > 1 ? "Zones" : "Zone",
      value: locations.join(", "),
    });
  }

  if (items.length === 0) return null;

  return (
    <ul
      className={`${styles.list} ${styles[layout]}`}
      aria-label="Informations du projet"
    >
      {items.map((item) => (
        <li key={item.key} className={styles.item}>
          {item.type === "status" ? (
            <StatusBadge status={item.value} size="sm" />
          ) : (
            <>
              {item.icon ? (
                <item.icon
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                  className={styles.icon}
                />
              ) : null}
              <span className={styles.text}>
                <span className={styles.label}>{item.label} : </span>
                {item.value}
              </span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}