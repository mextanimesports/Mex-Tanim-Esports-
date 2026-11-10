import React, { useState } from 'react';
import { 
  CreditCard, 
  Copy, 
  Check, 
  ShieldCheck, 
  MessageSquare, 
  HelpCircle,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PAYMENT_CONFIG, BRAND_CONFIG } from '../data/promotions';

interface PaymentSectionProps {
  onOpenBooking: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ onOpenBooking }) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E50914', '#FF4D4D', '#ffffff']
    });
    setTimeout(() => {
      setCopiedNumber(null);
    }, 2500);
  };

  const handleConfirmOnWhatsApp = () => {
    const text = `Hello Mex Tanim Official Promotion!
I have completed payment for my promotion booking.
Please verify my transaction:
- Sender Number: 
- Payment Method (bKash/Nagad/Rocket): 
- TrxID: 
- Package: 
Attached is my payment screenshot. Thank you.`;
    window.open(`https://wa.me/${BRAND_CONFIG.primaryWhatsAppInternational}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="payment" className="py-20 relative bg-[#08080a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#FF4D4D] text-xs font-bold tracking-widest uppercase mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>SECURE MOBILE FINANCIAL SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
            PAYMENT INFORMATION
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Official verified payment accounts for bKash, Nagad, and Rocket mobile transactions.
          </p>
        </div>

        {/* Payment Policy Pill Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl bg-gradient-to-r from-[#1f0a0c] via-[#161214] to-[#121216] border border-[#E50914]/40 text-center">
          <div className="text-xs text-[#FF4D4D] font-bold uppercase tracking-wider mb-1">
            MANDATORY BOOKING POLICY
          </div>
          <div className="text-base sm:text-lg font-heading font-bold text-white">
            "{PAYMENT_CONFIG.policy}"
          </div>
        </div>

        {/* 2 Official Payment Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {PAYMENT_CONFIG.numbers.map((item, index) => (
            <div
              key={item.number}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#E50914]/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold text-neutral-400 uppercase">
                    ACCOUNT 0{index + 1}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Official Account</span>
                  </div>
                </div>

                <h3 className="text-base font-heading font-bold text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-neutral-400 mb-4">
                  Supports bKash, Nagad & Rocket (Personal 'Send Money')
                </p>

                {/* Number Display & Copy Button */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 mb-2">
                  <div className="font-heading font-black text-2xl tracking-wider text-white tabular-nums select-all">
                    {item.number}
                  </div>
                  <button
                    onClick={() => handleCopy(item.number)}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-[#E50914] text-white transition-all active:scale-95 flex items-center gap-1.5 text-xs font-heading font-bold"
                    title="Copy Phone Number"
                  >
                    {copiedNumber === item.number ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 pt-3 border-t border-white/5 flex items-center justify-between">
                <span>Account Type: Personal</span>
                <span>Currency: BDT (৳)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Step-by-Step Payment Instructions */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 mb-10">
          <h3 className="text-lg font-heading font-bold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#FF4D4D]" />
            <span>HOW TO COMPLETE YOUR PAYMENT</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAYMENT_CONFIG.instructions.map((inst, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="w-6 h-6 rounded-full bg-[#E50914] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {inst}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              After sending money, keep your TrxID and screenshot ready for WhatsApp verification.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleConfirmOnWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Payment on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
