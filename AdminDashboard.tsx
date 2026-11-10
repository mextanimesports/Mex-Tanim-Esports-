import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Package, 
  CreditCard, 
  Settings, 
  FileText, 
  Users, 
  LogOut, 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  MessageSquare, 
  Phone, 
  Save, 
  RotateCcw,
  Menu,
  X,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  FirestoreBooking, 
  FirestorePayment, 
  FirestoreActivityLog, 
  FirestoreWebsiteConfig,
  updateBookingStatus, 
  updateBookingPaymentStatus,
  saveScheduleMonthInFirestore,
  savePackageInFirestore,
  deletePackageInFirestore,
  saveWebsiteConfigInFirestore,
  verifyPaymentInFirestore,
  recordPaymentInFirestore,
  logAdminActivity,
  logoutAdmin
} from '../../firebase/service';
import { 
  PromotionPackage, 
  CalendarMonthSchedule, 
  BRAND_CONFIG 
} from '../../data/promotions';

interface AdminDashboardProps {
  currentUser: User;
  onExitDashboard: () => void;
  packages: PromotionPackage[];
  schedules: CalendarMonthSchedule[];
  bookings: FirestoreBooking[];
  payments: FirestorePayment[];
  activityLogs: FirestoreActivityLog[];
  websiteConfig: FirestoreWebsiteConfig | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onExitDashboard,
  packages,
  schedules,
  bookings,
  payments,
  activityLogs,
  websiteConfig
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'schedules' | 'packages' | 'payments' | 'content' | 'logs'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Booking filters & search
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');

  // Package editor state
  const [editingPkg, setEditingPkg] = useState<PromotionPackage | null>(null);
  const [isCreatingNewPkg, setIsCreatingNewPkg] = useState(false);

  // New package form state
  const [newPkgForm, setNewPkgForm] = useState<Partial<PromotionPackage>>({
    number: `PACKAGE ${packages.length + 1 < 10 ? `0${packages.length + 1}` : packages.length + 1}`,
    name: 'CUSTOM PRO TIER',
    price: 3500,
    videos: 6,
    bioLinkDays: 6,
    benefits: ['Best Quality Promotion', 'Mex Tanim Gaming Support']
  });
  const [newBenefitInput, setNewBenefitInput] = useState('');

  // Website Config Form State
  const [configForm, setConfigForm] = useState<FirestoreWebsiteConfig>(websiteConfig || {
    brandName: BRAND_CONFIG.brandName,
    tagline: BRAND_CONFIG.tagline,
    description: BRAND_CONFIG.description,
    slogan: BRAND_CONFIG.slogan,
    primaryWhatsApp: BRAND_CONFIG.primaryWhatsApp,
    paymentNumber1: "01611657757",
    paymentNumber2: "01671961399",
  });
  const [configSaved, setConfigSaved] = useState(false);

  // Schedule month selector in admin
  const [adminMonthIdx, setAdminMonthIdx] = useState(0);

