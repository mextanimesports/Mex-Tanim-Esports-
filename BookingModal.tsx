import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Calendar, 
  Package, 
  Building, 
  Phone,
  FileEdit,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PromotionPackage, BRAND_CONFIG, buildWhatsAppBookingUrl } from '../data/promotions';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PromotionPackage | null;
  selectedDate: string | null;
  packages: PromotionPackage[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  selectedDate,
  packages
}) => {
  const [currentPackageId, setCurrentPackageId] = useState<number>(selectedPackage?.id || 5);
  const [dateChoice, setDateChoice] = useState<string>(selectedDate || '');
  const [orgName, setOrgName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      setCurrentPackageId(selectedPackage.id);
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (selectedDate) {
      setDateChoice(selectedDate);
    }
  }, [selectedDate]);

  if (!isOpen) return null;

  const activePkg = packages.find(p => p.id === currentPackageId) || packages[0];

  const generatedWhatsAppUrl = buildWhatsAppBookingUrl({
    packageName: `${activePkg.number} — ${activePkg.name}`,
    price: activePkg.price,
    videos: activePkg.videos,
    dateStr: dateChoice || undefined,
    orgName: orgName || undefined,
    phone: phone || undefined,
    notes: notes || undefined
  });

  const previewMessage = `Hello Mex Tanim Official Promotion!
I want to book a promotion.
Package: ${activePkg.number} — ${activePkg.name}
Price: ৳${activePkg.price.toLocaleString()} BDT
Videos: ${activePkg.videos} ${activePkg.videos === 1 ? 'Video' : 'Videos'}
Bio Link: ${activePkg.bioLinkDays} Days
Preferred Date: ${dateChoice || 'Flexible / Next Available Slot'}
Please provide the booking instructions.
My Organization Name: ${orgName || '[Your Organization Name]'}
My WhatsApp Number: ${phone || '[Your WhatsApp Number]'}${notes ? `\nAdditional Notes: ${notes}` : ''}
Thank you.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save customer booking to Firestore
      const { createCustomerBooking } = await import('../firebase/service');
      await createCustomerBooking({
        customerName: orgName || 'Customer Inquiry',
        whatsappNumber: phone || 'Not provided',
        orgName: orgName || '',
        packageId: activePkg.id,
        packageName: `${activePkg.number} — ${activePkg.name}`,
        price: activePkg.price,
        videoCount: activePkg.videos,
        requestedDate: dateChoice || 'Flexible',
        status: 'pending',
        paymentStatus: 'unpaid',
        notes: notes || ''
      });
    } catch (err) {
      console.warn("Could not save to Firestore, continuing with WhatsApp direct link", err);
    }

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E50914', '#ffffff', '#FF4D4D']
    });
    window.open(generatedWhatsAppUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e12] border border-[#E50914]/40 rounded-2xl shadow-2xl shadow-[#E50914]/20 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1f0a0c] via-[#14141a] to-[#121216] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#FF4D4D]" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
                BOOK PROMOTION VIA WHATSAPP
              </h3>
              <p className="text-xs text-neutral-400">
                Official Destination: {BRAND_CONFIG.primaryWhatsApp}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Package Selection */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#FF4D4D]" />
              <span>Select Promotion Package:</span>
            </label>
            <select
              value={currentPackageId}
              onChange={(e) => setCurrentPackageId(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#E50914] text-xs sm:text-sm transition-colors"
            >
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id} className="bg-[#14141a] text-white">
                  {pkg.number} — {pkg.name} (৳{pkg.price.toLocaleString()} BDT | {pkg.videos} Videos | {pkg.bioLinkDays}d Bio Link)
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FF4D4D]" />
              <span>Preferred Promotion Date:</span>
            </label>
            <input
              type="text"
              value={dateChoice}
              onChange={(e) => setDateChoice(e.target.value)}
              placeholder="e.g. 19 November 2026 or 12 December 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] text-xs sm:text-sm transition-colors"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Select an open date from the calendar or write your preferred timeline.
            </p>
          </div>

          {/* Organization Name & Phone in 2-cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#FF4D4D]" />
                <span>My Organization / Clan Name:</span>
              </label>
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Alpha Esports BD"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] text-xs sm:text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FF4D4D]" />
                <span>My WhatsApp Phone Number:</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 017XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] text-xs sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Tournament notes */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileEdit className="w-3.5 h-3.5 text-[#FF4D4D]" />
              <span>Tournament Details / Notes (Optional):</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Free Fire Duo Championship, 50k Prize Pool, looking to fill 48 teams..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] text-xs sm:text-sm transition-colors resize-none"
            />
          </div>

          {/* Live Pre-filled Message Preview */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
              <span>Pre-filled WhatsApp Message Preview:</span>
              <span className="text-[10px] text-emerald-400 font-normal">Formatted & Encoded</span>
            </div>
            <pre className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-neutral-300 text-xs font-mono whitespace-pre-wrap leading-relaxed select-all">
              {previewMessage}
            </pre>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E50914] via-[#D00812] to-[#990000] hover:from-[#FF1E27] hover:to-[#B20710] shadow-xl shadow-[#E50914]/30 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>SEND BOOKING ON WHATSAPP</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
