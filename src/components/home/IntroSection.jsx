/**
 * IntroSection
 * Courte présentation de la CVD.
 * Server Component.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { association } from "@/data/association";
import styles from "./IntroSection.module.css";

export default function IntroSection() {
  const shortDescription = association.shortDescription || "";

  return (
    <section className={styles.section} aria-labelledby="intro-title">
      <PageContainer>
        <div className={styles.grid}>
          <div className={styles.lead}>
            <p className={styles.eyebrow}>Qui sommes-nous</p>
            <h2 id="intro-title" className={styles.title}>
              Une association burkinabè au service des communautés depuis 1996
            </h2>
          </div>

          <div className={styles.body}>
            {shortDescription ? (
              <p className={styles.text}>{shortDescription}</p>
            ) : null}

            <Link href="/association" className={styles.link}>
              <span>En savoir plus sur la CVD</span>
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}