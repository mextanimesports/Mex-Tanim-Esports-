import React from 'react';
import { 
  MessageSquare, 
  Video, 
  ShoppingBag, 
  Play, 
  Facebook, 
  Disc, 
  Send, 
  CheckCircle, 
  Tv, 
  ArrowUpRight 
} from 'lucide-react';
import { SOCIAL_LINKS } from '../data/promotions';

export const SocialLinksSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-[#FF4D4D]" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case 'Play':
        return <Play className="w-5 h-5 text-red-500" />;
      case 'Facebook':
        return <Facebook className="w-5 h-5 text-blue-400" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-indigo-400" />;
      case 'Send':
        return <Send className="w-5 h-5 text-sky-400" />;
      case 'CheckCircle':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'Tv':
      default:
        return <Tv className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="py-20 relative bg-[#08080a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest text-[#FF4D4D] uppercase mb-2">
            ECOSYSTEM & CHANNELS
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
            OFFICIAL SOCIAL & NETWORK LINKS
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Connect directly across all verified platforms belonging to the Mex Tanim Esports Organisation.
          </p>
        </div>

        {/* 9 Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-[#E50914]/40 hover:bg-[#14141c] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E50914]/15"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(link.icon)}
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                      {link.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-[#FF4D4D] uppercase tracking-wider mb-1">
                  {link.platform}
                </div>

                <h3 className="text-base font-heading font-bold text-white group-hover:text-[#FF4D4D] transition-colors mb-2">
                  {link.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {link.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-heading font-bold text-neutral-400 group-hover:text-white transition-colors">
                <span>Open Channel</span>
                <ArrowUpRight className="w-4 h-4 text-[#E50914] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
