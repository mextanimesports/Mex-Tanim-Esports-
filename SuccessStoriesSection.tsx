import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Eye, 
  Users, 
  Clock, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Gamepad2
} from 'lucide-react';
import { PromotionPackage } from '../data/promotions';

interface SuccessStory {
  id: string;
  category: 'championship' | 'clan' | 'app';
  categoryLabel: string;
  title: string;
  organizer: string;
  packageUsed: string;
  packageId: number;
  viewsCount: number;
  membersJoined: number;
  timeToFill: string;
  durationDays: number;
  videoCount: number;
  summary: string;
  highlights: string[];
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    category: 'championship',
    categoryLabel: 'Major Tournament',
    title: 'Free Fire Premier Duo Championship S4',
    organizer: 'Vortex Esports BD',
    packageUsed: 'PACKAGE 10 — ULTIMATE',
    packageId: 10,
    viewsCount: 24500,
    membersJoined: 940,
    timeToFill: '48 Squads in 22 Hours',
    durationDays: 10,
    videoCount: 10,
    summary: 'Full viral campaign across 10 TikTok video releases with SG Server Drone Room host spotlight and persistent WhatsApp channel coordination.',
    highlights: [
      '100% Tournament slots filled before scheduled deadline',
      'Over 940 active competitive players joined registration hub',
      'T1 Teams & V-Badge verified roster participation'
    ]
  },
  {
    id: 'story-2',
    category: 'championship',
    categoryLabel: 'Scrims Circuit',
    title: 'Daily Tier-1 & Tier-2 Scrims League',
    organizer: 'Delta Scrims Hub',
    packageUsed: 'PACKAGE 08 — ULTRA',
    packageId: 8,
    viewsCount: 19800,
    membersJoined: 780,
    timeToFill: '12 Slots / Day Filled',
    durationDays: 8,
    videoCount: 8,
    summary: '8-day promotional blitz targeting dedicated Free Fire scrimmers, point maker integrations, and custom room announcements.',
    highlights: [
      'Filled 6 daily scrim slots from 4 PM to 1 AM continuously',
      '780+ competitive gamers joined official WhatsApp coordination',
      'Direct coordination with Mex Tanim room host roster'
    ]
  },
  {
    id: 'story-3',
    category: 'clan',
    categoryLabel: 'Clan & Guild',
    title: 'Falcon Elite Guild Recruitment Drive',
    organizer: 'Falcon Esports Community',
    packageUsed: 'PACKAGE 05 — PREMIUM',
    packageId: 5,
    viewsCount: 16200,
    membersJoined: 520,
    timeToFill: 'Full Clan Roster in 3 Days',
    durationDays: 5,
    videoCount: 5,
    summary: 'High-energy 5-day TikTok bio link campaign with custom recruitment teaser videos for regional clan expansion.',
    highlights: [
      '520 verified active applicants processed through bio link',
      'Added 3 competitive squads to national championship qualifiers',
      'Best Value tier delivered optimal engagement velocity'
    ]
  },
  {
    id: 'story-4',
    category: 'app',
    categoryLabel: 'App & Channel',
    title: 'Esports Tournament Platform Launch',
    organizer: 'PlayArena BD App',
    packageUsed: 'PACKAGE 07 — MASTER',
    packageId: 7,
    viewsCount: 18400,
    membersJoined: 710,
    timeToFill: 'App Downloads Spike in 48h',
    durationDays: 7,
    videoCount: 7,
    summary: 'Targeted mobile app walkthroughs demonstrating instant room code delivery, tournament prize withdrawals, and user onboarding.',
    highlights: [
      '710+ direct gamer app downloads tracked from bio link',
      'High conversion rate among daily Free Fire scrim players',
      '7 continuous days of primary TikTok profile placement'
    ]
  }
];

