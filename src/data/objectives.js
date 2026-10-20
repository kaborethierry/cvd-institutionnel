/**
 * Objectifs de la CVD.
 * Le texte officiel des huit objectifs spécifiques est repris fidèlement.
 * Chaque objectif est rattaché à l'un des 3 grands piliers de l'association.
 */

export const generalObjective =
  "Contribuer à la promotion de la santé et à l'amélioration durable des conditions de vie des populations.";

export const specificObjectives = [
  // ─── PILIER 1 : SANTÉ ───
  {
    id: "reponse-pandemies",
    order: 1,
    domain: "sante",
    title: "Réponse aux pandémies et autres maladies",
    description:
      "Contribuer à la réponse nationale aux pandémies et autres maladies telles que le VIH/Sida, les IST, le paludisme, la tuberculose, les hépatites virales, etc.",
  },
  {
    id: "sante-communautaire-qualite",
    order: 2,
    domain: "sante",
    title: "Santé communautaire de qualité",
    description:
      "Renforcer l'offre de services de santé communautaire de qualité dans les zones d'intervention de la CVD.",
  },
  {
    id: "acces-soins-vulnerables",
    order: 3,
    domain: "sante",
    title: "Accès aux soins des personnes vulnérables",
    description:
      "Promouvoir un accès aux soins de santé de qualité aux personnes vulnérables dans les formations sanitaires et dans les communautés.",
  },
  {
    id: "maladies-chroniques",
    order: 4,
    domain: "sante",
    title: "Soutien aux personnes atteintes de maladies chroniques",
    description:
      "Renforcer les capacités des personnes souffrant de maladies chroniques pour une contribution efficiente et efficace aux réponses nationales, une réinsertion sociale et professionnelle, une lutte contre les formes de violences portant atteintes à leur bien-être.",
  },

  // ─── PILIER 2 : EAU, HYGIÈNE ET ASSAINISSEMENT ───
  {
    id: "hygiene-assainissement",
    order: 5,
    domain: "eau-hygiene-assainissement",
    title: "Hygiène et assainissement",
    description:
      "Promouvoir l'accès équitable des populations à des infrastructures et services d'hygiène et d'assainissement adéquats.",
  },
  {
    id: "ressources-eau",
    order: 6,
    domain: "eau-hygiene-assainissement",
    title: "Gestion durable de l'eau",
    description:
      "Renforcer la disponibilité, l'accès et la gestion durable des ressources en eau au profit des communautés.",
  },

  // ─── PILIER 3 : ENVIRONNEMENT ───
  {
    id: "environnement-biodiversite",
    order: 7,
    domain: "environnement",
    title: "Environnement, biodiversité et économie verte",
    description:
      "Promouvoir la protection de l'environnement et de la biodiversité ainsi que la valorisation de l'économie verte et de la sylviculture.",
  },
  {
    id: "resilience-climatique",
    order: 8,
    domain: "environnement",
    title: "Production biologique et résilience climatique",
    description:
      "Encourager l'adoption de modes de production biologique et renforcer la résilience des populations face aux changements climatiques.",
  },
];

export const objectives = specificObjectives;

export default specificObjectives;