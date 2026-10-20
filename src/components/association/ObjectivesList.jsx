/**
 * ObjectivesList
 * Affiche l'objectif général et les 8 objectifs spécifiques de la CVD,
 * regroupés par les 3 grands piliers de l'association.
 */

import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { Target, CheckCircle2, HeartPulse, Droplets, Leaf } from "lucide-react";
import {
  generalObjective,
  specificObjectives,
} from "@/data/objectives";
import styles from "./ObjectivesList.module.css";

// Configuration pour l'affichage des 3 piliers
const PILLARS = [
  {
    slug: "sante",
    title: "Santé",
    icon: HeartPulse,
    colorClass: styles.colorGreen,
  },
  {
    slug: "eau-hygiene-assainissement",
    title: "Eau, Hygiène et Assainissement",
    icon: Droplets,
    colorClass: styles.colorBlue,
  },
  {
    slug: "environnement",
    title: "Environnement",
    icon: Leaf,
    colorClass: styles.colorRed,
  },
];

export default function ObjectivesList() {
  const objectives = Array.isArray(specificObjectives) ? specificObjectives : [];

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

        <h3 className={styles.subTitle}>Objectifs spécifiques par pilier</h3>

        <div className={styles.pillarsContainer}>
          {PILLARS.map((pillar) => {
            // Filtrer les objectifs qui appartiennent à ce pilier
            const pillarObjectives = objectives.filter(
              (obj) => obj.domain === pillar.slug
            );

            if (pillarObjectives.length === 0) return null;

            const Icon = pillar.icon;

            return (
              <div key={pillar.slug} className={styles.pillarGroup}>
                <div className={`${styles.pillarHeader} ${pillar.colorClass}`}>
                  <Icon size={24} strokeWidth={2} />
                  <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                </div>
                <ol className={styles.list}>
                  {pillarObjectives.map((objective) => (
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
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}