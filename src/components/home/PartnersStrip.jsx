import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPartners } from "@/services/partnersService";
import styles from "./PartnersStrip.module.css";

export default function PartnersStrip() {
  const allPartners = getPartners();
  const list = Array.isArray(allPartners) ? allPartners.slice(0, 12) : [];

  if (list.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="partners-title">
      <PageContainer>
        <SectionHeading
          id="partners-title"
          eyebrow="Partenaires"
          title="Un réseau de coopération institutionnelle"
          description="La CVD agit aux côtés de partenaires techniques, financiers et institutionnels."
          action={{ label: "Tous les partenaires", href: "/partenaires" }}
        />

        <ul className={styles.grid}>
          {list.map((partner) => (
            <li key={partner.slug} className={styles.item}>
              <Link
                href="/partenaires"
                className={styles.card}
                aria-label={`Voir les partenaires : ${partner.name}`}
              >
                <span className={styles.name}>{partner.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}