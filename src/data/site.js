/**
 * Données générales du site CVD.
 * Source : informations officielles fournies par l'association.
 */

export const site = {
  name: "Coordination des Volontaires de Dédougou",
  shortName: "CVD",
  fullName: "Coordination des Volontaires de Dédougou",
  language: "fr",
  locale: "fr_BF",

  description:
    "La Coordination des Volontaires de Dédougou (CVD) est une association burkinabè à but non lucratif créée en 1996, engagée dans la promotion de la santé et l'amélioration durable des conditions de vie des populations.",

  contact: {
    phone: "20 52 13 66",
    phoneDisplay: "+226 20 52 13 66",
    email: "cvdbf01@gmail.com",
  },

  address: {
    city: "Dédougou",
    sector: "Secteur n° 5",
    location: "Enceinte de la Direction Régionale de la Santé (trypano)",
    country: "Burkina Faso",
    countryCode: "BF",
    full: "Dédougou, secteur n° 5, enceinte de la Direction Régionale de la Santé (trypano), Burkina Faso",
    coordinates: null,
  },

  social: {
    facebook: "https://www.facebook.com/share/1PqURbRE8o/",
  },

  url: null,

  foundedYear: 1996,
  foundedDate: "1996-02-26",
  foundedDateDisplay: "26 février 1996",

  legalStatus: {
    nature: "Association à but non lucratif",
    qualification: [
      "apolitique",
      "non confessionnelle",
      "à vocation permanente",
    ],
    registrationNumber: null,
    legalReference: null,
  },

  metadata: {
    defaultTitle: "CVD — Coordination des Volontaires de Dédougou",
    titleTemplate: "%s | CVD",
    defaultDescription:
      "Association burkinabè créée en 1996, la CVD agit pour la santé communautaire, la protection sociale, l'eau, l'hygiène, l'assainissement et le développement durable dans les régions de Bankui et du Sourou.",
    defaultImage: null,
  },
};

export default site;