// ─── Admin Auth Store (localStorage-backed) ─────────────────────────────

const ADMIN_KEY = "adminAccounts";
const SESSION_KEY = "adminToken";
const CURRENT_ADMIN_KEY = "currentAdmin";

// The one secret key that gates admin registration
export const ADMIN_SECRET_KEY = "TIFFINBOX-ADMIN-2026";

const seedAdmins = [
  {
    id: "admin-seed",
    name: "Super Admin",
    email: "admin@tiffinbox.com",
    phone: "+91 98765 43210",
    password: "admin123",
    role: "Super Admin",
  },
];

export function getAdmins() {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    if (!raw) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(seedAdmins));
      return seedAdmins;
    }
    return JSON.parse(raw);
  } catch {
    return seedAdmins;
  }
}

export function addAdmin(admin) {
  const list = getAdmins();
  const newAdmin = {
    id: `admin-${Date.now()}`,
    role: "Admin",
    ...admin,
  };
  const next = [...list, newAdmin];
  localStorage.setItem(ADMIN_KEY, JSON.stringify(next));
  return newAdmin;
}

export function loginAdmin(email, password) {
  const list = getAdmins();
  const admin = list.find(
    (a) => a.email.toLowerCase() === email.toLowerCase().trim()
  );

  if (!admin) {
    return { ok: false, error: "No admin account with this email." };
  }
  if (admin.password !== password) {
    return { ok: false, error: "Incorrect password." };
  }

  localStorage.setItem(SESSION_KEY, admin.id);
  localStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(admin));
  return { ok: true, admin };
}

export function getCurrentAdmin() {
  try {
    const raw = localStorage.getItem(CURRENT_ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logoutAdmin() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CURRENT_ADMIN_KEY);
}