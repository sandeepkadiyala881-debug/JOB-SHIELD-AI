import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Zap, 
  BrainCircuit, 
  BarChart3 
} from 'lucide-react';

const StepCard = ({ number, title, description, icon: Icon, details }: { 
  number: string, 
  title: string, 
  description: string, 
  icon: any,
  details: string[]
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="glass p-8 rounded-3xl relative overflow-hidden group border-white/10"
    >
      <div className="absolute -right-4 -top-4 text-white/5 font-black text-8xl group-hover:text-emerald-500/10 transition-colors">
        {number}
      </div>
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <Icon size={28} />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/60 mb-6 leading-relaxed">{description}</p>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        {isExpanded ? 'Show Less' : 'Learn More'} {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-white/5 space-y-3"
          >
            {details.map((detail, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-white/40">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {detail}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Cpu size={12} /> The Engine Behind the Shield
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">How Our <span className="text-gradient">AI Works</span></h1>
        <p className="text-lg text-white/40 max-w-2xl mx-auto">
          JobShield AI uses advanced neural networks and linguistic analysis to protect you from sophisticated recruitment fraud.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <StepCard 
          number="01"
          title="Input Analysis"
          description="The system ingests the job description and metadata to extract core signals."
          icon={FileText}
          details={[
            "Natural Language Processing (NLP) tokenization",
            "Entity extraction (Company, Role, Location)",
            "Metadata verification (URLs, Email patterns)",
            "Contextual framing of the job offer"
          ]}
        />
        <StepCard 
          number="02"
          title="Pattern Detection"
          description="AI checks for thousands of known scam indicators and linguistic manipulation."
          icon={BrainCircuit}
          details={[
            "Detection of financial coercion language",
            "Salary-to-role realism evaluation",
            "Urgency and scarcity tactic identification",
            "Cross-referencing with known fraudulent domains"
          ]}
        />
        <StepCard 
          number="03"
          title="Risk Scoring"
          description="A multi-layered scoring engine assigns a final risk value based on weighted evidence."
          icon={Zap}
          details={[
            "Bayesian probability modeling for risk",
            "Weighted scoring of detected red flags",
            "Reasoning-based evaluation of suspicious phrases",
            "Dynamic thresholding based on industry trends"
          ]}
        />
        <StepCard 
          number="04"
          title="Explainable Output"
          description="The system generates a human-readable report with actionable safety advice."
          icon={BarChart3}
          details={[
            "Transparent explanation of the risk score",
            "Visual highlighting of dangerous phrases",
            "Customized safety recommendations",
            "Real-time threat intelligence updates"
          ]}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 p-12 glass rounded-[3rem] text-center border-white/10"
      >
        <h2 className="text-3xl font-bold mb-6">Built for Accuracy</h2>
        <p className="text-white/40 max-w-3xl mx-auto mb-8">
          Our models are trained on millions of verified job postings and confirmed scam reports, ensuring the highest level of protection for job seekers worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck size={20} /> 99.8% Accuracy Rate
          </div>
          <div className="flex items-center gap-2 text-blue-400 font-bold">
            <Zap size={20} /> Real-time Processing
          </div>
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <Cpu size={20} /> Neural Analysis
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
