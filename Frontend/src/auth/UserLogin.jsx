import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/UserAuth";
import bannerImg from "../assets/home-tiffin-banner.png";
import { Eye, EyeOff } from "lucide-react";

export default function UserLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
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

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const next = {};

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address";
    }

    if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  // =========================
  // FORM SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      await login(form);

      // Login successful → Kitchen List
      navigate("/kitchens", {
        replace: true,
      });

      // navigate("/user/dashboard", { replace: true });
    } catch {
      setErrors({
        form: "Invalid email or password.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center md:justify-end p-4 sm:p-6 md:pr-16 bg-red-200">

      {/* =========================
          BACKGROUND IMAGE
      ========================= */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      />

      {/* =========================
          LOGIN CARD
      ========================= */}
      <div
        className="
          relative z-10
          w-full max-w-sm
          rounded-2xl
          overflow-hidden
          border border-white/30
          bg-white/15
          backdrop-blur-xl
          shadow-2xl
          px-6 py-8
          sm:px-8 sm:py-10
        "
      >

        {/* =========================
            HEADING
        ========================= */}
        <h1
          className="
            text-2xl sm:text-3xl
            font-bold
            mb-2
            text-center
            drop-shadow-sm
          "
          style={{
            color: "#e7133b",
          }}
        >
          Welcome Back
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-700 text-center mb-6 leading-relaxed">
          Log in to order fresh home-cooked
          <br />
          tiffins near you.
        </p>


        {/* =========================
            FORM ERROR
        ========================= */}
        {errors.form && (
          <div
            className="
              mb-4
              text-sm
              text-red-700
              bg-red-50/90
              border border-red-300
              rounded-lg
              px-3 py-2
            "
          >
            {errors.form}
          </div>
        )}


        {/* =========================
            FORM
        ========================= */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >

          {/* =========================
              EMAIL
          ========================= */}
          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-800
                mb-1.5
              "
            >
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`
                w-full
                rounded-lg
                border
                px-3
                py-2.5
                text-sm
                text-gray-800
                placeholder-gray-500
                bg-white/70
                backdrop-blur-sm
                focus:outline-none
                focus:ring-2
                transition-all

                ${
                  errors.email
                    ? "border-red-400 focus:ring-red-300/50"
                    : "border-gray-300 focus:border-[#e7133b] focus:ring-[#e7133b]/20"
                }
              `}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>


          {/* =========================
              PASSWORD
          ========================= */}
          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-800
                mb-1.5
              "
            >
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2.5
                  pr-11
                  text-sm
                  text-gray-800
                  placeholder-gray-500
                  bg-white/70
                  backdrop-blur-sm
                  focus:outline-none
                  focus:ring-2
                  transition-all

                  ${
                    errors.password
                      ? "border-red-400 focus:ring-red-300/50"
                      : "border-gray-300 focus:border-[#e7133b] focus:ring-[#e7133b]/20"
                  }
                `}
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  transition-colors
                "
                style={{
                  color: "#e7133b",
                }}
              >
                {showPassword ? (
                  <Eye size={17} />
                ) : (
                  <EyeOff size={17} />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.password}
              </p>
            )}
          </div>


          {/* =========================
              FORGOT PASSWORD
          ========================= */}
          <div className="flex justify-end">
            <button
              type="button"
              className="
                text-xs
                font-semibold
                transition-colors
              "
              style={{
                color: "#e7133b",
              }}
            >
              Forgot password?
            </button>
          </div>


          {/* =========================
              LOGIN BUTTON
          ========================= */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              disabled:opacity-60
              disabled:cursor-not-allowed
              cursor-pointer
              text-white
              font-semibold
              py-2.5
              rounded-lg
              transition-all
              duration-200
              shadow-md
              hover:shadow-lg
            "
            style={{
              backgroundColor: "#e7133b",
            }}
          >
            {submitting ? "Please wait..." : "Log in"}
          </button>

        </form>


        {/* =========================
            REGISTER
        ========================= */}
        <p className="mt-6 text-center text-sm text-gray-700">
          New to Home Tiffin?{" "}

          <Link
            to="/User/SignUp"
            className="font-bold transition-colors"
            style={{
              color: "#e7133b",
            }}
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}