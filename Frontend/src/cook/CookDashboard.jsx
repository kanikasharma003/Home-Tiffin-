import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  IndianRupee,
  Clock3,
  CheckCircle2,
  TrendingUp,
  Plus,
} from "lucide-react";
import CookLayout from "./CookLayout";

// Food images 
import dalThali from "../assets/menu-dal-thali.jpg";
import paneer from "../assets/menu-paneer.jpg";
import biryani from "../assets/menu-biryani.jpg";
import chole from "../assets/menu-chole.jpg";
import alooGobi from "../assets/menu-aloo-gobi.jpg";
import soya from "../assets/menu-soya.jpg";

// Shared mock data 
export const orders = [
  { id: "#TB1024", customer: "Rahul Sharma", meal: "Dal Tadka + Roti", qty: 2, amount: 180, status: "Preparing" },
  { id: "#TB1023", customer: "Priya Singh",  meal: "Paneer Thali",     qty: 1, amount: 140, status: "Ready" },
  { id: "#TB1022", customer: "Aman Verma",   meal: "Veg Biryani",      qty: 2, amount: 220, status: "Delivered" },
  { id: "#TB1021", customer: "Neha Patel",   meal: "Chole + Rice",     qty: 1, amount: 110, status: "Delivered" },
];

export const menuItemsData = [
  { image: dalThali, name: "Dal Tadka",    price: "₹90",  orders: "24 orders" },
  { image: paneer,   name: "Paneer Thali", price: "₹140", orders: "19 orders" },
  { image: biryani,  name: "Veg Biryani",  price: "₹110", orders: "16 orders" },
  { image: alooGobi, name: "Aloo Gobi",    price: "₹80",  orders: "12 orders" },
  { image: soya,     name: "Roti Sabzi",   price: "₹70",  orders: "10 orders" },
  { image: chole,    name: "Chole Rice",   price: "₹110", orders: "9 orders" },
];

// Cook Dashboard  
function CookDashboard() {
  const navigate = useNavigate();

  return (
    <CookLayout>
      {/* Welcome */}
      <div className="mb-7">
        <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
          Welcome back 👋
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#174d35] sm:text-3xl">
          Good Morning, Kanika!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Here's what's happening with your tiffin business today.
        </p>
      </div>

      {/* ─── STATS ─────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
            >
              <ShoppingBag size={21} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-600">
              <TrendingUp size={14} /> 12%
            </span>
          </div>
          <p className="mt-5 text-sm text-gray-500">Total Orders</p>
          <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">128</h3>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
          >
            <Clock3 size={21} />
          </div>
          <p className="mt-5 text-sm text-gray-500">Today's Orders</p>
          <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">18</h3>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
            >
              <IndianRupee size={21} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-600">
              <TrendingUp size={14} /> 8%
            </span>
          </div>
          <p className="mt-5 text-sm text-gray-500">This Month</p>
          <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">₹24,850</h3>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
          >
            <CheckCircle2 size={21} />
          </div>
          <p className="mt-5 text-sm text-gray-500">Delivered</p>
          <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">112</h3>
        </div>
      </div>

      {/* ORDERS and MENU */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-5">
            <div>
              <h3 className="font-extrabold text-[#174d35]">Recent Orders</h3>
              <p className="mt-1 text-xs text-gray-500">Latest customer orders</p>
            </div>
            <button
              onClick={() => navigate("/cook/orders")}
              className="text-sm font-bold"
              style={{ color: "var(--primary)" }}
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Meal</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="px-5 py-4 text-sm font-bold text-[#174d35]">{order.id}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{order.meal}</td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-800">₹{order.amount}</td>
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

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#174d35]">My Menu</h3>
              <p className="mt-1 text-xs text-gray-500">Your popular meals</p>
            </div>
            <button
              onClick={() => navigate("/cook/menu")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
              style={{ background: "var(--primary)" }}
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {menuItemsData.slice(0, 3).map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-[#f7faf8] p-3"
              >
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-11 w-11 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.orders}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#174d35]">{item.price}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/cook/menu")}
            className="mt-5 w-full rounded-xl border py-2.5 text-sm font-bold transition hover:bg-[#f1f8f3]"
            style={{ borderColor: "var(--primary-border)", color: "var(--primary)" }}
          >
            Manage Menu
          </button>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="font-extrabold text-[#174d35]">Today's Tasks</h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-green-600" />
              <span className="text-sm text-gray-600">Prepare 18 lunch orders</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-green-600" />
              <span className="text-sm text-gray-600">Update today's menu</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock3 size={20} style={{ color: "var(--primary)" }} />
              <span className="text-sm text-gray-600">Delivery pickup at 12:30 PM</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="font-extrabold text-[#174d35]">This Month</h3>
          <div className="mt-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-500">Customer Rating</p>
                <p className="mt-1 text-3xl font-extrabold text-[#174d35]">
                  4.8<span className="text-base text-gray-400">/5</span>
                </p>
              </div>
              <div className="text-2xl">⭐⭐⭐⭐⭐</div>
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
    </CookLayout>
  );
}

export default CookDashboard;