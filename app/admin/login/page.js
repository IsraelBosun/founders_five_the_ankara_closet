'use client'

import { useState, useTransition } from 'react'
import { signIn } from '@/app/admin/actions'

export default function LoginPage() {
  const [error, setError] = useState(null)
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    setError(null)
    startTransition(async () => {
      const result = await signIn(null, formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center">
            <div className="font-display font-bold uppercase leading-none tracking-[0.06em]">
              <span className="block text-2xl text-black">THE ANKARA</span>
              <span className="block text-2xl" style={{ color: '#C4703A' }}>CLOSET</span>
            </div>
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase mt-2 text-gray-400">
              ADMIN PORTAL
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white shadow-sm p-8">
          <h1 className="font-display text-lg uppercase tracking-wider text-black mb-6">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-200 px-4 py-3 pr-11 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full text-white text-[11px] font-bold tracking-[0.22em] uppercase py-4 transition-colors disabled:opacity-60 mt-2"
              style={{ backgroundColor: isPending ? '#999' : '#C4703A' }}
            >
              {isPending ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-6 tracking-wide">
          The Ankara Closet &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
