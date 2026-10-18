"use client";

/**
 * Interface de récupération en cas d'erreur de rendu.
 * Client Component obligatoire (bouton de nouvelle tentative + log).
 * Aucun détail technique sensible n'est affiché.
 */

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import styles from "./error.module.css";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Log côté client uniquement — ne pas exposer au visiteur
      console.error("[CVD] Erreur de rendu :", error);
    }
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconWrap} aria-hidden="true">
          <AlertTriangle size={32} strokeWidth={1.75} />
        </div>

        <h1 className={styles.title}>
          Une erreur inattendue est survenue
        </h1>

        <p className={styles.description}>
          Le contenu n&apos;a pas pu être chargé. Vous pouvez réessayer ou
          revenir à l&apos;accueil du site.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={() => reset()}
          >
            <RotateCcw
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            />
            <span>Réessayer</span>
          </button>

          <Link href="/" className={styles.secondary}>
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}