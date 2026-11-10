import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Calendar, 
  Users, 
  Coins, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';

interface TournamentItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  prizePool: string;
  entryFee: string;
  format: string;
  slotsTotal: number;
  slotsRemaining: number;
  date: string;
  time: string;
  featured?: boolean;
}

const TOURNAMENTS: TournamentItem[] = [
  {
    id: 't-1',
    title: 'SOUTH ASIAN GRAND SLAM 2026',
    subtitle: 'Official Free Fire Squad Championship',
    badge: 'FLAGSHIP CHAMPIONSHIP',
    prizePool: '৳1,50,000 BDT',
    entryFee: '৳1,000 / Squad',
    format: 'Battle Royale Squad (4v4v4)',
    slotsTotal: 48,
    slotsRemaining: 6,
    date: '26 November 2026',
    time: '8:00 PM BST',
    featured: true
  },
  {
    id: 't-2',
    title: 'APEX DUO SCRIMS SERIES S5',
    subtitle: 'Competitive Room Duo Qualifiers',
    badge: 'DAILY COMPETITIVE',
    prizePool: '৳35,000 BDT',
    entryFee: '৳300 / Duo',
    format: 'Duo Battle (Bermuda / Purgatory)',
    slotsTotal: 36,
    slotsRemaining: 12,
    date: '19 November 2026',
    time: '7:00 PM BST'
  },
  {
    id: 't-3',
    title: 'NATIONAL CLAN WARFARE CUP',
    subtitle: 'Elite T1 & V-Badge Guild Clash',
    badge: 'INVITATIONAL',
    prizePool: '৳75,000 BDT',
    entryFee: '৳500 / Team',
    format: 'Best of 6 Matches',
    slotsTotal: 24,
    slotsRemaining: 3,
    date: '12 November 2026',
    time: '9:00 PM BST'
  }
];

interface TournamentShowcaseProps {
  onRegisterClick: (tournamentTitle: string) => void;
}

export const TournamentShowcase: React.FC<TournamentShowcaseProps> = ({ onRegisterClick }) => {
  return (
    <section id="tournaments" className="py-24 relative bg-[#070709]/85 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D90000]/15 border border-[#D90000]/30 text-[#FF2A35] text-xs font-bold tracking-widest uppercase mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>OFFICIAL ESPORTS ARENA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
              TOURNAMENT EXPERIENCE
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Step into the highest-stakes Free Fire championships across Bangladesh and South Asia, featuring verified room hosts and guaranteed prize pools.
          </p>
        </div>

        {/* 3 Tournaments Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TOURNAMENTS.map((t) => {
            const fillPercentage = Math.round(((t.slotsTotal - t.slotsRemaining) / t.slotsTotal) * 100);

            return (
              <div
                key={t.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  t.featured
                    ? 'bg-gradient-to-b from-[#1c080a] via-[#120f12] to-[#08080a] border-2 border-[#D90000] shadow-2xl shadow-[#D90000]/30 scale-[1.01]'
                    : 'glass-panel border border-white/10 hover:border-white/25 hover:bg-[#121217]'
                } group hover:-translate-y-1.5`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF2A35] bg-[#D90000]/15 px-2.5 py-1 rounded border border-[#D90000]/30">
                    {t.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                    <Clock className="w-3 h-3 text-[#D90000]" />
                    <span>{t.time}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white group-hover:text-[#FF2A35] transition-colors uppercase leading-tight mb-1">
                    {t.title}
                  </h3>
                  <div className="text-xs text-neutral-400 mb-6">
                    {t.subtitle}
                  </div>

                  {/* Prize & Entry Fee */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-black/60 border border-white/5 mb-6 text-center">
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase mb-0.5">Prize Pool</div>
                      <div className="text-lg sm:text-xl font-heading font-black text-[#FF2A35] tabular-nums">
                        {t.prizePool}
                      </div>
                    </div>
                    <div className="border-l border-white/10 pl-2">
                      <div className="text-[10px] font-bold text-neutral-400 uppercase mb-0.5">Entry Fee</div>
                      <div className="text-lg sm:text-xl font-heading font-black text-white tabular-nums">
                        {t.entryFee}
                      </div>
                    </div>
                  </div>

                  {/* Format & Date Details */}
                  <div className="space-y-2 text-xs text-neutral-300 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Match Format:</span>
                      <span className="font-semibold text-white">{t.format}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Tournament Date:</span>
                      <span className="font-semibold text-emerald-400">{t.date}</span>
                    </div>
                  </div>

                  {/* Slots Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="text-neutral-400">Slots Remaining:</span>
                      <span className="text-white font-bold">{t.slotsRemaining} of {t.slotsTotal} Left</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D90000] to-[#FF4D4D] rounded-full transition-all duration-500"
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Registration CTA */}
                <button
                  onClick={() => onRegisterClick(t.title)}
                  className={`w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 ${
                    t.featured
                      ? 'bg-gradient-to-r from-[#D90000] to-[#B20000] hover:from-[#FF2A35] hover:to-[#D90000] shadow-lg shadow-[#D90000]/40'
                      : 'bg-white/10 hover:bg-[#D90000]'
                  }`}
                >
                  <span>REGISTER SQUAD NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
