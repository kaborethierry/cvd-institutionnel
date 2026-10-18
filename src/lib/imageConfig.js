/**
 * Règles centralisées de gestion des images.
 */

import { BREAKPOINTS } from "@/lib/constants";

export const IMAGE_RATIOS = Object.freeze({
  hero: { width: 16, height: 9 },
  landscape: { width: 3, height: 2 },
  card: { width: 4, height: 3 },
  portrait: { width: 3, height: 4 },
  square: { width: 1, height: 1 },
  logo: { width: 1, height: 1 },
});

export const IMAGE_SIZES = Object.freeze({
  hero: "100vw",
  card: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  thumbnail: "(max-width: 768px) 50vw, 25vw",
  portrait: "(max-width: 768px) 50vw, 33vw",
  logo: "160px",
});

export const IMAGE_QUALITY = 82;

export function getImageFallback() {
  return null;
}

export function isValidImagePath(path) {
  if (typeof path !== "string") return false;
  const trimmed = path.trim();
  if (trimmed.length === 0) return false;
  return /^\/|^https?:\/\//.test(trimmed);
}

export function getRatioDimensions(ratioKey, baseWidth = 1200) {
  const ratio = IMAGE_RATIOS[ratioKey];
  if (!ratio) {
    return { width: baseWidth, height: Math.round((baseWidth * 2) / 3) };
  }
  return {
    width: baseWidth,
    height: Math.round((baseWidth * ratio.height) / ratio.width),
  };
}

export function getImageSizes(usage) {
  return IMAGE_SIZES[usage] || IMAGE_SIZES.card;
}

export function getMediaQueries() {
  return {
    mobileSmall: `(min-width: ${BREAKPOINTS.mobileSmall}px)`,
    mobile: `(min-width: ${BREAKPOINTS.mobile}px)`,
    tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
    desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
    desktopLarge: `(min-width: ${BREAKPOINTS.desktopLarge}px)`,
  };
}