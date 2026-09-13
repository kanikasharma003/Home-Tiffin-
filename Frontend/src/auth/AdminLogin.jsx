import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    // TODO: replace with real API call
    setTimeout(() => {
      setLoading(false);
      navigate('/admin');
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page-bg px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/30">
            <ChefHat size={26} />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-heading">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-muted">
            Sign in to manage your tiffin service
          </p>
        </div>

        {/* Card */}
        <div className="card p-6 sm:p-8">
          {error && (
            <div className="mb-4 rounded-xl bg-primary-50 px-4 py-3 text-sm font-medium text-primary-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@tiffinbox.com"
                  className="theme-input"
                  style={{ paddingLeft: '2.75rem' }}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted"
                  size={16}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="theme-input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-muted transition hover:text-primary-500"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-primary-500"
                />
                Remember me
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-sm font-medium text-primary-500 transition hover:text-primary-600"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-text">
            Don't have an account?{' '}
            <Link
              to="/admin/register"
              className="font-semibold text-primary-500 transition hover:text-primary-600"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}