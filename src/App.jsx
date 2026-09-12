import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import Home from "./pages/Home";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./auth/AdminLogin";
import AdminRegister from "./auth/AdminRegister";

function PublicLayout() {
  const [mode, setMode] = useState("veg");

  return (
    <div className="min-h-screen bg-page-bg text-heading">
      <Header
        mode={mode}
        onModeChange={setMode}
      />

      <Home
        mode={mode}
        onModeChange={setMode}
      />

      <Footer />
    </div>
  );
}

function AdminRoute() {
  const navigate = useNavigate();

  return (
    <AdminDashboard
      onExit={() => navigate("/")}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route
          path="/"
          element={<PublicLayout />}
        />

        {/* Admin */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/register"
          element={<AdminRegister />}
        />

        <Route
          path="/admin"
          element={<AdminRoute />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;