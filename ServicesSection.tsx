import React from 'react';
import { 
  Trophy, 
  Smartphone, 
  Users, 
  Radio, 
  Shield, 
  Flame, 
  ArrowUpRight, 
  Check 
} from 'lucide-react';
import { PROMOTION_SERVICES } from '../data/promotions';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-[#FF4D4D]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#FF4D4D]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#FF4D4D]" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-[#FF4D4D]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#FF4D4D]" />;
      case 'Flame':
      default:
        return <Flame className="w-6 h-6 text-[#FF4D4D]" />;
    }
  };

  return (
    <section id="services" className="py-20 relative bg-[#0a0a0d] border-t border-white/5">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="text-xs font-bold tracking-widest text-[#FF4D4D] uppercase mb-2">
              SPECIALIZED MARKETING CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
              PROMOTION SERVICES
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Engineered exclusively for South Asian Free Fire organizers, tournament platforms, and competitive esports clans seeking verified member participation.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROMOTION_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/5 hover:border-[#E50914]/40 hover:bg-[#14141a] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E50914]/15"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E50914]/20 to-transparent border border-[#E50914]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-neutral-500 font-semibold">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-[#FF4D4D] uppercase tracking-wider mb-1">
                  {service.category}
                </div>

                <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#FF4D4D] transition-colors mb-3 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-neutral-300 group-hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-4 h-4 text-[#E50914] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
