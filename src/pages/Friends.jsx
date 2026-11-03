import { useCallback, useEffect, useState } from "react";
import Lightbox from "../components/Lightbox.jsx";
import { friendPhotoSources, friendYears, isGroupPhoto } from "../data/friends.js";

function photoAlt(photo, year) {
  if (isGroupPhoto(photo)) {
    return `${photo.title}, ${year}`;
  }
  if (photo.carver) {
    return `${photo.carver}'s ${photo.title} pumpkin carving, ${year}`;
  }
  return `${photo.title} pumpkin carving, ${year}`;
}

function useActiveYear() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const nodes = friendYears
      .map((group) => document.getElementById(group.year))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const chip = document.getElementById(`year-${active}`);
    const scroller = chip?.parentElement;
    if (!chip || !scroller) return;
    scroller.scrollTo({
      left: chip.offsetLeft - scroller.clientWidth / 2 + chip.clientWidth / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [active]);

  return active;
}

export default function Friends() {
  const active = useActiveYear();
  const [photo, setPhoto] = useState(null);
  const closePhoto = useCallback(() => setPhoto(null), []);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const node = document.getElementById(id);
    if (!node) return;
    requestAnimationFrame(() => node.scrollIntoView());
  }, []);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        <p className="text-sm font-semibold tracking-[0.28em] text-ember uppercase">
          Carving night crew
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] text-white sm:text-6xl">
          Friends&apos; carvings
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-bone/80">
          Same Saturday, more knives. These are the pumpkins the rest of the table
          carved — portraits, group shots, and whatever someone decided to attempt
          after the BBQ.
        </p>
      </section>

      <nav
        aria-label="Friends carvings by year"
        className="sticky top-16 z-30 border-b border-pumpkin/30 bg-night/95 backdrop-blur-md"
      >
        <div className="relative">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5">
            {friendYears.map((group) => {
              const current = active === group.year;
              return (
                <a
                  key={`nav-${group.year}`}
                  id={`year-${group.year}`}
                  href={`#${group.year}`}
                  aria-current={current ? "true" : undefined}
                  className={`shrink-0 border-y px-2.5 py-1 text-sm font-bold ${
                    current
                      ? "border-ember text-ember"
                      : "border-pumpkin text-pumpkin hover:border-blood hover:text-ember"
                  }`}
                >
                  {group.year}
                </a>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-night to-transparent" />
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        {friendYears.map((group) => {
          return (
            <section key={group.year} id={group.year} className="scroll-mt-32 pt-12">
              <h2 className="font-display text-3xl text-ember">{group.year}</h2>
              <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.photos.map((item, index) => {
                  const { webp, jpg, fallback } = friendPhotoSources(item);
                  const alt = photoAlt(item, group.year);
                  const groupShot = isGroupPhoto(item);
                  return (
                    <li
                      key={item.id}
                      className={groupShot ? "sm:col-span-2" : undefined}
                    >
                      <button
                        type="button"
                        onClick={() => setPhoto({ webp, jpg, fallback, alt })}
                        aria-label={`Enlarge ${alt}`}
                        className="group w-full cursor-zoom-in text-left"
                      >
                        <div className={`relative bg-black ${groupShot ? "" : "mx-auto w-fit"}`}>
                          {groupShot ? (
                            <span className="absolute top-2 left-2 z-10 bg-ember px-1.5 py-0.5 text-[10px] font-bold tracking-[0.14em] text-night uppercase">
                              Group
                            </span>
                          ) : null}
                          <picture>
                            {webp ? <source srcSet={webp} type="image/webp" /> : null}
                            <img
                              src={fallback}
                              alt={alt}
                              loading={group.year === friendYears[0].year && index === 0 ? "eager" : "lazy"}
                              className={
                                groupShot
                                  ? "pumpkin-frame max-h-[70vh] w-full bg-black object-contain"
                                  : "pumpkin-frame max-h-[36vh] w-auto max-w-[240px] bg-black object-contain sm:max-h-[280px] sm:max-w-[260px]"
                              }
                            />
                          </picture>
                        </div>
                        <h3 className="mt-3 font-display text-2xl leading-none text-white">
                          {item.title}
                        </h3>
                        {item.carver ? (
                          <p className="mt-1 text-sm text-bone/70">{item.carver}</p>
                        ) : null}
                        <span className="mt-2 block text-[11px] font-semibold tracking-[0.22em] text-bone/75 uppercase group-hover:text-ember">
                          Click to enlarge
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {photo ? <Lightbox image={photo} onClose={closePhoto} /> : null}
    </div>
  );
}
