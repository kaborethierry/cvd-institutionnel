import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Building2 } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatPeriod } from "@/lib/formatters";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  if (!project || !project.slug || !project.title) return null;

  const title = project.shortTitle || project.title;
  const summary = project.summary || "";
  const period = formatPeriod(project.period);
  const funder =
    Array.isArray(project.funders) && project.funders.length > 0
      ? project.funders[0]
      : null;
  const hasStatus = typeof project.status === "string" && project.status.length > 0;
  const hasImage = typeof project.image === "string" && project.image.trim().length > 0;

  return (
    <article className={styles.card}>
      <Link href={`/projets/${project.slug}`} className={styles.imageLink}>
        {hasImage ? (
          <div className={styles.imageWrap}>
            <Image
              src={project.image}
              alt={project.imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.image}
            />
          </div>
        ) : (
          <div className={styles.placeholderWrap}>
            <span className={styles.placeholderText}>{title}</span>
          </div>
        )}
      </Link>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          {hasStatus ? <StatusBadge status={project.status} /> : null}
          {period ? (
            <span className={styles.meta}>
              <Calendar size={14} strokeWidth={2.5} />
              {period}
            </span>
          ) : null}
        </div>

        <h3 className={styles.title}>
          <Link href={`/projets/${project.slug}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>

        {summary ? <p className={styles.summary}>{summary}</p> : null}

        {funder ? (
          <p className={styles.funder}>
            <Building2 size={16} strokeWidth={2.5} />
            <span>{funder}</span>
          </p>
        ) : null}

        <div className={styles.action}>
          <Link href={`/projets/${project.slug}`} className={styles.actionLink}>
            <span>Découvrir le projet</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}