/**
 * ValuesGrid
 * Affiche les valeurs de la CVD.
 *
 * IMPORTANT : aucune valeur officielle n'est documentée dans les
 * informations fournies. Le composant lit `association.values`.
 * Si aucune valeur n'est disponible, il affiche un état vide
 * professionnel — il n'invente AUCUNE valeur.
 */

import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import { Heart } from "lucide-react";
import { association } from "@/data/association";
import styles from "./ValuesGrid.module.css";

export default function ValuesGrid() {
  const values = Array.isArray(association.values) ? association.values : [];

  return (
    <section className={styles.section} aria-labelledby="values-title">
      <PageContainer>
        <SectionHeading
          id="values-title"
          eyebrow="Nos valeurs"
          title="Les principes qui guident notre action"
        />

        {values.length > 0 ? (
          <ul className={styles.grid}>
            {values.map((value) => (
              <li key={value.id || value.title} className={styles.card}>
                <h3 className={styles.title}>{value.title}</h3>
                {value.description ? (
                  <p className={styles.description}>{value.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={Heart}
            title="Les valeurs de la CVD seront publiées prochainement"
            description="Les valeurs officielles de l'association sont en cours de validation."
          />
        )}
      </PageContainer>
    </section>
  );
}