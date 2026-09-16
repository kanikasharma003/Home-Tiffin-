import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical,
  TrendingUp,
  Package,
  Clock,
  Users,
  ChefHat,
  MessageSquare,
  LogIn,
  Mail,
  Phone,
  Copy,
  Check,
  Pencil,
  X,
  Calendar,
  Sparkles,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

// ─── Mock Data ────────────────────────────────────────────────────────────

const statsData = [
  { label: "Total Orders", value: "1,248", change: "+12%", icon: Package, color: "text-primary-500", bg: "bg-primary-50" },
  { label: "Active Users", value: "856", change: "+8%", icon: Users, color: "text-veg-green", bg: "bg-veg-green-light" },
  { label: "Pending Inquiries", value: "23", change: "-5%", icon: MessageSquare, color: "text-rating-yellow", bg: "bg-primary-50" },
];

const adminLogins = [
  { id: 1, name: "Admin User", email: "admin@tiffinbox.com", time: "2 min ago", status: "Active" },
  { id: 2, name: "Sunita Devi", email: "sunita@tiffinbox.com", time: "45 min ago", status: "Active" },
  { id: 3, name: "Rajesh Kumar", email: "rajesh@tiffinbox.com", time: "3 hr ago", status: "Inactive" },
  { id: 4, name: "Meena Joshi", email: "meena@tiffinbox.com", time: "5 hr ago", status: "Active" },
  { id: 5, name: "Arun Verma", email: "arun@tiffinbox.com", time: "7 hr ago", status: "Active" },
  { id: 6, name: "Priya Sharma", email: "priya@tiffinbox.com", time: "9 hr ago", status: "Inactive" },
  { id: 7, name: "Vikram Singh", email: "vikram@tiffinbox.com", time: "11 hr ago", status: "Active" },
  { id: 8, name: "Neha Gupta", email: "neha@tiffinbox.com", time: "1 day ago", status: "Active" },
  { id: 9, name: "Rohan Mehta", email: "rohan@tiffinbox.com", time: "1 day ago", status: "Inactive" },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Rahul Sharma", items: "Veg Thali x2", amount: "₹240", status: "Delivered", time: "10 min ago" },
  { id: "#ORD-002", customer: "Priya Patel", items: "Jain Thali x1", amount: "₹120", status: "Preparing", time: "25 min ago" },
  { id: "#ORD-003", customer: "Amit Kumar", items: "Non-Veg Thali x3", amount: "₹450", status: "Out for Delivery", time: "40 min ago" },
  { id: "#ORD-004", customer: "Sneha Reddy", items: "Veg Thali x1, Dal x1", amount: "₹180", status: "Pending", time: "1 hr ago" },
  { id: "#ORD-005", customer: "Vikram Singh", items: "Special Thali x2", amount: "₹360", status: "Delivered", time: "2 hr ago" },
];

const usersData = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", plan: "Monthly", orders: 45, status: "Active" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "+91 87654 32109", plan: "Weekly", orders: 12, status: "Active" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "+91 76543 21098", plan: "Monthly", orders: 38, status: "Active" },
  { id: 4, name: "Sneha Reddy", email: "sneha@example.com", phone: "+91 65432 10987", plan: "Trial", orders: 3, status: "Inactive" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "+91 54321 09876", plan: "Monthly", orders: 52, status: "Active" },
];

const cooksData = [
  { id: 1, name: "Sunita Devi", specialty: "North Indian", rating: 4.8, orders: 156, status: "Active", avatar: "SD" },
  { id: 2, name: "Rajesh Kumar", specialty: "South Indian", rating: 4.6, orders: 132, status: "Active", avatar: "RK" },
  { id: 3, name: "Meena Joshi", specialty: "Jain Cuisine", rating: 4.9, orders: 98, status: "Active", avatar: "MJ" },
  { id: 4, name: "Arun Verma", specialty: "Non-Veg Special", rating: 4.5, orders: 87, status: "On Leave", avatar: "AV" },
];

const inquiriesData = [
  { id: 1, name: "Kavita Nair", email: "kavita@example.com", subject: "Monthly tiffin plan", message: "Do you offer monthly subscription with Jain options?", date: "2025-01-15", status: "New" },
  { id: 2, name: "Suresh Menon", email: "suresh@example.com", subject: "Corporate bulk order", message: "Need 50 tiffins daily for office. Please share rates.", date: "2025-01-14", status: "Responded" },
  { id: 3, name: "Anita Desai", email: "anita@example.com", subject: "Delivery area query", message: "Do you deliver to Whitefield area?", date: "2025-01-13", status: "New" },
  { id: 4, name: "Mohan Rao", email: "mohan@example.com", subject: "Custom diet plan", message: "Need low-oil, high-protein tiffin for fitness.", date: "2025-01-12", status: "Closed" },
];

// ─── Admin Profile ───────────────────────────────────────────────────────

