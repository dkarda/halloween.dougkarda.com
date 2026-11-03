import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Friends from "./pages/Friends.jsx";
import Gallery from "./pages/Gallery.jsx";
import Stencils from "./pages/Stencils.jsx";
import Tips from "./pages/Tips.jsx";

function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-28 text-center">
      <p className="text-sm font-semibold tracking-[0.28em] text-ember uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl text-white text-glow">This page wandered off</h1>
      <p className="mt-4 text-bone/75">The porch light is back on the carvings.</p>
      <Link
        to="/"
        className="mt-8 inline-block border-y border-pumpkin px-4 py-2 font-semibold tracking-wide text-pumpkin uppercase hover:border-ember hover:text-ember"
      >
        Back to the pumpkins
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Gallery />} />
          <Route path="friends" element={<Friends />} />
          <Route path="tips" element={<Tips />} />
          <Route path="stencils" element={<Stencils />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
