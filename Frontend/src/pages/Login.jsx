import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, CheckCircle, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

import heroImage from '../../public/images/food2.jpeg'

const inputBase =
  'w-full bg-gray-100 border-none rounded-lg py-3 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow'


export default function Login() {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [resetForm, setResetForm] = useState({ newPassword: '', confirmPassword: '' })
  const [resetSuccess, setResetSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const setReset = (k) => (e) => setResetForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const res = isSignup
      ? signup(form.name, form.email, form.password)
      : login(form.email, form.password)
    if (res.success) navigate('/Home')
    else setError(res.error)
  }

  const submitReset = (e) => {
    e.preventDefault()
    setError('')

    if (!resetForm.newPassword || !resetForm.confirmPassword) {
      setError('Please fill in both fields')
      return
    }
    if (resetForm.newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setError('Passwords do not match')
      return
    }

   
    setResetSuccess(true)
  }

  const backToLogin = () => {
    setIsForgotPassword(false)
    setResetSuccess(false)
    setResetForm({ newPassword: '', confirmPassword: '' })
    setError('')
  }

  const resetAll = () => {
    setIsSignup(false)
    setIsForgotPassword(false)
    setResetSuccess(false)
    setError('')
  }

  return (
    <div className="min-h-screen flex bg-white">

     
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative overflow-hidden">
        <img
          src={heroImage}
          alt="Fresh food bowl with noodles, salad and grilled chicken"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

     
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center px-6 py-10 sm:py-12 md:px-16 relative">

      
      

        <div className="w-full max-w-sm">

          {isForgotPassword ? (
           
            <>
              {!resetSuccess ? (
                <>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 mb-2">Reset password</h1>
                  <p className="text-sm text-gray-500 mb-7">Enter your new password below.</p>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-600 mb-4">
                      {error}
                    </div>
                  )}

                  <form onSubmit={submitReset}>
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          className={inputBase}
                          type={showNewPass ? 'text' : 'password'}
                          placeholder="New password"
                          value={resetForm.newPassword}
                          onChange={setReset('newPassword')}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          onClick={() => setShowNewPass((p) => !p)}
                        >
                          {showNewPass ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="relative">
                        <input
                          className={inputBase}
                          type={showConfirmPass ? 'text' : 'password'}
                          placeholder="Confirm new password"
                          value={resetForm.confirmPassword}
                          onChange={setReset('confirmPassword')}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          onClick={() => setShowConfirmPass((p) => !p)}
                        >
                          {showConfirmPass ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
                    >
                      Continue
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-emerald-500" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Password reset successful</h1>
                  <p className="text-sm text-gray-500 mb-7">
                    Your password has been changed. You can now sign in with your new password.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={backToLogin}
                className="w-full flex items-center justify-center gap-1.5 mt-6 text-sm text-emerald-600 font-semibold hover:underline"
              >
                <ArrowLeft size={14} /> Back to sign in
              </button>
            </>
          ) : (

           
            <>
              <h1 className="text-2xl sm:text-[28px] text-center font-bold text-gray-900 mb-2">
                {isSignup ? 'Sign up' : ' Welcome back'}
              </h1>
              {!isSignup && (<h3 className='text-base  text-center font-medium text-gray-700 mt-1'>
                Sign in to access your food items
              </h3>)}
              <p className="text-sm text-gray-500 mb-7 text-center">
                {isSignup ? 'Enter your details to create an account.' : 'Enter your email to log in.'}
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-600 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={submit}>
                {isSignup && (
                  <div className="mb-4">
                    <input
                      className={inputBase}
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={set('name')}
                      required
                    />
                  </div>
                )}

                <div className="mb-4">
                  <input
                    className={inputBase}
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={set('email')}
                    required
                  />
                </div>

                <div className="mb-2">
                  <div className="relative">
                    <input
                      className={inputBase}
                      type={showPass ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={set('password')}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPass((p) => !p)}
                    >
                      {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                {!isSignup && (
                  <div className="text-right mb-4">
                    <button
                      type="button"
                      onClick={() => { setIsForgotPassword(true); setError('') }}
                      className="text-xs text-emerald-600 font-semibold hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors mt-2"
                >
                  Continue
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200" />
                <span className="relative inline-block bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
                  OR
                </span>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-gray-400 leading-relaxed mb-5">
                By continuing, you agree to the updated{' '}
          
                <a href="#" className="font-semibold text-gray-600 hover:underline">Terms of Service</a>, and{' '}
                <a href="#" className="font-semibold text-gray-600 hover:underline">Privacy Policy</a>.
              </p>

              {/* Social buttons */}
              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </button>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 384 512" fill="#111827">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <p className="text-center mt-6 text-sm text-gray-500">
                {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  className="text-emerald-600 font-semibold hover:underline"
                  onClick={() => { setIsSignup((p) => !p); setError('') }}
                >
                  {isSignup ? 'Log in' : 'Sign up free'}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}