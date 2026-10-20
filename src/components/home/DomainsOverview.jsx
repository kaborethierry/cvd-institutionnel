/**
 * DomainsOverview
 * Aperçu des 3 domaines d'intervention.
 * Server Component.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import DomainCard from "@/components/domains/DomainCard";
import { domains } from "@/data/domains";
import styles from "./DomainsOverview.module.css";

export default function DomainsOverview() {
  const preview = Array.isArray(domains) ? domains.slice(0, 3) : [];

  return (
    <section className={styles.section} aria-labelledby="domains-title">
      <PageContainer>
        <SectionHeading
          id="domains-title"
          eyebrow="Nos domaines"
          title="Trois grands piliers pour un impact durable"
          description="La CVD structure son action autour de trois domaines fondamentaux : la Santé, l'Eau, l'Hygiène et l'Assainissement, et l'Environnement."
          action={{ label: "Tous les domaines", href: "/domaines" }}
        />

        {preview.length > 0 ? (
          <ul className={styles.grid}>
            {preview.map((domain) => (
              <li key={domain.slug} className={styles.item}>
                <DomainCard domain={domain} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Les domaines seront publiés prochainement.</p>
        )}

        <div className={styles.footer}>
          <Link href="/domaines" className={styles.link}>
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
  );
}