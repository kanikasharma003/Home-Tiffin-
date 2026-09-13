import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  ChevronDown,
  MoreVertical,
  TrendingUp,
  Package,
  Clock,
  Users,
  ChefHat,
  MessageSquare,
  LogIn,
} from 'lucide-react';
import AdminLayout from './AdminLayout';

// Mock Data 

const statsData = [
  { label: 'Total Orders', value: '1,248', change: '+12%', icon: Package, color: 'text-primary-500', bg: 'bg-primary-50' },
  { label: 'Active Users', value: '856', change: '+8%', icon: Users, color: 'text-veg-green', bg: 'bg-veg-green-light' },
  { label: 'Pending Inquiries', value: '23', change: '-5%', icon: MessageSquare, color: 'text-rating-yellow', bg: 'bg-primary-50' },
];

const adminLogins = [
  { id: 1, name: 'Admin User', email: 'admin@tiffinbox.com', time: '2 min ago', status: 'Active' },
  { id: 2, name: 'Sunita Devi', email: 'sunita@tiffinbox.com', time: '45 min ago', status: 'Active' },
  { id: 3, name: 'Rajesh Kumar', email: 'rajesh@tiffinbox.com', time: '3 hr ago', status: 'Inactive' },
  { id: 4, name: 'Meena Joshi', email: 'meena@tiffinbox.com', time: '5 hr ago', status: 'Active' },
  { id: 5, name: 'Arun Verma', email: 'arun@tiffinbox.com', time: '7 hr ago', status: 'Active' },
  { id: 6, name: 'Priya Sharma', email: 'priya@tiffinbox.com', time: '9 hr ago', status: 'Inactive' },
  { id: 7, name: 'Vikram Singh', email: 'vikram@tiffinbox.com', time: '11 hr ago', status: 'Active' },
  { id: 8, name: 'Neha Gupta', email: 'neha@tiffinbox.com', time: '1 day ago', status: 'Active' },
  { id: 9, name: 'Rohan Mehta', email: 'rohan@tiffinbox.com', time: '1 day ago', status: 'Inactive' },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Rahul Sharma', items: 'Veg Thali x2', amount: '₹240', status: 'Delivered', time: '10 min ago' },
  { id: '#ORD-002', customer: 'Priya Patel', items: 'Jain Thali x1', amount: '₹120', status: 'Preparing', time: '25 min ago' },
  { id: '#ORD-003', customer: 'Amit Kumar', items: 'Non-Veg Thali x3', amount: '₹450', status: 'Out for Delivery', time: '40 min ago' },
  { id: '#ORD-004', customer: 'Sneha Reddy', items: 'Veg Thali x1, Dal x1', amount: '₹180', status: 'Pending', time: '1 hr ago' },
  { id: '#ORD-005', customer: 'Vikram Singh', items: 'Special Thali x2', amount: '₹360', status: 'Delivered', time: '2 hr ago' },
];

const usersData = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', plan: 'Monthly', orders: 45, status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', plan: 'Weekly', orders: 12, status: 'Active' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', plan: 'Monthly', orders: 38, status: 'Active' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 65432 10987', plan: 'Trial', orders: 3, status: 'Inactive' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', plan: 'Monthly', orders: 52, status: 'Active' },
];

const cooksData = [
  { id: 1, name: 'Sunita Devi', specialty: 'North Indian', rating: 4.8, orders: 156, status: 'Active', avatar: 'SD' },
  { id: 2, name: 'Rajesh Kumar', specialty: 'South Indian', rating: 4.6, orders: 132, status: 'Active', avatar: 'RK' },
  { id: 3, name: 'Meena Joshi', specialty: 'Jain Cuisine', rating: 4.9, orders: 98, status: 'Active', avatar: 'MJ' },
  { id: 4, name: 'Arun Verma', specialty: 'Non-Veg Special', rating: 4.5, orders: 87, status: 'On Leave', avatar: 'AV' },
];

const inquiriesData = [
  { id: 1, name: 'Kavita Nair', email: 'kavita@example.com', subject: 'Monthly tiffin plan', message: 'Do you offer monthly subscription with Jain options?', date: '2025-01-15', status: 'New' },
  { id: 2, name: 'Suresh Menon', email: 'suresh@example.com', subject: 'Corporate bulk order', message: 'Need 50 tiffins daily for office. Please share rates.', date: '2025-01-14', status: 'Responded' },
  { id: 3, name: 'Anita Desai', email: 'anita@example.com', subject: 'Delivery area query', message: 'Do you deliver to Whitefield area?', date: '2025-01-13', status: 'New' },
  { id: 4, name: 'Mohan Rao', email: 'mohan@example.com', subject: 'Custom diet plan', message: 'Need low-oil, high-protein tiffin for fitness.', date: '2025-01-12', status: 'Closed' },
];

