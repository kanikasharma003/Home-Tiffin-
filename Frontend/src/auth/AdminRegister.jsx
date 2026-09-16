import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChefHat,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  UserPlus,
  KeyRound,
} from 'lucide-react';
import { addAdmin, getAdmins, ADMIN_SECRET_KEY } from '../utils/adminAuth';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone || !form.password || !form.secretKey) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.secretKey !== ADMIN_SECRET_KEY) {
      setError('Invalid secret key. Contact the platform owner.');
      return;
    }

    const existing = getAdmins();
    if (existing.some((a) => a.email.toLowerCase() === form.email.toLowerCase().trim())) {
      setError('An admin with this email already exists.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      addAdmin({
        name: form.name,
        email: form.email.trim(),
        phone: form.phone,
        password: form.password,
      });
      setLoading(false);
      navigate('/admin/login', { replace: true });
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
            Create Admin Account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Register to manage your tiffin service
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
            {/* Full name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="theme-input"
                  style={{ paddingLeft: '2.75rem' }}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" size={16} />
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

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="theme-input"
                  style={{ paddingLeft: '2.75rem' }}
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="theme-input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  autoComplete="new-password"
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

            {/* Confirm password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" size={16} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="theme-input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-muted transition hover:text-primary-500"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Secret key */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Admin Secret Key
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted" size={16} />
                <input
                  type={showSecret ? 'text' : 'password'}
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleChange}
                  placeholder="Enter the platform secret key"
                  className="theme-input"
                  style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret((s) => !s)}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-muted transition hover:text-primary-500"
                  tabIndex={-1}
                >
                  {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-muted">
                Only platform owners can provide this key.
              </p>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-2 text-sm text-text">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 cursor-pointer accent-primary-500"
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-primary-500 hover:text-primary-600">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-primary-500 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  <UserPlus size={16} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text">
            Already have an account?{' '}
            <Link to="/admin/login" className="font-semibold text-primary-500 transition hover:text-primary-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}