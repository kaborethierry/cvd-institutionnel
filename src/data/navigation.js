/**
 * Navigation commune au site CVD.
 * Source unique de vérité pour l'en-tête, le pied de page et le fil d'Ariane.
 */

export const mainNavigation = [
  { label: "Accueil", href: "/" },
  {
    label: "L'association",
    href: "/association",
    children: [
      { label: "Présentation", href: "/association" },
      { label: "Histoire", href: "/association/histoire" },
      { label: "Missions", href: "/association/missions" },
      { label: "Zones d'intervention", href: "/association/zones-intervention" },
    ],
  },
  { label: "Domaines", href: "/domaines" },
  { label: "Projets", href: "/projets" },
  { label: "Équipe", href: "/association/equipe" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = [
  {
    title: "L'association",
    links: [
      { label: "Présentation", href: "/association" },
      { label: "Histoire", href: "/association/histoire" },
      { label: "Missions", href: "/association/missions" },
      { label: "Équipe dirigeante", href: "/association/equipe" },
      { label: "Zones d'intervention", href: "/association/zones-intervention" },
    ],
  },
  {
    title: "Nos actions",
    links: [
      { label: "Domaines d'intervention", href: "/domaines" },
      { label: "Projets", href: "/projets" },
      { label: "Partenaires", href: "/partenaires" },
      { label: "Actualités", href: "/actualites" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    ],
  },
];

export const legalNavigation = [
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
];

export default mainNavigation;