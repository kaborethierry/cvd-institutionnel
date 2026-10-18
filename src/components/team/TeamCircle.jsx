import Image from "next/image";
import { getInitials } from "@/data/team";
import styles from "./TeamCircle.module.css";

export default function TeamCircle({ members }) {
  const list = Array.isArray(members) ? members : [];
  if (list.length === 0) return null;

  const presidentIndex = list.findIndex(
    (m) => typeof m.role === "string" && m.role.toLowerCase().includes("président")
  );
  const centerIndex = presidentIndex >= 0 ? presidentIndex : 0;
  const center = list[centerIndex];
  const others = list.filter((_, i) => i !== centerIndex);

  return (
    <div className={styles.wrapper}>
      {center ? (
        <div className={styles.spot}>
          <TeamCircleItem member={center} variant="center" />
        </div>
      ) : null}

      {others.length > 0 ? (
        <ul className={styles.orbit}>
          {others.map((member) => (
            <li key={member.id} className={styles.orbitItem}>
              <TeamCircleItem member={member} variant="orbit" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function TeamCircleItem({ member, variant }) {
  if (!member || !member.name) return null;

  const isCenter = variant === "center";
  const initials = getInitials(member.name);
  const hasImage = typeof member.image === "string" && member.image.trim().length > 0;
  const hasRole = typeof member.role === "string" && member.role.trim().length > 0;

  return (
    <div className={`${styles.item} ${isCenter ? styles.itemCenter : styles.itemOrbit}`}>
      <div className={styles.avatar}>
        {hasImage ? (
          <Image
            src={member.image}
            alt={member.imageAlt || `Portrait de ${member.name}`}
            width={isCenter ? 160 : 120}
            height={isCenter ? 160 : 120}
            className={styles.photo}
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      <p className={styles.name}>{member.name}</p>
      {hasRole ? <p className={styles.role}>{member.role}</p> : null}
    </div>
  );
}