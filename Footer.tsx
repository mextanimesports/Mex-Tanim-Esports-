import React from 'react';
import { 
  Shield, 
  MessageSquare, 
  Heart, 
  ArrowUp, 
  ExternalLink,
  Phone
} from 'lucide-react';
import { BRAND_CONFIG, SOCIAL_LINKS } from '../data/promotions';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdminConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdminConfig }) => {
  return (
    <footer className="relative bg-[#050507] border-t border-white/10 pt-16 pb-12 overflow-hidden text-neutral-400">
      {/* Top Red Ambient Glow Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-[#E50914]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-[#E50914] to-black flex items-center justify-center overflow-hidden shadow-lg shadow-[#E50914]/20">
                <img
                  src={BRAND_CONFIG.logoUrl}
                  alt="Mex Tanim Emblem"
                  className="w-full h-full object-contain p-0.5"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-heading font-black text-lg text-white uppercase tracking-wider block leading-none">
                  MEX TANIM
                </span>
                <span className="text-[10px] tracking-widest text-[#C0C0C0] font-semibold uppercase">
                  OFFICIAL PROMOTION
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-4">
              {BRAND_CONFIG.description}
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-300">
              <div className="text-[10px] font-bold text-[#FF4D4D] uppercase tracking-wider mb-1">
                Founder & Owner
              </div>
              <div className="font-heading font-bold text-white text-sm">
                {BRAND_CONFIG.founderAndOwner}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                MEX TANIM ESPORTS ORGANISATION
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Promotion Services</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">10 Promotion Packages</a>
              </li>
              <li>
                <a href="#reach" className="hover:text-white transition-colors">Expected Reach</a>
              </li>
              <li>
                <a href="#success-stories" className="hover:text-white transition-colors">Our Success Stories</a>
              </li>
              <li>
                <a href="#calendar" className="hover:text-white transition-colors">Booking Calendar</a>
              </li>
              <li>
                <a href="#payment" className="hover:text-white transition-colors">Payment Methods</a>
              </li>
              <li>
                <a href="#support" className="hover:text-white transition-colors">Admin Support</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ Knowledge Base</a>
              </li>
            </ul>
          </div>

          {/* Featured Channels */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-4">
              Official Channels
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://whatsapp.com/channel/0029Vb6F0j54Y9lssQHIcv0s" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D4D] transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp Channel</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tiktok.com/@mextanimgaming?_r=1&_t=ZS-9AZT1zlT6FV" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D4D] transition-colors flex items-center gap-1.5"
                >
                  <span>TikTok Promotion</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@mextanimesports?si=EINK6Db0qi8-J3Jk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D4D] transition-colors flex items-center gap-1.5"
                >
                  <span>YouTube Official</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://mcx-tanim.firebaseapp.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D4D] transition-colors flex items-center gap-1.5"
                >
                  <span>Gaming Gadgets</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/HCcsKvFh9d" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D4D] transition-colors flex items-center gap-1.5"
                >
                  <span>Discord Scrims</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://whatsapp.com/channel/0029Vb9FTjpAYlULPxrGvn0Z" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D4D] transition-colors flex items-center gap-1.5"
                >
                  <span>T1/T2 Buy & Sell</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact & Legal */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-4">
              Booking Helpline
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF4D4D]" />
                <span className="text-white font-mono">{BRAND_CONFIG.primaryWhatsApp}</span>
              </div>
              <p className="text-neutral-500 text-[11px] leading-relaxed">
                Production Support partner: Bengal Storm Production.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenAdminConfig}
                  className="text-[11px] text-neutral-500 hover:text-white underline underline-offset-4"
                >
                  Owner Config Manager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Statement Banner */}
        <div className="py-6 border-y border-white/5 text-center">
          <p className="font-heading font-black text-sm sm:text-base text-white uppercase tracking-wider">
            "THANKS FOR STAYING WITH MEX TANIM ESPORTS ORGANISATION."
          </p>
          <p className="text-xs text-[#FF4D4D] mt-1 font-semibold tracking-widest uppercase">
            {BRAND_CONFIG.slogan}
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 Mex Tanim Esports Organisation. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Founder & Owner: Mex Tanim Gaming</span>
            <span>·</span>
            <span>Free Fire Promotion Agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