// Status Badge 

const statusStyles = {
  Delivered: 'bg-veg-green-light text-veg-green-dark',
  Preparing: 'bg-jain-light text-jain-dark',
  'Out for Delivery': 'bg-primary-50 text-primary-600',
  Pending: 'bg-primary-50 text-primary-500',
  Active: 'bg-veg-green-light text-veg-green-dark',
  'On Leave': 'bg-primary-50 text-primary-500',
  Inactive: 'bg-primary-50 text-primary-400',
  New: 'bg-primary-50 text-primary-600',
  Responded: 'bg-veg-green-light text-veg-green-dark',
  Closed: 'bg-primary-50 text-primary-400',
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || 'bg-primary-50 text-primary-500'
      }`}
    >
      {status}
    </span>
  );
}

//  Stats Grid 

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith('+');
        return (
          <div key={stat.label} className="card card-hover p-5">
            <div className="flex items-start justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon size={20} />
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isPositive
                    ? 'bg-veg-green-light text-veg-green-dark'
                    : 'bg-primary-50 text-primary-500'
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

//  Admin Logins Table 

function AdminLoginsTable() {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-display text-base font-bold text-heading">
          Recent Admin Logins
        </h2>
        <p className="text-xs text-muted">
          Latest admin activity on the panel
        </p>
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
                        <p className="font-semibold text-heading">{admin.name}</p>
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

//  Orders Table 

function OrdersTable() {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-base font-bold text-heading">
            Recent Orders
          </h2>
          <p className="text-xs text-muted">
            Latest 5 orders from your kitchen
          </p>
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

//  Users Table 

function UsersTable() {
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
                      {user.name.split(' ').map((n) => n[0]).join('')}
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

//  Cooks Grid 

function CooksGrid() {
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

// Inquiries Table  

function InquiriesTable() {
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

//  Dashboard Overview 

function DashboardOverview() {
  const quickActions = [
    { label: 'Add New Cook', icon: ChefHat, color: 'text-primary-500', bg: 'bg-primary-50' },
    { label: 'View Pending Orders', icon: Clock, color: 'text-rating-yellow', bg: 'bg-primary-50' },
    { label: 'Reply to Inquiries', icon: MessageSquare, color: 'text-jain', bg: 'bg-jain-light' },
    { label: 'Manage Users', icon: Users, color: 'text-veg-green', bg: 'bg-veg-green-light' },
  ];

  return (
    <div className="space-y-6">
      <StatsGrid />

      {/* Recent Admin Logins */}
      <AdminLoginsTable />

      {/* Recent Orders and Quick Actions */}
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
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:border-primary-200 hover:bg-primary-50/50"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.bg} ${action.color}`}>
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

//  Main Dashboard  

export default function AdminDashboard({ onExit }) {
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitles = {
    dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Admin' },
    orders: { title: 'Order Management', subtitle: 'Track and manage all orders' },
    users: { title: 'User Management', subtitle: 'Manage your customers' },
    cooks: { title: 'Manage Cooks', subtitle: 'Your kitchen team' },
    inquiries: { title: 'Inquiries', subtitle: 'Customer messages and queries' },
  };

  const current = pageTitles[active] || pageTitles.dashboard;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.clear();
    navigate('/admin/login', { replace: true });
  };

  const renderContent = () => {
    switch (active) {
      case 'orders':
        return <OrdersTable />;
      case 'users':
        return <UsersTable />;
      case 'cooks':
        return <CooksGrid />;
      case 'inquiries':
        return <InquiriesTable />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-page-bg">
      <AdminLayout
        active={active}
        setActive={setActive}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onExit={onExit}
        onLogout={handleLogout}
      />
 
      <div className="flex min-h-screen flex-col lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white/80 px-4 backdrop-blur-md sm:px-6">
          <button
            className="text-muted hover:text-heading lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="hidden sm:block">
            <h1 className="font-display text-lg font-bold text-heading">
              {current.title}
            </h1>
            <p className="text-xs text-muted">{current.subtitle}</p>
          </div>

          <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              size={16}
            />
            <input
              className="theme-input pl-10"
              placeholder="Search orders, users..."
            />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <div className="hidden items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                AD
              </div>
              <span className="text-sm font-medium text-heading">Admin</span>
              <ChevronDown size={14} className="text-muted" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="sm:hidden">
              <h1 className="font-display text-xl font-bold text-heading">
                {current.title}
              </h1>
              <p className="text-xs text-muted">{current.subtitle}</p>
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}