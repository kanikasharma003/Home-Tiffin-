
import  { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
// import bannerImg from "../assets/home-tiffin-banner.png";
import { Eye, EyeOff } from "lucide-react";

export default function UserSignup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) {
      next.name = "Please enter your full name";
    }
    if (!/^\d{10}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid 10-digit phone number";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address";
    }
    if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO: replace with real API call -> POST /api/customer/register { name, phone, email, password }
      await register(form);
      navigate("/kitchens", { replace: true });
    } catch  {
      setErrors((prev) => ({ ...prev, form: "Something went wrong. Please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center md:justify-end p-4 sm:p-6 md:pr-16 bg-cover bg-center"
    //   style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* darken the banner a touch so the transparent form stays readable */}
      <div className="absolute inset-0 bg-brand-dark/30" />

      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/30 bg-white/15 backdrop-blur-xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-sm">Create your account</h1>
        <p className="text-sm text-white/80 mb-6">
          Sign up to discover home kitchens near you.
        </p>

        {errors.form && (
          <div className="mb-4 text-sm text-white bg-brand/40 border border-brand/50 rounded-lg px-3 py-2">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Field
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g. Priya Sharma"
          />

          <Field
            label="Phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="10-digit mobile number"
            inputMode="numeric"
            maxLength={10}
          />

          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`w-full rounded-lg border px-3 py-2.5 pr-16 text-sm text-white placeholder-white/60 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 transition-shadow ${
                  errors.password
                    ? "border-red-300 focus:ring-red-300/30"
                    : "border-white/30 focus:ring-white/30 focus:border-white/60"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/90 hover:text-white"
              >
                {showPassword ? <Eye size={12}/>:<EyeOff size={12}/>}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
          >
            {submitting ? "Please wait..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:text-red-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, error, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/90 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm text-white placeholder-white/60 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 transition-shadow ${
          error
            ? "border-red-300 focus:ring-red-300/30"
            : "border-white/30 focus:ring-white/30 focus:border-white/60"
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}