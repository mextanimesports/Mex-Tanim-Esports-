import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { db, auth, googleProvider, handleFirestoreError, OperationType } from './config';
import { 
  PromotionPackage, 
  CalendarMonthSchedule, 
  INITIAL_PACKAGES, 
  INITIAL_SCHEDULES, 
  BRAND_CONFIG 
} from '../data/promotions';

export interface FirestoreBooking {
  id: string;
  customerName: string;
  whatsappNumber: string;
  orgName?: string;
  packageId: number;
  packageName: string;
  price: number;
  videoCount: number;
  requestedDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'rejected';
  paymentStatus: 'unpaid' | 'pending' | 'paid' | 'rejected';
  paymentTrxId?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface FirestorePayment {
  id: string;
  bookingId?: string;
  customerName: string;
  whatsappNumber: string;
  amount: number;
  method: string;
  trxId: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
}

export interface FirestoreActivityLog {
  id: string;
  adminEmail: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface FirestoreWebsiteConfig {
  brandName: string;
  tagline: string;
  description: string;
  slogan: string;
  primaryWhatsApp: string;
  paymentNumber1: string;
  paymentNumber2: string;
  updatedAt?: string;
}

// Check admin authorization
export function isAuthorizedAdmin(user: User | null): boolean {
  if (!user) return false;
  const ownerEmail = 'mextanimesports@gmail.com';
  if (user.email && user.email.toLowerCase() === ownerEmail.toLowerCase()) {
    return true;
  }
  return false;
}

// Authentication Helpers
export async function loginWithGoogle(): Promise<User> {
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    return cred.user;
  } catch (error) {
    console.error("Google Auth Error:", error);
    throw error;
  }
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

// Initial Database Seeding
export async function seedInitialDatabaseIfEmpty() {
  try {
    // 1. Seed Packages
    const pkgsSnap = await getDocs(collection(db, 'packages'));
    if (pkgsSnap.empty) {
      console.log("Seeding initial promotion packages to Firestore...");
      for (const pkg of INITIAL_PACKAGES) {
        await setDoc(doc(db, 'packages', `pkg_${pkg.id}`), {
          ...pkg,
          isActive: true,
          updatedAt: new Date().toISOString()
        });
      }
    }

    // 2. Seed Schedules
    const schedSnap = await getDocs(collection(db, 'schedules'));
    if (schedSnap.empty) {
      console.log("Seeding initial schedules to Firestore...");
      for (const sched of INITIAL_SCHEDULES) {
        const docId = `${sched.year}_${sched.month}`;
        await setDoc(doc(db, 'schedules', docId), {
          ...sched,
          id: docId,
          updatedAt: new Date().toISOString()
        });
      }
    }

    // 3. Seed Website Config
    const configDoc = await getDoc(doc(db, 'config', 'general'));
    if (!configDoc.exists()) {
      console.log("Seeding initial website config to Firestore...");
      await setDoc(doc(db, 'config', 'general'), {
        brandName: BRAND_CONFIG.brandName,
        tagline: BRAND_CONFIG.tagline,
        description: BRAND_CONFIG.description,
        slogan: BRAND_CONFIG.slogan,
        primaryWhatsApp: BRAND_CONFIG.primaryWhatsApp,
        paymentNumber1: "01611657757",
        paymentNumber2: "01671961399",
        updatedAt: new Date().toISOString()
      });
    }
  } catch (err) {
    console.warn("Notice: Initial seed check completed or awaiting permissions", err);
  }
}

// Real-Time Subscriptions

export function subscribeToPackages(onUpdate: (pkgs: PromotionPackage[]) => void) {
  const path = 'packages';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(INITIAL_PACKAGES);
        return;
      }
      const list: PromotionPackage[] = [];
      snapshot.forEach((d) => {
        list.push(d.data() as PromotionPackage);
      });
      list.sort((a, b) => a.id - b.id);
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToSchedules(onUpdate: (scheds: CalendarMonthSchedule[]) => void) {
  const path = 'schedules';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(INITIAL_SCHEDULES);
        return;
      }
      const list: CalendarMonthSchedule[] = [];
      snapshot.forEach((d) => {
        list.push(d.data() as CalendarMonthSchedule);
      });
      list.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToWebsiteConfig(onUpdate: (config: FirestoreWebsiteConfig) => void) {
  const path = 'config';
  return onSnapshot(
    doc(db, path, 'general'),
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as FirestoreWebsiteConfig);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `${path}/general`);
    }
  );
}

