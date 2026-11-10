import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase/config';
import { 
  isAuthorizedAdmin,
  seedInitialDatabaseIfEmpty,
  subscribeToPackages,
  subscribeToSchedules,
  subscribeToWebsiteConfig,
  subscribeToBookings,
  subscribeToPayments,
  subscribeToActivityLogs,
  FirestoreBooking,
  FirestorePayment,
  FirestoreActivityLog,
  FirestoreWebsiteConfig
} from './firebase/service';

import { EsportsScene } from './components/three/EsportsScene';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TournamentShowcase } from './components/TournamentShowcase';
import { EcosystemSection } from './components/EcosystemSection';
import { ChampionsSection } from './components/ChampionsSection';
import { LiveTournamentsSection } from './components/LiveTournamentsSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { ReachSection } from './components/ReachSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { CalendarSection } from './components/CalendarSection';
import { BookingProcessSection } from './components/BookingProcessSection';
import { PaymentSection } from './components/PaymentSection';
import { AdminSupportSection } from './components/AdminSupportSection';
import { SocialLinksSection } from './components/SocialLinksSection';
import { AboutCinematicSection } from './components/AboutCinematicSection';
import { FinalCTASection } from './components/FinalCTASection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';

import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { 
  PromotionPackage, 
  CalendarMonthSchedule, 
  INITIAL_PACKAGES, 
  INITIAL_SCHEDULES 
} from './data/promotions';

