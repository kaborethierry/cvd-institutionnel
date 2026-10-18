/**
 * Breadcrumbs
 * Fil d'Ariane accessible.
 * Reçoit une liste `items` : [{ label, href }, ...].
 * Le dernier élément est la page courante, non cliquable.
 *
 * Props :
 * - items : tableau d'items { label, href? }
 */

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {!isLast && item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`${styles.current} ${
                    isLast ? styles.last : ""
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  size={14}
                  strokeWidth={2}
                  className={styles.separator}
                  aria-hidden="true"
                  focusable="false"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}