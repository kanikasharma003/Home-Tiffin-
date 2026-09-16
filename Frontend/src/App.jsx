import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserLogin from "./auth/UserLogin";
import UserSignup from "./auth/UserSignUp";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

// Admin
import AdminDashboard, {
<<<<<<< HEAD
  // OrdersTable,
  // UsersTable,
  // InquiriesTable,
=======
  OrdersTable,
  UsersTable,
  InquiriesTable,
>>>>>>> 13ba55d2f0f009564df18b31e334c26ef4c30dcb
} from "./admin/AdminDashboard";
import AdminLayout from "./admin/AdminLayout";
import CookManagement from "./admin/CookManagement";
import AdminLogin from "./auth/AdminLogin";
import AdminRegister from "./auth/AdminRegister";

// Cook
<<<<<<< HEAD
// import CookDashboard from "./cook/CookDashboard";
// import CookProfile from "./cook/CookProfile";
=======
import CookDashboard from "./cook/CookDashboard";
import CookProfile from "./cook/CookProfile";
>>>>>>> 13ba55d2f0f009564df18b31e334c26ef4c30dcb

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
<<<<<<< HEAD
// function RequireCook({ children }) {
//   const token = localStorage.getItem("cookToken");
//   if (!token) {
//     return <Navigate to="/become-cook" replace />;
//   }
//   return children;
// }
=======
function RequireCook({ children }) {
  const token = localStorage.getItem("cookToken");
  if (!token) {
    return <Navigate to="/become-cook" replace />;
  }
  return children;
}
>>>>>>> 13ba55d2f0f009564df18b31e334c26ef4c30dcb

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
        {/* <Route path="/admin/users" element={<RequireAdmin><AdminLayout><UsersTable /></AdminLayout></RequireAdmin>} /> */}
        {/* <Route path="/admin/orders" element={<RequireAdmin><AdminLayout><OrdersTable /></AdminLayout></RequireAdmin>} /> */}
        {/* <Route path="/admin/inquiries" element={<RequireAdmin><AdminLayout><InquiriesTable /></AdminLayout></RequireAdmin>} /> */}

        {/* COOK ROUTES */}
<<<<<<< HEAD
        {/* <Route path="/cookdashboard" element={<RequireCook><CookDashboard /></RequireCook>} />
        <Route path="/cookprofile" element={<RequireCook><CookProfile /></RequireCook>} /> */}
=======
        <Route path="/cookdashboard" element={<RequireCook><CookDashboard /></RequireCook>} />
        <Route path="/cookprofile" element={<RequireCook><CookProfile /></RequireCook>} />
>>>>>>> 13ba55d2f0f009564df18b31e334c26ef4c30dcb
        {/* <Route path="/cook/orders" element={<CookOrders />} /> */}
        {/* <Route path="/cook/menu" element={<CookMenu />} /> */}
        {/* <Route path="/cook/earnings" element={<CookEarnings />} /> */}
        {/* <Route path="/cook/settings" element={<CookSettings />} /> */}
<<<<<<< HEAD
{/* UserAuth  */}
<Route path="/UserLogin" element={<UserLogin/>}/>
<Route path="/UserSignUp" element={<UserSignup/>}/>
=======

>>>>>>> 13ba55d2f0f009564df18b31e334c26ef4c30dcb
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;