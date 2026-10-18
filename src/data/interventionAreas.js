/**
 * Zones d'intervention de la CVD.
 * Sources : liste officielle fournie par l'association.
 * Aucune commune supplémentaire n'est ajoutée sans source.
 */

export const interventionAreas = [
  {
    id: "bankui",
    slug: "bankui",
    name: "Région de Bankui",
    shortName: "Bankui",
    description:
      "Zone d'intervention de la CVD dans la région de Bankui, où l'association conduit ses actions de santé communautaire, de nutrition et de protection sociale.",
    communes: [],
    image: null,
    imageAlt: null,
    confirmed: true,
  },
  {
    id: "sourou",
    slug: "sourou",
    name: "Région du Sourou",
    shortName: "Sourou",
    description:
      "Zone d'intervention de la CVD dans la région du Sourou, où l'association développe ses actions communautaires, notamment dans le domaine de la santé et de l'eau, de l'hygiène et de l'assainissement.",
    communes: [],
    image: null,
    imageAlt: null,
    confirmed: true,
  },
  {
    id: "mouhoun",
    slug: "mouhoun",
    name: "Province du Mouhoun",
    shortName: "Mouhoun",
    description:
      "Province du Mouhoun, zone de plusieurs projets de la CVD notamment dans les communes de Bondoukuy, Kona et Safané.",
    communes: ["Bondoukuy", "Kona", "Safané"],
    image: null,
    imageAlt: null,
    confirmed: true,
  },
  {
    id: "boucle-du-mouhoun",
    slug: "boucle-du-mouhoun",
    name: "Région de la Boucle du Mouhoun",
    shortName: "Boucle du Mouhoun",
    description:
      "Région administrative de la Boucle du Mouhoun, où la CVD intervient dans plusieurs districts sanitaires, notamment à Dédougou et dans six districts sanitaires de la région.",
    communes: ["Dédougou", "Boromo"],
    image: null,
    imageAlt: null,
    confirmed: true,
  },
];

export default interventionAreas;