export default function App() {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // View state: 'public' or 'admin'
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // 3D Scene Interactive Tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Real-time Firestore synchronized state
  const [packages, setPackages] = useState<PromotionPackage[]>(INITIAL_PACKAGES);
  const [schedules, setSchedules] = useState<CalendarMonthSchedule[]>(INITIAL_SCHEDULES);
  const [websiteConfig, setWebsiteConfig] = useState<FirestoreWebsiteConfig | null>(null);

  // Admin collections state
  const [bookings, setBookings] = useState<FirestoreBooking[]>([]);
  const [payments, setPayments] = useState<FirestorePayment[]>([]);
  const [activityLogs, setActivityLogs] = useState<FirestoreActivityLog[]>([]);

  // Public Booking Modal state
  const [selectedPackage, setSelectedPackage] = useState<PromotionPackage | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // 1. Scroll & Mouse Tracking for 3D Scene
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 ... 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 2. Initialize Auth & Seeding
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      await seedInitialDatabaseIfEmpty();
    });

    return () => unsubAuth();
  }, []);

  // 3. Real-time Public Subscriptions (Packages, Schedules, Config)
  useEffect(() => {
    const unsubPackages = subscribeToPackages((newPkgs) => setPackages(newPkgs));
    const unsubSchedules = subscribeToSchedules((newScheds) => setSchedules(newScheds));
    const unsubConfig = subscribeToWebsiteConfig((cfg) => setWebsiteConfig(cfg));

    return () => {
      unsubPackages();
      unsubSchedules();
      unsubConfig();
    };
  }, []);

  // 4. Real-time Admin Subscriptions (Bookings, Payments, Logs)
  useEffect(() => {
    if (currentUser && isAuthorizedAdmin(currentUser)) {
      const unsubBookings = subscribeToBookings((b) => setBookings(b));
      const unsubPayments = subscribeToPayments((p) => setPayments(p));
      const unsubLogs = subscribeToActivityLogs((l) => setActivityLogs(l));

      return () => {
        unsubBookings();
        unsubPayments();
        unsubLogs();
      };
    }
  }, [currentUser]);

  // Booking handlers
  const handleOpenBooking = (pkg?: PromotionPackage, date?: string) => {
    if (pkg) setSelectedPackage(pkg);
    if (date) setSelectedDate(date);
    setIsBookingOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    const defaultPkg = packages.find(p => p.id === 5) || packages[0];
    setSelectedPackage(defaultPkg);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: PromotionPackage) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const handleProceedFromCalendar = () => {
    setIsBookingOpen(true);
  };

  // Tournament / Live Room Registration Shortcut
  const handleRegisterTournamentSlot = (tournamentTitle: string) => {
    const defaultPkg = packages.find(p => p.id === 5) || packages[0];
    setSelectedPackage(defaultPkg);
    setSelectedDate(`Reserved for ${tournamentTitle}`);
    setIsBookingOpen(true);
  };

  // Admin access handler
  const handleAdminPortalClick = () => {
    if (currentUser && isAuthorizedAdmin(currentUser)) {
      setViewMode('admin');
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  // If user is authenticated as admin and viewMode is 'admin', render the private Admin Dashboard
  if (viewMode === 'admin' && currentUser && isAuthorizedAdmin(currentUser)) {
    return (
      <AdminDashboard
        currentUser={currentUser}
        onExitDashboard={() => setViewMode('public')}
        packages={packages}
        schedules={schedules}
        bookings={bookings}
        payments={payments}
        activityLogs={activityLogs}
        websiteConfig={websiteConfig}
      />
    );
  }

  // Public Cinematic 3D Experience
  return (
    <div className="relative min-h-screen bg-[#060608] text-white selection:bg-[#D90000] selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* 3D WebGL Background Canvas with Scroll and Mouse Kinematics */}
      <EsportsScene scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* Top Bar Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdminConfig={handleAdminPortalClick}
      />

      <main className="relative z-10 flex-1">
        {/* SECTION 01: BRAND INTRO & HERO */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 02: TOURNAMENT EXPERIENCE */}
        <TournamentShowcase onRegisterClick={handleRegisterTournamentSlot} />

        {/* SECTION 03: OUR ECOSYSTEM */}
        <EcosystemSection />

        {/* SECTION 04: CHAMPIONS & HALL OF FAME */}
        <ChampionsSection />

        {/* SECTION 05: LIVE TOURNAMENTS & ROOMS */}
        <LiveTournamentsSection onRegisterSlot={handleRegisterTournamentSlot} />

        {/* Promotion Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 10 Promotion Packages Section (Firestore Synced) */}
        {packages.length > 0 && (
          <PackagesSection 
            packages={packages} 
            onSelectPackage={handleSelectPackage} 
          />
        )}

        {/* Expected Promotion Reach Section */}
        <ReachSection />

        {/* Our Success Stories Section with Animated Counters */}
        <SuccessStoriesSection
          onSelectPackage={(pkgId) => {
            const found = packages.find(p => p.id === pkgId) || packages[0];
            handleSelectPackage(found);
          }}
        />

        {/* Interactive Booking Calendar Section (Firestore Synced) */}
        {schedules.length > 0 && (
          <CalendarSection 
            schedules={schedules}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onProceedToBooking={handleProceedFromCalendar}
          />
        )}

        {/* Standardized Booking Process */}
        <BookingProcessSection />

        {/* Payment Information Section (bKash/Nagad/Rocket) */}
        <PaymentSection onOpenBooking={() => handleOpenBooking()} />

        {/* 24/7 Daytime & Night Support Team */}
        <AdminSupportSection />

        {/* Official Social Links & Community Channels */}
        <SocialLinksSection />

        {/* SECTION 06: ABOUT US & PRODUCTION STUDIO */}
        <AboutCinematicSection />

        {/* SECTION 07: FINAL CTA — CLIMACTIC RED BRANDING */}
        <FinalCTASection onOpenBooking={() => handleOpenBooking()} />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdminConfig={handleAdminPortalClick}
      />

      {/* Floating WhatsApp Contact Button with 10s Inactivity Tooltip */}
      <FloatingWhatsApp onOpenBooking={() => handleOpenBooking()} />

      {/* Customer WhatsApp Booking Modal */}
      {packages.length > 0 && (
        <BookingModal 
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          selectedPackage={selectedPackage}
          selectedDate={selectedDate}
          packages={packages}
        />
      )}

      {/* Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        currentUser={currentUser}
        onEnterDashboard={() => {
          setIsAdminLoginModalOpen(false);
          setViewMode('admin');
        }}
      />
    </div>
  );
}