export function subscribeToBookings(onUpdate: (bookings: FirestoreBooking[]) => void) {
  const path = 'bookings';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const list: FirestoreBooking[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as FirestoreBooking);
      });
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToPayments(onUpdate: (payments: FirestorePayment[]) => void) {
  const path = 'payments';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const list: FirestorePayment[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as FirestorePayment);
      });
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToActivityLogs(onUpdate: (logs: FirestoreActivityLog[]) => void) {
  const path = 'logs';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const list: FirestoreActivityLog[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as FirestoreActivityLog);
      });
      list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

// Mutator Operations

export async function createCustomerBooking(booking: Omit<FirestoreBooking, 'id' | 'createdAt'>): Promise<string> {
  const path = 'bookings';
  try {
    const bookingId = `book_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fullBooking: FirestoreBooking = {
      ...booking,
      id: bookingId,
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, path, bookingId), fullBooking);
    return bookingId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateBookingStatus(
  bookingId: string, 
  status: FirestoreBooking['status'], 
  requestedDate?: string
) {
  const path = `bookings/${bookingId}`;
  try {
    await updateDoc(doc(db, 'bookings', bookingId), {
      status,
      updatedAt: new Date().toISOString()
    });

    // If confirmed, automatically lock the schedule date
    if (status === 'confirmed' && requestedDate) {
      await autoLockScheduleDate(requestedDate);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    throw error;
  }
}

export async function updateBookingPaymentStatus(
  bookingId: string,
  paymentStatus: FirestoreBooking['paymentStatus'],
  trxId?: string
) {
  const path = `bookings/${bookingId}`;
  try {
    await updateDoc(doc(db, 'bookings', bookingId), {
      paymentStatus,
      paymentTrxId: trxId || '',
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    throw error;
  }
}

// Auto-lock calendar date when admin confirms a booking
async function autoLockScheduleDate(requestedDateStr: string) {
  try {
    // Expected format: "19 November 2026" or similar
    const parts = requestedDateStr.split(' ');
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const monthStr = parts[1].toLowerCase();
      const year = parseInt(parts[2], 10);

      const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      const monthIndex = months.indexOf(monthStr);

      if (!isNaN(day) && monthIndex !== -1 && !isNaN(year)) {
        const docId = `${year}_${monthIndex}`;
        const schedDoc = await getDoc(doc(db, 'schedules', docId));
        if (schedDoc.exists()) {
          const data = schedDoc.data() as CalendarMonthSchedule;
          const available = (data.availableDates || []).filter(d => d !== day);
          const booked = Array.from(new Set([...(data.bookedDates || []), day])).sort((a, b) => a - b);
          await updateDoc(doc(db, 'schedules', docId), {
            availableDates: available,
            bookedDates: booked,
            updatedAt: new Date().toISOString()
          });
        }
      }
    }
  } catch (e) {
    console.warn("Failed to auto-lock calendar date:", e);
  }
}

export async function saveScheduleMonthInFirestore(schedule: CalendarMonthSchedule) {
  const docId = `${schedule.year}_${schedule.month}`;
  const path = `schedules/${docId}`;
  try {
    await setDoc(doc(db, 'schedules', docId), {
      ...schedule,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export async function savePackageInFirestore(pkg: PromotionPackage) {
  const docId = `pkg_${pkg.id}`;
  const path = `packages/${docId}`;
  try {
    await setDoc(doc(db, 'packages', docId), {
      ...pkg,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export async function deletePackageInFirestore(pkgId: number) {
  const docId = `pkg_${pkgId}`;
  const path = `packages/${docId}`;
  try {
    await deleteDoc(doc(db, 'packages', docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
}

export async function saveWebsiteConfigInFirestore(config: FirestoreWebsiteConfig) {
  const path = 'config/general';
  try {
    await setDoc(doc(db, 'config', 'general'), {
      ...config,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export async function recordPaymentInFirestore(payment: Omit<FirestorePayment, 'id' | 'createdAt'>) {
  const path = 'payments';
  try {
    const paymentId = `pay_${Date.now()}`;
    await setDoc(doc(db, path, paymentId), {
      ...payment,
      id: paymentId,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function verifyPaymentInFirestore(paymentId: string, status: 'verified' | 'rejected', adminEmail: string) {
  const path = `payments/${paymentId}`;
  try {
    await updateDoc(doc(db, 'payments', paymentId), {
      status,
      verifiedBy: adminEmail,
      verifiedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    throw error;
  }
}

export async function logAdminActivity(action: string, details: string, adminEmail: string) {
  const path = 'logs';
  try {
    const logId = `log_${Date.now()}`;
    await setDoc(doc(db, path, logId), {
      id: logId,
      adminEmail,
      action,
      details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.warn("Could not log admin activity:", error);
  }
}
