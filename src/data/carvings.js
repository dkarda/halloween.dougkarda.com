// Newest first. Add a new year at the top of this list.
const BASE = "/images/pumpkins";

export function carvingSrc(name, ext) {
  return `${BASE}/${name}.${ext}`;
}

export function photoSources(carving) {
  const exts = carving.photoExts ?? ["webp", "jpg"];
  const fallbackExt = exts.includes("jpg") ? "jpg" : exts[0];
  return {
    webp: exts.includes("webp") ? carvingSrc(carving.photo, "webp") : null,
    jpg: exts.includes("jpg") ? carvingSrc(carving.photo, "jpg") : null,
    fallback: carvingSrc(carving.photo, fallbackExt),
  };
}

export const icons = {
  ghost: `${BASE}/ghost1.png`,
  bat: `${BASE}/clip-bat.png`,
  mark: `${BASE}/pumpkin.png`,
};

export const carvings = [
  {
    id: "2025",
    year: "2025",
    title: "Regan MacNeil",
    photo: "2025-regan-macneil",
    photoExts: ["webp"],
    stencil: "regan-macneil",
    background: "bg-regan-macneil-exorcist",
    align: "start",
    accent: "ghost",
  },
  {
    id: "2024",
    year: "2024",
    title: "Darth Vader",
    photo: "2024-pumpkin-darth-vader",
    stencil: "darthvader",
    background: "bg-darth-vader2",
    align: "start",
    accent: "ghost",
  },
  {
    id: "2023",
    year: "2023",
    title: "Halloween Owl",
    photo: "2023-pumpkin-halloween-owl",
    background: "bg-owl",
    align: "start",
    accent: "bat",
  },
  {
    id: "2022",
    year: "2022",
    title: "Art the Clown",
    photo: "2022-pumpkin-terrifier",
    stencil: "arttheclown",
    background: "bg-terrifier",
    align: "start",
    accent: "ghost",
  },
  {
    id: "2021",
    year: "2021",
    title: "Alice Cooper",
    photo: "2021-pumpkin-alice-cooper",
    stencil: "alice-cooper",
    background: "bg-alice-cooper",
    align: "end",
    accent: "bat",
  },
  {
    id: "2020",
    year: "2020",
    title: "The Thing",
    photo: "2020-pumpkin-the-thing",
    stencil: "the-thing",
    background: "bg-the-thing",
    align: "end",
    accent: "ghost",
  },
  {
    id: "2019",
    year: "2019",
    title: "Night King",
    photo: "2019-pumpkin-night-king",
    stencil: "night-king",
    background: "bg-night-king",
    align: "end",
    accent: "bat",
  },
  {
    id: "2018",
    year: "2018",
    title: "Aliens Mother",
    photo: "2018-pumpkin-aliens-xenomorph",
    stencil: "xenomorph",
    background: "bg-alien-xenomorph2",
    align: "end",
    accent: "ghost",
  },
  {
    id: "2017",
    year: "2017",
    title: "Freddy Krueger",
    photo: "2017-pumpkin-freddy-krueger",
    stencil: "freddy-krueger",
    background: "bg-Freddy-Krueger",
    align: "end",
    accent: "ghost",
  },
  {
    id: "2016",
    year: "2016",
    title: "Negan",
    photo: "2016-pumpkin-negan",
    stencil: "negan",
    background: "bg-Negan-The-Walking-Dead",
    align: "start",
    accent: "ghost",
  },
  {
    id: "2015b",
    year: "2015b",
    title: "The Crow",
    photo: "2015b-pumpkin-eric-draven",
    stencil: "the-crow",
    background: "bg-Eric-Draven-The-Crow",
    align: "start",
    accent: "bat",
  },
  {
    id: "2015a",
    year: "2015a",
    title: "Walter White",
    photo: "2015a-pumpkin-walter-white",
    stencil: "walter-white",
    background: "bg-Walter-White-Breaking-Bad",
    align: "start",
    accent: "bat",
  },
  {
    id: "2014",
    year: "2014",
    title: "Daryl Dixon",
    photo: "2014-pumpkin-daryl-dixon",
    stencil: "daryl-dixon",
    background: "bg-Daryl-Dixon-The-Walking-Dead",
    align: "start",
    accent: "bat",
  },
  {
    id: "2013",
    year: "2013",
    title: "Eddie",
    photo: "2013-pumpkin-eddie1",
    stencil: "eddie",
    background: "bg-Eddie-Iron-Maiden",
    align: "end",
    accent: "ghost",
  },
  {
    id: "2012",
    year: "2012",
    title: "Headless Horseman",
    photo: "2012-pumpkin-headless-horseman1",
    photoExts: ["webp"],
    background: "bg-headless-horseman",
    align: "end",
    accent: "bat",
  },
  {
    id: "2011",
    year: "2011",
    title: "Pumpkin Scarecrow and Jolly Roger",
    nav: "2011 Scarecrow & Jolly Roger",
    photo: "2011-pumpkin-group-pic1",
    photoExts: ["jpg"],
    background: "bg-scarecrow",
    align: "start",
    accent: "ghost",
  },
];

export const carvingByStencil = new Map(
  carvings.filter((carving) => carving.stencil).map((carving) => [carving.stencil, carving]),
);

