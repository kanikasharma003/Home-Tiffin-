import React, { useState } from "react";
import {
  CheckCircle2,
  Wallet,
  Home,
  Clock,
  Users,
  ArrowRight,
  Upload,
  Lock,
  Heart,
  ChevronDown,
  Mail,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  addApplication,
  getApplications,
  loginCook,
} from "../utils/cookApplications";

const BecomeACook = () => {
  const navigate = useNavigate();

  // Tab: "register" | "login"
  const [tab, setTab] = useState("register");

  // ── Register state ──
  const [form, setForm] = useState({
    name: "",
    phone: "",
    kitchenName: "",
    email: "",
    password: "",
    city: "",
    specialties: "",
    about: "",
    hasHomeKitchen: "",
    hasUtensils: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [registerError, setRegisterError] = useState("");

  // ── Login state ──
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // ── Register handler ──
  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");

    if (
      !form.name ||
      !form.phone ||
      !form.kitchenName ||
      !form.email ||
      !form.password ||
      !form.city ||
      !form.specialties ||
      !form.about
    ) {
      setRegisterError("Please fill in all required fields marked with *");
      return;
    }

    if (form.password.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }

    const existing = getApplications();
    if (
      existing.some(
        (c) => c.email.toLowerCase() === form.email.toLowerCase().trim()
      )
    ) {
      setRegisterError("An account with this email already exists.");
      return;
    }

    addApplication({
      name: form.name,
      phone: form.phone,
      kitchenName: form.kitchenName,
      email: form.email.trim(),
      password: form.password,
      city: form.city,
      specialties: form.specialties,
      experience: form.about,
      about: form.about,
    });

    setSubmitted(true);
  };

  // ── Login handler ──
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter your email and password.");
      return;
    }

    const result = loginCook(loginEmail, loginPassword);
    if (!result.ok) {
      setLoginError(result.error);
      return;
    }

    navigate("/cookdashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans text-gray-800">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFEBEB] text-[#E53935] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              <span>👩‍🍳</span> For Passionate Home Cooks
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Turn Your <br />
              Cooking Skills <br />
              <span className="text-[#E53935]">Into Income</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Join TiffinBox as a home cook and share your delicious homemade
              meals with people in your community. Cook what you love. Earn on
              your terms.
            </p>
            <button
              onClick={() => setTab("register")}
              className="bg-[#E53935] hover:bg-[#d32f2f] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Apply to Become a Cook <ArrowRight size={20} />
            </button>
            <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#E53935]" /> No
                registration fee
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#E53935]" /> Work from
                home
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#E53935]" /> Be your own
                boss
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] w-full bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Home Cook"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-[150px] hidden md:block border border-gray-100 rotate-3">
              <p className="text-sm text-gray-700 italic">
                "Home Cooks Build Brighter Communities"
              </p>
              <Heart
                className="text-[#E53935] mt-2 ml-auto"
                fill="#E53935"
                size={16}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Become a Cook?
            </h2>
            <p className="text-gray-500 mt-2">
              More than just cooking — it's an opportunity to make a difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Wallet size={24} />, title: "Earn From Your Passion", desc: "Generate a steady income by doing what you love." },
              { icon: <Home size={24} />, title: "Cook From Home", desc: "No need to step out. Use your own kitchen." },
              { icon: <Clock size={24} />, title: "Flexible Schedule", desc: "You decide when and how much to cook." },
              { icon: <Users size={24} />, title: "Be Part of a Community", desc: "Join a network of amazing home cooks across cities." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFF9F5] p-8 rounded-2xl border border-orange-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#FFEBEB] rounded-full flex items-center justify-center text-[#E53935] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-[#FFF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works?</h2>
            <p className="text-gray-500 mt-2">
              Get started in just a few simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { num: "01", title: "Apply", desc: "Fill out a simple application form." },
              { num: "02", title: "Get Verified", desc: "Our team reviews your details." },
              { num: "03", title: "Add Your Menu", desc: "List your dishes, prices and availability." },
              { num: "04", title: "Start Earning", desc: "Receive orders and deliver homemade meals." },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-start">
                <div className="flex items-center gap-4 mb-4 w-full">
                  <div className="w-12 h-12 bg-[#FFEBEB] rounded-full flex items-center justify-center text-[#E53935] font-bold text-lg border border-red-100">
                    {step.num}
                  </div>
                  {idx !== 3 && (
                    <div className="hidden md:block text-[#E53935]">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + IMAGE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image card */}
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[600px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Cooking preparation"
                className="absolute inset-0 w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-8 left-8">
                <h3 className="text-white text-3xl italic font-serif leading-tight drop-shadow-md">
                  "Good Food <br /> Creates <br /> Brighter <br /> Futures"
                </h3>
                <Heart className="text-[#E53935] mt-2" fill="#E53935" />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="grid grid-cols-3 gap-4 text-center text-white border-t border-white/20 pt-6">
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-xs opacity-80">Home Cooks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-xs opacity-80">Meals Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="text-xs opacity-80">Cook Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form card with tabs */}
            <div className="bg-[#FFF9F5] p-6 sm:p-8 rounded-3xl border border-orange-100">
              {/* Tab switcher */}
              <div className="flex gap-2 mb-6 p-1 bg-white rounded-full border border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setTab("register");
                    setLoginError("");
                  }}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition ${
                    tab === "register"
                      ? "bg-[#E53935] text-white shadow"
                      : "text-gray-600 hover:text-[#E53935]"
                  }`}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab("login");
                    setRegisterError("");
                  }}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition ${
                    tab === "login"
                      ? "bg-[#E53935] text-white shadow"
                      : "text-gray-600 hover:text-[#E53935]"
                  }`}
                >
                  Login
                </button>
              </div>

              {/* Header text changes by tab */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tab === "login" ? "🔐" : "👨‍🍳"}</span>
                <h2 className="text-2xl font-bold text-gray-900">
                  {tab === "login" ? (
                    <>
                      Cook <span className="text-[#E53935]">Login</span>
                    </>
                  ) : (
                    <>
                      Apply to Become a{" "}
                      <span className="text-[#E53935]">Cook</span>
                    </>
                  )}
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                {tab === "login"
                  ? "Sign in to manage your tiffin business."
                  : "Fill in your details and our team will get in touch with you."}
              </p>

              {/* ── LOGIN TAB ── */}
              {tab === "login" && (
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                      />
                    </div>
                  </div>

                  {loginError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
                      {loginError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#E53935] hover:bg-[#d32f2f] text-white font-bold py-4 rounded-xl shadow-lg mt-2 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <LogIn size={18} /> Sign In
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      className="font-bold text-[#E53935] hover:underline"
                    >
                      Register here
                    </button>
                  </p>
                </form>
              )}

              {/* ── REGISTER TAB ── */}
              {tab === "register" && !submitted && (
                <form className="space-y-4" onSubmit={handleRegister}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Kitchen Name *
                    </label>
                    <input
                      type="text"
                      value={form.kitchenName}
                      onChange={update("kitchenName")}
                      placeholder="E.g. Kanika's Kitchen, Amma's Tiffins"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">
                      This is the name customers will see on your profile.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        City / Area *
                      </label>
                      <div className="relative">
                        <select
                          value={form.city}
                          onChange={update("city")}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm appearance-none text-gray-500"
                        >
                          <option value="">Select your city</option>
                          <option>Mumbai</option>
                          <option>Delhi</option>
                          <option>Bangalore</option>
                          <option>Pune</option>
                          <option>Hyderabad</option>
                          <option>Nagpur</option>
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={update("password")}
                      placeholder="Choose a password (min 6 characters)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">
                      You'll use this to log in after your application is
                      approved.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Cooking Specialties *
                    </label>
                    <input
                      type="text"
                      value={form.specialties}
                      onChange={update("specialties")}
                      placeholder="E.g. North Indian, South Indian, Jain, Healthy Meals"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      About Yourself *
                    </label>
                    <textarea
                      rows="3"
                      value={form.about}
                      onChange={update("about")}
                      placeholder="Tell us about your cooking experience, what you love to cook, and why you want to join TiffinBox."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      Kitchen Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Do you have a home kitchen? *
                        </label>
                        <div className="relative">
                          <select
                            value={form.hasHomeKitchen}
                            onChange={update("hasHomeKitchen")}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm appearance-none text-gray-500"
                          >
                            <option value="">Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                          <ChevronDown
                            className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                            size={16}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Do you have the required utensils? *
                        </label>
                        <div className="relative">
                          <select
                            value={form.hasUtensils}
                            onChange={update("hasUtensils")}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#E53935] bg-white text-sm appearance-none text-gray-500"
                          >
                            <option value="">Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                          <ChevronDown
                            className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                            size={16}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      Upload Documents (Optional)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3 cursor-pointer hover:border-[#E53935]">
                        <Upload size={20} className="text-[#E53935]" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">
                            Upload ID Proof
                          </p>
                          <p className="text-[10px] text-gray-400">
                            (Aadhaar, PAN, etc.)
                          </p>
                        </div>
                      </div>
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3 cursor-pointer hover:border-[#E53935]">
                        <Upload size={20} className="text-[#E53935]" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">
                            Upload Food License
                          </p>
                          <p className="text-[10px] text-gray-400">
                            (If available)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {registerError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
                      {registerError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#E53935] hover:bg-[#d32f2f] text-white font-bold py-4 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    Register <ArrowRight size={18} />
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-2">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className="font-bold text-[#E53935] hover:underline"
                    >
                      Login here
                    </button>
                  </p>

                  <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2">
                    <Lock size={12} /> Your information is safe with us.
                  </div>
                </form>
              )}

              {/* ── SUCCESS STATE ── */}
              {tab === "register" && submitted && (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
                  <CheckCircle2
                    size={48}
                    className="mx-auto text-green-600 mb-3"
                  />
                  <h3 className="text-xl font-bold text-gray-900">
                    Application Submitted!
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Our team will review your application and get back to you
                    within 2-3 business days.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setTab("login");
                      }}
                      className="bg-[#E53935] hover:bg-[#d32f2f] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                      Go to Login
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="border-2 border-[#E53935] text-[#E53935] hover:bg-[#FFEBEB] font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT CAN YOU COOK */}
      <section className="py-16 bg-[#FFF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              What Can You Cook?
            </h2>
            <p className="text-gray-500 mt-2">
              Share a variety of homemade meals with people in your area.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Veg Tiffin", desc: "Healthy and homely meals", img: "https://images.unsplash.com/photo-1626509653294-85750f302988?auto=format&fit=crop&w=500&q=80" },
              { title: "Jain Tiffin", desc: "Pure and sattvic meals", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80" },
              { title: "Regional Meals", desc: "North, South, East, West", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80" },
              { title: "Special Meals", desc: "Diet, protein, kids meals & more", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFF9F5] pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#FFF0F0] to-[#FFE5E5] rounded-3xl px-6 py-10 sm:px-10 sm:py-12 shadow-sm border border-red-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  Ready to turn your cooking into an income?
                </h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Join hundreds of home cooks and be a part of TiffinBox today.
                </p>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <button
                  onClick={() => setTab("register")}
                  className="bg-[#E53935] hover:bg-[#d32f2f] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 transition-all active:scale-95"
                >
                  Apply Now <ArrowRight size={18} />
                </button>
                <div className="hidden lg:block relative">
                  <p className="text-xs text-gray-700 italic whitespace-nowrap">
                    Good Food Changes Lives
                  </p>
                  <Heart
                    className="text-[#E53935] absolute -bottom-3 right-0"
                    fill="#E53935"
                    size={12}
                  />
                  <span className="absolute -top-1 -left-3 text-[#E53935] text-xs">
                    ✨
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeACook;