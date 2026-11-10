import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { BRAND_CONFIG } from '../data/promotions';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdminConfig: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdminConfig }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tournaments', href: '#tournaments' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Champions', href: '#champions' },
    { name: 'Live Rooms', href: '#live-rooms' },
    { name: 'Packages', href: '#packages' },
    { name: 'Schedule', href: '#calendar' },
    { name: 'Payment', href: '#payment' },
    { name: 'Support', href: '#support' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/80 py-3' 
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Logo */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-br from-[#E50914] via-[#8B0000] to-black flex items-center justify-center overflow-hidden shadow-lg shadow-[#E50914]/20 group-hover:shadow-[#E50914]/50 transition-all">
            <img 
              src={BRAND_CONFIG.logoUrl} 
              alt="Mex Tanim Logo" 
              className="w-full h-full object-contain p-0.5 rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black tracking-wider text-base sm:text-lg text-white group-hover:text-[#FF4D4D] transition-colors leading-none uppercase">
              MEX TANIM
            </span>
            <span className="text-[10px] tracking-widest text-[#C0C0C0] font-medium leading-tight uppercase">
              OFFICIAL PROMOTION
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E50914] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Admin Settings Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdminConfig}
            title="Private Admin Portal"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-[#E50914]/20 rounded-lg border border-white/10 hover:border-[#E50914]/40 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D4D]" />
            <span className="whitespace-nowrap font-medium">Admin Portal</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-heading font-bold text-xs sm:text-sm tracking-wide text-white uppercase bg-gradient-to-r from-[#E50914] to-[#B20710] hover:from-[#FF1E27] hover:to-[#E50914] shadow-lg shadow-[#E50914]/30 hover:shadow-[#E50914]/50 transition-all duration-200 active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Book Promotion</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0c0c10]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-200 hover:text-[#FF4D4D] py-2 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg font-heading font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-[#E50914] to-[#B20710] flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/30"
            >
              <span>Instant Promotion Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminConfig();
              }}
              className="w-full py-2.5 rounded-lg text-xs font-medium text-neutral-300 bg-white/5 border border-white/10 hover:border-[#E50914]/40 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D4D]" />
              <span>Private Admin Portal (Mex Tanim)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
