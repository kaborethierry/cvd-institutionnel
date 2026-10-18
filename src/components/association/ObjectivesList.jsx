/**
 * ObjectivesList
 * Affiche l'objectif général et les 8 objectifs spécifiques de la CVD.
 * Textes officiels — aucune reformulation.
 */

import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { Target, CheckCircle2 } from "lucide-react";
import {
  generalObjective,
  specificObjectives,
} from "@/data/objectives";
import styles from "./ObjectivesList.module.css";

export default function ObjectivesList() {
  const objectives = Array.isArray(specificObjectives)
    ? [...specificObjectives].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <section className={styles.section} aria-labelledby="objectives-title">
      <PageContainer>
        <SectionHeading
          id="objectives-title"
          eyebrow="Objectifs"
          title="Ce que la CVD s'engage à accomplir"
        />

        {generalObjective ? (
          <div className={styles.generalCard}>
            <div className={styles.generalIcon} aria-hidden="true">
              <Target size={24} strokeWidth={1.75} />
            </div>
            <div>
              <p className={styles.generalLabel}>Objectif général</p>
              <p className={styles.generalText}>{generalObjective}</p>
            </div>
          </div>
        ) : null}

        {objectives.length > 0 ? (
          <>
            <h3 className={styles.subTitle}>Objectifs spécifiques</h3>
            <ol className={styles.list}>
              {objectives.map((objective) => (
                <li key={objective.id} className={styles.item}>
                  <div className={styles.itemIcon} aria-hidden="true">
                    <CheckCircle2 size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.itemContent}>
                    <h4 className={styles.itemTitle}>{objective.title}</h4>
                    <p className={styles.itemText}>{objective.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </>
        ) : null}
      </PageContainer>
    </section>
  );
}