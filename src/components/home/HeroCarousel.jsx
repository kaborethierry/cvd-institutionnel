"use client";

/**
 * HeroCarousel
 * Carrousel accessible de diapositives visuelles.
 *
 * IMPORTANT :
 * - Aucune image inventée. Si aucune image n'est fournie par
 *   l'association, l'ImageFrame affiche un placeholder neutre.
 * - Respecte prefers-reduced-motion : pas d'autoplay si activé.
 * - Commandes clavier accessibles (flèches, boutons, indicateurs).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import ImageFrame from "@/components/ui/ImageFrame";
import styles from "./HeroCarousel.module.css";

/**
 * Diapositives disponibles.
 * Les images pointent vers les emplacements officiels prévus.
 * Si l'image n'existe pas, ImageFrame affiche un placeholder propre.
 */
const SLIDES = [
  {
    id: "sante",
    title: "Santé communautaire",
    description:
      "Prévention, sensibilisation et accompagnement des communautés.",
    image: "/images/hero/hero-sante.jpg",
    alt: "Illustration de la santé communautaire",
  },
  {
    id: "communautes",
    title: "Accompagnement des communautés",
    description:
      "Actions de proximité au plus près des populations vulnérables.",
    image: "/images/hero/hero-communautes.jpg",
    alt: "Illustration de l'accompagnement des communautés",
  },
  {
    id: "environnement",
    title: "Eau, environnement et développement durable",
    description:
      "Accès à l'eau, hygiène, assainissement et protection de l'environnement.",
    image: "/images/hero/hero-environnement.jpg",
    alt: "Illustration de l'eau et du développement durable",
  },
];

const AUTOPLAY_MS = 7000;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = SLIDES.length;
  const intervalRef = useRef(null);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  // Autoplay contrôlable, désactivé si prefers-reduced-motion
  useEffect(() => {
    if (!playing || reducedMotion) return undefined;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, reducedMotion, total]);

  function goTo(i) {
    if (total === 0) return;
    setIndex(((i % total) + total) % total);
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  }

  const currentSlide = useMemo(() => SLIDES[index] || SLIDES[0], [index]);

  if (total === 0) return null;

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Visuels institutionnels"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.viewport}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${i === index ? styles.active : ""}`}
            aria-hidden={i !== index ? "true" : undefined}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${total}`}
          >
            <ImageFrame
              src={slide.image}
              alt={slide.alt}
              ratio="hero"
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              label={slide.title}
              rounded="lg"
            />
            <div className={styles.caption}>
              <h3 className={styles.captionTitle}>{slide.title}</h3>
              <p className={styles.captionText}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlBtn}
          aria-label="Diapositive précédente"
          onClick={prev}
        >
          <ChevronLeft
            size={20}
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          />
        </button>

        {!reducedMotion ? (
          <button
            type="button"
            className={styles.controlBtn}
            aria-label={
              playing
                ? "Mettre en pause le défilement automatique"
                : "Démarrer le défilement automatique"
            }
            aria-pressed={playing}
            onClick={() => setPlaying((v) => !v)}
          >
            {playing ? (
              <Pause
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
            ) : (
              <Play
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
            )}
          </button>
        ) : null}

        <button
          type="button"
          className={styles.controlBtn}
          aria-label="Diapositive suivante"
          onClick={next}
        >
          <ChevronRight
            size={20}
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          />
        </button>
      </div>

      <div className={styles.indicators} role="tablist">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Aller à la diapositive ${i + 1} : ${slide.title}`}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <p className="visuallyHidden" aria-live="polite">
        Diapositive {index + 1} sur {total} : {currentSlide.title}
      </p>
    </div>
  );
}