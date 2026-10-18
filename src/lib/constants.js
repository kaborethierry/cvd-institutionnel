/**
 * Constantes partagées du projet.
 */

export const BREAKPOINTS = Object.freeze({
  mobileSmall: 360,
  mobile: 390,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1440,
});

export const CONTAINER_MAX_WIDTH = 1360;

export const SPACING_SCALE = Object.freeze([4, 8, 12, 16, 24, 32, 48, 64, 96]);

export const RADIUS = Object.freeze({
  small: "10px",
  medium: "14px",
  large: "18px",
});

export const PROJECT_STATUS = Object.freeze({
  IN_PROGRESS: "en-cours",
  COMPLETED: "termine",
  TO_CONFIRM: "a-confirmer",
  PLANNED: "planifie",
  UNKNOWN: "inconnu",
});

export const ENTITY_TYPES = Object.freeze({
  PROJECT: "project",
  DOMAIN: "domain",
  PARTNER: "partner",
  NEWS: "news",
  TEAM: "team",
});

export const IMAGE_PRIORITY = Object.freeze({
  HIGH: "high",
  LOW: "low",
  AUTO: "auto",
});

export const META_DESCRIPTION_MAX = 160;

export const CARD_EXCERPT_MAX = 140;