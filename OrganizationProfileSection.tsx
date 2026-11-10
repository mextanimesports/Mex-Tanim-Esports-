import React from 'react';
import { Shield, Award, Users2, Tv, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../data/promotions';

export const OrganizationProfileSection: React.FC = () => {
  return (
    <section className="py-20 relative bg-[#0a0a0d] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Organization & Founder Credo */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#FF4D4D] text-xs font-bold tracking-widest uppercase mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>ORGANIZATION PROFILE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight leading-tight">
              MEX TANIM <span className="crimson-gradient-text">ESPORTS ORGANISATION</span>
            </h2>

            {/* Exclusive Brand Statement */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#1c0a0d] via-[#141216] to-[#0f0f13] border-l-2 border-[#E50914] text-white">
              <div className="text-[11px] font-bold text-[#FF4D4D] uppercase tracking-wider mb-1">
                EXECUTIVE BRAND CREDO
              </div>
              <p className="text-base sm:text-lg font-heading font-black tracking-wide uppercase text-white">
                "{BRAND_CONFIG.slogan}"
              </p>
            </div>

            <p className="mt-5 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Founded by <span className="text-white font-bold">Mex Tanim Gaming</span>, Mex Tanim Esports Organisation stands at the forefront of the Bangladeshi Free Fire ecosystem. We bridge competitive clans, room hosts, scrimmage point-makers, and tournament organizers with viral promotional reach across TikTok and South Asian gaming channels.
            </p>

            {/* Org Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-[#FF4D4D]" />
                  <span className="text-xs font-mono text-neutral-400 uppercase">Founder & Owner</span>
                </div>
                <div className="text-base font-heading font-bold text-white">
                  MEX TANIM GAMING
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Strategic visionary & lead content creator
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <Tv className="w-4 h-4 text-[#FF4D4D]" />
                  <span className="text-xs font-mono text-neutral-400 uppercase">Production Partner</span>
                </div>
                <div className="text-base font-heading font-bold text-white">
                  BENGAL STORM PRODUCTION
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Official tournament broadcasting & graphics
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified TikTok Promotion Network</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>T1 & V-Badge Team Coordination</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>SG Server Drone Room Capabilities</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Production Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={BRAND_CONFIG.productionStudioImage}
                alt="Mex Tanim Esports Production Studio"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent" />
              
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#0e0e12]/80 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-bold text-[#FF4D4D] uppercase tracking-wider">
                  Broadcast Infrastructure
                </div>
                <div className="text-sm font-heading font-bold text-white">
                  Bengal Storm Production Broadcast Suite
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  High-definition gameplay recording, graphic overlays & tournament point-making
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
