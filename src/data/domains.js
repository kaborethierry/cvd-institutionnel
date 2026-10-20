/**
 * Domaines d'intervention de la CVD.
 * L'association s'articule autour de 3 piliers fondamentaux.
 * Les autres thématiques (nutrition, SSR, etc.) sont des activités concrètes.
 */

export const domains = [
  {
    id: "sante",
    slug: "sante",
    title: "Santé",
    summary:
      "Promotion de la santé, prévention, soins communautaires et accompagnement psychosocial.",
    description:
      "Le domaine de la Santé est le pilier principal de la CVD. Il englobe la promotion de la santé, la prévention des maladies, les soins communautaires, l'accompagnement psychosocial et le soutien en santé mentale, au profit des personnes affectées par les maladies chroniques et celles mal ou peu connues.",
    activities: [
      "Santé communautaire et visites à domicile",
      "Nutrition et prise en charge de la malnutrition",
      "Santé sexuelle et reproductive / Planification familiale",
      "Sécurité alimentaire (champs écoles, jardins nutritifs)",
      "Protection sociale et accompagnement des personnes vulnérables",
      "Lutte contre le VIH/Sida, le paludisme et les pandémies",
      "Cohésion sociale et implication des leaders"
    ],
    image: "/images/domaines/sante.jpg",
    imageAlt: "Illustration de la santé communautaire",
  },
  {
    id: "eau-hygiene-assainissement",
    slug: "eau-hygiene-assainissement",
    title: "Eau, Hygiène et Assainissement",
    summary:
      "Accès équitable à l'eau potable, promotion de l'hygiène et assainissement au profit des populations.",
    description:
      "L'accès à l'eau est une priorité qui facilite la réponse aux autres domaines. La CVD réalise des activités de sensibilisation, construit des forages et des latrines, et promeut des services d'assainissement écologiques durables au profit des communautés rurales et urbaines.",
    activities: [
      "Construction de forages et accès à l'eau potable",
      "Construction de latrines et assainissement",
      "Sensibilisation à l'hygiène",
      "Promotion des services d'assainissement écologiques durables (EcoSan)",
      "Entrepreneuriat (création de richesses et AGR liées à l'eau)"
    ],
    image: "/images/domaines/eau-hygiene-assainissement.jpg",
    imageAlt: "Illustration de l'eau, l'hygiène et l'assainissement",
  },
  {
    id: "environnement",
    slug: "environnement",
    title: "Environnement",
    summary:
      "Protection de la nature, régénération des sols et promotion de techniques innovantes.",
    description:
      "La protection de l'environnement s'étend de la sensibilisation à la régénération de la nature en passant par la récupération des sols dégradés et la promotion des techniques innovantes. Ce domaine inclut également le développement durable et la valorisation de l'économie verte.",
    activities: [
      "Sensibilisation à la protection de l'environnement",
      "Régénération de la nature et récupération des sols dégradés",
      "Promotion de techniques agricoles innovantes et durables",
      "Économie verte et sylviculture"
    ],
    image: "/images/domaines/environnement.jpg",
    imageAlt: "Illustration de la protection de l'environnement",
  },
];

export default domains;