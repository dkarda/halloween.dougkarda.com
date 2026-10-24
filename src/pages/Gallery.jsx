import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "../components/Lightbox.jsx";
import { carvings, carvingSrc, photoSources } from "../data/carvings.js";

function useActiveCarving() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const nodes = carvings
      .map((carving) => document.getElementById(carving.id))
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

export default function Gallery() {
  const active = useActiveCarving();
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
      <nav
        aria-label="Carvings by year"
        className="sticky top-16 z-30 border-b border-pumpkin/30 bg-night/95 backdrop-blur-md"
      >
        <div className="relative">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5">
            {carvings.map((carving) => {
              const current = active === carving.id;
              return (
                <a
                  key={carving.id}
                  id={`year-${carving.id}`}
                  href={`#${carving.id}`}
                  aria-current={current ? "true" : undefined}
                  className={`shrink-0 border-y px-2.5 py-1 text-sm font-bold ${
                    current
                      ? "border-ember text-ember"
                      : "border-pumpkin text-pumpkin hover:border-blood hover:text-ember"
                  }`}
                >
                  {carving.nav ?? `${carving.year} ${carving.title}`}
                </a>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-night to-transparent" />
        </div>
      </nav>

      <section
        id="intro"
        className="carving-bg relative isolate flex min-h-[calc(100svh-7.5rem)] items-end bg-night bg-cover bg-center bg-no-repeat md:items-center"
        style={{
          backgroundImage: `url(${carvingSrc("bg-pumpkins-intro", "webp")}), url(${carvingSrc("bg-pumpkins-intro", "jpg")})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-night via-black/55 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.28em] text-ember uppercase">
              Since 2011
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[0.95] text-white text-glow sm:text-6xl">
              Nothing like a good pumpkin carving around Halloween!
            </h1>
            <p className="mt-5 text-base leading-relaxed text-bone text-glow sm:text-lg">
              Each October, there&apos;s little more I look forward to than pumpkin carving
              night. A tradition with my bud and I (and potential guests): one Saturday
              night turns into great BBQ, rock and metal, a few adult sodas, and pumpkin
              carving. We&apos;re starting to build a little resume, and family and friends
              keep asking to see the work, so I decided to share it here. Hope you enjoy.
              Cheers.
            </p>
          </div>
        </div>
      </section>

      {carvings.map((carving, index) => {
        const alt = `${carving.title} pumpkin carving, ${carving.year}`;
        const { webp, jpg, fallback } = photoSources(carving);
        return (
          <section
            key={carving.id}
            id={carving.id}
            className="carving-bg relative isolate flex min-h-svh scroll-mt-32 items-center bg-night bg-cover bg-top bg-no-repeat"
            style={{
              backgroundImage: `url(${carvingSrc(carving.background, "webp")}), url(${carvingSrc(carving.background, "jpg")})`,
            }}
          >
            <div
              className={`absolute inset-0 ${
                carving.align === "end"
                  ? "bg-gradient-to-l from-black/80 via-black/45 to-black/15"
                  : "bg-gradient-to-r from-black/80 via-black/45 to-black/15"
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" />
            <div
              className={`relative z-10 mx-auto flex w-full max-w-6xl justify-center px-4 py-20 ${
                carving.align === "end" ? "md:justify-end" : "md:justify-start"
              }`}
            >
              <div className="w-full max-w-md text-center md:text-left">
                <div className="relative inline-block max-w-full text-left">
                  <div className="absolute -inset-x-3 -inset-y-2 -z-10 bg-black/75 blur-lg" aria-hidden="true" />
                  <p className="font-display text-3xl text-ember text-glow">{carving.year}</p>
                  <h2
                    className={`mt-1 font-display leading-[0.95] text-white text-glow ${
                      carving.title.length > 22 ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"
                    }`}
                  >
                    {carving.title}
                  </h2>
                  <div className="mt-3 h-px w-16 bg-pumpkin" />
                </div>
                <button
                  type="button"
                  onClick={() => setPhoto({ webp, jpg, fallback, alt })}
                  aria-label={`Enlarge the ${carving.year} ${carving.title} carving`}
                  className="group mx-auto mt-5 block cursor-zoom-in md:mx-0"
                >
                  <picture>
                    {webp ? <source srcSet={webp} type="image/webp" /> : null}
                    <img
                      src={fallback}
                      alt={alt}
                      width="400"
                      height="400"
                      loading={index === 0 ? "eager" : "lazy"}
                      className="pumpkin-frame mx-auto max-h-[38vh] w-auto max-w-[360px] bg-black object-contain md:mx-0 md:max-h-[400px]"
                    />
                  </picture>
                  <span className="mt-2 block text-[11px] font-semibold tracking-[0.22em] text-bone/75 uppercase group-hover:text-ember">
                    Click to enlarge
                  </span>
                </button>
                {carving.stencil ? (
                  <Link
                    to={`/stencils#${carving.stencil}`}
                    className="mt-3 inline-block text-[11px] font-semibold tracking-[0.22em] text-ember uppercase hover:text-pumpkin"
                  >
                    Stencil
                  </Link>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      {photo ? <Lightbox image={photo} onClose={closePhoto} /> : null}
    </div>
  );
}
