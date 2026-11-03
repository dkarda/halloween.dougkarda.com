import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Carvings", end: true },
  { to: "/friends", label: "Friends" },
  { to: "/tips", label: "Tips" },
  { to: "/stencils", label: "Stencils" },
];

function PumpkinMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-8 w-8 shrink-0 sm:h-10 sm:w-10">
      <path
        d="M34 6c1.4 3.6.6 6-1.6 8"
        fill="none"
        stroke="#6b8f71"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 15c-2.4-3.6-7-5-9-2.4 3 .2 5 1.8 6 3.6-5.2.4-10.4 2.8-13.4 7.2C12 28.8 10.8 35 12.2 41 14 48 20 54.2 32 54.2S50 48 51.8 41C53.2 35 52 28.8 48.4 23.4 45.6 19.4 40.6 17 35 16.6c1-2.4 3.6-4 7-3.6-2.4-2.4-6.6-.6-8.6 2z"
        fill="currentColor"
        className="text-pumpkin"
      />
      <path
        d="M22 34c1.6 1.3 2.2 4 .8 6.8M32 31v11M42 34c-1.6 1.3-2.2 4-.8 6.8M26.2 47c2 2.2 4.2 3.2 5.8 3.2s3.8-1 5.8-3.2"
        fill="none"
        stroke="#140c08"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const titles = {
      "/": "Pumpkin Carvings · Halloween · Doug Karda",
      "/friends": "Friends · Halloween · Doug Karda",
      "/tips": "Carving Tips · Halloween · Doug Karda",
      "/stencils": "Stencils · Halloween · Doug Karda",
    };
    document.title = titles[pathname] ?? "Halloween · Doug Karda";

    const hideFromIndex = pathname === "/stencils" || pathname.startsWith("/stencils/");
    let robots = document.querySelector('meta[name="robots"]');
    if (hideFromIndex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    } else if (robots) {
      robots.remove();
    }
  }, [pathname]);

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-ember focus:px-3 focus:py-2 focus:text-night"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 h-16 border-b border-white/10 bg-night/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-3 sm:px-4">
          <Link to="/" className="group flex min-w-0 items-center gap-1.5 sm:gap-2">
            <PumpkinMark />
            <span className="leading-none">
              <span className="block font-display text-[1.45rem] text-bone group-hover:text-ember sm:text-[1.65rem]">
                Halloween
              </span>
              <span className="block text-[9px] font-semibold tracking-[0.22em] text-ember uppercase sm:text-[10px] sm:tracking-[0.28em]">
                Doug Karda
              </span>
            </span>
          </Link>
          <nav aria-label="Site" className="flex shrink-0 items-center gap-2.5 sm:gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-sm sm:tracking-[0.18em] ${
                    isActive ? "text-ember" : "text-bone/70 hover:text-pumpkin"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="content" className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-night">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-bone/60">
          <p>Annual pumpkin carvings, since 2011.</p>
        </div>
      </footer>
    </div>
  );
}
