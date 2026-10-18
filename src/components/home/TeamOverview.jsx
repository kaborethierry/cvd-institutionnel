/**
 * TeamOverview
 * Aperçu des 5 responsables CVD.
 * Server Component.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamGrid from "@/components/team/TeamGrid";
import { teamMembers } from "@/data/team";
import styles from "./TeamOverview.module.css";

export default function TeamOverview() {
  const members = Array.isArray(teamMembers) ? teamMembers : [];

  return (
    <section className={styles.section} aria-labelledby="team-overview-title">
      <PageContainer>
        <SectionHeading
          id="team-overview-title"
          eyebrow="Équipe dirigeante"
          title="Une équipe engagée au service des communautés"
          description="Rencontrez les responsables qui portent la mission de la CVD au quotidien."
          action={{ label: "Voir l'équipe complète", href: "/association/equipe" }}
        />

        <TeamGrid members={members} />

        <div className={styles.footer}>
          <Link href="/association/equipe" className={styles.link}>
            <span>En savoir plus sur l'équipe</span>
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
  );
}