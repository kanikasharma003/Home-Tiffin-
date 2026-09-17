import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  IndianRupee,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChefHat,
} from "lucide-react";
import { logoutCook, getCurrentCook } from "../utils/cookApplications";

function CookLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentCook, setCurrentCook] = useState(getCurrentCook());
  const navigate = useNavigate();
  const location = useLocation();

  // Refresh cook when profile page dispatches "cook-updated"
  useEffect(() => {
    const refresh = () => setCurrentCook(getCurrentCook());
    window.addEventListener("cook-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cook-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const kitchenName = currentCook?.kitchenName || "My Kitchen";
  const cookName = currentCook?.name || "Cook";

  const menuItems = [
    { label: "Dashboard", path: "/cookdashboard", icon: LayoutDashboard },
    { label: "Orders",    path: "/cook/orders",   icon: ShoppingBag },
    { label: "My Menu",   path: "/cook/menu",     icon: UtensilsCrossed },
    { label: "Earnings",  path: "/cook/earnings", icon: IndianRupee },
    { label: "Profile",   path: "/cookprofile",   icon: User },
    { label: "Settings",  path: "/cook/settings", icon: Settings },
  ];

  const current = menuItems.find(
    (m) => location.pathname === m.path
  ) || { label: "Dashboard" };

  const handleMenuClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setMobileOpen(false);
    logoutCook();
    navigate("/become-cook", { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8f6]">
      {/*  MOBILE HEADER */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-strong))",
            }}
          >
            <ChefHat size={20} />
          </div>
          <span className="truncate font-extrabold text-[#174d35]">
            {kitchenName}
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border p-2"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/*  SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r bg-white transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center gap-3 border-b px-6">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-strong))",
            }}
          >
            <ChefHat size={23} />
          </div>
          <div className="min-w-0">
            <h1
              className="truncate text-lg font-extrabold"
              style={{ color: "var(--primary)" }}
            >
              {kitchenName}
            </h1>
            <p className="text-xs text-gray-500">Cook Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "text-white shadow-sm"
                    : "text-gray-600 hover:bg-[#eef7f1]"
                }`}
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                      }
                    : {}
                }
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t bg-white p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}

      {/* =====================================================
          MAIN COLUMN
      ===================================================== */}
      <div className="flex min-w-0 flex-1 flex-col pt-16 lg:pt-0">
        {/* Desktop topbar */}
        <header className="hidden h-20 shrink-0 items-center justify-between border-b bg-white px-8 lg:flex">
          <div>
            <h2 className="text-xl font-extrabold text-[#174d35]">
              {current.label}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your tiffin business from here.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile */}
            <div className="flex items-center gap-3 border-l pl-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                }}
              >
                <ChefHat size={20} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-800">
                  {kitchenName}
                </p>
                <p className="text-xs text-gray-500">{cookName}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default CookLayout;