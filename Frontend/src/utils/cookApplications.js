// ─── Cook Applications Store (localStorage-backed) ──────────────────────

const STORAGE_KEY = "cookApplications";
const SESSION_KEY = "cookToken";
const CURRENT_COOK_KEY = "currentCook";

const seedApplications = [
  {
    id: "seed-1",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya@example.com",
    city: "Pune",
    kitchenName: "Priya's Home Kitchen",
    specialties: "North Indian, Tiffin, Healthy Meals",
    experience: "5 years of home cooking",
    about: "I've been cooking for my family for 5 years and love making fresh tiffins.",
    appliedOn: "2025-01-12",
    status: "pending",
    password: "priya123",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "seed-2",
    name: "Meena Krishnan",
    phone: "+91 87654 32109",
    email: "meena@example.com",
    city: "Bangalore",
    kitchenName: "Meena's Sattvic Kitchen",
    specialties: "South Indian, Jain, Sattvic",
    experience: "8 years of cooking for family",
    about: "Sattvic and Jain cooking is my specialty.",
    appliedOn: "2025-01-11",
    status: "pending",
    password: "meena123",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "seed-3",
    name: "Anjali Tiwari",
    phone: "+91 76543 21098",
    email: "anjali@example.com",
    city: "Delhi",
    kitchenName: "Anjali's Punjabi Rasoi",
    specialties: "Punjabi, Diet Meals, Kids Meals",
    experience: "3 years",
    about: "Punjabi home food, cooked with love.",
    appliedOn: "2025-01-10",
    status: "approved",
    password: "anjali123",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "seed-4",
    name: "Sneha Reddy",
    phone: "+91 65432 10987",
    email: "sneha@example.com",
    city: "Hyderabad",
    kitchenName: "Sneha's Andhra Meals",
    specialties: "Andhra, Telangana, Spicy",
    experience: "2 years",
    about: "Authentic Andhra home cooking.",
    appliedOn: "2025-01-09",
    status: "rejected",
    password: "sneha123",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
];

// ─── Read ───────────────────────────────────────────────────────────────
export function getApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedApplications));
      return seedApplications;
    }
    return JSON.parse(raw);
  } catch {
    return seedApplications;
  }
}

// ─── Register (create new application) ─────────────────────────────────
export function addApplication(application) {
  const list = getApplications();
  const newApp = {
    id: `cook-${Date.now()}`,
    appliedOn: new Date().toISOString().slice(0, 10),
    status: "pending",
    avatar: "",
    ...application,
  };
  const next = [newApp, ...list];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return newApp;
}

// ─── Update status (admin approve/reject) ──────────────────────────────
export function updateApplicationStatus(id, status) {
  const list = getApplications();
  const next = list.map((c) => (c.id === id ? { ...c, status } : c));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

// ─── Login ──────────────────────────────────────────────────────────────
export function loginCook(email, password) {
  const list = getApplications();
  const cook = list.find(
    (c) => c.email.toLowerCase() === email.toLowerCase().trim()
  );

  if (!cook) {
    return { ok: false, error: "No account found with this email." };
  }
  if (cook.password !== password) {
    return { ok: false, error: "Incorrect password." };
  }
  if (cook.status === "pending") {
    return {
      ok: false,
      error: "Your application is still pending approval.",
    };
  }
  if (cook.status === "rejected") {
    return {
      ok: false,
      error: "Your application was rejected. Contact support.",
    };
  }

  // Success
  localStorage.setItem(SESSION_KEY, cook.id);
  localStorage.setItem(CURRENT_COOK_KEY, JSON.stringify(cook));
  return { ok: true, cook };
}

// ─── Session ────────────────────────────────────────────────────────────
export function getCurrentCook() {
  try {
    const raw = localStorage.getItem(CURRENT_COOK_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isCookLoggedIn() {
  return !!localStorage.getItem(SESSION_KEY);
}

export function logoutCook() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CURRENT_COOK_KEY);
}

// ─── Profile sync (used by CookProfile save) ───────────────────────────
export function updateCookProfile(cookId, patch) {
  const list = getApplications();
  const next = list.map((c) =>
    c.id === cookId ? { ...c, ...patch } : c
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  // Refresh session data too
  const updated = next.find((c) => c.id === cookId);
  if (updated) {
    localStorage.setItem(CURRENT_COOK_KEY, JSON.stringify(updated));
  }
  return updated;
}

// ─── Dev reset ──────────────────────────────────────────────────────────
export function clearApplications() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CURRENT_COOK_KEY);
}