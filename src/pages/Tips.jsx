import { Link } from "react-router-dom";
import { carvingSrc } from "../data/carvings.js";
import { kit, tips } from "../data/tips.js";

export default function Tips() {
  return (
    <div>
      <section
        className="relative isolate overflow-hidden bg-night bg-cover bg-center"
        style={{
          backgroundImage: `url(${carvingSrc("bg-pumpkins-intro", "webp")}), url(${carvingSrc("bg-pumpkins-intro", "jpg")})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-night via-black/70 to-black/45" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 sm:py-28">
          <p className="text-sm font-semibold tracking-[0.28em] text-ember uppercase">
            From the patch to the porch
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] text-white text-glow sm:text-6xl">
            How I actually carve these
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone text-glow">
            Same Saturday every October: food first, music on, then a pumpkin that has to
            survive a portrait. This is the order that keeps the face intact and my
            fingers out of the saw.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="font-display text-3xl text-white">The kit</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {kit.map((item) => (
            <li key={item.name} className="border border-white/10 bg-ash px-4 py-3">
              <p className="font-semibold text-ember">{item.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-bone/75">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-20">
        <ol className="space-y-12">
          {tips.map((tip) => (
            <li key={tip.number} className="border-t border-pumpkin/30 pt-8">
              <p className="font-display text-2xl text-pumpkin">{tip.number}</p>
              <h2 className="mt-1 font-display text-4xl leading-none text-white">{tip.title}</h2>
              {tip.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-relaxed text-bone/85">
                  {paragraph}
                </p>
              ))}
              {tip.number === "04" ? (
                <p className="mt-4 text-base leading-relaxed text-bone/85">
                  Patterns live in the{" "}
                  <Link
                    to="/stencils"
                    className="font-semibold text-pumpkin underline decoration-pumpkin/40 underline-offset-4 hover:text-ember hover:decoration-ember"
                  >
                    stencil library
                  </Link>
                  . Print the PDF, tape it on, poke the lines.
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <aside className="mt-14 border border-ember/40 bg-ash px-5 py-6">
          <h2 className="font-display text-3xl text-white">Before it goes outside</h2>
          <p className="mt-3 leading-relaxed text-bone/85">
            Kill the room lights while it&apos;s still on the table. If the face reads in
            the dark there, it will read on the porch. Then go look at{" "}
            <Link
              to="/"
              className="font-semibold text-pumpkin underline decoration-pumpkin/40 underline-offset-4 hover:text-ember hover:decoration-ember"
            >
              the carvings
            </Link>{" "}
            if you want to see what a whole night of this turns into.
          </p>
        </aside>
      </div>
    </div>
  );
}
