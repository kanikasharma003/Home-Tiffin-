import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './auth/AdminLogin';
import AdminRegister from './auth/AdminRegister';

// ─── Public Layout ──────────────────────────────────────────────────────────
function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

// ─── Admin Route Wrapper (provides onExit) ──────────────────────────────────
function AdminRoute() {
  const navigate = useNavigate();
  return <AdminDashboard onExit={() => navigate('/')} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <main className="min-h-[60vh]" />
            </PublicLayout>
          }
        />

        {/* Admin auth routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Admin dashboard */}
        <Route path="/admin" element={<AdminRoute />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;