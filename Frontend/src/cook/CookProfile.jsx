import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChefHat,
  Mail,
  Phone,
  MapPin,
  Star,
  ShoppingBag,
  IndianRupee,
  CalendarDays,
  Pencil,
  Check,
  X,
  Save,
  Store,
  AlertCircle,
  Loader2,
} from "lucide-react";
import CookLayout from "./CookLayout";
import { getCurrentCook, updateCookProfile } from "../utils/cookApplications";

// Field 
function Field({
  label,
  icon: Icon,
  value,
  onChange,
  onBlur,
  type = "text",
  readOnly = false,
  error,
  placeholder,
  inputMode,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
        {Icon ? <Icon size={15} className="text-gray-400" /> : null}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        readOnly={readOnly}
        disabled={readOnly}
        placeholder={readOnly ? "" : placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
          readOnly
            ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500"
            : error
            ? "border-red-300 bg-white text-gray-800 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 bg-white text-gray-800 focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary-soft)]"
        }`}
      />
      {error && !readOnly && (
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// CookProfile 
function CookProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cook = getCurrentCook();
    if (!cook) {
      navigate("/become-cook", { replace: true });
      return;
    }

    const shaped = {
      id: cook.id,
      kitchenName: cook.kitchenName || "",
      name: cook.name || "",
      email: cook.email || "",
      phone: cook.phone || "",
      city: cook.city || "",
      bio: cook.about || "",
      joined: cook.appliedOn || "",
      stats: {
        orders: 128,
        rating: 4.8,
        earnings: "₹24,850",
      },
    };
    setProfile(shaped);
    setDraft(shaped);
  }, [navigate]);

  const dirty =
    profile && draft && JSON.stringify(profile) !== JSON.stringify(draft);

  
  useEffect(() => {
    const handler = (e) => {
      if (editing && dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [editing, dirty]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && editing) handleCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const update = (key) => (value) => {
    setDraft((d) => ({ ...d, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  };

  const updatePhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setDraft((d) => ({ ...d, phone: digits }));
    if (errors.phone) {
      setErrors((e) => {
        const next = { ...e };
        delete next.phone;
        return next;
      });
    }
  };

  const validate = useCallback(() => {
    const e = {};

    // Kitchen name
    if (!draft.kitchenName?.trim()) {
      e.kitchenName = "Kitchen name is required";
    } else if (draft.kitchenName.trim().length < 2) {
      e.kitchenName = "Kitchen name must be at least 2 characters";
    }

    if (!draft.name?.trim()) {
      e.name = "Full name is required";
    } else if (draft.name.trim().length < 2) {
      e.name = "Full name must be at least 2 characters";
    } else if (!/^[A-Za-z\s.'-]+$/.test(draft.name.trim())) {
      e.name = "Name can only contain letters, spaces, and . ' -";
    }

    // Email 
    const email = draft.email?.trim() || "";
    if (!email) {
      e.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      e.email = "Enter a valid email (e.g. name@example.com)";
    }

    const phone = draft.phone || "";
    if (!phone) {
      e.phone = "Phone number is required";
    } else if (phone.length !== 10) {
      e.phone = "Phone number must be exactly 10 digits";
    } else if (!/^[6-9]/.test(phone)) {
      e.phone = "Mobile number must start with 6, 7, 8, or 9";
    }

    // City
    if (!draft.city?.trim()) {
      e.city = "City is required";
    }

    return e;
  }, [draft]);

  const validateField = (key) => () => {
    const all = validate();
    setErrors((prev) => {
      const next = { ...prev };
      if (all[key]) next[key] = all[key];
      else delete next[key];
      return next;
    });
  };

  // Save 
  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      document
        .getElementById("profile-form")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      updateCookProfile(profile.id, {
        kitchenName: draft.kitchenName.trim(),
        name: draft.name.trim(),
        email: draft.email.trim(),
        phone: draft.phone,
        city: draft.city.trim(),
        about: draft.bio,
      });

      window.dispatchEvent(new Event("cook-updated"));

      const next = {
        ...draft,
        kitchenName: draft.kitchenName.trim(),
        name: draft.name.trim(),
        email: draft.email.trim(),
        phone: draft.phone,
        city: draft.city.trim(),
      };

      setProfile(next);
      setDraft(next);
      setEditing(false);
      setSaving(false);
      setSaved(true);
      setErrors({});
      setTimeout(() => setSaved(false), 2500);
    }, 350);
  };

  const handleCancel = () => {
    setDraft(profile);
    setErrors({});
    setEditing(false);
  };

  const handleEdit = () => {
    setDraft(profile);
    setErrors({});
    setEditing(true);
    setTimeout(() => {
      document
        .getElementById("profile-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  if (!profile) return null;

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <CookLayout>
      {/* Page heading */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-[#174d35] sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your public cook profile and contact details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
              <Check size={13} /> Saved
            </span>
          )}

          {!editing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}

          {editing && (
            <>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!dirty || saving}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                }}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile header card */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div
          className="h-24"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), var(--primary-strong))",
          }}
        />

        <div className="px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="-mt-14 shrink-0">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-lg ring-4 ring-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary), var(--primary-strong))",
                  }}
                >
                  {initials}
                </div>
              </div>

              <div className="sm:pb-1">
                <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#174d35]">
                  <Store size={18} className="shrink-0" />
                  <span className="truncate">{profile.kitchenName}</span>
                </h2>
                <p className="mt-1 text-sm font-semibold text-gray-600">
                  by {profile.name}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700">
                    ● Active
                  </span>
                  <span className="rounded-full bg-[color:var(--primary-soft)] px-2.5 py-1 text-[11px] font-bold text-[color:var(--primary)]">
                    Verified Cook
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={profile.stats.orders}
        />
        <StatCard
          icon={Star}
          label="Avg. Rating"
          value={`${profile.stats.rating}/5`}
        />
        <StatCard
          icon={IndianRupee}
          label="Total Earnings"
          value={profile.stats.earnings}
        />
        <StatCard
          icon={CalendarDays}
          label="Joined"
          value={profile.joined}
        />
      </div>

      {/* Form */}
      <div
        id="profile-form"
        className="mt-6 max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6">
          <h3 className="font-extrabold text-[#174d35]">
            Personal Information
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {editing
              ? "Update your details and click Save Changes when done. Press Esc to cancel."
              : "This information is shown to customers on your profile."}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field
              label="Kitchen Name"
              icon={Store}
              value={draft.kitchenName}
              onChange={update("kitchenName")}
              onBlur={validateField("kitchenName")}
              readOnly={!editing}
              error={errors.kitchenName}
              placeholder="E.g. Kanika's Kitchen"
            />
          </div>

          <Field
            label="Full Name"
            icon={ChefHat}
            value={draft.name}
            onChange={update("name")}
            onBlur={validateField("name")}
            readOnly={!editing}
            error={errors.name}
            placeholder="Your full name"
          />
          <Field
            label="Email"
            icon={Mail}
            type="email"
            value={draft.email}
            onChange={update("email")}
            onBlur={validateField("email")}
            readOnly={!editing}
            error={errors.email}
            placeholder="you@example.com"
          />
          <Field
            label="Phone"
            icon={Phone}
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={draft.phone}
            onChange={updatePhone}
            onBlur={validateField("phone")}
            readOnly={!editing}
            error={errors.phone}
            placeholder="9876543210"
          />
          <Field
            label="City"
            icon={MapPin}
            value={draft.city}
            onChange={update("city")}
            onBlur={validateField("city")}
            readOnly={!editing}
            error={errors.city}
            placeholder="Your city"
          />

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              About You
            </label>
            <textarea
              rows={4}
              value={draft.bio}
              onChange={(e) => update("bio")(e.target.value)}
              readOnly={!editing}
              disabled={!editing}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                editing
                  ? "border-gray-200 bg-white text-gray-800 focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary-soft)]"
                  : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500"
              }`}
              placeholder="Tell customers about your cooking style…"
            />
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t pt-4">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <X size={15} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!dirty || saving}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-strong))",
              }}
            >
              {saving ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </CookLayout>
  );
}

// Stat Card 
function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
      >
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm text-gray-500">{label}</p>
      <h3 className="mt-1 text-2xl font-extrabold text-[#174d35]">{value}</h3>
    </div>
  );
}

export default CookProfile;