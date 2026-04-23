import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        login(); // ← marks user as authenticated in AuthContext
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/manage-flats');
        }, 120);
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">

      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 mb-5">
            <svg
              className="w-5 h-5 text-indigo-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Admin portal</h1>
          <p className="text-sm text-zinc-500 mt-1">Sign in to manage your dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/40">

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-950/50 border border-red-900/60 rounded-xl px-4 py-3 mb-5">
              <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Success banner */}
          {success && (
            <div className="flex items-start gap-2.5 bg-emerald-950/50 border border-emerald-900/60 rounded-xl px-4 py-3 mb-5">
              <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <p className="text-sm text-emerald-300">
                Login successful! Redirecting to{' '}
                <code className="font-mono text-xs text-emerald-200">/admin/manage-flats</code>...
              </p>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="admin@example.com"
              disabled={loading || success}
              className="w-full bg-zinc-800/70 border border-zinc-700/60 text-white text-sm rounded-xl px-3.5 py-2.5 placeholder-zinc-600 outline-none focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-150 disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                disabled={loading || success}
                className="w-full bg-zinc-800/70 border border-zinc-700/60 text-white text-sm rounded-xl px-3.5 py-2.5 pr-10 placeholder-zinc-600 outline-none focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-150 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleLogin}
            disabled={loading || success}
            className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-sm font-medium rounded-xl py-2.5 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && !success && (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {success ? 'Redirecting...' : loading ? 'Signing in...' : 'Sign in'}
          </button>

        </div>

        <p className="text-center text-xs text-zinc-600 mt-5">
          Protected area — unauthorized access is prohibited
        </p>
      </div>
    </div>
  );
}