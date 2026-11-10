import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { CalendarMonthSchedule, buildWhatsAppBookingUrl } from '../data/promotions';

interface CalendarSectionProps {
  schedules: CalendarMonthSchedule[];
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  onProceedToBooking: () => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  schedules,
  selectedDate,
  onSelectDate,
  onProceedToBooking,
}) => {
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);

  const currentSchedule = schedules[activeMonthIndex] || schedules[0];
  const year = currentSchedule.year;
  const month = currentSchedule.month; // 0-indexed

  // Calculate day details for current month
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isAvailable = (day: number) => {
    if (currentSchedule.allOpen) {
      return !currentSchedule.bookedDates.includes(day);
    }
    return currentSchedule.availableDates.includes(day);
  };

  const isBooked = (day: number) => {
    if (currentSchedule.allOpen) {
      return currentSchedule.bookedDates.includes(day);
    }
    return currentSchedule.bookedDates.includes(day) || (!currentSchedule.availableDates.includes(day));
  };

  const formatDateString = (day: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${day} ${monthNames[month]} ${year}`;
  };

  return (
    <section id="calendar" className="py-20 relative bg-[#08080a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#FF4D4D] text-xs font-bold tracking-widest uppercase mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>LIVE AVAILABILITY SCHEDULE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            PROMOTION BOOKING CALENDAR
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Check real-time slot openings. Choose an available release date to lock in your tournament promotion.
          </p>
        </div>

        {/* Month Selector & Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveMonthIndex(Math.max(0, activeMonthIndex - 1))}
                disabled={activeMonthIndex === 0}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-lg sm:text-xl font-heading font-bold text-white px-2">
                {currentSchedule.monthName}
              </div>
              <button
                onClick={() => setActiveMonthIndex(Math.min(schedules.length - 1, activeMonthIndex + 1))}
                disabled={activeMonthIndex === schedules.length - 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Status Legend */}
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <span className="text-emerald-400 font-semibold">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600 shadow-sm shadow-rose-600/50" />
                <span className="text-rose-400 font-semibold">Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-neutral-600" />
                <span className="text-neutral-400">Unavailable</span>
              </div>
            </div>
          </div>

          {/* Special Prominent Announcement for December */}
          {currentSchedule.allOpen && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-[#101915] to-emerald-950/60 border border-emerald-500/30 flex items-center gap-3 text-emerald-200">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider">
                DECEMBER PROMOTION BOOKINGS ARE NOW OPEN! Reserve your tournament dates early.
              </div>
            </div>
          )}

          {/* Notice for November limited slots */}
          {!currentSchedule.allOpen && currentSchedule.note && (
            <div className="mt-4 p-4 rounded-xl bg-[#161214] border border-[#E50914]/30 flex items-center gap-3 text-neutral-300">
              <AlertCircle className="w-5 h-5 text-[#FF4D4D] shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white uppercase mr-1">November Status:</span>
                Only 12, 19, and 26 November 2026 are currently available. All other dates are already booked!
              </div>
            </div>
          )}
        </div>

        {/* Interactive Calendar Grid */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-4 sm:p-7 border border-white/10 shadow-2xl">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-3 text-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-xs font-heading font-bold text-neutral-400 uppercase tracking-wider py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty padding cells for start of month */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-14 sm:h-20 rounded-xl bg-white/[0.02] border border-transparent" />
            ))}

            {/* Month Day Cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = formatDateString(day);
              const available = isAvailable(day);
              const booked = isBooked(day);
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={!available}
                  onClick={() => onSelectDate(dateStr)}
                  className={`h-14 sm:h-20 rounded-xl p-1.5 sm:p-2 text-left flex flex-col justify-between transition-all duration-200 relative group ${
                    isSelected
                      ? 'ring-2 ring-[#E50914] bg-emerald-950/60 border-emerald-500 scale-[1.03] shadow-lg shadow-[#E50914]/30'
                      : available
                      ? 'bg-emerald-950/20 hover:bg-emerald-900/40 border border-emerald-500/40 hover:border-emerald-400 cursor-pointer hover:scale-[1.02]'
                      : 'bg-rose-950/15 border border-rose-900/30 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs sm:text-sm font-heading font-bold tabular-nums ${
                      available ? 'text-white' : 'text-neutral-400'
                    }`}>
                      {day}
                    </span>
                    {available ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500/70" />
                    )}
                  </div>

                  <div className="text-[10px] sm:text-xs font-semibold leading-tight">
                    {available ? (
                      <span className="text-emerald-400 block truncate">
                        {isSelected ? 'Selected' : 'Open'}
                      </span>
                    ) : (
                      <span className="text-rose-400/80 block truncate">
                        Booked
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Date CTA Bar */}
          {selectedDate ? (
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-[#1f1013] via-[#161214] to-[#121216] border border-[#E50914]/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase font-semibold">
                    Selected Promotion Date:
                  </div>
                  <div className="text-base sm:text-lg font-heading font-bold text-white">
                    {selectedDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onSelectDate('')}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={onProceedToBooking}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E50914] to-[#B20710] hover:from-[#FF1E27] hover:to-[#E50914] shadow-lg shadow-[#E50914]/30 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Book for {selectedDate}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FF4D4D]" />
              <span>Click on any green date above to attach it to your WhatsApp booking request.</span>
            </div>
          )}

          {/* Administrative Notice */}
          <div className="mt-6 text-[11px] text-neutral-500 text-center leading-relaxed">
            Notice: All date selections are subject to final administrative confirmation upon payment verification. Clicking a date reserves a draft inquiry and does not publicly alter the slot until confirmed by Mex Tanim Gaming.
          </div>
        </div>
      </div>
    </section>
  );
};
