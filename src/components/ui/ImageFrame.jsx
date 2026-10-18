"use client";

/**
 * ImageFrame
 * Encadre une image avec un ratio cohérent et des coins arrondis.
 * Affiche un placeholder neutre si l'image est absente ou en erreur.
 *
 * Props :
 * - src       : chemin de l'image ou null
 * - alt       : texte alternatif
 * - ratio     : "hero" | "landscape" | "card" | "portrait" | "square"
 * - priority  : transmis à next/image
 * - sizes     : chaîne de sizes
 * - label     : libellé affiché dans le placeholder
 * - rounded   : "sm" | "md" | "lg"
 */

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import styles from "./ImageFrame.module.css";

const RATIOS = {
  hero: "16 / 9",
  landscape: "3 / 2",
  card: "4 / 3",
  portrait: "3 / 4",
  square: "1 / 1",
};

export default function ImageFrame({
  src,
  alt = "",
  ratio = "landscape",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  label,
  rounded = "md",
}) {
  const [imageError, setImageError] = useState(false);
  const aspectRatio = RATIOS[ratio] || RATIOS.landscape;
  const frameClass = `${styles.frame} ${styles[`rounded-${rounded}`]}`;
  const shouldShowPlaceholder = !src || imageError;

  if (shouldShowPlaceholder) {
    return (
      <div
        className={frameClass}
        style={{ aspectRatio }}
        role="img"
        aria-label={label || "Illustration non disponible"}
      >
        <div className={styles.placeholder} aria-hidden="true">
          <ImageIcon size={28} strokeWidth={1.5} />
          {label ? (
            <span className={styles.placeholderLabel}>{label}</span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={frameClass} style={{ aspectRatio }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={styles.image}
        onError={() => setImageError(true)}
      />
    </div>
  );
}