import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ArrowUp, X, Sparkles, Send, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/promotions';

interface FloatingWhatsAppProps {
  onOpenBooking: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBooking }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQuickPopup, setShowQuickPopup] = useState(false);
  const [showInactivityTooltip, setShowInactivityTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inactivity detection: 10 seconds of inactivity triggers the message preview tooltip
  useEffect(() => {
    if (tooltipDismissed) return;

    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      // If tooltip is already showing, keep it until user interacts with it or closes it
      inactivityTimerRef.current = setTimeout(() => {
        setShowInactivityTooltip(true);
      }, 10000); // 10 seconds
    };

    // Initial 10-second timer
    resetInactivityTimer();

    // Listen to user activity
    const activityEvents = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => {
      // Only reset timer if the tooltip hasn't shown yet
      if (!showInactivityTooltip) {
        resetInactivityTimer();
      }
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [tooltipDismissed, showInactivityTooltip]);

  // Scroll to top tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDismissTooltip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowInactivityTooltip(false);
    setTooltipDismissed(true);
  };

  const handleTooltipClick = () => {
    handleDismissTooltip();
    onOpenBooking();
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md flex items-center justify-center shadow-lg transition-all hover:-translate-y-1"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* 10-Second Inactivity Message Preview Tooltip */}
      {showInactivityTooltip && !showQuickPopup && (
        <div 
          onClick={handleTooltipClick}
          className="relative max-w-[270px] sm:max-w-[300px] bg-[#121218]/95 backdrop-blur-md border border-[#E50914]/40 hover:border-[#E50914] rounded-2xl p-3.5 shadow-2xl shadow-black/90 cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300 transition-all hover:-translate-y-0.5"
          role="alert"
          aria-live="polite"
        >
          {/* Close button */}
          <button
            onClick={handleDismissTooltip}
            className="absolute top-2.5 right-2.5 p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors z-10"
            aria-label="Dismiss message preview"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Header with avatar & online status */}
          <div className="flex items-center gap-2 mb-1.5 pr-6">
            <div className="relative w-6 h-6 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-[#E50914] to-black shrink-0">
              <img
                src={BRAND_CONFIG.logoUrl}
                alt="Mex Tanim Logo"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-[#08080a]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-heading font-black text-white tracking-wide uppercase leading-tight">
                Mex Tanim Support
              </span>
              <span className="text-[9px] text-[#C0C0C0] leading-none">
                Online now · Fast Reply
              </span>
            </div>
          </div>

          {/* Message bubble preview text */}
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-[11px] text-neutral-200 leading-snug">
            <p className="text-neutral-300">
              Need a Free Fire promotion slot or have questions on tournament reach?
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-[#FF4D4D] group-hover:text-white transition-colors">
              <span className="uppercase tracking-wider">Book Promotion Now</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Bottom downward caret pointing to WhatsApp button */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#121218] border-r border-b border-[#E50914]/40 rotate-45" />
        </div>
      )}

      {/* Quick WhatsApp Popover when clicked */}
      {showQuickPopup && (
        <div className="w-72 bg-[#121218] border border-[#E50914]/40 rounded-2xl p-4 shadow-2xl shadow-black/80 text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-heading font-bold text-white uppercase">
                Mex Tanim Support
              </span>
            </div>
            <button
              onClick={() => setShowQuickPopup(false)}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed mb-3">
            Looking to book a Free Fire promotion slot or need guidance on tournament reach?
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setShowQuickPopup(false);
                onOpenBooking();
              }}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#E50914] to-[#B20710] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#E50914]/30"
            >
              <span>Fill Booking Form</span>
            </button>
            <a
              href={`https://wa.me/${BRAND_CONFIG.primaryWhatsAppInternational}?text=${encodeURIComponent('Hello Mex Tanim Official Promotion! I would like to book a promotion.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp ({BRAND_CONFIG.primaryWhatsApp})</span>
            </a>
          </div>
        </div>
      )}

      {/* Main WhatsApp Floating Trigger */}
      <button
        onClick={() => {
          setShowInactivityTooltip(false);
          setShowQuickPopup(!showQuickPopup);
        }}
        aria-label="WhatsApp Promotion Help"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-xl shadow-emerald-950/60 hover:shadow-emerald-600/40 hover:scale-105 transition-all duration-200"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E50914] rounded-full border-2 border-[#08080a]" />
        <MessageSquare className="w-5 h-5" />
        <span className="font-heading font-bold text-xs tracking-wider uppercase hidden sm:inline">
          Book on WhatsApp
        </span>
      </button>
    </div>
  );
};
