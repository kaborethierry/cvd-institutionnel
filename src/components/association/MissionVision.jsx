/**
 * MissionVision
 * Présente la mission de la CVD.
 * Le bloc "vision" a été retiré sur demande de l'association.
 */

import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { Target } from "lucide-react";
import { association } from "@/data/association";
import styles from "./MissionVision.module.css";

export default function MissionVision() {
  const generalObjective = association.generalObjective || "";

  return (
    <section className={styles.section} aria-labelledby="mission-vision-title">
      <PageContainer>
        <SectionHeading
          id="mission-vision-title"
          eyebrow="Mission"
          title="Notre engagement"
        />

        <div className={styles.grid}>
          {generalObjective ? (
            <article className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Target size={24} strokeWidth={1.75} />
              </div>
              <h3 className={styles.cardTitle}>Notre mission</h3>
              <p className={styles.cardText}>{generalObjective}</p>
            </article>
          ) : null}
        </div>
      </PageContainer>
    </section>
  );
}