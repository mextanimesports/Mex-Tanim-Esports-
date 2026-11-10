import React from 'react';
import { 
  Smartphone, 
  MessageSquare, 
  Gamepad2, 
  ShoppingBag, 
  ArrowUpRight, 
  Radio, 
  Users, 
  Flame 
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/promotions';

interface EcosystemItem {
  id: string;
  pillar: string;
  title: string;
  description: string;
  stats: string;
  statsLabel: string;
  icon: any;
  actionUrl: string;
  actionText: string;
}

const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  {
    id: 'eco-app',
    pillar: 'DIGITAL INFRASTRUCTURE',
    title: 'Tournament Mobile App',
    description: 'Automated match check-ins, instantaneous room code broadcasting, and real-time tournament bracket leaderboards.',
    stats: 'Instant Rooms',
    statsLabel: 'Zero Latency Sync',
    icon: <Smartphone className="w-6 h-6 text-[#FF2A35]" />,
    actionUrl: 'https://whatsapp.com/channel/0029Vb6F0j54Y9lssQHIcv0s',
    actionText: 'Explore Mobile Hub'
  },
  {
    id: 'eco-wa',
    pillar: 'BROADCAST & REACH',
    title: 'WhatsApp Official Channel',
    description: 'Direct verified updates, match schedules, slot booking confirmations, and direct communication with administrative coordinators.',
    stats: '50K+ Gamers',
    statsLabel: 'Active Community Network',
    icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
    actionUrl: 'https://whatsapp.com/channel/0029Vb6F0j54Y9lssQHIcv0s',
    actionText: 'Join WhatsApp Channel'
  },
  {
    id: 'eco-scrims',
    pillar: 'COMPETITIVE OPERATIONS',
    title: 'Daily Scrims & Point Makers',
    description: 'Round-the-clock room hosting from 4:00 PM to 1:00 AM with dedicated point-makers Tawfa & Zisan and qualify room hosts.',
    stats: '8 Daily Tiers',
    statsLabel: 'Non-stop Custom Rooms',
    icon: <Gamepad2 className="w-6 h-6 text-[#FF2A35]" />,
    actionUrl: '#support',
    actionText: 'View Host Rosters'
  },
  {
    id: 'eco-gadgets',
    pillar: 'ECOSYSTEM COMMERCE',
    title: 'Gaming Gadgets & Store',
    description: 'Verified esports accessories, tournament equipment, gamer sleeves, and team apparel powered by Mex Tanim Gaming.',
    stats: '100% Authentic',
    statsLabel: 'Official Verified Merch',
    icon: <ShoppingBag className="w-6 h-6 text-amber-400" />,
    actionUrl: 'https://mcx-tanim.firebaseapp.com/',
    actionText: 'Visit Gadgets Store'
  }
];

export const EcosystemSection: React.FC = () => {
  return (
    <section id="ecosystem" className="py-24 relative bg-[#070709]/80 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D90000]/15 border border-[#D90000]/30 text-[#FF2A35] text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>CONNECTED ESPORTS UNIVERSE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            OUR ECOSYSTEM
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            A cohesive competitive network bridging mobile tournament software, live community channels, daily scrim rooms, and verified gaming commerce.
          </p>
        </div>

        {/* 4 3D Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_ITEMS.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#D90000]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D90000]/25"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#D90000]/40 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    {item.pillar}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-black text-white group-hover:text-[#FF2A35] transition-colors mb-2 uppercase leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Stat Pill */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 mb-6 text-center">
                  <div className="text-base font-heading font-black text-white uppercase">
                    {item.stats}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    {item.statsLabel}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a
                  href={item.actionUrl}
                  target={item.actionUrl.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#D90000] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 group-hover:bg-[#D90000]"
                >
                  <span>{item.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
