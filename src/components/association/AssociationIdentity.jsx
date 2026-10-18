/**
 * AssociationIdentity
 * Présente l'identité officielle de la CVD.
 * Toutes les données viennent de @/data/association.js.
 * Aucune information n'est inventée.
 */

import PageContainer from "@/components/layout/PageContainer";
import { Calendar, MapPin, Award, Building2 } from "lucide-react";
import { association } from "@/data/association";
import styles from "./AssociationIdentity.module.css";

export default function AssociationIdentity() {
  const createdAt = association.createdAtDisplay || "";
  const headquarters = association.headquarters || {};
  const distinction = association.distinction || {};
  const nature = association.nature || {};

  const hasDistinction =
    distinction.title || distinction.dateDisplay || distinction.location;
  const hasHeadquarters = headquarters.city || headquarters.location;

  return (
    <section className={styles.section} aria-labelledby="identity-title">
      <PageContainer>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Identité institutionnelle</p>
          <h1 id="identity-title" className={styles.title}>
            Coordination des Volontaires de Dédougou
          </h1>
          {association.shortDescription ? (
            <p className={styles.lead}>{association.shortDescription}</p>
          ) : null}
        </header>

        <div className={styles.grid}>
          {createdAt ? (
            <article className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Calendar size={20} strokeWidth={2} />
              </div>
              <h2 className={styles.cardTitle}>Création</h2>
              <p className={styles.cardValue}>{createdAt}</p>
              {association.createdAtConfirmed ? (
                <p className={styles.cardNote}>Date confirmée</p>
              ) : null}
            </article>
          ) : null}

          {hasHeadquarters ? (
            <article className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                <MapPin size={20} strokeWidth={2} />
              </div>
              <h2 className={styles.cardTitle}>Siège social</h2>
              <p className={styles.cardValue}>
                {[headquarters.city, headquarters.sector]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {headquarters.location ? (
                <p className={styles.cardNote}>{headquarters.location}</p>
              ) : null}
            </article>
          ) : null}

          {nature.status ? (
            <article className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Building2 size={20} strokeWidth={2} />
              </div>
              <h2 className={styles.cardTitle}>Nature</h2>
              <p className={styles.cardValue}>{nature.status}</p>
              {Array.isArray(nature.qualifications) &&
              nature.qualifications.length > 0 ? (
                <p className={styles.cardNote}>
                  {nature.qualifications.join(" · ")}
                </p>
              ) : null}
            </article>
          ) : null}

          {hasDistinction ? (
            <article className={`${styles.card} ${styles.cardAccent}`}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Award size={20} strokeWidth={2} />
              </div>
              <h2 className={styles.cardTitle}>Distinction</h2>
              {distinction.title ? (
                <p className={styles.cardValue}>{distinction.title}</p>
              ) : null}
              {distinction.mention ? (
                <p className={styles.cardNote}>{distinction.mention}</p>
              ) : null}
              {distinction.dateDisplay || distinction.location ? (
                <p className={styles.cardMeta}>
                  {[distinction.dateDisplay, distinction.location]
                    .filter(Boolean)
                    .join(" — ")}
                </p>
              ) : null}
            </article>
          ) : null}
        </div>

        {association.officialPurpose ? (
          <div className={styles.purpose}>
            <h2 className={styles.purposeTitle}>Objet de l'association</h2>
            <p className={styles.purposeText}>{association.officialPurpose}</p>
          </div>
        ) : null}
      </PageContainer>
    </section>
  );
}