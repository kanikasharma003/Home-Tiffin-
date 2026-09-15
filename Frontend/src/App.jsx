import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./auth/AdminLogin";
import AdminRegister from "./auth/AdminRegister";

// Cook Dashboard
import CookDashboard from "./cook/CookDashboard";

// Pages
import Home from "./pages/Home";
import BecomeCook from "./pages/BecomeCook";
import Contact from "./pages/Contact";


// ========================================
// PUBLIC LAYOUT
// ========================================
function PublicLayout({ children, mode, onModeChange }) {
  return (
    <div
      data-mode={mode}
      className="min-h-screen bg-page-bg text-heading"
    >
      <Navbar
        mode={mode}
        onModeChange={onModeChange}
      />

      {children}

      <Footer />
    </div>
  );
}


// ========================================
// ADMIN ROUTE
// ========================================
function AdminRoute() {
  const navigate = useNavigate();

  return (
    <AdminDashboard
      onExit={() => navigate("/")}
    />
  );
}


// ========================================
// COOK ROUTE
// ========================================
function CookRoute() {
  const navigate = useNavigate();

  return (
    <CookDashboard
      onExit={() => navigate("/")}
    />
  );
}


// ========================================
// APP
// ========================================
function App() {
  // Default food mode
  const [mode, setMode] = useState("veg");

  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================
            HOME
        ================================== */}
        <Route
          path="/"
          element={
            <PublicLayout
              mode={mode}
              onModeChange={setMode}
            >
              <Home
                mode={mode}
                onModeChange={setMode}
              />
            </PublicLayout>
          }
        />


        {/* ==================================
            CONTACT
        ================================== */}
        <Route
          path="/contact"
          element={
            <PublicLayout
              mode={mode}
              onModeChange={setMode}
            >
              <Contact
                mode={mode}
                onModeChange={setMode}
              />
            </PublicLayout>
          }
        />


        {/* ==================================
            BECOME COOK
        ================================== */}
        <Route
          path="/become-cook"
          element={
            <PublicLayout
              mode={mode}
              onModeChange={setMode}
            >
              <BecomeCook
                mode={mode}
                onModeChange={setMode}
              />
            </PublicLayout>
          }
        />


        {/* ==================================
            COOK DASHBOARD
        ================================== */}
        <Route
          path="/cook/dashboard"
          element={<CookRoute />}
        />


        {/* ==================================
            ADMIN LOGIN
        ================================== */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ==================================
            ADMIN REGISTER
        ================================== */}
        <Route
          path="/admin/register"
          element={<AdminRegister />}
        />


        {/* ==================================
            ADMIN DASHBOARD
        ================================== */}
        <Route
          path="/admin"
          element={<AdminRoute />}
        />


        {/* ==================================
            FALLBACK
        ================================== */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;