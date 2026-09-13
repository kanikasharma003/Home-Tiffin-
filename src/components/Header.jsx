import { useState } from "react";
import { Icon } from "./ui.jsx";
import { NAV_LINKS } from "../data.js";

export function Header({ mode, onModeChange }) {
  const [open, setOpen] = useState(false);

  const handleNav = (href) => {
    setOpen(false);

    if (!href) return;

    if (href === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 border-b bg-white"
      style={{
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between gap-3 py-3 sm:px-1">

          {/* ================= LOGO ================= */}
          <button
            type="button"
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-lg shadow-md"
              style={{
                background: "var(--primary)",
              }}
            >
              🍱
            </span>

            <span
              className="font-display text-lg font-bold tracking-tight"
              style={{
                color: "var(--color-heading)",
              }}
            >
              TiffinBox
            </span>
          </button>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden items-center gap-6 lg:flex">

            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium transition hover:text-primary-500"
                style={{
                  color: "var(--color-text)",
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Become a Cook */}
            <button
              type="button"
              onClick={() => handleNav("#become-cook")}
              className="text-sm font-medium transition hover:text-primary-500"
              style={{
                color: "var(--color-text)",
              }}
            >
              Become a Cook
            </button>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* ================= VEG / NON-VEG ================= */}
            <div
              className="diet-toggle hidden sm:inline-flex"
              role="group"
              aria-label="Choose diet theme"
            >
              <button
                type="button"
                className={mode === "veg" ? "active veg" : ""}
                onClick={() => onModeChange("veg")}
              >
                🌿 Veg
              </button>

              <button
                type="button"
                className={mode === "nonveg" ? "active nonveg" : ""}
                onClick={() => onModeChange("nonveg")}
              >
                🍗 Non-Veg
              </button>
            </div>

            {/* ================= ORDER BUTTON ================= */}
            <button
              type="button"
              onClick={() => handleNav("#plans")}
              className="btn btn-primary hidden !px-5 !py-2 text-xs md:inline-flex"
            >
              Order Now
            </button>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              type="button"
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-full border lg:hidden"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-heading)",
              }}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon
                name={open ? "minus" : "plus"}
                size={16}
              />
            </button>
          </div>
        </nav>

        {/* ================= MOBILE NAVIGATION ================= */}
        {open && (
          <div
            className="mx-auto mb-3 flex flex-col gap-1 rounded-2xl border p-3 lg:hidden"
            style={{
              background: "var(--color-white)",
              borderColor: "var(--color-border)",
            }}
          >

            {/* Mobile Links */}
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNav(link.href)}
                className="rounded-xl px-3 py-2 text-left text-sm font-medium transition hover:bg-primary-50"
                style={{
                  color: "var(--color-text)",
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Become a Cook */}
            <button
              type="button"
              onClick={() => handleNav("#become-cook")}
              className="rounded-xl px-3 py-2 text-left text-sm font-medium transition hover:bg-primary-50"
              style={{
                color: "var(--color-text)",
              }}
            >
              Become a Cook
            </button>

            {/* ================= MOBILE DIET TOGGLE ================= */}
            <div className="diet-toggle mt-1 self-start">
              <button
                type="button"
                className={mode === "veg" ? "active veg" : ""}
                onClick={() => onModeChange("veg")}
              >
                🌿 Veg
              </button>

              <button
                type="button"
                className={mode === "nonveg" ? "active nonveg" : ""}
                onClick={() => onModeChange("nonveg")}
              >
                🍗 Non-Veg
              </button>
            </div>

            {/* ================= MOBILE ORDER ================= */}
            <button
              type="button"
              onClick={() => handleNav("#plans")}
              className="btn btn-primary mt-2 justify-center"
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </header>
  );
}