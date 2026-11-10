import React from 'react';
import { ArrowDown, Flame, Shield, Sparkles, Trophy, Users, Zap } from 'lucide-react';
import { BRAND_CONFIG } from '../data/promotions';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Deep Crimson / Carbon Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={BRAND_CONFIG.heroArenaImage}
          alt="Esports Arena Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-125"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer gradient scrim ensuring WCAG AA contrast and pure dark aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-[#08080a]/60" />
        <div className="absolute inset-0 bg-radial-at-c from-[#E50914]/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#08080a] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#08080a] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Verified Brand Identity Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:border-[#E50914]/40 transition-colors">
          <span className="w-2 h-2 rounded-full bg-[#E50914]" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-300">
            MEX TANIM ESPORTS ORGANISATION
          </span>
          <span className="text-neutral-600">·</span>
          <span className="text-xs text-[#C0C0C0]">Founder & Owner: Mex Tanim Gaming</span>
        </div>

        {/* Official Crest Display */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E50914] to-[#B20710] rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition duration-500" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full p-1 bg-gradient-to-b from-[#C0C0C0] via-[#E50914] to-[#1a1a20] shadow-2xl flex items-center justify-center">
            <img
              src={BRAND_CONFIG.logoUrl}
              alt="Mex Tanim Esports Official Logo"
              className="w-full h-full object-contain rounded-full drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white uppercase max-w-5xl leading-none">
          MEX TANIM <span className="crimson-gradient-text">ESPORTS</span>
        </h1>

        {/* Subheading */}
        <p className="mt-3 text-lg sm:text-2xl font-heading font-bold tracking-wider text-[#FF2A35] uppercase">
          YOUR ESPORTS GROWTH STARTS HERE.
        </p>

        {/* Value Proposition Description */}
        <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
          South Asia's Premier Free Fire Tournament Ecosystem, Esports Organization, WhatsApp Channel & Tournament App Promotion Network.
        </p>

        {/* Slogan Pill */}
        <div className="mt-3 text-xs font-semibold tracking-widest text-[#C0C0C0] uppercase">
          {BRAND_CONFIG.slogan}
        </div>

        {/* Interactive 3-Button Cluster */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
          <a
            href="#tournaments"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-[#D90000] via-[#C00000] to-[#800000] hover:from-[#FF2A35] hover:to-[#D90000] shadow-xl shadow-[#D90000]/40 border border-white/10 transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>EXPLORE TOURNAMENTS</span>
          </a>

          <a
            href="#packages"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#D90000]/60 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <span>PROMOTION PACKAGES</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/40 shadow-lg shadow-emerald-950/40 transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-yellow-300" />
            <span>BOOK INSTANT PROMOTION</span>
          </button>
        </div>

        {/* Core Pillars Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div className="glass-panel rounded-xl p-4 text-left border border-white/5 hover:border-[#E50914]/30 transition-colors">
            <Trophy className="w-5 h-5 text-[#FF4D4D] mb-2" />
            <div className="font-heading font-bold text-sm text-white uppercase tracking-wide">
              Professional Services
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Top Free Fire tier promotion
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 text-left border border-white/5 hover:border-[#E50914]/30 transition-colors">
            <Zap className="w-5 h-5 text-[#FF4D4D] mb-2" />
            <div className="font-heading font-bold text-sm text-white uppercase tracking-wide">
              10 Exclusive Packages
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Flexible tiers from ৳1,000 to ৳5,000
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 text-left border border-white/5 hover:border-[#E50914]/30 transition-colors">
            <Shield className="w-5 h-5 text-[#FF4D4D] mb-2" />
            <div className="font-heading font-bold text-sm text-white uppercase tracking-wide">
              Personal Support
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Mex Tanim Gaming direct guidance
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 text-left border border-white/5 hover:border-[#E50914]/30 transition-colors">
            <Users className="w-5 h-5 text-[#FF4D4D] mb-2" />
            <div className="font-heading font-bold text-sm text-white uppercase tracking-wide">
              Growth Solutions
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              WhatsApp groups & channel expansion
            </div>
          </div>
        </div>

        {/* Bottom subtle scroll cue */}
        <a 
          href="#services" 
          className="mt-12 text-neutral-500 hover:text-white transition-colors inline-flex flex-col items-center gap-1 text-xs"
        >
          <span>DISCOVER SERVICES</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#FF4D4D]" />
        </a>
      </div>
    </section>
  );
};
