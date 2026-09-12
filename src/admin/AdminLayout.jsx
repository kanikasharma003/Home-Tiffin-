import React from 'react';
import {
  LayoutDashboard,
  Users,
  ChefHat,
  MessageSquare,
  ShoppingBag,
  X,
  ArrowLeft,
  LogOut,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Order Management', icon: ShoppingBag },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'cooks', label: 'Manage Cooks', icon: ChefHat },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
];

export default function AdminLayout({
  active,
  setActive,
  open,
  setOpen,
  onExit,
  onLogout,
}) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white shadow-lg shadow-primary-500/30">
            <ChefHat size={18} />
          </div>
          <div>
            <p className="font-display text-base font-bold leading-tight text-heading">
              TiffinBox
            </p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted">
              Admin Panel
            </p>
          </div>
          <button
            className="ml-auto text-muted hover:text-heading lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'text-text hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="shrink-0 space-y-3 border-t border-border p-4">
          {/* Back to website */}
          {onExit && (
            <button
              onClick={onExit}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs font-medium text-muted transition hover:border-primary-200 hover:text-primary-500"
            >
              <ArrowLeft size={14} />
              Back to Website
            </button>
          )}

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 py-2 text-xs font-semibold text-primary-600 transition hover:bg-primary-100 hover:text-primary-700"
            >
              <LogOut size={14} />
              Logout
            </button>
          )}

          {/* Admin profile */}
          <div className="flex items-center gap-3 rounded-xl bg-cream p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-heading">
                Admin User
              </p>
              <p className="truncate text-xs text-muted">
                admin@tiffinbox.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}