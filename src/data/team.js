export const teamMembers = [
  {
    id: "dayo-karamogo",
    slug: "dayo-karamogo",
    name: "DAYO Karamogo",
    role: "Président",
    image: "/images/equipe/dayo-karamogo.jpg",
    imageAlt: "Portrait de DAYO Karamogo",
  },
  {
    id: "yague-lumumba-soumaila",
    slug: "yague-lumumba-soumaila",
    name: "YAGUE Lumumba Soumaïla",
    role: "Secrétaire général",
    image: "/images/equipe/yague-lumumba-soumaila.jpg",
    imageAlt: "Portrait de YAGUE Lumumba Soumaïla",
  },
  {
    id: "sidibe-bernard",
    slug: "sidibe-bernard",
    name: "SIDIBE Bernard",
    role: "Trésorier",
    image: "/images/equipe/sidibe-bernard.jpg",
    imageAlt: "Portrait de SIDIBE Bernard",
  },
  {
    id: "ouoba-benoit-kader",
    slug: "ouoba-benoit-kader",
    name: "OUOBA Benoit Kader",
    role: "Secrétaire chargé de l'organisation et de l'information",
    image: "/images/equipe/ouoba-benoit-kader.jpg",
    imageAlt: "Portrait de OUOBA Benoit Kader",
  },
  {
    id: "dah-viviane",
    slug: "dah-viviane",
    name: "DAH Viviane",
    role: "Secrétaire chargée de la protection de l'enfant, de la promotion du genre et de l'inclusion",
    image: "/images/equipe/dah-viviane.jpg",
    imageAlt: "Portrait de DAH Viviane",
  },
];

export function getInitials(name) {
  if (typeof name !== "string") return "";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export default teamMembers;