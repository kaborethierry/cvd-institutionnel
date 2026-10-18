/**
 * HeroSection
 * Section principale de la page d'accueil.
 * Contenu : surtitre, titre, description, deux boutons, carrousel.
 * Server Component — la logique du carrousel est dans HeroCarousel (client).
 */

import { site } from "@/data/site";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import HeroCarousel from "./HeroCarousel";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const shortName = site.shortName || "CVD";

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark} aria-hidden="true" />
            {shortName} — Depuis 1996
          </p>

          <h1 id="hero-title" className={styles.title}>
            Agir au plus près des communautés pour une santé durable et des
            conditions de vie améliorées.
          </h1>

          <p className={styles.description}>
            Depuis 1996, la Coordination des Volontaires de Dédougou œuvre avec
            les communautés pour promouvoir la santé, renforcer la protection
            des populations vulnérables et soutenir le développement durable.
          </p>

          <div className={styles.actions}>
            <PrimaryButton href="/association" size="lg">
              Découvrir la CVD
            </PrimaryButton>
            <SecondaryButton href="/projets" size="lg">
              Explorer nos projets
            </SecondaryButton>
          </div>
        </div>

        <div className={styles.visual}>
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}