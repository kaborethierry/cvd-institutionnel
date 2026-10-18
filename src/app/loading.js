/**
 * État de chargement global.
 * Sobre, accessible, jamais artificiellement long.
 * Server Component.
 */

import PageContainer from "@/components/layout/PageContainer";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <PageContainer>
      <div
        className={styles.wrapper}
        role="status"
        aria-live="polite"
        aria-label="Chargement en cours"
      >
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.text}>Chargement…</p>
      </div>
    </PageContainer>
  );
}