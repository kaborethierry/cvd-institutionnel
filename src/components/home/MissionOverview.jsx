/**
 * MissionOverview
 * Affiche l'objectif général officiel de la CVD.
 * Server Component.
 */

import { Target } from "lucide-react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import { association } from "@/data/association";
import styles from "./MissionOverview.module.css";

export default function MissionOverview() {
  const generalObjective = association.generalObjective || "";

  return (
    <section className={styles.section} aria-labelledby="mission-title">
      <PageContainer>
        <div className={styles.card}>
          <div className={styles.iconWrap} aria-hidden="true">
            <Target size={28} strokeWidth={1.75} />
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>Notre mission</p>
            <h2 id="mission-title" className={styles.title}>
              {generalObjective || "Notre objectif général"}
            </h2>

            <Link href="/association/missions" className={styles.link}>
              Découvrir nos objectifs spécifiques
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}