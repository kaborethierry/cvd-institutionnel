import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Building2,
  MapPin,
  Users,
  Target,
  CheckCircle2,
} from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatPeriod } from "@/lib/formatters";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetail({ project }) {
  if (!project || !project.title) return null;

  const title = project.title;
  const summary = project.summary || "";
  const description = project.description || "";
  const period = formatPeriod(project.period);
  const funders = Array.isArray(project.funders) ? project.funders : [];
  const partners = Array.isArray(project.partners) ? project.partners : [];
  const locations = Array.isArray(project.locations) ? project.locations : [];
  const activities = Array.isArray(project.activities) ? project.activities : [];
  const hasStatus = typeof project.status === "string" && project.status.length > 0;
  const hasImage = typeof project.image === "string" && project.image.trim().length > 0;

  return (
    <PageContainer>
      <article className={styles.article}>
        <div className={styles.header}>
          <Link href="/projets" className={styles.backLink}>
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Retour aux projets</span>
          </Link>

          <div className={styles.titleRow}>
            <h1 className={styles.title}>{title}</h1>
            {hasStatus ? <StatusBadge status={project.status} size="md" /> : null}
          </div>

          {summary ? <p className={styles.summary}>{summary}</p> : null}
        </div>

        {/* Image de couverture (si elle existe) */}
        {hasImage ? (
          <div className={styles.coverWrap}>
            <Image
              src={project.image}
              alt={project.imageAlt || title}
              width={1200}
              height={600}
              className={styles.coverImage}
              priority
            />
          </div>
        ) : null}

        {/* Grille d'informations */}
        <div className={styles.metaGrid}>
          {period ? (
            <div className={styles.metaItem}>
              <Calendar size={20} strokeWidth={2} className={styles.metaIcon} />
              <div>
                <p className={styles.metaLabel}>Période</p>
                <p className={styles.metaValue}>{period}</p>
              </div>
            </div>
          ) : null}

          {funders.length > 0 ? (
            <div className={styles.metaItem}>
              <Building2 size={20} strokeWidth={2} className={styles.metaIcon} />
              <div>
                <p className={styles.metaLabel}>{funders.length > 1 ? "Bailleurs" : "Bailleur"}</p>
                <p className={styles.metaValue}>{funders.join(", ")}</p>
              </div>
            </div>
          ) : null}

          {partners.length > 0 ? (
            <div className={styles.metaItem}>
              <Users size={20} strokeWidth={2} className={styles.metaIcon} />
              <div>
                <p className={styles.metaLabel}>{partners.length > 1 ? "Partenaires" : "Partenaire"}</p>
                <p className={styles.metaValue}>{partners.join(", ")}</p>
              </div>
            </div>
          ) : null}

          {locations.length > 0 ? (
            <div className={styles.metaItem}>
              <MapPin size={20} strokeWidth={2} className={styles.metaIcon} />
              <div>
                <p className={styles.metaLabel}>{locations.length > 1 ? "Zones" : "Zone"}</p>
                <p className={styles.metaValue}>{locations.join(", ")}</p>
              </div>
            </div>
          ) : null}
        </div>

        {description ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Présentation du projet</h2>
            <p className={styles.text}>{description}</p>
          </section>
        ) : null}

        {activities.length > 0 ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Activités conduites</h2>
            <ul className={styles.list}>
              {activities.map((activity, i) => (
                <li key={i} className={styles.listItem}>
                  <CheckCircle2 size={20} strokeWidth={2} className={styles.listIcon} />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </PageContainer>
  );
}