interface SuccessStoriesSectionProps {
  onSelectPackage: (pkgId: number) => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ onSelectPackage }) => {
  const [filter, setFilter] = useState<'all' | 'championship' | 'clan' | 'app'>('all');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counterProgress, setCounterProgress] = useState(0); // 0 to 1
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredStories = SUCCESS_STORIES.filter(
    (story) => filter === 'all' || story.category === filter
  );

  // Intersection observer to animate numbers when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate progress smoothly over 1.2s
          let start: number | null = null;
          const duration = 1200;

          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounterProgress(ease);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      id="success-stories" 
      ref={sectionRef}
      className="py-24 relative bg-[#09090c] border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#FF4D4D] text-xs font-bold tracking-widest uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>PROVEN PROMOTION CAMPAIGNS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            OUR SUCCESS STORIES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Real campaign blueprints showcasing verified player joins, filled tournament brackets, and clan expansions across South Asia.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setFilter('championship')}
              className={`px-3 sm:px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filter === 'championship'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Championships & Scrims
            </button>
            <button
              onClick={() => setFilter('clan')}
              className={`px-3 sm:px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filter === 'clan'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Clans & Guilds
            </button>
            <button
              onClick={() => setFilter('app')}
              className={`px-3 sm:px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
                filter === 'app'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Apps & Channels
            </button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredStories.map((story) => {
            const currentViews = Math.round(story.viewsCount * counterProgress);
            const currentMembers = Math.round(story.membersJoined * counterProgress);

            return (
              <div
                key={story.id}
                className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#E50914]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#E50914]/20"
              >
                <div>
                  {/* Category & Package badge */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono uppercase font-bold text-[#FF4D4D] tracking-wider">
                      {story.categoryLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-300 uppercase">
                      {story.packageUsed}
                    </span>
                  </div>

                  {/* Title & Organizer */}
                  <h3 className="text-xl font-heading font-black text-white group-hover:text-[#FF4D4D] transition-colors leading-snug mb-1">
                    {story.title}
                  </h3>
                  <div className="text-xs text-neutral-400 mb-5 flex items-center gap-1.5">
                    <span>Organizer:</span>
                    <span className="text-white font-semibold">{story.organizer}</span>
                  </div>

                  {/* Dynamic Engagement Counters */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5 p-3.5 rounded-xl bg-black/60 border border-white/5 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 mb-0.5">
                        <Eye className="w-3 h-3 text-[#FF4D4D]" />
                        <span>Reach</span>
                      </div>
                      <div className="text-base sm:text-lg font-heading font-black text-white tabular-nums">
                        {currentViews.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-neutral-500">Video Views</div>
                    </div>

                    <div className="border-x border-white/10 px-1">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 mb-0.5">
                        <Users className="w-3 h-3 text-[#FF4D4D]" />
                        <span>Joined</span>
                      </div>
                      <div className="text-base sm:text-lg font-heading font-black text-[#FF4D4D] tabular-nums">
                        +{currentMembers.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-neutral-500">Group Members</div>
                    </div>

                    <div>
                      <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 mb-0.5">
                        <Clock className="w-3 h-3 text-[#FF4D4D]" />
                        <span>Speed</span>
                      </div>
                      <div className="text-xs sm:text-sm font-heading font-bold text-white leading-tight">
                        {story.timeToFill}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {story.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {story.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[11px] text-neutral-400">
                    <span className="text-white font-mono font-bold">{story.videoCount} Videos</span> · {story.durationDays} Days Bio Link
                  </div>

                  <button
                    onClick={() => onSelectPackage(story.packageId)}
                    className="px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-[#E50914] transition-all flex items-center gap-1.5 group-hover:bg-[#E50914]"
                  >
                    <span>Book Similar Tier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Reminder */}
        <div className="mt-12 text-center text-[11px] text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          Case study engagement benchmarks are representative outcomes observed during past campaigns. Actual member acquisition speed and video views vary based on content appeal, prize pools, and schedule timing.
        </div>
      </div>
    </section>
  );
};
