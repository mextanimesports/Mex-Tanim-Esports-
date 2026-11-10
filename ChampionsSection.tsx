import React from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  ShieldCheck, 
  Flame, 
  Crosshair, 
  Award,
  Star
} from 'lucide-react';

interface ChampionTeam {
  rank: number;
  teamName: string;
  tag: string;
  captain: string;
  titlesWon: number;
  totalEarnings: string;
  winRate: string;
  badge: string;
  recentTitle: string;
}

const CHAMPIONS: ChampionTeam[] = [
  {
    rank: 1,
    teamName: 'APEX TITANS BD',
    tag: 'AT-ESPORTS',
    captain: 'Titan_Rohan',
    titlesWon: 7,
    totalEarnings: '৳2,80,000 BDT',
    winRate: '78.4%',
    badge: 'GRAND CHAMPION 2026',
    recentTitle: 'Free Fire National Pro Series S4'
  },
  {
    rank: 2,
    teamName: 'VORTEX STORM ELITE',
    tag: 'VSE-CLAN',
    captain: 'Vortex_Sifat',
    titlesWon: 5,
    totalEarnings: '৳1,95,000 BDT',
    winRate: '72.1%',
    badge: 'V-BADGE CERTIFIED',
    recentTitle: 'Premier Scrims Championship Cup'
  },
  {
    rank: 3,
    teamName: 'FALCON ZERO PROTOCOL',
    tag: 'FZ-GAMING',
    captain: 'Falcon_Tanvir',
    titlesWon: 4,
    totalEarnings: '৳1,40,000 BDT',
    winRate: '68.9%',
    badge: 'T1 ELITE SQUAD',
    recentTitle: 'Duo Warfare Clash Tournament'
  }
];

export const ChampionsSection: React.FC = () => {
  return (
    <section id="champions" className="py-24 relative bg-[#070709]/85 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D90000]/15 border border-[#D90000]/30 text-[#FF2A35] text-xs font-bold tracking-widest uppercase mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>HALL OF FAME & TOURNAMENT WINNERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            MEX TANIM CHAMPIONS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Celebrating the elite squads and standout fraggers who triumphed across our official Free Fire room brackets and scrim leagues.
          </p>
        </div>

        {/* 3 Top Champions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
          {CHAMPIONS.map((team) => (
            <div
              key={team.teamName}
              className={`glass-panel rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-2 ${
                team.rank === 1
                  ? 'border-amber-400/50 bg-gradient-to-b from-[#1c1409] via-[#120f12] to-[#08080a] shadow-2xl shadow-amber-500/15'
                  : team.rank === 2
                  ? 'border-[#C0C0C0]/40 bg-gradient-to-b from-[#141418] to-[#08080a]'
                  : 'border-[#D90000]/40 bg-gradient-to-b from-[#180a0c] to-[#08080a]'
              }`}
            >
              <div>
                {/* Header Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-black text-sm text-black ${
                      team.rank === 1 ? 'bg-amber-400' : team.rank === 2 ? 'bg-[#C0C0C0]' : 'bg-[#D90000] text-white'
                    }`}>
                      #{team.rank}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-400 uppercase">
                      {team.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                    {team.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-black text-white group-hover:text-[#FF2A35] transition-colors mb-1 uppercase">
                  {team.teamName}
                </h3>
                <div className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-[#D90000]" />
                  <span>Captain: <strong className="text-white font-mono">{team.captain}</strong></span>
                </div>

                {/* Performance KPI Grid */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-black/60 border border-white/5 text-center mb-6">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase font-semibold">Titles</div>
                    <div className="text-base sm:text-lg font-heading font-black text-white tabular-nums">
                      {team.titlesWon}
                    </div>
                  </div>
                  <div className="border-x border-white/10 px-1">
                    <div className="text-[10px] text-neutral-400 uppercase font-semibold">Win Rate</div>
                    <div className="text-base sm:text-lg font-heading font-black text-emerald-400 tabular-nums">
                      {team.winRate}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase font-semibold">Earnings</div>
                    <div className="text-xs sm:text-sm font-heading font-black text-[#FF2A35] tabular-nums mt-0.5">
                      {team.totalEarnings.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* Recent Championship */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-300">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-0.5">Latest Crown:</span>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{team.recentTitle}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                <span>Verified by Mex Tanim Esports</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
