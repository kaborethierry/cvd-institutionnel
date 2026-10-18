import { ExternalLink } from "lucide-react";
import styles from "./PartnerCard.module.css";

export default function PartnerCard({ partner, index = 0 }) {
  if (!partner || !partner.name) return null;

  const name = partner.name;
  const fullName = partner.fullName || "";
  const hasLogo = typeof partner.logo === "string" && partner.logo.trim().length > 0;
  const hasWebsite = typeof partner.website === "string" && partner.website.trim().length > 0;

  // Alternance des couleurs : Vert, Bleu, Rouge
  const colorClass = index % 3 === 0 ? styles.colorGreen : index % 3 === 1 ? styles.colorBlue : styles.colorRed;

  const content = (
    <div className={styles.card}>
      {hasLogo ? (
        <img
          src={partner.logo}
          alt={`Logo de ${fullName || name}`}
          className={styles.logo}
          loading="lazy"
        />
      ) : (
        <span className={`${styles.mark} ${colorClass}`} aria-hidden="true">
          {name.slice(0, 3).toUpperCase()}
        </span>
      )}

      <div className={styles.text}>
        <p className={styles.name}>{name}</p>
        {fullName && fullName !== name ? (
          <p className={styles.fullName}>{fullName}</p>
        ) : null}
      </div>

      {hasWebsite ? (
        <ExternalLink
          size={16}
          strokeWidth={2.5}
          aria-hidden="true"
          focusable="false"
          className={styles.externalIcon}
        />
      ) : null}
    </div>
  );

  if (hasWebsite) {
    return (
      <a
        href={partner.website}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visiter le site de ${fullName || name}`}
      >
        {content}
      </a>
    );
  }

  return <div className={styles.link}>{content}</div>;
}