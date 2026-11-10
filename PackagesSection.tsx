import React, { useState } from 'react';
import { 
  Check, 
  Crown, 
  Flame, 
  Sparkles, 
  Video, 
  Link as LinkIcon, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { PromotionPackage, buildWhatsAppBookingUrl } from '../data/promotions';

interface PackagesSectionProps {
  packages: PromotionPackage[];
  onSelectPackage: (pkg: PromotionPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ 
  packages, 
  onSelectPackage 
}) => {
  const [filterTier, setFilterTier] = useState<'all' | 'starter' | 'pro' | 'championship'>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (filterTier === 'starter') return pkg.id <= 3;
    if (filterTier === 'pro') return pkg.id >= 4 && pkg.id <= 6;
    if (filterTier === 'championship') return pkg.id >= 7;
    return true;
  });

  return (
    <section id="packages" className="py-24 relative bg-[#08080a] border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-[#E50914]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#FF4D4D] text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>TRANSPARENT BANGLADESHI TAKA (৳) PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            PREMIUM PROMOTION PACKAGES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Choose from 10 battle-tested tiers tailored for every stage of your tournament, community, or esports organization.
          </p>

          {/* Interactive Tier Filter Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setFilterTier('all')}
              className={`px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filterTier === 'all'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All 10 Packages
            </button>
            <button
              onClick={() => setFilterTier('starter')}
              className={`px-3 sm:px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filterTier === 'starter'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Starter (1–3)
            </button>
            <button
              onClick={() => setFilterTier('pro')}
              className={`px-3 sm:px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filterTier === 'pro'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Pro (4–6)
            </button>
            <button
              onClick={() => setFilterTier('championship')}
              className={`px-3 sm:px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filterTier === 'championship'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Championship (7–10)
            </button>
          </div>
        </div>

        {/* 10 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredPackages.map((pkg) => {
            const isUltimate = pkg.id === 10;
            const isBestValue = pkg.badge === 'BEST VALUE';

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isUltimate
                    ? 'bg-gradient-to-b from-[#1f0a0c] via-[#141418] to-[#0c0c0e] border-2 border-[#E50914] shadow-2xl shadow-[#E50914]/40 scale-[1.02] xl:scale-105 z-20'
                    : isBestValue
                    ? 'bg-gradient-to-b from-[#181216] via-[#121216] to-[#0c0c0e] border-2 border-[#FF4D4D]/60 shadow-xl shadow-[#FF4D4D]/20 z-10'
                    : 'glass-panel border border-white/10 hover:border-white/25 hover:bg-[#15151c]'
                } p-5 hover:-translate-y-1`}
              >
                {/* Badges */}
                {isUltimate && (
                  <div className="absolute -top-3.5 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E50914] via-[#FF2A35] to-[#B20710] text-[10px] font-black tracking-widest text-white uppercase shadow-lg shadow-[#E50914]/50 flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-300" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {isBestValue && (
                  <div className="absolute -top-3 inset-x-0 mx-auto w-max px-3 py-0.5 rounded-full bg-[#E50914] text-[10px] font-black tracking-widest text-white uppercase shadow-md shadow-[#E50914]/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top package header */}
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-mono uppercase mb-1">
                    <span>{pkg.number}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-300">
                      Tier {pkg.id}
                    </span>
                  </div>

                  <h3 className={`text-xl font-heading font-black tracking-tight uppercase mb-3 ${
                    isUltimate ? 'text-[#FF4D4D]' : 'text-white'
                  }`}>
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-medium text-neutral-400">৳</span>
                      <span className="text-3xl font-heading font-black tracking-tight text-white tabular-nums">
                        {pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">BDT</span>
                    </div>
                  </div>

                  {/* Video & Bio Link Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 bg-white/5 rounded-xl p-2.5 border border-white/5 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 mb-0.5">
                        <Video className="w-3 h-3 text-[#FF4D4D]" />
                        <span>Videos</span>
                      </div>
                      <div className="text-sm font-heading font-bold text-white tabular-nums">
                        {pkg.videos} {pkg.videos === 1 ? 'Video' : 'Videos'}
                      </div>
                    </div>
                    <div className="border-l border-white/10 pl-2">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 mb-0.5">
                        <LinkIcon className="w-3 h-3 text-[#FF4D4D]" />
                        <span>Bio Link</span>
                      </div>
                      <div className="text-sm font-heading font-bold text-white tabular-nums">
                        {pkg.bioLinkDays} {pkg.bioLinkDays === 1 ? 'Day' : 'Days'}
                      </div>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                      Included Benefits:
                    </div>
                    {pkg.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#FF4D4D] shrink-0 mt-0.5" />
                        <span className="leading-tight">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Action Button */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-2.5 px-3 rounded-xl font-heading font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md ${
                      isUltimate
                        ? 'bg-gradient-to-r from-[#E50914] via-[#FF2A35] to-[#B20710] hover:from-[#FF4D4D] hover:to-[#E50914] text-white shadow-[#E50914]/40'
                        : isBestValue
                        ? 'bg-[#E50914] hover:bg-[#FF1E27] text-white shadow-[#E50914]/30'
                        : 'bg-white/10 hover:bg-[#E50914] text-white hover:shadow-lg hover:shadow-[#E50914]/20'
                    }`}
                  >
                    <span>BOOK THIS PACKAGE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildWhatsAppBookingUrl({
                      packageName: `${pkg.number} — ${pkg.name}`,
                      price: pkg.price,
                      videos: pkg.videos
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-2 text-[11px] text-neutral-400 hover:text-white transition-colors"
                  >
                    Direct WhatsApp Link →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Campaign Note */}
        <div className="mt-12 glass-panel rounded-2xl p-6 border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#FF4D4D]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white uppercase">
                Need a Custom Free Fire Championship Promotion Campaign?
              </h4>
              <p className="text-xs text-neutral-400">
                Multiple room series, multi-week scrim support, or custom influencer packages are available upon direct request.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectPackage(packages[9] || packages[0])}
            className="px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors whitespace-nowrap shrink-0"
          >
            Consult Admin
          </button>
        </div>
      </div>
    </section>
  );
};
