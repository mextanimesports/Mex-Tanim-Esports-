import React from 'react';
import { 
  Package, 
  Calendar, 
  CreditCard, 
  UserPlus, 
  FileText, 
  Video, 
  AlertTriangle 
} from 'lucide-react';
import { BOOKING_STEPS } from '../data/promotions';

export const BookingProcessSection: React.FC = () => {
  const stepIcons = [
    <Package className="w-5 h-5 text-[#FF4D4D]" />,
    <Calendar className="w-5 h-5 text-[#FF4D4D]" />,
    <CreditCard className="w-5 h-5 text-[#FF4D4D]" />,
    <UserPlus className="w-5 h-5 text-[#FF4D4D]" />,
    <FileText className="w-5 h-5 text-[#FF4D4D]" />,
    <Video className="w-5 h-5 text-[#FF4D4D]" />,
  ];

  return (
    <section className="py-20 relative bg-[#0a0a0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest text-[#FF4D4D] uppercase mb-2">
            STANDARDIZED WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
            BOOKING PROCESS
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            A transparent 6-step lifecycle from initial package selection to high-impact TikTok video publication.
          </p>
        </div>

        {/* 6 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOKING_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-[#E50914]/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#E50914]/40 transition-all">
                    {stepIcons[index]}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#E50914] bg-[#E50914]/10 px-2.5 py-1 rounded">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-[#FF4D4D] transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {step.desc}
                </p>

                {index === 4 && (
                  <div className="mt-3 p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-neutral-400">
                    <span className="font-semibold text-white block mb-0.5">Asset Checklist:</span>
                    • Organization Logo <br />
                    • Tournament Details & Types <br />
                    • WhatsApp Group / Channel Links
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Note on Publication Timeline */}
        <div className="mt-10 max-w-4xl mx-auto rounded-xl p-5 bg-[#141216] border border-[#E50914]/30 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-[#FF4D4D] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <span className="font-bold text-white uppercase block mb-1">
              Operational Delivery Note:
            </span>
            "Promotion publication timing may vary depending on workload, personal emergencies and other operational requirements. Customers will be informed about temporary schedule changes."
          </div>
        </div>
      </div>
    </section>
  );
};
