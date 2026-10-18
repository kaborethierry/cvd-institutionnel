/**
 * Page Zones d'intervention.
 * Présente uniquement Bankui et Sourou (données officielles).
 * Aucune coordonnée GPS, aucune carte interactive inventée.
 */

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import { interventionAreas } from "@/data/interventionAreas";
import styles from "./zones-intervention.module.css";

export const metadata = {
  title: "Zones d'intervention de la CVD",
  description:
    "La Coordination des Volontaires de Dédougou intervient dans les régions de Bankui et du Sourou, au plus près des communautés.",
};

export default function ZonesInterventionPage() {
  const areas = Array.isArray(interventionAreas) ? interventionAreas : [];

  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "L'association", href: "/association" },
            { label: "Zones d'intervention" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="zones-title">
        <PageContainer>
          <SectionHeading
            id="zones-title"
            eyebrow="Zones d'intervention"
            title="Au plus près des communautés"
            description="La Coordination des Volontaires de Dédougou concentre son action dans deux régions, où elle déploie ses activités de santé communautaire, de nutrition, de WASH et de protection sociale."
          />
        </PageContainer>
      </section>

      {areas.length > 0 ? (
        <section className={styles.areasSection} aria-label="Détail des zones">
          <PageContainer>
            <ul className={styles.areasList}>
              {areas.map((area) => (
                <li key={area.slug} className={styles.areaCard}>
                  <div className={styles.areaIcon} aria-hidden="true">
                    <MapPin size={24} strokeWidth={2} />
                  </div>
                  <h2 className={styles.areaName}>{area.name}</h2>
                  {area.description ? (
                    <p className={styles.areaDescription}>{area.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </PageContainer>
        </section>
      ) : null}

      <section className={styles.projectsSection} aria-labelledby="zones-projects-title">
        <PageContainer>
          <div className={styles.projectsCard}>
            <div>
              <h2 id="zones-projects-title" className={styles.projectsTitle}>
                Les projets menés dans ces zones
              </h2>
              <p className={styles.projectsText}>
                Découvrez les projets concrets que la CVD conduit dans les
                régions de Bankui et du Sourou.
              </p>
            </div>
            <Link href="/projets" className={styles.projectsLink}>
              <span>Voir les projets</span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className={styles.note} aria-label="Note sur la carte">
        <PageContainer>
          <p className={styles.noteText}>
            Une carte géographique détaillée pourra être ajoutée ultérieurement,
            après validation des limites administratives et des localités
            précises par l&apos;association.
          </p>
        </PageContainer>
      </section>
    </>
  );
}