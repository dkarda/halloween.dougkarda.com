import { useMemo, useState } from "react";
import stencils from "../data/stencils.json";

const ASSET = "/images/stencils";
const CATEGORY_ORDER = ["Movie", "TV", "Music", "Video Game", "Literature", "Other"];

function categoryOf(stencil) {
  return stencil.category || "Other";
}

function StencilCard({ stencil }) {
  const [failed, setFailed] = useState(false);
  const category = categoryOf(stencil);
  const level = Number(stencil.level) || 0;
  const pdf = `${ASSET}/${stencil.filename}.pdf`;
  const png = `${ASSET}/${stencil.filename}.png`;

  return (
    <li>
      <a
        href={pdf}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col border border-white/10 bg-ash p-3 transition hover:border-pumpkin hover:bg-[#211812]"
      >
        <div className="flex h-36 items-center justify-center bg-black/50">
          {failed ? (
            <span className="font-display text-4xl text-pumpkin/70" aria-hidden="true">
              {stencil.title.slice(0, 1)}
            </span>
          ) : (
            <img
              src={png}
              alt=""
              loading="lazy"
              onError={() => setFailed(true)}
              className="max-h-32 max-w-full object-contain"
            />
          )}
        </div>
        <h2 className="mt-3 font-display text-2xl leading-none text-bone">{stencil.title}</h2>
        {stencil.title2 ? <p className="mt-1 text-sm text-bone/60">{stencil.title2}</p> : null}
        <p className="mt-auto pt-3 text-[11px] font-semibold tracking-[0.16em] text-ember uppercase">
          {category}
        </p>
        <p className="mt-1 text-xs text-bone/70">
          Difficulty {level} of 5
          <span className="mt-1 flex gap-1" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`h-1.5 w-4 ${index < level ? "bg-pumpkin" : "bg-white/15"}`}
              />
            ))}
          </span>
        </p>
      </a>
    </li>
  );
}

export default function Stencils() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const categories = useMemo(() => {
    const present = new Set(stencils.map(categoryOf));
    const ordered = CATEGORY_ORDER.filter((name) => present.has(name));
    const extras = [...present].filter((name) => !CATEGORY_ORDER.includes(name)).sort();
    return ["All", ...ordered, ...extras];
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stencils
      .filter((stencil) => {
        if (category !== "All" && categoryOf(stencil) !== category) return false;
        if (level !== "All" && String(stencil.level) !== level) return false;
        if (!needle) return true;
        return `${stencil.title} ${stencil.title2 ?? ""}`.toLowerCase().includes(needle);
      })
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [query, category, level]);

  const filtersActive = query.trim() !== "" || category !== "All" || level !== "All";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm font-semibold tracking-[0.28em] text-ember uppercase">Print, tape, poke</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] text-white sm:text-6xl">
        Stencil library
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-bone/80">
        Patterns I keep around for carving night. Open one for the PDF. Difficulty runs
        from 1, a calm evening, to 5, bring the small saw and some patience.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="stencil-search">
            Search stencils
          </label>
          <input
            id="stencil-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Alice, Vader, owl…"
            className="w-full border border-white/15 bg-ash px-3 py-2 text-bone outline-none placeholder:text-bone/40 focus:border-ember sm:max-w-sm"
          />
          {filtersActive ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All");
              }}
              className="cursor-pointer self-start text-sm font-semibold tracking-wide text-pumpkin uppercase hover:text-ember"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={`cursor-pointer border px-3 py-1 text-sm font-semibold ${
                category === name
                  ? "border-ember bg-ember text-night"
                  : "border-white/15 text-bone/80 hover:border-pumpkin hover:text-pumpkin"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Difficulty">
          <span className="text-xs font-semibold tracking-[0.16em] text-bone/50 uppercase">
            Difficulty
          </span>
          {["All", "1", "2", "3", "4", "5"].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={level === value}
              onClick={() => setLevel(value)}
              className={`cursor-pointer min-w-9 border px-2 py-1 text-sm font-semibold ${
                level === value
                  ? "border-pumpkin bg-pumpkin text-night"
                  : "border-white/15 text-bone/80 hover:border-pumpkin hover:text-pumpkin"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-bone/60">
        {visible.length} {visible.length === 1 ? "pattern" : "patterns"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-8 max-w-md text-lg text-bone/80">
          Nothing in the pile matches that. Try another name, or clear the filters.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((stencil) => (
            <StencilCard key={stencil.filename} stencil={stencil} />
          ))}
        </ul>
      )}
    </div>
  );
}
