import React from 'react';
import { AlertCircle, Eye, TrendingUp, Users, ShieldAlert } from 'lucide-react';
import { REACH_DATA } from '../data/promotions';

export const ReachSection: React.FC = () => {
  return (
    <section id="reach" className="py-20 relative bg-[#0a0a0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest text-[#FF4D4D] uppercase mb-2">
            AUDIENCE INSIGHTS & BENCHMARKS
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
            EXPECTED PROMOTION REACH
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Real campaign estimates observed across our Free Fire community network. Note that these are approximations and not guarantees.
          </p>
        </div>

        {/* Reach Benchmark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Tier 1 */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#E50914]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  STANDARD CAMPAIGN
                </span>
                <span className="text-[11px] font-semibold text-neutral-400 bg-white/5 px-2.5 py-1 rounded">
                  Approx. 1-Day Window
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-[#FF4D4D]" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {REACH_DATA.tier1.viewsLabel}
                </h3>
              </div>

              <p className="text-xs text-neutral-400 mb-6">
                Estimated campaign performance for starter and single/double video placements.
              </p>

              <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
                <div className="text-xs text-neutral-400 uppercase font-semibold mb-1">
                  Estimated Joining Potential:
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-white tabular-nums">
                  {REACH_DATA.tier1.potentialMembers}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  may join your group within one day
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 pt-3 border-t border-white/5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>IMPORTANT: This is an estimate, not guaranteed.</span>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#E50914]/40 bg-gradient-to-b from-[#161214] to-[#0c0c0e] hover:border-[#FF4D4D] transition-all flex flex-col justify-between shadow-xl shadow-[#E50914]/10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF4D4D]">
                  HIGH-TRAFFIC CAMPAIGN
                </span>
                <span className="text-[11px] font-semibold text-neutral-300 bg-white/5 px-2.5 py-1 rounded border border-[#E50914]/30">
                  Peak Velocity
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#FF4D4D]" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {REACH_DATA.tier2.viewsLabel}
                </h3>
              </div>

              <p className="text-xs text-neutral-400 mb-6">
                Estimated campaign performance for multi-video, extended bio link & high-demand scrims.
              </p>

              <div className="bg-white/5 rounded-xl p-4 border border-[#E50914]/20 mb-4">
                <div className="text-xs text-neutral-400 uppercase font-semibold mb-1">
                  Estimated Joining Potential:
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-[#FF4D4D] tabular-nums">
                  {REACH_DATA.tier2.potentialMembers}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  may join your group within one day
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90 pt-3 border-t border-white/5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>IMPORTANT: This is an estimate, not guaranteed.</span>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer Box */}
        <div className="mt-8 max-w-4xl mx-auto rounded-xl p-4 sm:p-5 bg-neutral-900/80 border border-white/10 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <span className="font-bold text-white uppercase tracking-wider block mb-1">
              Official Reach Policy & Disclaimer:
            </span>
            {REACH_DATA.disclaimer}
          </div>
        </div>
      </div>
    </section>
  );
};
