/**
 * Page Missions et objectifs.
 * Reprend l'objectif général et les 8 objectifs spécifiques officiels.
 * Aucune reformulation réductrice.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import MissionVision from "@/components/association/MissionVision";
import ObjectivesList from "@/components/association/ObjectivesList";
import { domains } from "@/data/domains";
import styles from "./missions.module.css";

export const metadata = {
  title: "Missions et objectifs de la CVD",
  description:
    "Objectif général et huit objectifs spécifiques de la Coordination des Volontaires de Dédougou pour la promotion de la santé et l'amélioration durable des conditions de vie des populations.",
};

export default function MissionsPage() {
  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "L'association", href: "/association" },
            { label: "Missions et objectifs" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="missions-title">
        <PageContainer>
          <SectionHeading
            id="missions-title"
            eyebrow="Missions et objectifs"
            title="Ce que la CVD s'engage à accomplir"
            description="La Coordination des Volontaires de Dédougou structure son action autour d'un objectif général et de huit objectifs spécifiques, en cohérence avec ses domaines d'intervention."
          />
        </PageContainer>
      </section>

      <MissionVision />
      <ObjectivesList />

      <section className={styles.domainsLink} aria-labelledby="missions-domains-title">
        <PageContainer>
          <div className={styles.domainsCard}>
            <div>
              <p className={styles.eyebrow}>Domaines d&apos;intervention</p>
              <h2 id="missions-domains-title" className={styles.domainsTitle}>
                Ces objectifs se traduisent dans neuf domaines d&apos;action
              </h2>
              <p className={styles.domainsText}>
                Découvrez comment la CVD décline concrètement sa mission dans
                chacun de ses domaines d&apos;intervention.
              </p>
            </div>
            <Link href="/domaines" className={styles.domainsLink}>
              <span>Voir les domaines</span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
            </Link>
          </div>
          <p className={styles.domainsCount}>
            {Array.isArray(domains) && domains.length > 0
              ? `${domains.length} domaines d'intervention`
              : "Les domaines seront publiés prochainement."}
          </p>
        </PageContainer>
      </section>
    </>
  );
}