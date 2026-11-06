const BASE = "/images/friends";

export function friendSrc(name, ext) {
  return `${BASE}/${name}.${ext}`;
}

export function friendPhotoSources(photo) {
  const exts = photo.photoExts ?? ["webp", "jpg"];
  const fallbackExt = exts.includes("jpg") ? "jpg" : exts[0];
  return {
    webp: exts.includes("webp") ? friendSrc(photo.photo, "webp") : null,
    jpg: exts.includes("jpg") ? friendSrc(photo.photo, "jpg") : null,
    fallback: friendSrc(photo.photo, fallbackExt),
  };
}

export function isGroupPhoto(photo) {
  return photo.kind === "group";
}

function mergeFriendYears(years) {
  const byYear = new Map();
  for (const group of years) {
    if (!group.photos?.length) continue;
    const existing = byYear.get(group.year);
    if (existing) {
      existing.photos.push(...group.photos);
    } else {
      byYear.set(group.year, { year: group.year, photos: [...group.photos] });
    }
  }
  return [...byYear.values()];
}

// Newest first. Photos listed under the same year share one nav chip and grid.
export const friendYears = mergeFriendYears([
  {
    year: "2026",
    photos: [
      {
        id: "2026-billy-two-faced",
        title: "Two-Faced",
        carver: "Billy",
        photo: "2026-billy-two-faced",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2024",
    photos: [
      {
        id: "2024-group",
        title: "Group Photo",
        kind: "group",
        photo: "2024-group",
        photoExts: ["webp"],
      },
      {
        id: "2024-donald-alice-cooper",
        title: "Alice Cooper",
        carver: "Donald",
        photo: "2024-donald-alice-cooper",
        photoExts: ["webp"],
      },
      {
        id: "2024-tbd-one-eyed-willie",
        title: "One-Eyed Willie",
        carver: "tbd",
        photo: "2024-tbd-one-eyed-willie",
        photoExts: ["webp"],
      },
      {
        id: "2024-tbd-eagle",
        title: "American Eagle",
        carver: "tbd",
        photo: "2024-tbd-eagle",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2023",
    photos: [
      {
        id: "2023-donald-cat",
        title: "The Cat",
        carver: "Donald",
        photo: "2023-donald-cat",
        photoExts: ["webp"],
      },
      {
        id: "2023-billy-pumpkin-spider",
        title: "Pumpkin Spider",
        carver: "Billy",
        photo: "2023-billy-pumpkin-spider",
        photoExts: ["webp"],
      },
      {
        id: "2023-rich-jack-o-lantern",
        title: "Jack-O'-Lantern",
        carver: "Rich",
        photo: "2023-rich-jack-o-lantern",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2022",
    photos: [
      {
        id: "2022-group",
        title: "Group Photo",
        kind: "group",
        photo: "2022-group",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2021",
    photos: [
      {
        id: "2021-group",
        title: "Group Photo",
        kind: "group",
        photo: "2021-group",
        photoExts: ["webp"],
      },
      {
        id: "2021-donald-daruma-doll",
        title: "Daruma Doll",
        carver: "Donald",
        photo: "2021-donald-daruma-doll",
        photoExts: ["webp"],
      },
      {
        id: "2021-tbd-beetlejuice",
        title: "Beetlejuice",
        carver: "tbd",
        photo: "2021-tbd-beetlejuice",
        photoExts: ["webp"],
      },
      {
        id: "2021-freddy-davey-jones",
        title: "Davey Jones",
        carver: "Freddy",
        photo: "2021-freddy-davey-jones",
        photoExts: ["webp"],
      },
      {
        id: "2021-tbd-minion",
        title: "Minion",
        carver: "tbd",
        photo: "2021-tbd-minion",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2020",
    photos: [
      {
        id: "2020-group",
        title: "Group Photo",
        kind: "group",
        photo: "2020-group",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2019",
    photos: [
      {
        id: "2019-group",
        title: "Group Photo",
        kind: "group",
        photo: "2019-group",
        photoExts: ["webp"],
      },
      {
        id: "2019-donald-samurai",
        title: "Samurai",
        carver: "Donald",
        photo: "2019-donald-samurai",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2018",
    photos: [
      {
        id: "2018-group",
        title: "Group Photo",
        kind: "group",
        photo: "2018-group",
        photoExts: ["webp"],
      },
      {
        id: "2018-freddy-tree",
        title: "Halloween Tree",
        carver: "Freddy",
        photo: "2018-freddy-tree",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2017",
    photos: [
      {
        id: "2017-group",
        title: "Group Photo",
        kind: "group",
        photo: "2017-group",
        photoExts: ["webp"],
      },
      {
        id: "2017-tbd-michael-myers",
        title: "Michael Myers",
        carver: "tbd",
        photo: "2017-tbd-michael-myers",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2014",
    photos: [
      {
        id: "2014-billy-angus-young",
        title: "Angus Young",
        carver: "Billy",
        photo: "2014-billy-angus-young",
        photoExts: ["webp"],
      },
    ],
  },
  {
    year: "2012",
    photos: [
      {
        id: "2012-group",
        title: "Group Photo",
        kind: "group",
        photo: "2012-group",
        photoExts: ["webp"],
      },
    ],
  },
]);
