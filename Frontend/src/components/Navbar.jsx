import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Utensils } from "lucide-react";
import { NAV_LINKS } from "../data.js";
import { useAuth } from "../utils/UserAuth";
function Navbar({ mode = "veg", onModeChange }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
const { isAuthenticated, logout } = useAuth();

// logout function
const handleLogout = () => {
  setOpen(false);
  logout();
  navigate("/");
};

  // ========================================
  // NAVIGATION
  // ========================================
  const handleNav = (href) => {
    setOpen(false);

    if (!href) return;


    // ======================================
    // HOME
    // ======================================
    if (href === "#home" || href === "/") {
      if (window.location.pathname !== "/") {
        navigate("/");
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }


    // ======================================
    // CONTACT
    // ======================================
    if (href === "#contact" || href === "/contact") {
      navigate("/contact");
      return;
    }


    // ======================================
    // OTHER ROUTES
    // ======================================
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }


    // ======================================
    // HOME SECTIONS
    // ======================================
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  // ========================================
  // BECOME A COOK
  // ========================================
  const handleBecomeCook = () => {
    setOpen(false);
    navigate("/become-cook");
  };


  // ========================================
  // LOGIN
  // ========================================
  const handleLogin = () => {
    setOpen(false);
    navigate("/User/Login");
  };


  // ========================================
  // FOOD MODE TOGGLE
  // ========================================
  const toggleFoodMode = () => {
    if (!onModeChange) return;

    if (mode === "veg") {
      onModeChange("nonveg");
    } else {
      onModeChange("veg");
    }
  };


  return (
    <header
      className="sticky inset-x-0 top-0 z-50 border-b bg-white"
      style={{
        borderColor: "var(--color-border)",
      }}
    >

      {/* ==================================
          MAIN NAVBAR
      ================================== */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">


        {/* ==================================
            LOGO
        ================================== */}
        <button
          onClick={() => handleNav("#home")}
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
        </button>


        {/* ==================================
            DESKTOP NAVIGATION
        ================================== */}
        <nav className="hidden items-center gap-6 lg:flex">

          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
            >
              {link.label}
            </button>
          ))}


          {/* BECOME A COOK */}
          <button
            onClick={handleBecomeCook}
            className="text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
          >
            Become a Cook
          </button>

        </nav>


        {/* ==================================
            DESKTOP RIGHT SIDE
        ================================== */}
        <div className="hidden items-center gap-3 md:flex">


          {/* FOOD TOGGLE */}
          <button
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
                mode === "veg"
                  ? "left-0.5"
                  : "left-[18px]"
              }`}
            />
          </button>


          {/* LOGIN */}
          {!isAuthenticated ? (
          <button
            onClick={handleLogin}
            className="rounded-xl border px-4 py-2.5 text-sm font-bold transition hover:bg-[var(--primary-soft)]"
            style={{
              borderColor: "var(--primary-border)",
              color: "var(--primary)",
            }}
          >
            Login
          </button>
          ):
          (<button
            onClick={handleLogout}
            className="rounded-xl border px-4 py-2.5 text-sm font-bold transition hover:bg-[var(--primary-soft)]"
            style={{
              borderColor: "var(--primary-border)",
              color: "var(--primary)",
            }}
          >
            Login
          </button>)
}

          {/* ORDER NOW */}
          <button
            onClick={() => handleNav("#menu")}
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-strong))",
            }}
          >
            Order Now
          </button>

        </div>


        {/* ==================================
            MOBILE MENU BUTTON
        ================================== */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border p-2.5 text-gray-700 transition hover:bg-gray-50 md:hidden"
          style={{
            borderColor: "var(--color-border)",
          }}
        >
          {open ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>

      </div>


      {/* ==================================
          MOBILE MENU
      ================================== */}
      {open && (
        <div className="border-t bg-white md:hidden">

          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">


            {/* NAV LINKS */}
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
              >
                {link.label}
              </button>
            ))}


            {/* BECOME A COOK */}
            <button
              onClick={handleBecomeCook}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              Become a Cook
            </button>


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
                    mode === "veg"
                      ? "left-1"
                      : "left-[24px]"
                  }`}
                />
              </button>

            </div>


            {/* LOGIN */}
            <button
              onClick={handleLogin}
              className="w-full rounded-xl border px-5 py-3 text-left text-sm font-bold transition hover:bg-[var(--primary-soft)]"
              style={{
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
              }}
            >
              Login
            </button>


            {/* ORDER NOW */}
            <button
              onClick={() => handleNav("#menu")}
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


// ========================================
// DEFAULT EXPORT
// ========================================
export default Navbar;