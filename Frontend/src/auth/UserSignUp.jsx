import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/UserAuth";
// import bannerImg from "../assets/home-tiffin-banner.png";
import { Eye, EyeOff } from "lucide-react";

export default function UserSignup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      form: "",
    }));
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
      await register(form);
      navigate("/kitchens", { replace: true });
    } catch {
      setErrors({
        form: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center md:justify-end p-4 sm:p-6 md:pr-16 bg-cover bg-center bg-red-200">
      {/* Red overlay */}
      <div className="absolute inset-0 bg-[#5f0f1f]/45" />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden border border-white/30 bg-white/15 backdrop-blur-xl shadow-2xl px-6 py-7 sm:px-8 sm:py-8">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#9d1c34] mb-2 text-center drop-shadow-sm">
          Create Your Account
        </h1>

        <p className="text-sm text-gray-700 text-center mb-6 leading-relaxed">
          Sign up to discover
          <br />
          home kitchens near you.
        </p>

        {/* Form Error */}
        {errors.form && (
          <div className="mb-4 text-sm text-red-700 bg-red-50/90 border border-red-300 rounded-lg px-3 py-2">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <Field
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g. Priya Sharma"
          />

          {/* Phone */}
          <Field
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="10-digit mobile number"
            inputMode="numeric"
            maxLength={10}
          />

          {/* Email */}
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`w-full rounded-lg border px-3 py-2.5 pr-11 text-sm text-gray-800 placeholder-gray-500 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.password
                    ? "border-red-400 focus:ring-red-300/50"
                    : "border-gray-300 focus:border-[#9d1c34] focus:ring-[#9d1c34]/20"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9d1c34] hover:text-[#7d162a] transition-colors"
              >
                {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Create Account */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#9d1c34] hover:bg-[#7d162a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {submitting ? "Please wait..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-5 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/User/Login"
            className="font-bold text-[#9d1c34] hover:text-[#7d162a] transition-colors"
          >
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
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-400 focus:ring-red-300/50"
            : "border-gray-300 focus:border-[#9d1c34] focus:ring-[#9d1c34]/20"
        }`}
        {...rest}
      />

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}