  // Manual payment entry modal
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentForm, setNewPaymentForm] = useState({
    customerName: '',
    whatsappNumber: '',
    amount: 1000,
    method: 'bKash',
    trxId: '',
    bookingId: ''
  });

  // Derived KPI Stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const rejectedBookings = bookings.filter(b => b.status === 'rejected').length;

  const totalConfirmedRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (b.price || 0), 0);

  const totalAvailableDates = schedules.reduce((sum, s) => sum + (s.availableDates?.length || 0), 0);

  // Handle Booking Status Update
  const handleUpdateBookingStatus = async (booking: FirestoreBooking, newStatus: FirestoreBooking['status']) => {
    try {
      await updateBookingStatus(booking.id, newStatus, booking.requestedDate);
      await logAdminActivity(
        `Updated booking ${booking.id} status to ${newStatus}`,
        `Customer: ${booking.customerName} (${booking.packageName})`,
        currentUser.email || 'Admin'
      );
    } catch (e) {
      console.error(e);
      alert("Failed to update booking status.");
    }
  };

  // Handle Calendar Date Toggle
  const handleToggleScheduleDate = async (sched: CalendarMonthSchedule, day: number) => {
    try {
      const isCurrentlyAvail = sched.availableDates.includes(day);
      let updatedAvail = [...(sched.availableDates || [])];
      let updatedBooked = [...(sched.bookedDates || [])];

      if (isCurrentlyAvail) {
        updatedAvail = updatedAvail.filter(d => d !== day);
        if (!updatedBooked.includes(day)) {
          updatedBooked.push(day);
          updatedBooked.sort((a, b) => a - b);
        }
      } else {
        updatedBooked = updatedBooked.filter(d => d !== day);
        if (!updatedAvail.includes(day)) {
          updatedAvail.push(day);
          updatedAvail.sort((a, b) => a - b);
        }
      }

      const updatedSchedule: CalendarMonthSchedule = {
        ...sched,
        availableDates: updatedAvail,
        bookedDates: updatedBooked
      };

      await saveScheduleMonthInFirestore(updatedSchedule);
      await logAdminActivity(
        `Toggled date ${day} in ${sched.monthName}`,
        isCurrentlyAvail ? 'Marked as Booked' : 'Marked as Available',
        currentUser.email || 'Admin'
      );
    } catch (e) {
      console.error(e);
      alert("Failed to toggle schedule date.");
    }
  };

  // Handle Package Save
  const handleSavePackage = async (pkg: PromotionPackage) => {
    try {
      await savePackageInFirestore(pkg);
      setEditingPkg(null);
      await logAdminActivity(
        `Updated package ${pkg.number}`,
        `Price: ৳${pkg.price}, Videos: ${pkg.videos}`,
        currentUser.email || 'Admin'
      );
    } catch (e) {
      console.error(e);
      alert("Failed to save package.");
    }
  };

  // Handle Create Package
  const handleCreatePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
      const fullPkg: PromotionPackage = {
        id: newId,
        number: newPkgForm.number || `PACKAGE ${newId}`,
        name: newPkgForm.name || 'NEW TIER',
        price: Number(newPkgForm.price) || 2000,
        videos: Number(newPkgForm.videos) || 3,
        bioLinkDays: Number(newPkgForm.bioLinkDays) || 3,
        badge: newPkgForm.badge,
        benefits: newPkgForm.benefits || ['Best Quality Promotion']
      };
      await savePackageInFirestore(fullPkg);
      setIsCreatingNewPkg(false);
      await logAdminActivity(`Created new package ${fullPkg.name}`, `Price: ৳${fullPkg.price}`, currentUser.email || 'Admin');
    } catch (e) {
      console.error(e);
      alert("Failed to create package.");
    }
  };

  // Handle Website Config Save
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveWebsiteConfigInFirestore(configForm);
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3000);
      await logAdminActivity(`Updated website general configuration`, `Brand & Contact info`, currentUser.email || 'Admin');
    } catch (e) {
      console.error(e);
      alert("Failed to save configuration.");
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.customerName?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.whatsappNumber?.includes(bookingSearch) ||
      b.packageName?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.orgName?.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0e0e12] border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <img src={BRAND_CONFIG.logoUrl} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-heading font-black text-sm text-white uppercase">
            MEX TANIM ADMIN
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onExitDashboard}
            className="p-1.5 rounded-lg bg-white/5 text-neutral-300 text-xs flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/10 text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0a0a0d] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-[#E50914] to-black flex items-center justify-center">
              <img src={BRAND_CONFIG.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="font-heading font-black text-sm text-white uppercase tracking-wider">
                MEX TANIM ESPORTS
              </div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Private Console</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs">
            <button
              onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('bookings'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Bookings</span>
              </div>
              {pendingBookings > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black font-black text-[10px]">
                  {pendingBookings}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('schedules'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'schedules'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Schedules</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('packages'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'packages'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>10 Packages</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('payments'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'payments'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Payments</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('content'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'content'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Website Content</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('logs'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'logs'
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4" />
                <span>Audit Logs</span>
              </div>
            </button>
          </nav>
        </div>

        {/* User Info & Exit */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="p-3 rounded-xl bg-white/5 text-[11px] text-neutral-300">
            <div className="font-semibold text-white truncate">{currentUser.email}</div>
            <div className="text-neutral-500 font-mono text-[10px] mt-0.5">Role: Super Admin</div>
          </div>

          <button
            onClick={onExitDashboard}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>

          <button
            onClick={async () => {
              await logoutAdmin();
              onExitDashboard();
            }}
            className="w-full py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-8">
        {/* Top bar with breadcrumb & public toggle */}
        <div className="hidden md:flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight">
              {activeTab === 'overview' && 'SYSTEM DASHBOARD OVERVIEW'}
              {activeTab === 'bookings' && 'CUSTOMER BOOKING MANAGEMENT'}
              {activeTab === 'schedules' && 'PROMOTION SCHEDULE MANAGEMENT'}
              {activeTab === 'packages' && 'PROMOTION PACKAGES & PRICING'}
              {activeTab === 'payments' && 'PAYMENT VERIFICATION & RECORDS'}
              {activeTab === 'content' && 'WEBSITE CONTENT & BRAND SETTINGS'}
              {activeTab === 'logs' && 'ADMINISTRATIVE ACTIVITY AUDIT LOG'}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Mex Tanim Official Promotion · Cloud Firestore Synchronized
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitDashboard}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-heading font-bold uppercase tracking-wider text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/5">
                <div className="text-xs font-mono uppercase text-neutral-400 mb-1">Total Bookings</div>
                <div className="text-3xl font-heading font-black text-white tabular-nums">
                  {totalBookings}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Recorded in database</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-950/10">
                <div className="text-xs font-mono uppercase text-amber-400 mb-1">Pending Approval</div>
                <div className="text-3xl font-heading font-black text-amber-400 tabular-nums">
                  {pendingBookings}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">Action required</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10">
                <div className="text-xs font-mono uppercase text-emerald-400 mb-1">Confirmed / Active</div>
                <div className="text-3xl font-heading font-black text-emerald-400 tabular-nums">
                  {confirmedBookings}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">{completedBookings} Completed</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-[#E50914]/40 bg-[#160b0d]">
                <div className="text-xs font-mono uppercase text-[#FF4D4D] mb-1">Confirmed Revenue</div>
                <div className="text-3xl font-heading font-black text-white tabular-nums">
                  ৳{totalConfirmedRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">Bangladeshi Taka (BDT)</div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-[#FF4D4D]">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-heading font-bold text-base text-white uppercase">Calendar Availability</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Currently {totalAvailableDates} open slots configured across active monthly schedules.
                </p>
                <button
                  onClick={() => setActiveTab('schedules')}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E50914] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                >
                  Manage Schedules
                </button>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-[#FF4D4D]">
                  <Package className="w-5 h-5" />
                  <h3 className="font-heading font-bold text-base text-white uppercase">Package Pricing</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  10 active promotion tiers loaded. Update prices, video counts, or bio link duration.
                </p>
                <button
                  onClick={() => setActiveTab('packages')}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E50914] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                >
                  Edit 10 Packages
                </button>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-[#FF4D4D]">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="font-heading font-bold text-base text-white uppercase">Payment Accounts</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Official accounts: 01611657757 & 01671961399. Verify customer transactions.
                </p>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E50914] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                >
                  Verify Payments
                </button>
              </div>
            </div>

            {/* Recent Bookings Stream */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-base text-white uppercase">
                  Recent Booking Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-[#FF4D4D] hover:underline"
                >
                  View All ({bookings.length}) →
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  No bookings received yet. Customer bookings submitted on the public website appear here in real-time.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white text-sm">{booking.customerName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            booking.status === 'confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                            booking.status === 'pending' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                            booking.status === 'completed' ? 'bg-blue-950 text-blue-300' : 'bg-rose-950 text-rose-300'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-neutral-400">
                          {booking.packageName} · ৳{booking.price?.toLocaleString()} · Preferred: {booking.requestedDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${booking.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Search customer, phone, package..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-neutral-400">Status:</span>
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#E50914]"
                >
                  <option value="all" className="bg-[#14141a]">All Statuses</option>
                  <option value="pending" className="bg-[#14141a]">Pending</option>
                  <option value="confirmed" className="bg-[#14141a]">Confirmed</option>
                  <option value="completed" className="bg-[#14141a]">Completed</option>
                  <option value="rejected" className="bg-[#14141a]">Rejected</option>
                </select>
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 glass-panel rounded-2xl border border-white/5 text-neutral-400 text-xs">
                No matching bookings found.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-base text-white">{b.customerName}</span>
                          {b.orgName && (
                            <span className="text-xs text-neutral-400">({b.orgName})</span>
                          )}
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            b.status === 'confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                            b.status === 'pending' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                            b.status === 'completed' ? 'bg-blue-950 text-blue-300' : 'bg-rose-950 text-rose-300'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          Booking ID: <span className="font-mono">{b.id}</span> · Submitted {new Date(b.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-heading font-black text-white tabular-nums">
                          ৳{b.price?.toLocaleString()} BDT
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-neutral-400 block mb-0.5">Package Details:</span>
                        <span className="font-bold text-white block">{b.packageName}</span>
                        <span className="text-neutral-400">{b.videoCount} Videos</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-neutral-400 block mb-0.5">Requested Promotion Date:</span>
                        <span className="font-bold text-emerald-400 block">{b.requestedDate || 'Flexible'}</span>
                        <span className="text-neutral-400">Schedule auto-locks on confirm</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-neutral-400 block mb-0.5">Customer WhatsApp:</span>
                        <a
                          href={`https://wa.me/${b.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-white hover:text-emerald-400 flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{b.whatsappNumber}</span>
                        </a>
                      </div>
                    </div>

                    {b.notes && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-neutral-300">
                        <span className="font-bold text-neutral-400 block mb-0.5">Tournament Notes:</span>
                        {b.notes}
                      </div>
                    )}

                    {/* Admin Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">Change Status:</span>
                        <button
                          onClick={() => handleUpdateBookingStatus(b, 'confirmed')}
                          disabled={b.status === 'confirmed'}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs uppercase transition-colors"
                        >
                          Approve & Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b, 'completed')}
                          disabled={b.status === 'completed'}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs uppercase transition-colors"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b, 'rejected')}
                          disabled={b.status === 'rejected'}
                          className="px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 disabled:opacity-40 text-rose-200 font-bold text-xs uppercase transition-colors"
                        >
                          Reject
                        </button>
                      </div>

                      <a
                        href={`https://wa.me/${b.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.customerName}! This is Mex Tanim Official Promotion management regarding your booking for ${b.packageName}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Customer</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SCHEDULES */}
        {activeTab === 'schedules' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-base text-white uppercase">
                  Live Calendar Date Availability Control
                </h3>
                <p className="text-xs text-neutral-400">
                  Click any date below to toggle between Available (Green) and Booked (Red). Changes instantly sync to the public customer calendar!
                </p>
              </div>

              {/* Month selector */}
              <div className="flex items-center gap-2">
                {schedules.map((s, idx) => (
                  <button
                    key={s.monthName}
                    onClick={() => setAdminMonthIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase transition-colors ${
                      adminMonthIdx === idx
                        ? 'bg-[#E50914] text-white'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {s.monthName}
                  </button>
                ))}
              </div>
            </div>

            {schedules[adminMonthIdx] && (
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-black text-lg text-white uppercase">
                    {schedules[adminMonthIdx].monthName}
                  </h4>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-emerald-400">
                      {schedules[adminMonthIdx].availableDates?.length || 0} Open
                    </span>
                    <span className="text-rose-400">
                      {schedules[adminMonthIdx].bookedDates?.length || 0} Booked
                    </span>
                  </div>
                </div>

                {/* Interactive Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }).map((_, i) => {
                    const day = i + 1;
                    const sched = schedules[adminMonthIdx];
                    const isAvail = sched.availableDates?.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleToggleScheduleDate(sched, day)}
                        className={`p-3 rounded-xl text-center flex flex-col items-center justify-between transition-all duration-200 border ${
                          isAvail
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/60'
                            : 'bg-rose-950/30 border-rose-900/40 text-rose-300 hover:bg-rose-900/40'
                        }`}
                      >
                        <span className="text-sm font-heading font-bold">{day}</span>
                        <span className="text-[10px] font-mono mt-1 font-bold">
                          {isAvail ? 'AVAILABLE' : 'BOOKED'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-white uppercase">
                  Manage 10 Promotion Packages
                </h3>
                <p className="text-xs text-neutral-400">
                  Update package pricing, video counts, bio link durations, and benefits in real-time.
                </p>
              </div>

              <button
                onClick={() => setIsCreatingNewPkg(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E50914] to-[#B20710] text-white text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Package</span>
              </button>
            </div>

            {/* Create package modal */}
            {isCreatingNewPkg && (
              <form onSubmit={handleCreatePackageSubmit} className="glass-panel p-6 rounded-2xl border border-[#E50914]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-white text-sm uppercase">Create New Package Tier</h4>
                  <button type="button" onClick={() => setIsCreatingNewPkg(false)} className="text-neutral-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1">Package Number:</label>
                    <input
                      type="text"
                      required
                      value={newPkgForm.number}
                      onChange={(e) => setNewPkgForm({ ...newPkgForm, number: e.target.value })}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Tier Name:</label>
                    <input
                      type="text"
                      required
                      value={newPkgForm.name}
                      onChange={(e) => setNewPkgForm({ ...newPkgForm, name: e.target.value })}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Price (৳ BDT):</label>
                    <input
                      type="number"
                      required
                      value={newPkgForm.price}
                      onChange={(e) => setNewPkgForm({ ...newPkgForm, price: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Videos:</label>
                    <input
                      type="number"
                      required
                      value={newPkgForm.videos}
                      onChange={(e) => setNewPkgForm({ ...newPkgForm, videos: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsCreatingNewPkg(false)} className="px-4 py-1.5 rounded-lg text-xs text-neutral-400">Cancel</button>
                  <button type="submit" className="px-5 py-1.5 rounded-lg bg-[#E50914] text-white text-xs font-bold uppercase">Save Tier</button>
                </div>
              </form>
            )}

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg) => {
                const isEditing = editingPkg?.id === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
                  >
                    {isEditing ? (
                      <div className="space-y-3 text-xs">
                        <div className="font-heading font-bold text-white text-sm">{pkg.number} Editor</div>
                        <div>
                          <label className="text-neutral-400 block mb-0.5">Tier Name:</label>
                          <input
                            type="text"
                            value={editingPkg.name}
                            onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                            className="w-full p-2 rounded bg-black/60 border border-white/10 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-neutral-400 block mb-0.5">Price (৳):</label>
                            <input
                              type="number"
                              value={editingPkg.price}
                              onChange={(e) => setEditingPkg({ ...editingPkg, price: Number(e.target.value) })}
                              className="w-full p-2 rounded bg-black/60 border border-white/10 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-neutral-400 block mb-0.5">Videos:</label>
                            <input
                              type="number"
                              value={editingPkg.videos}
                              onChange={(e) => setEditingPkg({ ...editingPkg, videos: Number(e.target.value) })}
                              className="w-full p-2 rounded bg-black/60 border border-white/10 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-neutral-400 block mb-0.5">Bio Days:</label>
                            <input
                              type="number"
                              value={editingPkg.bioLinkDays}
                              onChange={(e) => setEditingPkg({ ...editingPkg, bioLinkDays: Number(e.target.value) })}
                              className="w-full p-2 rounded bg-black/60 border border-white/10 text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                          <button onClick={() => setEditingPkg(null)} className="px-3 py-1 rounded text-neutral-400">Cancel</button>
                          <button onClick={() => handleSavePackage(editingPkg)} className="px-4 py-1.5 rounded bg-emerald-600 text-white font-bold">Save</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                            <span>{pkg.number}</span>
                            {pkg.badge && (
                              <span className="text-[10px] bg-[#E50914] text-white px-2 py-0.5 rounded font-bold">
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-heading font-black text-white uppercase">{pkg.name}</h4>
                          <div className="text-2xl font-heading font-black text-[#FF4D4D] tabular-nums mt-1 mb-3">
                            ৳{pkg.price?.toLocaleString()} BDT
                          </div>

                          <div className="text-xs text-neutral-300 space-y-1 mb-4">
                            <div>• {pkg.videos} Promotional Videos</div>
                            <div>• {pkg.bioLinkDays} Days TikTok Bio Link</div>
                            <div className="text-neutral-500">• {pkg.benefits?.length || 0} Included Benefits</div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                          <button
                            onClick={() => setEditingPkg(pkg)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Tier</span>
                          </button>
                          <span className="text-[11px] text-emerald-400">Live on Website</span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-base text-white uppercase">
                  Payment Verification Records
                </h3>
                <p className="text-xs text-neutral-400">
                  Verify customer transaction IDs (TrxID) for bKash, Nagad, and Rocket before locking schedules.
                </p>
              </div>

              <button
                onClick={() => setShowAddPaymentModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Record Manual Payment</span>
              </button>
            </div>

            {/* Manual Payment Entry Modal */}
            {showAddPaymentModal && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await recordPaymentInFirestore({
                      customerName: newPaymentForm.customerName,
                      whatsappNumber: newPaymentForm.whatsappNumber,
                      amount: Number(newPaymentForm.amount),
                      method: newPaymentForm.method,
                      trxId: newPaymentForm.trxId,
                      status: 'verified',
                      verifiedBy: currentUser.email || 'Admin',
                      verifiedAt: new Date().toISOString()
                    });
                    setShowAddPaymentModal(false);
                    await logAdminActivity(`Recorded payment of ৳${newPaymentForm.amount}`, `TrxID: ${newPaymentForm.trxId}`, currentUser.email || 'Admin');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="glass-panel p-6 rounded-2xl border border-emerald-500/40 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-white text-sm uppercase">Record Payment Transaction</h4>
                  <button type="button" onClick={() => setShowAddPaymentModal(false)} className="text-neutral-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1">Customer Name:</label>
                    <input
                      type="text"
                      required
                      value={newPaymentForm.customerName}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, customerName: e.target.value })}
                      className="w-full p-2 rounded bg-black/60 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">WhatsApp Number:</label>
                    <input
                      type="text"
                      required
                      value={newPaymentForm.whatsappNumber}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, whatsappNumber: e.target.value })}
                      className="w-full p-2 rounded bg-black/60 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Amount (৳ BDT):</label>
                    <input
                      type="number"
                      required
                      value={newPaymentForm.amount}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, amount: Number(e.target.value) })}
                      className="w-full p-2 rounded bg-black/60 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Method:</label>
                    <select
                      value={newPaymentForm.method}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, method: e.target.value })}
                      className="w-full p-2 rounded bg-black/60 border border-white/10 text-white"
                    >
                      <option value="bKash">bKash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="Rocket">Rocket</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-400 mb-1">Transaction ID (TrxID):</label>
                    <input
                      type="text"
                      required
                      value={newPaymentForm.trxId}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, trxId: e.target.value })}
                      placeholder="e.g. BL489KLO9P"
                      className="w-full p-2 rounded bg-black/60 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowAddPaymentModal(false)} className="px-4 py-1.5 rounded text-xs text-neutral-400">Cancel</button>
                  <button type="submit" className="px-5 py-1.5 rounded bg-emerald-600 text-white text-xs font-bold uppercase">Record & Verify</button>
                </div>
              </form>
            )}

            {/* Payments List */}
            {payments.length === 0 ? (
              <div className="text-center py-16 glass-panel rounded-2xl border border-white/5 text-neutral-400 text-xs">
                No payment transactions recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">{p.customerName}</span>
                        <span className="text-neutral-400">({p.whatsappNumber})</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          p.status === 'verified' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="text-neutral-400">
                        Method: <span className="text-white font-bold">{p.method}</span> · TrxID: <span className="font-mono text-[#FF4D4D]">{p.trxId}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-base font-heading font-black text-white tabular-nums">
                        ৳{p.amount?.toLocaleString()} BDT
                      </div>
                      {p.status !== 'verified' && (
                        <button
                          onClick={async () => {
                            await verifyPaymentInFirestore(p.id, 'verified', currentUser.email || 'Admin');
                          }}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: WEBSITE CONTENT */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveConfig} className="space-y-6 max-w-4xl animate-in fade-in duration-200">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-white uppercase">
                Brand & Public Display Information
              </h3>

              {configSaved && (
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Website content updated and broadcast to public site in real-time!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Brand Name:</label>
                  <input
                    type="text"
                    required
                    value={configForm.brandName}
                    onChange={(e) => setConfigForm({ ...configForm, brandName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Tagline:</label>
                  <input
                    type="text"
                    required
                    value={configForm.tagline}
                    onChange={(e) => setConfigForm({ ...configForm, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1">Brand Slogan (Executive Credo):</label>
                  <input
                    type="text"
                    required
                    value={configForm.slogan}
                    onChange={(e) => setConfigForm({ ...configForm, slogan: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1">Public Description:</label>
                  <textarea
                    rows={2}
                    value={configForm.description}
                    onChange={(e) => setConfigForm({ ...configForm, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Primary WhatsApp Helpline:</label>
                  <input
                    type="text"
                    required
                    value={configForm.primaryWhatsApp}
                    onChange={(e) => setConfigForm({ ...configForm, primaryWhatsApp: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Payment Account 1:</label>
                  <input
                    type="text"
                    required
                    value={configForm.paymentNumber1}
                    onChange={(e) => setConfigForm({ ...configForm, paymentNumber1: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Payment Account 2 (Primary):</label>
                  <input
                    type="text"
                    required
                    value={configForm.paymentNumber2}
                    onChange={(e) => setConfigForm({ ...configForm, paymentNumber2: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E50914] to-[#B20710] hover:from-[#FF1E27] hover:to-[#E50914] shadow-lg shadow-[#E50914]/30 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand Settings</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 7: ACTIVITY LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="font-heading font-bold text-base text-white uppercase">
              Immutable Admin Activity Audit Trail
            </h3>

            {activityLogs.length === 0 ? (
              <div className="text-center py-12 glass-panel rounded-2xl border border-white/5 text-neutral-400 text-xs">
                No activity logs recorded yet.
              </div>
            ) : (
              <div className="space-y-2">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{log.action}</span>
                      <span className="text-neutral-400 ml-2">— {log.details}</span>
                      <div className="text-[11px] text-neutral-500 mt-0.5">By: {log.adminEmail}</div>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {new Date(log.timestamp).toLocaleTimeString()} · {new Date(log.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
