/**
 * TeamMemberCard
 * Carte sobre et professionnelle d'un membre de l'équipe.
 * Aucune photo inventée : initiales dans un cercle si pas d'image.
 */

import Image from "next/image";
import { getInitials } from "@/data/team";
import styles from "./TeamMemberCard.module.css";

export default function TeamMemberCard({ member }) {
  if (!member || !member.name) return null;

  const initials = getInitials(member.name);
  const hasImage =
    typeof member.image === "string" && member.image.trim().length > 0;
  const hasRole = typeof member.role === "string" && member.role.trim().length > 0;

  return (
    <article className={styles.card}>
      <div className={styles.avatarWrap}>
        {hasImage ? (
          <Image
            src={member.image}
            alt={member.imageAlt || `Portrait de ${member.name}`}
            width={120}
            height={120}
            className={styles.avatar}
          />
        ) : (
          <span
            className={styles.avatarFallback}
            aria-hidden="true"
            role="img"
            aria-label="Portrait non disponible"
          >
            {initials}
          </span>
        )}
      </div>

      <h3 className={styles.name}>{member.name}</h3>

      {hasRole ? <p className={styles.role}>{member.role}</p> : null}
    </article>
  );
}