import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, Link, NavLink, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Lazy load pages for better performance
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const SafetyGuide = lazy(() => import('./pages/SafetyGuide'));
const Enterprise = lazy(() => import('./pages/Enterprise'));

// Preload functions
const preloadHowItWorks = () => import('./pages/HowItWorks');
const preloadSafetyGuide = () => import('./pages/SafetyGuide');
const preloadEnterprise = () => import('./pages/Enterprise');
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  MessageSquare, 
  X, 
  Loader2, 
  ExternalLink, 
  Building2, 
  FileText,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  Lock,
  LogOut
} from 'lucide-react';

// --- Types ---
interface AnalysisResult {
  risk_level: string;
  risk_score: number;
  detected_issues: string[];
  explanation: string;
  safety_tips: string[];
  highlighted_phrases: { text: string; risk: string; reason: string; }[];
}

// --- Components ---

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass">
      <Link to="/" className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
          <Shield size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">JobShield <span className="text-emerald-400">AI</span></span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <NavLink 
          to="/how-it-works" 
          onMouseEnter={preloadHowItWorks}
          className={({ isActive }) => isActive ? "text-white" : "hover:text-white transition-colors"}
        >
          How it works
        </NavLink>
        <NavLink 
          to="/safety-guide" 
          onMouseEnter={preloadSafetyGuide}
          className={({ isActive }) => isActive ? "text-white" : "hover:text-white transition-colors"}
        >
          Safety Guide
        </NavLink>
        <NavLink 
          to="/enterprise" 
          onMouseEnter={preloadEnterprise}
          className={({ isActive }) => isActive ? "text-white" : "hover:text-white transition-colors"}
        >
          Enterprise
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-semibold transition-all border border-white/10"
          >
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 glass-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="p-4 bg-emerald-500 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-white" />
                <span className="font-semibold text-white">Shield Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 h-64 overflow-y-auto space-y-4 text-sm">
              <div className="bg-white/5 p-3 rounded-lg rounded-tl-none">
                Hello! I'm your JobShield AI assistant. How can I help you stay safe today?
              </div>
              <div className="bg-emerald-500/20 p-3 rounded-lg rounded-tr-none ml-auto w-3/4 text-emerald-200">
                What are the common signs of a job scam?
              </div>
              <div className="bg-white/5 p-3 rounded-lg rounded-tl-none">
                Common signs include requests for upfront payment, generic email addresses, and salaries that seem too good to be true.
              </div>
            </div>
            <div className="p-4 border-t border-white/5 flex gap-2">
              <input type="text" placeholder="Ask a question..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500" />
              <button className="p-2 rounded-lg bg-emerald-500 text-white">
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