const adminProfile = {
  name: "Admin User",
  email: "admin@tiffinbox.com",
  phone: "+91 98765 43210",
  role: "Super Admin",
  initials: "AD",
};

// ─── Status Badge ────────────────────────────────────────────────────────

const statusStyles = {
  Delivered: "bg-veg-green-light text-veg-green-dark",
  Preparing: "bg-jain-light text-jain-dark",
  "Out for Delivery": "bg-primary-50 text-primary-600",
  Pending: "bg-primary-50 text-primary-500",
  Active: "bg-veg-green-light text-veg-green-dark",
  "On Leave": "bg-primary-50 text-primary-500",
  Inactive: "bg-primary-50 text-primary-400",
  New: "bg-primary-50 text-primary-600",
  Responded: "bg-veg-green-light text-veg-green-dark",
  Closed: "bg-primary-50 text-primary-400",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-primary-50 text-primary-500"
      }`}
    >
      {status}
    </span>
  );
}

// ─── Field helper ────────────────────────────────────────────────────────

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-heading outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
      />
    </label>
  );
}

// ─── Interactive Welcome Banner ─────────────────────────────────────────

function WelcomeBanner() {
  const [now, setNow] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState(adminProfile);
  const [draft, setDraft] = useState(adminProfile);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const greeting = (() => {
    const h = now.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const timeString = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateString = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  const openEdit = () => {
    setDraft(profile);
    setShowEdit(true);
  };

  const saveEdit = () => {
    const initials = draft.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    setProfile({ ...draft, initials });
    setShowEdit(false);
  };

  return (
    <>
      <div className="card overflow-hidden">
        <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100/60">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-primary-100/50 blur-3xl" />

          <div className="relative p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={openEdit}
                  className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white shadow-lg shadow-primary-500/30 transition hover:shadow-primary-500/50"
                  title="Edit profile"
                >
                  {profile.initials}
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary-600 shadow-md opacity-0 transition group-hover:opacity-100">
                    <Pencil size={11} />
                  </span>
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-primary-500" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                      {greeting}
                    </p>
                  </div>
                  <h2 className="mt-0.5 font-display text-xl font-bold text-heading sm:text-2xl">
                    {profile.name}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {dateString}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                      <Clock size={12} />
                      {timeString}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  title="Click to copy email"
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-heading shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:shadow"
                >
                  <Mail size={13} className="text-primary-500" />
                  {profile.email}
                  {copied ? (
                    <Check size={13} className="text-veg-green" />
                  ) : (
                    <Copy
                      size={13}
                      className="text-muted opacity-0 transition group-hover:opacity-100"
                    />
                  )}
                </button>

                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-heading shadow-sm">
                  <Phone size={13} className="text-primary-500" />
                  {profile.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowEdit(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-heading">
                Edit Profile
              </h3>
              <button
                onClick={() => setShowEdit(false)}
                className="rounded-lg p-1 text-muted transition hover:bg-cream hover:text-heading"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <Field
                label="Name"
                value={draft.name}
                onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
              />
              <Field
                label="Email"
                value={draft.email}
                onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
              />
              <Field
                label="Phone"
                value={draft.phone}
                onChange={(v) => setDraft((d) => ({ ...d, phone: v }))}
              />
              <Field
                label="Role"
                value={draft.role}
                onChange={(v) => setDraft((d) => ({ ...d, role: v }))}
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowEdit(false)}
                className="btn btn-outline text-sm"
              >
                Cancel
              </button>
              <button onClick={saveEdit} className="btn btn-primary text-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Stats Grid ──────────────────────────────────────────────────────────

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith("+");
        return (
          <div key={stat.label} className="card card-hover p-5">
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isPositive
                    ? "bg-veg-green-light text-veg-green-dark"
                    : "bg-primary-50 text-primary-500"
                }`}
              >
                {isPositive ? <TrendingUp size={12} /> : null}
                {stat.change}
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-heading">
              {stat.value}
            </p>
            <p className="mt-0.5 text-sm text-muted">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Admin Logins Table ─────────────────────────────────────────────────

