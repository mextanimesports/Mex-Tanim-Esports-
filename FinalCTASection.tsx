import React from 'react';
import { Flame, ArrowRight, MessageSquare, Trophy, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../data/promotions';

interface FinalCTASectionProps {
  onOpenBooking: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-[#070709] via-[#1a0507] to-[#050507] border-t border-[#D90000]/40 overflow-hidden text-center">
      {/* Background Energy Beams & Radial Scrim */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D90000]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-t from-[#D90000]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Emblem */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-[#D90000] via-[#8B0000] to-black shadow-2xl shadow-[#D90000]/50 flex items-center justify-center">
          <img
            src={BRAND_CONFIG.logoUrl}
            alt="Mex Tanim Crest"
            className="w-full h-full object-contain rounded-full drop-shadow-[0_0_20px_rgba(217,0,0,0.8)]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D90000]/15 border border-[#D90000]/30 text-[#FF2A35] text-xs font-bold tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE ESPORTS REVOLUTION</span>
        </div>

        {/* Massive Title */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-tight leading-tight">
          MEX TANIM <span className="crimson-gradient-text">ESPORTS</span>
        </h2>

        <p className="mt-4 text-lg sm:text-2xl font-heading font-bold text-neutral-200 uppercase tracking-wider max-w-3xl mx-auto">
          "BUILDING COMMUNITIES. PROMOTING ESPORTS. SUPPORTING CHAMPIONS."
        </p>

        <p className="mt-4 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Whether you are launching a Free Fire championship, expanding your clan, or booking our 10 official promotion tiers, our production engine is ready.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://whatsapp.com/channel/0029Vb6F0j54Y9lssQHIcv0s"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Join Our Official Community</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-[#D90000] to-[#990000] hover:from-[#FF2A35] hover:to-[#D90000] shadow-xl shadow-[#D90000]/40 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Book Promotion Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
