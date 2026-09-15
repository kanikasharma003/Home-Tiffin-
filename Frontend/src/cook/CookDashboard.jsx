import { useState } from "react";

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
  Clock3,
  CheckCircle2,
  ChefHat,
  TrendingUp,
  Bell,
  Plus,
} from "lucide-react";

// ===============================
// FOOD IMAGES
// ===============================
import dalThali from "../assets/menu-dal-thali.jpg";
import paneer from "../assets/menu-paneer.jpg";
import biryani from "../assets/menu-biryani.jpg";
import chole from "../assets/menu-chole.jpg";
import alooGobi from "../assets/menu-aloo-gobi.jpg";
import soya from "../assets/menu-soya.jpg";

// ===============================
// COOK DASHBOARD
// ===============================
function CookDashboard({ onExit }) {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ===============================
  // SIDEBAR MENU
  // ===============================
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      label: "My Menu",
      icon: UtensilsCrossed,
    },
    {
      label: "Earnings",
      icon: IndianRupee,
    },
    {
      label: "Profile",
      icon: User,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  // ===============================
  // ORDERS
  // ===============================
  const orders = [
    {
      id: "#TB1024",
      customer: "Rahul Sharma",
      meal: "Dal Tadka + Roti",
      qty: 2,
      amount: 180,
      status: "Preparing",
    },
    {
      id: "#TB1023",
      customer: "Priya Singh",
      meal: "Paneer Thali",
      qty: 1,
      amount: 140,
      status: "Ready",
    },
    {
      id: "#TB1022",
      customer: "Aman Verma",
      meal: "Veg Biryani",
      qty: 2,
      amount: 220,
      status: "Delivered",
    },
    {
      id: "#TB1021",
      customer: "Neha Patel",
      meal: "Chole + Rice",
      qty: 1,
      amount: 110,
      status: "Delivered",
    },
  ];

  // ===============================
  // MENU ITEMS
  // ===============================
  const menuItemsData = [
    {
      image: dalThali,
      name: "Dal Tadka",
      price: "₹90",
      orders: "24 orders",
    },
    {
      image: paneer,
      name: "Paneer Thali",
      price: "₹140",
      orders: "19 orders",
    },
    {
      image: biryani,
      name: "Veg Biryani",
      price: "₹110",
      orders: "16 orders",
    },
    {
      image: alooGobi,
      name: "Aloo Gobi",
      price: "₹80",
      orders: "12 orders",
    },
    {
      image: soya,
      name: "Roti Sabzi",
      price: "₹70",
      orders: "10 orders",
    },
    {
      image: chole,
      name: "Chole Rice",
      price: "₹110",
      orders: "9 orders",
    },
  ];

  // ===============================
  // MENU CLICK
  // ===============================
  const handleMenuClick = (label) => {
    setActiveMenu(label);
    setMobileOpen(false);
  };

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = () => {
    setMobileOpen(false);

    if (onExit) {
      onExit();
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6]">

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">

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

          <span className="font-extrabold text-[#174d35]">
            Cook Panel
          </span>

        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border p-2"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

      </div>

      {/* =====================================================
          MAIN FLEX
      ===================================================== */}
      <div className="flex">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r bg-white transition-transform duration-300 ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          } lg:static lg:translate-x-0`}
        >

          {/* =================================================
              LOGO
          ================================================= */}
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

            <div>
              <h1
                className="text-lg font-extrabold"
                style={{
                  color: "var(--primary)",
                }}
              >
                TiffinBox
              </h1>

              <p className="text-xs text-gray-500">
                Cook Dashboard
              </p>
            </div>

          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">

            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeMenu === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => handleMenuClick(item.label)}
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

          {/* =================================================
              LOGOUT
          ================================================= */}
          <div className="mt-auto shrink-0 border-t bg-white p-4">

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={19} />

              Logout
            </button>

          </div>

        </aside>

        {/* =====================================================
            MOBILE OVERLAY
        ===================================================== */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          />
        )}

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <main className="min-w-0 flex-1">

          {/* =================================================
              DESKTOP TOPBAR
          ================================================= */}
          <header className="hidden h-20 items-center justify-between border-b bg-white px-8 lg:flex">

            <div>
              <h2 className="text-xl font-extrabold text-[#174d35]">
                {activeMenu}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your tiffin business from here.
              </p>
            </div>

            <div className="flex items-center gap-4">

              {/* Notification */}
              <button className="relative rounded-xl border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50">

                <Bell size={19} />

                <span
                  className="absolute right-1 top-1 h-2 w-2 rounded-full"
                  style={{
                    background: "var(--primary)",
                  }}
                />

              </button>

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

                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Kanika Sharma
                  </p>

                  <p className="text-xs text-gray-500">
                    Home Cook
                  </p>
                </div>

              </div>

            </div>

          </header>

          {/* =================================================
              PAGE CONTENT
          ================================================= */}
          <div className="p-4 sm:p-6 lg:p-8">

            {/* =================================================
                DASHBOARD
            ================================================= */}
            {activeMenu === "Dashboard" && (
              <>

                {/* Welcome */}
                <div className="mb-7">

                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    Welcome back 👋
                  </p>

                  <h1 className="mt-1 text-2xl font-extrabold text-[#174d35] sm:text-3xl">
                    Good Morning, Kanika!
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Here's what's happening with your tiffin business today.
                  </p>

                </div>

                {/* =================================================
                    STATS
                ================================================= */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                  {/* Total Orders */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{
                          background: "var(--primary-soft)",
                          color: "var(--primary)",
                        }}
                      >
                        <ShoppingBag size={21} />
                      </div>

                      <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                        <TrendingUp size={14} />
                        12%
                      </span>

                    </div>

                    <p className="mt-5 text-sm text-gray-500">
                      Total Orders
                    </p>

                    <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">
                      128
                    </h3>

                  </div>

                  {/* Today's Orders */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background: "var(--primary-soft)",
                        color: "var(--primary)",
                      }}
                    >
                      <Clock3 size={21} />
                    </div>

                    <p className="mt-5 text-sm text-gray-500">
                      Today's Orders
                    </p>

                    <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">
                      18
                    </h3>

                  </div>

                  {/* Earnings */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{
                          background: "var(--primary-soft)",
                          color: "var(--primary)",
                        }}
                      >
                        <IndianRupee size={21} />
                      </div>

                      <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                        <TrendingUp size={14} />
                        8%
                      </span>

                    </div>

                    <p className="mt-5 text-sm text-gray-500">
                      This Month
                    </p>

                    <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">
                      ₹24,850
                    </h3>

                  </div>

                  {/* Delivered */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background: "var(--primary-soft)",
                        color: "var(--primary)",
                      }}
                    >
                      <CheckCircle2 size={21} />
                    </div>

                    <p className="mt-5 text-sm text-gray-500">
                      Delivered
                    </p>

                    <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">
                      112
                    </h3>

                  </div>

                </div>

                {/* =================================================
                    ORDERS + MENU
                ================================================= */}
                <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">

                  {/* Recent Orders */}
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b px-5 py-5">

                      <div>
                        <h3 className="font-extrabold text-[#174d35]">
                          Recent Orders
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Latest customer orders
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveMenu("Orders")}
                        className="text-sm font-bold"
                        style={{
                          color: "var(--primary)",
                        }}
                      >
                        View All
                      </button>

                    </div>

                    <div className="overflow-x-auto">

                      <table className="w-full min-w-[650px]">

                        <thead>
                          <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">

                            <th className="px-5 py-3">
                              Order
                            </th>

                            <th className="px-5 py-3">
                              Customer
                            </th>

                            <th className="px-5 py-3">
                              Meal
                            </th>

                            <th className="px-5 py-3">
                              Amount
                            </th>

                            <th className="px-5 py-3">
                              Status
                            </th>

                          </tr>
                        </thead>

                        <tbody>

                          {orders.map((order) => (
                            <tr
                              key={order.id}
                              className="border-b last:border-0"
                            >

                              <td className="px-5 py-4 text-sm font-bold text-[#174d35]">
                                {order.id}
                              </td>

                              <td className="px-5 py-4 text-sm text-gray-600">
                                {order.customer}
                              </td>

                              <td className="px-5 py-4 text-sm text-gray-600">
                                {order.meal}
                              </td>

                              <td className="px-5 py-4 text-sm font-bold text-gray-800">
                                ₹{order.amount}
                              </td>

                              <td className="px-5 py-4">

                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-700"
                                      : order.status === "Ready"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {order.status}
                                </span>

                              </td>

                            </tr>
                          ))}

                        </tbody>

                      </table>

                    </div>

                  </div>

                  {/* =================================================
                      QUICK MENU
                  ================================================= */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div>
                        <h3 className="font-extrabold text-[#174d35]">
                          My Menu
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Your popular meals
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveMenu("My Menu")}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                        style={{
                          background: "var(--primary)",
                        }}
                      >
                        <Plus size={18} />
                      </button>

                    </div>

                    {/* Food Items */}
                    <div className="mt-6 space-y-4">

                      {menuItemsData.slice(0, 3).map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between rounded-xl bg-[#f7faf8] p-3"
                        >

                          <div className="flex items-center gap-3">

                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-11 w-11 rounded-xl object-cover"
                            />

                            <div>
                              <p className="text-sm font-bold text-gray-800">
                                {item.name}
                              </p>

                              <p className="text-xs text-gray-500">
                                {item.orders}
                              </p>
                            </div>

                          </div>

                          <span className="text-sm font-bold text-[#174d35]">
                            {item.price}
                          </span>

                        </div>
                      ))}

                    </div>

                    <button
                      onClick={() => setActiveMenu("My Menu")}
                      className="mt-5 w-full rounded-xl border py-2.5 text-sm font-bold transition hover:bg-[#f1f8f3]"
                      style={{
                        borderColor: "var(--primary-border)",
                        color: "var(--primary)",
                      }}
                    >
                      Manage Menu
                    </button>

                  </div>

                </div>

                {/* =================================================
                    BOTTOM CARDS
                ================================================= */}
                <div className="mt-6 grid gap-6 md:grid-cols-2">

                  {/* Today's Tasks */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                    <h3 className="font-extrabold text-[#174d35]">
                      Today's Tasks
                    </h3>

                    <div className="mt-5 space-y-4">

                      <div className="flex items-center gap-3">

                        <CheckCircle2
                          size={20}
                          className="text-green-600"
                        />

                        <span className="text-sm text-gray-600">
                          Prepare 18 lunch orders
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <CheckCircle2
                          size={20}
                          className="text-green-600"
                        />

                        <span className="text-sm text-gray-600">
                          Update today's menu
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <Clock3
                          size={20}
                          style={{
                            color: "var(--primary)",
                          }}
                        />

                        <span className="text-sm text-gray-600">
                          Delivery pickup at 12:30 PM
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Performance */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                    <h3 className="font-extrabold text-[#174d35]">
                      This Month
                    </h3>

                    <div className="mt-5">

                      <div className="flex items-end justify-between">

                        <div>

                          <p className="text-sm text-gray-500">
                            Customer Rating
                          </p>

                          <p className="mt-1 text-3xl font-extrabold text-[#174d35]">
                            4.8
                            <span className="text-base text-gray-400">
                              /5
                            </span>
                          </p>

                        </div>

                        <div className="text-2xl">
                          ⭐⭐⭐⭐⭐
                        </div>

                      </div>

                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">

                        <div
                          className="h-full rounded-full"
                          style={{
                            width: "96%",
                            background:
                              "linear-gradient(90deg, var(--primary), var(--primary-strong))",
                          }}
                        />

                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        Excellent performance this month
                      </p>

                    </div>

                  </div>

                </div>

              </>
            )}

            {/* =====================================================
                ORDERS
            ===================================================== */}
            {activeMenu === "Orders" && (
              <section>

                <div className="mb-6">

                  <h1 className="text-2xl font-extrabold text-[#174d35]">
                    Orders
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your customer orders.
                  </p>

                </div>

                <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                      <thead>

                        <tr className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">

                          <th className="px-6 py-4">
                            Order ID
                          </th>

                          <th className="px-6 py-4">
                            Customer
                          </th>

                          <th className="px-6 py-4">
                            Meal
                          </th>

                          <th className="px-6 py-4">
                            Quantity
                          </th>

                          <th className="px-6 py-4">
                            Amount
                          </th>

                          <th className="px-6 py-4">
                            Status
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b last:border-0"
                          >

                            <td className="px-6 py-4 text-sm font-bold text-[#174d35]">
                              {order.id}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                              {order.customer}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                              {order.meal}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                              {order.qty}
                            </td>

                            <td className="px-6 py-4 text-sm font-bold">
                              ₹{order.amount}
                            </td>

                            <td className="px-6 py-4">

                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                {order.status}
                              </span>

                            </td>

                          </tr>
                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </section>
            )}

            {/* =====================================================
                MY MENU
            ===================================================== */}
            {activeMenu === "My Menu" && (
              <section>

                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>

                    <h1 className="text-2xl font-extrabold text-[#174d35]">
                      My Menu
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                      Add and manage your homemade meals.
                    </p>

                  </div>

                  <button
                    className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                    }}
                  >
                    <Plus size={18} />
                    Add New Meal
                  </button>

                </div>

                {/* Food Cards */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {menuItemsData.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                    >

                      <div className="h-40 overflow-hidden rounded-xl bg-[#f2f7f3]">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />

                      </div>

                      <div className="mt-4 flex items-start justify-between">

                        <div>

                          <h3 className="font-extrabold text-[#174d35]">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {item.orders}
                          </p>

                        </div>

                        <p
                          className="font-extrabold"
                          style={{
                            color: "var(--primary)",
                          }}
                        >
                          {item.price}
                        </p>

                      </div>

                      <button className="mt-4 w-full rounded-xl border border-gray-200 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50">
                        Edit Meal
                      </button>

                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* =====================================================
                EARNINGS
            ===================================================== */}
            {activeMenu === "Earnings" && (
              <section>

                <div className="mb-6">

                  <h1 className="text-2xl font-extrabold text-[#174d35]">
                    Earnings
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Track your income and payouts.
                  </p>

                </div>

                <div className="grid gap-5 sm:grid-cols-3">

                  <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                      Total Earnings
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold text-[#174d35]">
                      ₹24,850
                    </h2>

                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                      This Week
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold text-[#174d35]">
                      ₹6,420
                    </h2>

                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                      Pending Payout
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold text-[#174d35]">
                      ₹2,150
                    </h2>

                  </div>

                </div>

              </section>
            )}

            {/* =====================================================
                PROFILE
            ===================================================== */}
            {activeMenu === "Profile" && (
              <section>

                <div className="mb-6">

                  <h1 className="text-2xl font-extrabold text-[#174d35]">
                    My Profile
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your cook profile.
                  </p>

                </div>

                <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">

                  <div className="flex items-center gap-4 border-b pb-6">

                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                      }}
                    >
                      <ChefHat size={28} />
                    </div>

                    <div>

                      <h2 className="text-xl font-extrabold text-[#174d35]">
                        Kanika Sharma
                      </h2>

                      <p className="text-sm text-gray-500">
                        Home Cook
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Full Name
                      </label>

                      <input
                        value="Kanika Sharma"
                        readOnly
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Email
                      </label>

                      <input
                        value="kanika@example.com"
                        readOnly
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Phone
                      </label>

                      <input
                        value="+91 98765 43210"
                        readOnly
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        City
                      </label>

                      <input
                        value="Nagpur"
                        readOnly
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                      />

                    </div>

                  </div>

                </div>

              </section>
            )}

            {/* =====================================================
                SETTINGS
            ===================================================== */}
            {activeMenu === "Settings" && (
              <section>

                <div className="mb-6">

                  <h1 className="text-2xl font-extrabold text-[#174d35]">
                    Settings
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your dashboard preferences.
                  </p>

                </div>

                <div className="max-w-3xl space-y-4">

                  {/* Notification */}
                  <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">

                    <div>

                      <h3 className="font-bold text-gray-800">
                        Order Notifications
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Receive notifications for new orders.
                      </p>

                    </div>

                    <div
                      className="h-6 w-11 rounded-full p-1"
                      style={{
                        background: "var(--primary)",
                      }}
                    >
                      <div className="ml-auto h-4 w-4 rounded-full bg-white" />
                    </div>

                  </div>

                  {/* Delivery Updates */}
                  <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">

                    <div>

                      <h3 className="font-bold text-gray-800">
                        Delivery Updates
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Get updates about pickup and delivery.
                      </p>

                    </div>

                    <div
                      className="h-6 w-11 rounded-full p-1"
                      style={{
                        background: "var(--primary)",
                      }}
                    >
                      <div className="ml-auto h-4 w-4 rounded-full bg-white" />
                    </div>

                  </div>

                </div>

              </section>
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default CookDashboard;