const RiskMeter = ({ score }: { score: number }) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= score) {
          clearInterval(interval);
        } else {
          current += 1;
          setDisplayScore(current);
        }
      }, 20);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = () => {
    if (score < 30) return 'text-emerald-400';
    if (score < 60) return 'text-amber-400';
    return 'text-red-500';
  };

  const getStrokeColor = () => {
    if (score < 30) return '#10b981';
    if (score < 60) return '#f59e0b';
    return '#ef4444';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-white/5"
        />
        <motion.circle
          cx="96"
          cy="96"
          r="45"
          stroke={getStrokeColor()}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold ${getColor()}`}>{displayScore}</span>
        <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">Risk Score</span>
      </div>
      {score > 70 && (
        <div className="absolute -top-2 -right-2">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="p-2 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/50"
          >
            <AlertTriangle size={20} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

const AIThinking = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Scanning job description...",
    "Detecting suspicious language...",
    "Evaluating salary realism...",
    "Checking recruiter authenticity...",
    "Generating risk assessment..."
  ];

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => setStep(step + 1), 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="text-emerald-500 animate-pulse" size={32} />
        </div>
      </div>
      <div className="space-y-3 w-full max-w-xs">
        {steps.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: i <= step ? 1 : 0.3, 
              x: i <= step ? 0 : -10,
              color: i < step ? '#10b981' : i === step ? '#ffffff' : '#ffffff4d'
            }}
            className="flex items-center gap-3 text-sm font-medium"
          >
            {i < step ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border border-white/20" />}
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TypingHeadline = () => {
  const text = "AI Protection Against Job Scams";
  return (
    <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05, duration: 0.1 }}
          className={i > 20 ? "text-gradient" : ""}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
};

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full"
    />
  </div>
);

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<'landing' | 'analyze' | 'results'>('landing');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [formData, setFormData] = useState({ jobText: '', companyName: '', jobUrl: '' });

  const handleAnalyze = async () => {
    if (!formData.jobText) return;
    setIsAnalyzing(true);
    setPage('analyze');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
      setIsAnalyzing(false);
      setPage('analyze');
    }
  };

  const renderLanding = () => (
    <div className="relative min-h-screen pt-24 pb-12 px-6 overflow-hidden animate-mesh">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Lock size={12} /> Powered by Advanced AI
          </div>
          <TypingHeadline />
          <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
            Don't let your career dreams turn into a nightmare. Our AI analyzes job listings in seconds to detect fraudulent recruitment schemes.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setPage('analyze')}
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all flex items-center gap-2 group shadow-xl shadow-emerald-500/20"
            >
              Analyze Job Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link 
              to="/safety-guide"
              onMouseEnter={preloadSafetyGuide}
              className="px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-bold transition-all inline-flex items-center"
            >
              View Safety Guide
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="space-y-1">
              <div className="text-3xl font-bold flex items-center gap-2">
                <TrendingUp className="text-emerald-400" size={20} />
                <span>12k+</span>
              </div>
              <div className="text-xs text-white/40 uppercase font-semibold tracking-wider">Analyzed Today</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold flex items-center gap-2">
                <ShieldAlert className="text-red-400" size={20} />
                <span>450+</span>
              </div>
              <div className="text-xs text-white/40 uppercase font-semibold tracking-wider">Scams Blocked</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold flex items-center gap-2">
                <Users className="text-blue-400" size={20} />
                <span>8.5k</span>
              </div>
              <div className="text-xs text-white/40 uppercase font-semibold tracking-wider">Users Protected</div>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full animate-pulse-glow" />
          <div className="relative glass p-8 rounded-3xl border-white/10 animate-float">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="space-y-1">
                  <div className="w-24 h-2 bg-white/20 rounded-full" />
                  <div className="w-16 h-2 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">High Risk</div>
            </div>
            <div className="space-y-4">
              <div className="w-full h-4 bg-white/10 rounded-full" />
              <div className="w-5/6 h-4 bg-white/10 rounded-full" />
              <div className="w-4/6 h-4 bg-white/10 rounded-full" />
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-red-400 mb-2"><AlertTriangle size={20} /></div>
                <div className="text-xs font-bold">Payment Request</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-amber-400 mb-2"><Info size={20} /></div>
                <div className="text-xs font-bold">Salary Mismatch</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3-Step Explanation */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-8"
      >
        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-white/5 font-black text-8xl group-hover:text-emerald-500/10 transition-colors">01</div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Paste Listing</h3>
          <p className="text-sm text-white/40 leading-relaxed">Copy the suspicious job description and paste it into our secure analyzer.</p>
        </div>
        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-white/5 font-black text-8xl group-hover:text-blue-500/10 transition-colors">02</div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
            <Search size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
          <p className="text-sm text-white/40 leading-relaxed">Our neural networks scan for linguistic patterns, financial red flags, and identity fraud.</p>
        </div>
        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-white/5 font-black text-8xl group-hover:text-red-500/10 transition-colors">03</div>
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mb-6">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Get Risk Score</h3>
          <p className="text-sm text-white/40 leading-relaxed">Receive a detailed risk report with highlighted threats and safety recommendations.</p>
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-500/20 rounded-full blur-sm"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );

  const renderAnalyze = () => (
    <div className="min-h-screen pt-32 pb-12 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-3xl"
      >
        {isAnalyzing ? (
          <AIThinking onComplete={() => {
            setIsAnalyzing(false);
            setPage('results');
          }} />
        ) : (
          <>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Search size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Job Analysis Portal</h2>
                <p className="text-sm text-white/40">Paste the job details below for a comprehensive risk assessment.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Company Name (Optional)</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g. Acme Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Job URL (Optional)</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="text" 
                      placeholder="https://linkedin.com/jobs/..."
                      value={formData.jobUrl}
                      onChange={(e) => setFormData({...formData, jobUrl: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Job Description</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-6 text-white/20" size={18} />
                  <textarea 
                    rows={8}
                    placeholder="Paste the full job description here..."
                    value={formData.jobText}
                    onChange={(e) => setFormData({...formData, jobText: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={!formData.jobText}
                className="w-full py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
              >
                Start AI Analysis <Shield size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );

  const renderResults = () => {
    if (!result) return null;
    
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Left Column: Risk Score */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-3xl flex flex-col items-center text-center"
            >
              <RiskMeter score={result.risk_score} />
              <div className="mt-6 space-y-2">
                <div className={`text-2xl font-bold ${result.risk_score > 70 ? 'text-red-500' : result.risk_score > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {result.risk_level}
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  {result.explanation}
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-3xl"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" /> Safety Checklist
              </h3>
              <ul className="space-y-3">
  {Array.isArray(result?.safety_tips) &&
    result.safety_tips.map((tip, i) => (
      <li key={i} className="flex gap-3 text-sm text-white/80">
        <div className="mt-1">
          <CheckCircle2 size={14} className="text-emerald-400" />
        </div>
        {tip}
      </li>
    ))}
</ul>
            </motion.div>
          </div>

          {/* Right Column: Detailed Issues & Highlights */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle size={24} className="text-red-500" /> Detected Red Flags
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Array.isArray(result?.detected_issues) &&
  result.detected_issues.map((issue, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                      <ShieldAlert size={18} />
                    </div>
                    <span className="text-sm font-medium">{issue}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Search size={24} className="text-blue-400" /> Smart Text Highlighting
              </h3>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-sm leading-relaxed text-white/60">
                {/* Simplified highlighting simulation */}
                <p>
                  We are looking for an <span className="text-white font-medium">urgent hire</span> to join our global team. 
                  Candidates must be willing to <span className="bg-red-500/20 text-red-400 px-1 rounded border border-red-500/30 cursor-help" title="Legitimate employers provide equipment.">pay for equipment</span> upfront which will be reimbursed. 
                  The starting salary is <span className="bg-amber-500/20 text-amber-400 px-1 rounded border border-amber-500/30 cursor-help" title="Salary seems unrealistic for the role.">$150,000 per year</span>. 
                  Please send your resume to our recruitment officer at <span className="text-white font-medium">hr.global@gmail.com</span>.
                </p>
              </div>
              <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500/40 border border-red-500" />
                  <span>High Risk Phrase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-500/40 border border-amber-500" />
                  <span>Suspicious Warning</span>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <button 
                onClick={() => {
                  setFormData({ jobText: '', companyName: '', jobUrl: '' });
                  setPage('analyze');
                }}
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              >
                Analyze Another Job
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/*" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-bg-dark selection:bg-emerald-500/30">
              <Navbar />
              
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait">
                  <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Routes location={location}>
                      <Route path="/" element={
                        <PageTransition>
                          <AnimatePresence mode="wait">
                            {page === 'landing' && (
                              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                {renderLanding()}
                              </motion.div>
                            )}
                            {page === 'analyze' && (
                              <motion.div key="analyze" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                {renderAnalyze()}
                              </motion.div>
                            )}
                            {page === 'results' && (
                              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                {renderResults()}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </PageTransition>
                      } />
                      <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
                      <Route path="/safety-guide" element={<PageTransition><SafetyGuide /></PageTransition>} />
                      <Route path="/enterprise" element={<PageTransition><Enterprise /></PageTransition>} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </Suspense>

              <FloatingAssistant />
              
              {/* Footer */}
              <footer className="py-12 px-6 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-widest font-bold">
                &copy; 2026 JobShield AI &bull; Hackathon MVP &bull; Stay Safe Online
              </footer>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
