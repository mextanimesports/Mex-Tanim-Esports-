import React from 'react';
import { 
  Gamepad2, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Flame,
  Radio
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/promotions';

interface RoomSlot {
  id: string;
  time: string;
  roomType: string;
  hostName: string;
  status: 'OPEN' | 'FILLING' | 'LIVE';
  slotsAvailable: number;
  totalSlots: number;
}

const ROOM_SLOTS: RoomSlot[] = [
  {
    id: 'room-1',
    time: '3:00 PM BST',
    roomType: 'V-Badge Special Custom Room (CR)',
    hostName: 'Mushfiq',
    status: 'OPEN',
    slotsAvailable: 4,
    totalSlots: 12
  },
  {
    id: 'room-2',
    time: '7:00 PM BST',
    roomType: 'Mini Scrims Qualify Room',
    hostName: 'Khaled',
    status: 'FILLING',
    slotsAvailable: 2,
    totalSlots: 12
  },
  {
    id: 'room-3',
    time: '8:00 PM BST',
    roomType: 'Tier-1 Scrim & Point Making',
    hostName: 'Tawfa & Zisan',
    status: 'OPEN',
    slotsAvailable: 5,
    totalSlots: 12
  },
  {
    id: 'room-4',
    time: '11:00 PM BST',
    roomType: 'Big Midnight Championship Room',
    hostName: 'Mushfiq + Raza',
    status: 'OPEN',
    slotsAvailable: 6,
    totalSlots: 12
  }
];

interface LiveTournamentsSectionProps {
  onRegisterSlot: (slotInfo: string) => void;
}

export const LiveTournamentsSection: React.FC<LiveTournamentsSectionProps> = ({ onRegisterSlot }) => {
  return (
    <section id="live-rooms" className="py-24 relative bg-[#060608]/90 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D90000]/15 border border-[#D90000]/30 text-[#FF2A35] text-xs font-bold tracking-widest uppercase mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#FF2A35]" />
              <span>DAILY TOURNAMENT SCHEDULE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
              LIVE TOURNAMENTS & ROOMS
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Direct access to daily competitive Free Fire custom rooms coordinated by certified Mex Tanim Esports room hosts and point-makers.
          </p>
        </div>

        {/* Room Slots Schedule Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="divide-y divide-white/5">
            {ROOM_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FF2A35]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-black text-base sm:text-lg text-white">
                        {slot.time}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        slot.status === 'OPEN'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                          : slot.status === 'FILLING'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-950 text-rose-300'
                      }`}>
                        {slot.status === 'OPEN' ? 'Slots Open' : 'Filling Fast'}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-200">
                      {slot.roomType}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Designated Host: <span className="text-white font-mono">{slot.hostName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5">
                  <div className="text-left lg:text-right">
                    <div className="text-[10px] text-neutral-400 uppercase font-semibold">Remaining Slots</div>
                    <div className="text-sm sm:text-base font-heading font-black text-white tabular-nums">
                      {slot.slotsAvailable} <span className="text-xs text-neutral-400 font-normal">/ {slot.totalSlots} Squads</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRegisterSlot(`${slot.time} — ${slot.roomType}`)}
                    className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#D90000] to-[#B20000] hover:from-[#FF2A35] hover:to-[#D90000] shadow-md shadow-[#D90000]/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Reserve Squad Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
