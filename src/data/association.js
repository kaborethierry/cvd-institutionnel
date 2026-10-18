/**
 * Présentation institutionnelle de la CVD.
 */

export const association = {
  createdAt: "1996-02-26",
  createdAtDisplay: "26 février 1996",
  createdAtConfirmed: true,

  headquarters: {
    city: "Dédougou",
    sector: "Secteur n° 5",
    location: "Enceinte de la Direction Régionale de la Santé (trypano)",
    country: "Burkina Faso",
    confirmed: true,
  },

  distinction: {
    date: "2008-12-01",
    dateDisplay: "1er décembre 2008",
    location: "Kaya",
    title: "Chevalier de l'Ordre du Mérite burkinabè",
    mention: "Agrafe Santé et Action sociale",
    confirmed: true,
  },

  nature: {
    status: "Association à but non lucratif",
    qualifications: [
      "apolitique",
      "non confessionnelle",
      "à vocation permanente",
    ],
    confirmed: true,
  },

  generalObjective:
    "Contribuer à la promotion de la santé et à l'amélioration durable des conditions de vie des populations.",

  officialPurpose:
    "La CVD a pour objet la réalisation d'actions dans les domaines de la Santé, de l'Eau, de l'Hygiène et de l'Assainissement, de l'Environnement et du Développement durable.",

  membership:
    "L'association regroupe des femmes et des hommes désignant de façon libre et engagée œuvrer au développement social et durable.",

  // Non fournie par l'association : null pour empêcher tout affichage inventé.
  vision: null,

  // Aucune valeur officielle fournie : tableau vide pour un état vide propre.
  values: [],

  shortDescription:
    "La Coordination des Volontaires de Dédougou est une association burkinabè née en 1996 de la mobilisation de volontaires engagés aux côtés des communautés. Elle agit dans la santé, la protection sociale, l'eau, l'hygiène, l'assainissement et le développement durable.",

  longDescription:
    "Depuis sa création, la Coordination des Volontaires de Dédougou accompagne les populations dans l'amélioration de leurs conditions de vie. Ses interventions couvrent la santé communautaire, la nutrition, la santé sexuelle et reproductive, la sécurité alimentaire, la protection sociale, l'eau, l'hygiène et l'assainissement, l'entrepreneuriat, la cohésion sociale et la protection de l'environnement.",

  history: [
    {
      year: 1996,
      date: "1996-02-26",
      dateDisplay: "26 février 1996",
      title: "Création de la CVD",
      description:
        "Création de la Coordination des Volontaires de Dédougou et engagement dans la lutte contre le VIH/Sida dès ses débuts.",
      confirmed: true,
    },
    {
      year: 2002,
      date: null,
      dateDisplay: "2002",
      title: "Accompagnement communautaire",
      description:
        "Mise en place d'un centre de dépistage volontaire communautaire du VIH/Sida et d'un centre d'accompagnement psychosocial pour les adultes et enfants sous traitement ARV, les personnes infectées ou affectées et les orphelins et enfants vulnérables (OEV).",
      confirmed: true,
    },
    {
      year: 2008,
      date: "2008-12-01",
      dateDisplay: "1er décembre 2008",
      title: "Distinction nationale",
      description:
        "La CVD reçoit à Kaya la décoration de Chevalier de l'Ordre du Mérite burkinabè avec agrafe Santé et Action sociale.",
      confirmed: true,
    },
  ],

  engagementDomainSlugs: [
    "sante-communautaire",
    "nutrition",
    "sante-reproductive",
    "securite-alimentaire",
    "protection-sociale",
    "eau-hygiene-assainissement",
    "entrepreneuriat",
    "cohesion-sociale",
    "environnement",
  ],

  legalNote: {
    reference: null,
    toValidate: true,
    note: "Formulation juridique à faire valider par l'association avant publication.",
  },
};

export default association;