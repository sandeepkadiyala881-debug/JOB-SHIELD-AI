import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Mail, Key, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email === '' || emailRegex.test(email);
  const isEmailEmpty = email === '';
  const canLogin = emailRegex.test(email) && password.length > 0;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate auth delay
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleGuest = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 animate-mesh">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 rounded-3xl shadow-2xl border-white/10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">JobShield <span className="text-emerald-400">AI</span></h1>
          <p className="text-sm text-white/40 mt-2 font-medium uppercase tracking-widest">Secure access to AI Job Scam Detection</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Email Address</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${!isEmailValid && !isEmailEmpty ? 'text-red-400' : 'text-white/20'}`} size={18} />
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-white/5 border rounded-2xl pl-12 pr-4 py-4 focus:outline-none transition-all ${
                  isEmailEmpty 
                    ? 'border-white/10 focus:border-emerald-500' 
                    : isEmailValid 
                      ? 'border-emerald-500/50 focus:border-emerald-500' 
                      : 'border-red-500/50 focus:border-red-500'
                }`}
              />
            </div>
            <AnimatePresence>
              {!isEmailValid && !isEmailEmpty && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[10px] font-bold text-red-400 uppercase tracking-wider ml-1"
                >
                  Please enter a valid email address.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading || !canLogin}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Login to Shield <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={handleGuest}
            className="text-sm text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto group"
          >
            Continue as Guest <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
