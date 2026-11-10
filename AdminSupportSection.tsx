import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Gamepad2, 
  ExternalLink,
  Clock,
  UserCheck
} from 'lucide-react';
import { ADMIN_TEAMS, BRAND_CONFIG } from '../data/promotions';

export const AdminSupportSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daytime' | 'night' | 'management' | 'hosts'>('daytime');

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  const getWhatsAppLink = (phone: string, roleName: string) => {
    const clean = getCleanPhone(phone);
    const intl = clean.startsWith('88') ? clean : `88${clean}`;
    const text = `Hello ${roleName}! I am contacting you regarding Mex Tanim Official Promotion booking & support.`;
    return `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="support" className="py-20 relative bg-[#0a0a0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest text-[#FF4D4D] uppercase mb-2">
            24/7 DEDICATED ESPORTS OPERATIONS
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
            CONTACT & ADMIN SUPPORT
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Reach out to our specialized booking coordinators, night-shift tournament managers, and executive leadership.
          </p>

          {/* Department Filter Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('daytime')}
              className={`px-4 py-2 text-xs font-heading font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'daytime'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Daytime (10 AM – 8 PM)</span>
            </button>
            <button
              onClick={() => setActiveTab('night')}
              className={`px-4 py-2 text-xs font-heading font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'night'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night Support (8 PM – Night)</span>
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`px-4 py-2 text-xs font-heading font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'management'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Management & Problems</span>
            </button>
            <button
              onClick={() => setActiveTab('hosts')}
              className={`px-4 py-2 text-xs font-heading font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'hosts'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Room Hosts & Scrims</span>
            </button>
          </div>
        </div>

        {/* Primary WhatsApp Spotlight Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-gradient-to-r from-[#1b0d10] via-[#14141a] to-[#121216] border border-[#E50914]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-[#E50914]/15">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                PRIMARY OFFICIAL PROMOTION HELPLINE
              </div>
              <div className="text-lg sm:text-xl font-heading font-black text-white">
                {BRAND_CONFIG.primaryWhatsApp}
              </div>
              <div className="text-xs text-neutral-400">
                Direct WhatsApp contact for priority booking, verification, and partnerships
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${BRAND_CONFIG.primaryWhatsAppInternational}?text=${encodeURIComponent('Hello Mex Tanim Official Promotion! I would like to book or inquire about a promotion.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Chat on WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contact Cards Grid based on active Tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ADMIN_TEAMS[activeTab].map((admin, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-[#E50914]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#FF4D4D] uppercase tracking-wider">
                    {admin.role}
                  </span>
                  {admin.timing && (
                    <span className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{admin.timing}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {admin.name}
                </h3>

                {admin.notes && (
                  <p className="text-xs text-neutral-400 mb-4 bg-white/5 p-2 rounded-lg border border-white/5">
                    {admin.notes}
                  </p>
                )}

                {/* Phone Numbers List */}
                <div className="space-y-2 mt-4">
                  {admin.phones.map((phone, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-200">
                        <Phone className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>{phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${getCleanPhone(phone)}`}
                          title="Call"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                        <a
                          href={getWhatsAppLink(phone, admin.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-400 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {admin.facebookUrl && (
                <div className="mt-5 pt-3 border-t border-white/5">
                  <a
                    href={admin.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-[#FF4D4D] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Official Facebook Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
