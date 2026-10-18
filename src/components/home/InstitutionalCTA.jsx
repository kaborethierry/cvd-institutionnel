/**
 * InstitutionalCTA
 * Appel à l'action institutionnel.
 * Server Component.
 */

import PageContainer from "@/components/layout/PageContainer";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import styles from "./InstitutionalCTA.module.css";

export default function InstitutionalCTA() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <PageContainer>
        <div className={styles.card}>
          <div className={styles.content}>
            <h2 id="cta-title" className={styles.title}>
              Vous souhaitez en savoir plus sur les actions de la CVD ?
            </h2>
            <p className={styles.description}>
              Découvrez nos projets, nos domaines d'intervention et prenez
              contact avec notre équipe pour toute question ou collaboration.
            </p>
          </div>

          <div className={styles.actions}>
            <PrimaryButton href="/projets" size="lg">
              Découvrir nos projets
            </PrimaryButton>
            <SecondaryButton href="/contact" size="lg">
              Nous contacter
            </SecondaryButton>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}