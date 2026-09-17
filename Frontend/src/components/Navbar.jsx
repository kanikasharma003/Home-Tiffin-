import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Utensils } from "lucide-react";
import { useAuth } from "../utils/UserAuth";

function Navbar({ mode = "veg", onModeChange }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // ================= LOGOUT =================
  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  // ================= VEG / NON-VEG TOGGLE =================
  const toggleFoodMode = () => {
    if (!onModeChange) return;

    if (mode === "veg") {
      onModeChange("nonveg");
    } else {
      onModeChange("veg");
    }
  };

  // ================= ORDER NOW =================
  const handleOrderNow = () => {
    setOpen(false);

    // If already on home page
    if (window.location.pathname === "/") {
      const menuSection = document.querySelector("#menu");

      if (menuSection) {
        menuSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // If on another page
    navigate("/");

    setTimeout(() => {
      const menuSection = document.querySelector("#menu");

      if (menuSection) {
        menuSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 border-b bg-white"
      style={{
        borderColor: "var(--color-border)",
      }}
    >
      {/* ================= MAIN NAVBAR ================= */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-strong))",
            }}
          >
            <Utensils size={23} />
          </div>

          <div className="text-left">
            <h1
              className="text-xl font-extrabold leading-none"
              style={{
                color: "var(--primary)",
              }}
            >
              TiffinBox
            </h1>

            <p className="mt-1 text-[10px] font-medium text-gray-500">
              Ghar Jaisa Swaad
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAV LINKS ================= */}
        <nav className="hidden items-center gap-7 lg:flex">

          {/* HOME */}
          <Link
            to="/"
            className="text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
          >
            Home
          </Link>

          {/* MENU */}
          <Link
            to="/kitchens"
            className="text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
          >
            Menu
          </Link>

          {/* ABOUT */}
          <Link
            to="/about"
            className="text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
          >
            About
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            className="text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
          >
            Contact
          </Link>

          {/* BECOME A COOK */}
          <Link
            to="/become-cook"
            className="text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
          >
            Become a Cook
          </Link>
        </nav>

        {/* ================= RIGHT SIDE BUTTONS ================= */}
        <div className="hidden items-center gap-3 md:flex">

          {/* VEG / NON-VEG TOGGLE */}
          <button
            type="button"
            onClick={toggleFoodMode}
            aria-label="Toggle Food Mode"
            className="relative h-5 w-9 rounded-full transition-all duration-300"
            style={{
              background:
                mode === "veg"
                  ? "var(--primary)"
                  : "var(--color-nonveg-red)",
            }}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
                mode === "veg" ? "left-0.5" : "left-[18px]"
              }`}
            />
          </button>

          {/* LOGIN / LOGOUT */}
          {!isAuthenticated ? (
            <Link
              to="/User/Login"
              className="rounded-xl border px-4 py-2.5 text-sm font-bold transition hover:bg-[var(--primary-soft)]"
              style={{
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
              }}
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border px-4 py-2.5 text-sm font-bold transition hover:bg-[var(--primary-soft)]"
              style={{
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
              }}
            >
              Logout
            </button>
          )}

          {/* ORDER NOW BUTTON */}
          <button
            type="button"
            onClick={handleOrderNow}
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-strong))",
            }}
          >
            Order Now
          </button>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl border p-2.5 text-gray-700 transition hover:bg-gray-50 md:hidden"
          style={{
            borderColor: "var(--color-border)",
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">

            {/* HOME */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              Home
            </Link>

            {/* MENU */}
            <Link
              to="/kitchens"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              Menu
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              About
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              Contact
            </Link>

            {/* BECOME A COOK */}
            <Link
              to="/become-cook"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              Become a Cook
            </Link>

            {/* FOOD PREFERENCE */}
            <div
              className="flex items-center justify-between rounded-xl border px-4 py-3"
              style={{
                borderColor: "var(--primary-border)",
                background: "var(--primary-softer)",
              }}
            >
              <span className="text-sm font-semibold text-gray-600">
                Food Preference
              </span>

              <button
                type="button"
                onClick={toggleFoodMode}
                aria-label="Toggle Food Mode"
                className="relative h-6 w-11 rounded-full transition-all duration-300"
                style={{
                  background:
                    mode === "veg"
                      ? "var(--primary)"
                      : "var(--color-nonveg-red)",
                }}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ${
                    mode === "veg" ? "left-1" : "left-[24px]"
                  }`}
                />
              </button>
            </div>

            {/* LOGIN / LOGOUT */}
            {!isAuthenticated ? (
              <Link
                to="/User/Login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-xl border px-5 py-3 text-sm font-bold transition hover:bg-[var(--primary-soft)]"
                style={{
                  borderColor: "var(--primary-border)",
                  color: "var(--primary)",
                }}
              >
                Login
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border px-5 py-3 text-left text-sm font-bold transition hover:bg-[var(--primary-soft)]"
                style={{
                  borderColor: "var(--primary-border)",
                  color: "var(--primary)",
                }}
              >
                Logout
              </button>
            )}

            {/* ORDER NOW */}
            <button
              type="button"
              onClick={handleOrderNow}
              className="mt-2 w-full rounded-xl px-5 py-3 text-sm font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-strong))",
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;