/**
 * MissionVision
 * Présente la mission de la CVD.
 * La vision officielle n'est pas documentée — le composant n'en
 * affiche aucune et signale clairement que la formulation sera
 * publiée si elle est validée par l'association.
 */

import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { Target, Compass } from "lucide-react";
import { association } from "@/data/association";
import styles from "./MissionVision.module.css";

export default function MissionVision() {
  const generalObjective = association.generalObjective || "";
  const vision = association.vision || null; // non fourni : null

  return (
    <section className={styles.section} aria-labelledby="mission-vision-title">
      <PageContainer>
        <SectionHeading
          id="mission-vision-title"
          eyebrow="Mission et vision"
          title="Notre engagement, notre horizon"
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

          {vision ? (
            <article className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Compass size={24} strokeWidth={1.75} />
              </div>
              <h3 className={styles.cardTitle}>Notre vision</h3>
              <p className={styles.cardText}>{vision}</p>
            </article>
          ) : (
            <article className={`${styles.card} ${styles.cardPending}`}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Compass size={24} strokeWidth={1.75} />
              </div>
              <h3 className={styles.cardTitle}>Notre vision</h3>
              <p className={styles.cardText}>
                La formulation officielle de la vision de la CVD sera publiée
                ici dès qu'elle aura été validée par l'association.
              </p>
            </article>
          )}
        </div>
      </PageContainer>
    </section>
  );
}