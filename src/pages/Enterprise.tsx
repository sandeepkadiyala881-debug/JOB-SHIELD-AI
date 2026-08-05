import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  Users, 
  Lock,
  BarChart3
} from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon }: { title: string, description: string, icon: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-3xl border-white/10 hover:bg-white/10 transition-all"
  >
    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-white/40 leading-relaxed">{description}</p>
  </motion.div>
);

const Enterprise = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Globe size={12} /> Enterprise Security Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            Protect Your <span className="text-gradient">Organization</span> <br />
            from Recruitment Fraud
          </h1>
          <p className="text-xl text-white/40 max-w-3xl mx-auto mb-10">
            Advanced AI-driven protection for universities, job boards, and large enterprises to ensure safe recruitment ecosystems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all flex items-center gap-2 group shadow-xl shadow-emerald-500/20">
              Request Enterprise Demo <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-bold transition-all">
              View Documentation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        <FeatureCard 
          title="Bulk Verification"
          description="Automatically scan thousands of job listings simultaneously to identify fraudulent patterns across your entire platform."
          icon={Server}
        />
        <FeatureCard 
          title="Campus Protection"
          description="Secure university placement portals and protect students from predatory recruitment schemes targeting new graduates."
          icon={Users}
        />
        <FeatureCard 
          title="Fraud Monitoring"
          description="Real-time monitoring of recruitment activity with automated alerts for suspicious behavior and identity theft."
          icon={ShieldCheck}
        />
        <FeatureCard 
          title="API Integration"
          description="Seamlessly integrate our AI analysis engine into your existing HR tech stack with our robust developer API."
          icon={Zap}
        />
        <FeatureCard 
          title="Custom Risk Models"
          description="Train custom AI models specific to your industry or region for even higher detection accuracy."
          icon={Lock}
        />
        <FeatureCard 
          title="Compliance Reporting"
          description="Generate detailed reports for security audits and regulatory compliance requirements."
          icon={BarChart3}
        />
      </div>

      {/* Trust Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto p-12 glass rounded-[3rem] border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Building2 size={200} />
        </div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Scale Your Safety</h2>
            <p className="text-white/40 mb-8 leading-relaxed">
              JobShield Enterprise provides the infrastructure needed to maintain trust in your recruitment process, no matter the volume.
            </p>
            <ul className="space-y-4">
              {[
                "Dedicated Account Management",
                "SLA-backed Uptime Guarantee",
                "Custom Data Retention Policies",
                "Advanced Admin Dashboard"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-dark p-8 rounded-3xl border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10" />
              <div className="space-y-1">
                <div className="w-32 h-2 bg-white/20 rounded-full" />
                <div className="w-20 h-2 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full h-3 bg-white/5 rounded-full" />
              <div className="w-full h-3 bg-white/5 rounded-full" />
              <div className="w-3/4 h-3 bg-white/5 rounded-full" />
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div className="text-xs font-bold text-white/20 uppercase tracking-widest">Enterprise API Status</div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Enterprise;
