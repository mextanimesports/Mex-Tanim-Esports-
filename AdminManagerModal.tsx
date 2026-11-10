import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  SlidersHorizontal, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Package, 
  CreditCard,
  FileCode,
  ShieldAlert
} from 'lucide-react';
import { 
  PromotionPackage, 
  CalendarMonthSchedule, 
  saveStoredPackages, 
  saveStoredSchedules, 
  resetAllToDefaults,
  INITIAL_PACKAGES,
  INITIAL_SCHEDULES
} from '../data/promotions';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: PromotionPackage[];
  schedules: CalendarMonthSchedule[];
  onUpdatePackages: (newPkgs: PromotionPackage[]) => void;
  onUpdateSchedules: (newScheds: CalendarMonthSchedule[]) => void;
}

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  packages,
  schedules,
  onUpdatePackages,
  onUpdateSchedules
}) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'calendar' | 'export'>('packages');
  const [editablePackages, setEditablePackages] = useState<PromotionPackage[]>(packages);
  const [editableSchedules, setEditableSchedules] = useState<CalendarMonthSchedule[]>(schedules);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePriceChange = (id: number, newPrice: number) => {
    setEditablePackages(prev =>
      prev.map(p => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const handleVideosChange = (id: number, newVideos: number) => {
    setEditablePackages(prev =>
      prev.map(p => (p.id === id ? { ...p, videos: newVideos } : p))
    );
  };

  const handleBioLinkDaysChange = (id: number, newDays: number) => {
    setEditablePackages(prev =>
      prev.map(p => (p.id === id ? { ...p, bioLinkDays: newDays } : p))
    );
  };

  // Toggle calendar date availability
  const toggleDateAvailability = (monthIndex: number, day: number) => {
    setEditableSchedules(prev => {
      const next = [...prev];
      const sched = { ...next[monthIndex] };
      const isCurrentlyAvail = sched.availableDates.includes(day);

      if (isCurrentlyAvail) {
        // Switch to booked
        sched.availableDates = sched.availableDates.filter(d => d !== day);
        if (!sched.bookedDates.includes(day)) {
          sched.bookedDates = [...sched.bookedDates, day].sort((a, b) => a - b);
        }
      } else {
        // Switch to available
        sched.bookedDates = sched.bookedDates.filter(d => d !== day);
        if (!sched.availableDates.includes(day)) {
          sched.availableDates = [...sched.availableDates, day].sort((a, b) => a - b);
        }
      }
      next[monthIndex] = sched;
      return next;
    });
  };

  const handleSaveAll = () => {
    saveStoredPackages(editablePackages);
    saveStoredSchedules(editableSchedules);
    onUpdatePackages(editablePackages);
    onUpdateSchedules(editableSchedules);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all packages and schedules to official defaults?")) {
      resetAllToDefaults();
      setEditablePackages(INITIAL_PACKAGES);
      setEditableSchedules(INITIAL_SCHEDULES);
      onUpdatePackages(INITIAL_PACKAGES);
      onUpdateSchedules(INITIAL_SCHEDULES);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleExportJSON = () => {
    const data = {
      packages: editablePackages,
      schedules: editableSchedules,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mex-tanim-promotion-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0e0e12] border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#14141a] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#FF4D4D]" />
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
                ADMINISTRATION SCHEDULE & PRICE MANAGER
              </h3>
              <p className="text-[11px] text-neutral-400">
                Update prices, videos, bio link durations, and live calendar slots in real-time.
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

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-black/40 border-b border-white/5 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase transition-colors flex items-center gap-1.5 ${
              activeTab === 'packages'
                ? 'bg-[#E50914] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Manage 10 Packages</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase transition-colors flex items-center gap-1.5 ${
              activeTab === 'calendar'
                ? 'bg-[#E50914] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Manage Calendar Dates</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase transition-colors flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-[#E50914] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export / Backup Data</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Configuration successfully saved and synced to your live view!</span>
            </div>
          )}

          {/* TAB 1: PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-3">
              <div className="text-xs text-neutral-400">
                Edit prices in BDT (৳), video counts, or bio link duration for all 10 promotion tiers:
              </div>
              <div className="space-y-2">
                {editablePackages.map(pkg => (
                  <div
                    key={pkg.id}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-mono text-neutral-400 uppercase mr-2">{pkg.number}</span>
                      <span className="font-heading font-bold text-white uppercase text-sm">{pkg.name}</span>
                      {pkg.badge && (
                        <span className="ml-2 text-[10px] bg-[#E50914] text-white px-2 py-0.5 rounded font-bold">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-0.5">Price (৳):</label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) => handlePriceChange(pkg.id, Number(e.target.value))}
                          className="w-24 px-2 py-1 rounded bg-black/60 border border-white/15 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-0.5">Videos:</label>
                        <input
                          type="number"
                          value={pkg.videos}
                          onChange={(e) => handleVideosChange(pkg.id, Number(e.target.value))}
                          className="w-16 px-2 py-1 rounded bg-black/60 border border-white/15 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-0.5">Bio Link Days:</label>
                        <input
                          type="number"
                          value={pkg.bioLinkDays}
                          onChange={(e) => handleBioLinkDaysChange(pkg.id, Number(e.target.value))}
                          className="w-16 px-2 py-1 rounded bg-black/60 border border-white/15 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CALENDAR DATES */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="text-xs text-neutral-400">
                Click on any date to toggle between <span className="text-emerald-400 font-bold">Available (Open)</span> and <span className="text-rose-400 font-bold">Booked</span>:
              </div>

              {editableSchedules.map((monthSched, mIdx) => (
                <div key={monthSched.monthName} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-heading font-bold text-white text-sm">
                      {monthSched.monthName}
                    </h4>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {monthSched.availableDates.length} Open Slots
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 30 }).map((_, d) => {
                      const day = d + 1;
                      const isAvail = monthSched.availableDates.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDateAvailability(mIdx, day)}
                          className={`p-1.5 rounded-lg text-xs font-mono font-bold transition-all text-center ${
                            isAvail
                              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-600/50'
                              : 'bg-rose-900/20 text-rose-300 border border-rose-800/40 hover:bg-rose-900/40'
                          }`}
                        >
                          <div>{day}</div>
                          <div className="text-[9px] font-normal mt-0.5">
                            {isAvail ? 'OPEN' : 'BOOKED'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: EXPORT / BACKUP */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-300">
                <h4 className="font-heading font-bold text-white text-sm mb-1">
                  Centralized Configuration JSON Backup
                </h4>
                <p className="text-neutral-400 mb-3">
                  Download or inspect your active promotion packages, calendar slots, and business rules. You can commit this file or save it to your server storage.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#FF4D4D]" />
                  <span>Download Config JSON File</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/10 flex items-start gap-2.5 text-xs text-neutral-400">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block mb-0.5">Privacy & Identity Protection:</span>
                  Customer NID cards, birth certificates, and personal identity documents are never collected, logged, or exposed. Verification is handled strictly in private channels by authorized administrators.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#14141a] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Official Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E50914] to-[#B20710] hover:from-[#FF1E27] hover:to-[#E50914] shadow-lg shadow-[#E50914]/30 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
