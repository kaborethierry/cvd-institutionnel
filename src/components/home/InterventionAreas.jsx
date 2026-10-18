/**
 * InterventionAreas
 * Présentation des zones d'intervention.
 * Aucune coordonnée GPS inventée.
 * Server Component.
 */

import { MapPin } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { interventionAreas } from "@/data/interventionAreas";
import styles from "./InterventionAreas.module.css";

export default function InterventionAreas() {
  const areas = Array.isArray(interventionAreas) ? interventionAreas : [];

  if (areas.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="areas-title">
      <PageContainer>
        <SectionHeading
          id="areas-title"
          eyebrow="Zones d'intervention"
          title="Au plus près des communautés"
          description="La CVD intervient dans les régions de Bankui et du Sourou."
        />

        <ul className={styles.grid}>
          {areas.map((area, index) => (
            <li key={area.slug} className={`${styles.item} ${index % 2 === 0 ? styles.colorGreen : styles.colorBlue}`}>
              <div className={styles.iconWrap} aria-hidden="true">
                <MapPin size={24} strokeWidth={2.5} />
              </div>
              <h3 className={styles.name}>{area.name}</h3>
              {area.description ? (
                <p className={styles.description}>{area.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}