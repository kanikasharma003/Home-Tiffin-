import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

// Admin
import AdminDashboard, {
  // OrdersTable,
  // UsersTable,
  // InquiriesTable,
}
 from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout";
import CookManagement from "./admin/CookManagement";
import AdminLogin from "./auth/AdminLogin";
import AdminRegister from "./auth/AdminRegister";
import InquiriesManagment from "./admin/InquiriesManagment";

// Cook
import CookDashboard from "./cook/CookDashboard";
import CookProfile from "./cook/CookProfile";

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

//  Admin Guard 
function RequireAdmin({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

//  Cook Guard  
function RequireCook({ children }) {
  const token = localStorage.getItem("cookToken");
  if (!token) {
    return <Navigate to="/become-cook" replace />;
  }
  return children;
}

//  App 
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

        {/* ADMIN */}
        <Route path="/admindashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/admin/cooks" element={<RequireAdmin><AdminLayout><CookManagement /></AdminLayout></RequireAdmin>} />
        <Route path="/admin/inquiries" element={<InquiriesManagment />}/>
        {/* <Route path="/admin/users" element={<RequireAdmin><AdminLayout><UsersTable /></AdminLayout></RequireAdmin>} /> */}
        {/* <Route path="/admin/orders" element={<RequireAdmin><AdminLayout><OrdersTable /></AdminLayout></RequireAdmin>} /> */}
        {/* <Route path="/admin/inquiries" element={<RequireAdmin><AdminLayout><InquiriesTable /></AdminLayout></RequireAdmin>} /> */}

        {/* COOK ROUTES */}
        <Route path="/cookdashboard" element={<RequireCook><CookDashboard /></RequireCook>} />
        <Route path="/cookprofile" element={<RequireCook><CookProfile /></RequireCook>} />
        {/* <Route path="/cook/orders" element={<CookOrders />} /> */}
        {/* <Route path="/cook/menu" element={<CookMenu />} /> */}
        {/* <Route path="/cook/earnings" element={<CookEarnings />} /> */}
        {/* <Route path="/cook/settings" element={<CookSettings />} /> */}

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;