function AdminLoginsTable() {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-display text-base font-bold text-heading">
          Recent Admin Logins
        </h2>
        <p className="text-xs text-muted">Latest admin activity on the panel</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-cream/60 text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-semibold">Admin</th>
              <th className="px-5 py-3 font-semibold">Time</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
        </table>

        <div className="max-h-[380px] overflow-y-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <tbody>
              {adminLogins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b border-border last:border-0 transition hover:bg-cream/50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        <LogIn size={15} />
                      </div>
                      <div>
                        <p className="font-semibold text-heading">
                          {admin.name}
                        </p>
                        <p className="text-xs text-muted">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{admin.time}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={admin.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Orders Table ───────────────────────────────────────────────────────

export function OrdersTable() {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-base font-bold text-heading">
            Recent Orders
          </h2>
          <p className="text-xs text-muted">Latest 5 orders from your kitchen</p>
        </div>
        <button className="btn btn-outline text-xs">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-cream/60 text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-semibold">Order ID</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Items</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Time</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border last:border-0 transition hover:bg-cream/50"
              >
                <td className="px-5 py-3.5 font-semibold text-primary-600">
                  {order.id}
                </td>
                <td className="px-5 py-3.5 font-medium text-heading">
                  {order.customer}
                </td>
                <td className="px-5 py-3.5 text-text">{order.items}</td>
                <td className="px-5 py-3.5 font-semibold text-heading">
                  {order.amount}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-3.5 text-muted">{order.time}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-muted transition hover:text-primary-500">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Users Table ────────────────────────────────────────────────────────

export function UsersTable() {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-base font-bold text-heading">
            User Management
          </h2>
          <p className="text-xs text-muted">All registered customers</p>
        </div>
        <button className="btn btn-primary text-xs">+ Add User</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-cream/60 text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-semibold">User</th>
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">Plan</th>
              <th className="px-5 py-3 font-semibold">Orders</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border last:border-0 transition hover:bg-cream/50"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-heading">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-text">{user.phone}</td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex rounded-full bg-jain-light px-3 py-1 text-xs font-semibold text-jain-dark">
                    {user.plan}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-semibold text-heading">
                  {user.orders}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-muted transition hover:text-primary-500">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Cooks Grid ─────────────────────────────────────────────────────────

export function CooksGrid() {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-base font-bold text-heading">
            Manage Cooks
          </h2>
          <p className="text-xs text-muted">Your kitchen team members</p>
        </div>
        <button className="btn btn-primary text-xs">+ Add Cook</button>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
        {cooksData.map((cook) => (
          <div key={cook.id} className="card card-hover p-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white shadow-lg shadow-primary-500/30">
              {cook.avatar}
            </div>
            <h3 className="mt-3 font-display text-base font-bold text-heading">
              {cook.name}
            </h3>
            <p className="text-xs text-muted">{cook.specialty}</p>

            <div className="mt-3 flex items-center justify-center gap-1 text-sm">
              <span className="text-gold">★</span>
              <span className="font-semibold text-heading">{cook.rating}</span>
              <span className="text-muted">({cook.orders} orders)</span>
            </div>

            <div className="mt-3">
              <StatusBadge status={cook.status} />
            </div>

            <button className="btn btn-outline mt-4 w-full text-xs">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inquiries Table ────────────────────────────────────────────────────

export function InquiriesTable() {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-base font-bold text-heading">
            Customer Inquiries
          </h2>
          <p className="text-xs text-muted">
            Messages and queries from customers
          </p>
        </div>
        <button className="btn btn-outline text-xs">Export</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-cream/60 text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Subject</th>
              <th className="px-5 py-3 font-semibold">Message</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {inquiriesData.map((inq) => (
              <tr
                key={inq.id}
                className="border-b border-border last:border-0 transition hover:bg-cream/50"
              >
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-heading">{inq.name}</p>
                  <p className="text-xs text-muted">{inq.email}</p>
                </td>
                <td className="px-5 py-3.5 font-medium text-heading">
                  {inq.subject}
                </td>
                <td className="max-w-xs truncate px-5 py-3.5 text-text">
                  {inq.message}
                </td>
                <td className="px-5 py-3.5 text-muted">{inq.date}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={inq.status} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-muted transition hover:text-primary-500">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Dashboard Overview ─────────────────────────────────────────────────

export function DashboardOverview() {
  const navigate = useNavigate();

  const quickActions = [
    { label: "Add New Cook", icon: ChefHat, color: "text-primary-500", bg: "bg-primary-50", path: "/admin/cooks" },
    { label: "View Pending Orders", icon: Clock, color: "text-rating-yellow", bg: "bg-primary-50", path: "/admin/orders" },
    { label: "Reply to Inquiries", icon: MessageSquare, color: "text-jain", bg: "bg-jain-light", path: "/admin/inquiries" },
    { label: "Manage Users", icon: Users, color: "text-veg-green", bg: "bg-veg-green-light", path: "/admin/users" },
  ];

  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <StatsGrid />

      <AdminLoginsTable />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <OrdersTable />
        </div>
        <div className="card p-5">
          <h2 className="font-display text-base font-bold text-heading">
            Quick Actions
          </h2>
          <p className="text-xs text-muted">Common tasks at a glance</p>
          <div className="mt-4 space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:border-primary-200 hover:bg-primary-50/50"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.bg} ${action.color}`}
                  >
                    <Icon size={17} />
                  </div>
                  <span className="text-sm font-medium text-heading">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl bg-banner-grad p-4 text-white">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-primary-300" />
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-200">
                Today's Summary
              </p>
            </div>
            <p className="mt-2 font-display text-2xl font-bold">48 Orders</p>
            <p className="text-xs text-primary-200">
              ₹8,640 revenue • 12 pending
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard (Default Export) ───────────────────────────────────

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <DashboardOverview />
    </AdminLayout>
  );
}