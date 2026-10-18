/**
 * DomainDetail
 * Page de détail d'un domaine d'intervention.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, HeartPulse, Utensils, Users, Wheat, ShieldCheck, Droplets, Lightbulb, HandHeart, Leaf, CheckCircle2 } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ProjectCard from "@/components/projects/ProjectCard";
import { getProjectsByDomain } from "@/services/projectsService";
import styles from "./DomainDetail.module.css";

const ICONS = {
  "sante-communautaire": HeartPulse,
  nutrition: Utensils,
  "sante-reproductive": Users,
  "securite-alimentaire": Wheat,
  "protection-sociale": ShieldCheck,
  "eau-hygiene-assainissement": Droplets,
  entrepreneuriat: Lightbulb,
  "cohesion-sociale": HandHeart,
  environnement: Leaf,
};

export default function DomainDetail({ domain }) {
  if (!domain || !domain.title) return null;

  const Icon = ICONS[domain.slug] || Leaf;
  const summary = domain.summary || domain.shortDescription || "";
  const description = domain.description || "";
  const activities = Array.isArray(domain.activities) ? domain.activities : [];
  const beneficiaries = Array.isArray(domain.beneficiaries) ? domain.beneficiaries : [];
  const relatedProjects = getProjectsByDomain(domain.slug);
  const hasImage = typeof domain.image === "string" && domain.image.trim().length > 0;

  return (
    <PageContainer>
      <article className={styles.article}>
        <div className={styles.header}>
          <Link href="/domaines" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" focusable="false" />
            <span>Tous les domaines</span>
          </Link>

          <div className={styles.hero}>
            <div className={styles.iconWrap} aria-hidden="true">
              <Icon size={32} strokeWidth={1.75} />
            </div>

            <div className={styles.titleBlock}>
              <p className={styles.eyebrow}>Domaine d'intervention</p>
              <h1 className={styles.title}>{domain.title}</h1>
              {summary ? <p className={styles.summary}>{summary}</p> : null}
            </div>
          </div>
        </div>

        {/* Affichage de l'image principale du domaine */}
        {hasImage ? (
          <div className={styles.coverWrap}>
            <Image
              src={domain.image}
              alt={domain.imageAlt || domain.title}
              width={1200}
              height={600}
              className={styles.coverImage}
              priority
            />
          </div>
        ) : null}

        {description ? (
          <section className={styles.section} aria-labelledby="domain-description-title">
            <h2 id="domain-description-title" className={styles.sectionTitle}>
              Présentation
            </h2>
            <p className={styles.text}>{description}</p>
          </section>
        ) : null}

        {activities.length > 0 ? (
          <section className={styles.section} aria-labelledby="domain-activities-title">
            <h2 id="domain-activities-title" className={styles.sectionTitle}>
              Activités conduites
            </h2>
            <ul className={styles.list}>
              {activities.map((activity, i) => (
                <li key={i} className={styles.listItem}>
                  <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" focusable="false" className={styles.listIcon} />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {beneficiaries.length > 0 ? (
          <section className={styles.section} aria-labelledby="domain-beneficiaries-title">
            <h2 id="domain-beneficiaries-title" className={styles.sectionTitle}>
              Publics bénéficiaires
            </h2>
            <ul className={styles.list}>
              {beneficiaries.map((b, i) => (
                <li key={i} className={styles.listItem}>
                  <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" focusable="false" className={styles.listIcon} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {relatedProjects.length > 0 ? (
          <section className={styles.section} aria-labelledby="domain-projects-title">
            <h2 id="domain-projects-title" className={styles.sectionTitle}>
              Projets associés
            </h2>
            <ul className={styles.projectsGrid}>
              {relatedProjects.map((project) => (
                <li key={project.slug} className={styles.projectItem}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </PageContainer>
  );
}