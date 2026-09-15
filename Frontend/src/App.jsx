import { useState } from "react";
import {
  BrowserRouter, Routes, Route, Navigate, useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout"; 
import CookManagement from "./admin/CookManagement";
import AdminLogin from "./auth/AdminLogin";
import AdminRegister from "./auth/AdminRegister";

// Pages
import Home from "./pages/Home";
import BecomeCook from "./pages/BecomeCook";
import Contact from "./pages/Contact";

// Public Layout 
function PublicLayout({ children, mode, onModeChange }) {
  return (
    <div data-mode={mode} className="min-h-screen bg-page-bg text-heading">
      <Navbar mode={mode} onModeChange={onModeChange} />
      {children}
      <Footer />
    </div>
  );
}

// ─── Admin Route Guard (optional) ───
function RequireAdmin() {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout />;
}

function App() {
  const [mode, setMode] = useState("veg");

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicLayout mode={mode} onModeChange={setMode}><Home mode={mode} onModeChange={setMode} /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout mode={mode} onModeChange={setMode}><Contact mode={mode} onModeChange={setMode} /></PublicLayout>} />
        <Route path="/become-cook" element={<PublicLayout mode={mode} onModeChange={setMode}><BecomeCook mode={mode} onModeChange={setMode} /></PublicLayout>} />

        {/* AUTH */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminDashboard />}>  
          <Route path="cooks"     element={<CookManagement />} /> 
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;