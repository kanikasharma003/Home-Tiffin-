import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/UserAuth";
// import bannerImg from "../assets/home-tiffin-banner.png";
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
      await login(form);

      // Login successful → Kitchen List
      navigate("/kitchens", { replace: true });
    } catch {
      setErrors({
        form: "Invalid email or password.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        relative min-h-screen  w-full
        flex items-center justify-center
        md:justify-end
        p-4 sm:p-6 md:pr-16
        bg-cover bg-center
        bg-red-200
      "
    // style={{
    //   backgroundImage: `url(${bannerImg})`,
    // }}
    >
      {/* Red dark overlay */}
      <div className="absolute inset-0 bg-[#5f0f1f]/45 h-full" />

      {/* Login Card */}
      <div
        className=" relative z-10 w-full max-w-sm
          rounded-2xl
          overflow-hidden
          border border-white/30
          bg-[#ffffff]/15
          backdrop-blur-xl
          shadow-2xl
          px-6 py-8
          sm:px-8 sm:py-10
        "
      >
        {/* Heading */}
        <h1
          className="
            text-2xl sm:text-3xl
            font-bold
            text-[#9d1c34]
            mb-2
            text-center
            drop-shadow-sm
          "
        >
          Welcome Back
        </h1>

        <p className="text-sm text-gray-700 text-center mb-6 leading-relaxed">
          Log in to order fresh home-cooked
          <br />
          tiffins near you.
        </p>

        {/* Error */}
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

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
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
                ${errors.email
                  ? "border-red-400 focus:ring-red-300/50"
                  : "border-gray-300 focus:border-[#9d1c34] focus:ring-[#9d1c34]/20"
                }
              `}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
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
                  ${errors.password
                    ? "border-red-400 focus:ring-red-300/50"
                    : "border-gray-300 focus:border-[#9d1c34] focus:ring-[#9d1c34]/20"
                  }
                `}
              />

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
                  text-[#9d1c34]
                  hover:text-[#7d162a]
                  transition-colors
                "
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="
                text-xs
                font-semibold
                text-[#9d1c34]
                hover:text-[#7d162a]
                transition-colors
              "
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              bg-[#9d1c34]
              hover:bg-[#7d162a]
              disabled:opacity-60
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
          >
            {submitting ? "Please wait..." : "Log in"}
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-gray-700">
          New to Home Tiffin?{" "}
          <Link
            to="/User/SignUp"
            className="
              font-bold
              text-[#9d1c34]
              hover:text-[#7d162a]
              transition-colors
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}