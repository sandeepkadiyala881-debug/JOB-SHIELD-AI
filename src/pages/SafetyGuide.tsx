import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  UserCheck, 
  Lock, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Info,
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

const GuideCard = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="glass rounded-3xl overflow-hidden border-white/10"
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="text-white/20">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6"
          >
            <div className="pt-4 border-t border-white/5 text-white/60 leading-relaxed text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SafetyGuide = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Lock size={12} /> Cybersecurity Awareness
        </div>
        <h1 className="text-5xl font-extrabold mb-6">Job Search <span className="text-gradient">Safety Guide</span></h1>
        <p className="text-lg text-white/40 max-w-2xl mx-auto">
          Equip yourself with the knowledge to navigate the modern job market securely.
        </p>
      </motion.div>

      {/* Warning Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 p-6 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center gap-4"
      >
        <div className="p-3 rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h4 className="font-bold text-red-400">Critical Safety Warning</h4>
          <p className="text-sm text-red-400/80">Never pay money to secure a job offer. Legitimate employers will never ask for recruitment fees, equipment deposits, or training costs upfront.</p>
        </div>
      </motion.div>

      <div className="space-y-4">
        <GuideCard title="Common Job Scam Signs" icon={ShieldAlert}>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span><strong>Unrealistic Salary:</strong> If the pay is significantly higher than the industry average for the required experience.</span>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span><strong>Generic Emails:</strong> Recruiters using @gmail.com, @outlook.com, or other free email providers instead of corporate domains.</span>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span><strong>Immediate Hiring:</strong> Job offers sent without a formal interview process or within minutes of applying.</span>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span><strong>Vague Descriptions:</strong> Job posts that don't specify duties or required skills, focusing only on "easy money."</span>
            </li>
          </ul>
        </GuideCard>

        <GuideCard title="How to Verify Recruiters" icon={UserCheck}>
          <div className="space-y-4">
            <p>Before sharing any personal information, perform these verification steps:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h5 className="font-bold text-white mb-2 flex items-center gap-2"><ExternalLink size={14} /> Official Website</h5>
                <p className="text-xs">Check the company's official 'Careers' page to see if the job is listed there.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h5 className="font-bold text-white mb-2 flex items-center gap-2"><ShieldCheck size={14} /> LinkedIn Profile</h5>
                <p className="text-xs">Verify the recruiter has a legitimate profile connected to the official company page.</p>
              </div>
            </div>
          </div>
        </GuideCard>

        <GuideCard title="Safe Application Practices" icon={Lock}>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Use a dedicated email address for job applications to keep your primary inbox secure.</span>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Never share sensitive data like your SSN, bank details, or passport copies during the initial application phase.</span>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Enable two-factor authentication (2FA) on all your professional networking and job board accounts.</span>
            </li>
          </ul>
        </GuideCard>

        <GuideCard title="Payment Warning Alerts" icon={AlertCircle}>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <p className="text-sm font-medium mb-3">Watch out for these specific payment-related scams:</p>
            <ul className="space-y-2 text-xs">
              <li>• "Check Cashing" scams where they send you a fake check for equipment.</li>
              <li>• Requests for payment via Crypto, Gift Cards, or Wire Transfers.</li>
              <li>• "Training Fees" or "Background Check Fees" that you must pay to them directly.</li>
            </ul>
          </div>
        </GuideCard>
      </div>

      <div className="mt-16 text-center">
        <p className="text-white/20 text-sm flex items-center justify-center gap-2">
          <Info size={16} /> Stay vigilant. If an offer feels wrong, it probably is.
        </p>
      </div>
    </div>
  );
};

export default SafetyGuide;
