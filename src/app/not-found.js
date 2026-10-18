/**
 * Page 404 cohérente avec l'identité CVD.
 * Server Component.
 */

import Link from "next/link";
import { Compass, Home, FolderSearch, Building2 } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <PageContainer>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.iconWrap} aria-hidden="true">
            <Compass size={36} strokeWidth={1.5} />
          </div>

          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page introuvable</h1>

          <p className={styles.description}>
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
            Vous pouvez revenir à l&apos;accueil ou explorer les autres
            rubriques du site.
          </p>

          <ul className={styles.links}>
            <li>
              <Link href="/" className={styles.linkPrimary}>
                <Home
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
                <span>Retour à l&apos;accueil</span>
              </Link>
            </li>
            <li>
              <Link href="/projets" className={styles.linkSecondary}>
                <FolderSearch
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
                <span>Voir les projets</span>
              </Link>
            </li>
            <li>
              <Link href="/association" className={styles.linkSecondary}>
                <Building2
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
                <span>Présentation de la CVD</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}