/**
 * Page Présentation de l'association.
 * Assemble les composants officiels. Aucune donnée en dur.
 */

import Link from "next/link";
import { ArrowRight, Target, Users, MapPin } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AssociationIdentity from "@/components/association/AssociationIdentity";
import DomainGrid from "@/components/domains/DomainGrid";
import { association } from "@/data/association";
import { domains } from "@/data/domains";
import styles from "./association.module.css";

export const metadata = {
  title: "Présentation de la CVD",
  description:
    "Découvrez la Coordination des Volontaires de Dédougou (CVD) : son identité, son histoire, sa mission et ses domaines d'intervention.",
};

export default function AssociationPage() {
  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "L'association" },
          ]}
        />
      </PageContainer>

      <AssociationIdentity />

      <section className={styles.quickLinks} aria-labelledby="quick-links-title">
        <PageContainer>
          <h2 id="quick-links-title" className={styles.quickLinksTitle}>
            Aller plus loin
          </h2>
          <ul className={styles.quickLinksList}>
            <li>
              <Link href="/association/histoire" className={styles.quickLink}>
                <span className={styles.quickIcon} aria-hidden="true">
                  <Target size={20} strokeWidth={2} />
                </span>
                <span className={styles.quickText}>
                  <strong>Notre histoire</strong>
                  <span>Les étapes confirmées de notre engagement depuis 1996</span>
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
              </Link>
            </li>
            <li>
              <Link href="/association/missions" className={styles.quickLink}>
                <span className={styles.quickIcon} aria-hidden="true">
                  <Target size={20} strokeWidth={2} />
                </span>
                <span className={styles.quickText}>
                  <strong>Missions et objectifs</strong>
                  <span>Notre objectif général et nos huit objectifs spécifiques</span>
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
              </Link>
            </li>
            <li>
              <Link href="/association/equipe" className={styles.quickLink}>
                <span className={styles.quickIcon} aria-hidden="true">
                  <Users size={20} strokeWidth={2} />
                </span>
                <span className={styles.quickText}>
                  <strong>Équipe dirigeante</strong>
                  <span>Les cinq responsables de la Coordination</span>
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
              </Link>
            </li>
            <li>
              <Link
                href="/association/zones-intervention"
                className={styles.quickLink}
              >
                <span className={styles.quickIcon} aria-hidden="true">
                  <MapPin size={20} strokeWidth={2} />
                </span>
                <span className={styles.quickText}>
                  <strong>Zones d&apos;intervention</strong>
                  <span>Les régions de Bankui et du Sourou</span>
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
              </Link>
            </li>
          </ul>
        </PageContainer>
      </section>

      <section className={styles.domainsSection} aria-labelledby="domains-section-title">
        <PageContainer>
          <header className={styles.domainsHeader}>
            <p className={styles.eyebrow}>Nos domaines</p>
            <h2 id="domains-section-title" className={styles.domainsTitle}>
              Neuf domaines d&apos;intervention complémentaires
            </h2>
            <p className={styles.domainsDescription}>
              La CVD intervient dans neuf domaines qui structurent son action
              auprès des communautés.
            </p>
          </header>

          <DomainGrid domains={domains} />

          <div className={styles.domainsFooter}>
            <Link href="/domaines" className={styles.linkMore}>
              <span>Voir tous les domaines</span>
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

      <section className={styles.ctaSection} aria-labelledby="association-cta-title">
        <PageContainer>
          <div className={styles.ctaCard}>
            <h2 id="association-cta-title" className={styles.ctaTitle}>
              Envie d&apos;en savoir plus sur la CVD&nbsp;?
            </h2>
            <p className={styles.ctaText}>
              Consultez nos projets ou contactez directement notre équipe.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/projets" className={styles.ctaPrimary}>
                Voir nos projets
              </Link>
              <Link href="/contact" className={styles.ctaSecondary}>
                Nous contacter
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}