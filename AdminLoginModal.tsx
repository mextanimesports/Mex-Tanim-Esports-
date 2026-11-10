import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  LogIn, 
  LogOut, 
  ArrowRight, 
  X,
  ExternalLink
} from 'lucide-react';
import { User } from 'firebase/auth';
import { loginWithGoogle, logoutAdmin, isAuthorizedAdmin } from '../../firebase/service';
import { BRAND_CONFIG } from '../../data/promotions';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onEnterDashboard: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onEnterDashboard
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isAuth = isAuthorizedAdmin(currentUser);

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await loginWithGoogle();
      if (!isAuthorizedAdmin(user)) {
        setErrorMsg(`Access restricted: Signed in as ${user.email}. Only authorized administrators (mextanimesports@gmail.com) can access the private admin portal.`);
      } else {
        onEnterDashboard();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please verify popup permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutAdmin();
      setErrorMsg(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0e0e12] border border-[#E50914]/50 rounded-2xl shadow-2xl shadow-[#E50914]/25 overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full p-1 bg-gradient-to-br from-[#E50914] via-[#8B0000] to-black flex items-center justify-center shadow-lg shadow-[#E50914]/30 mb-3">
            <img
              src={BRAND_CONFIG.logoUrl}
              alt="Mex Tanim Logo"
              className="w-full h-full object-contain rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-xs font-mono font-bold text-[#FF4D4D] uppercase tracking-widest">
            AUTHENTICATED PORTAL
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight">
            ADMINISTRATOR ACCESS
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Private management suite for Mex Tanim Esports Organisation
          </p>
        </div>

        {/* State 1: Already Authenticated as Admin */}
        {currentUser && isAuth ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Verified Administrator Session
                </div>
                <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[240px]">
                  {currentUser.email}
                </div>
              </div>
            </div>

            <button
              onClick={onEnterDashboard}
              className="w-full py-3 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E50914] to-[#B20710] hover:from-[#FF1E27] hover:to-[#E50914] shadow-lg shadow-[#E50914]/30 flex items-center justify-center gap-2"
            >
              <span>OPEN ADMIN DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : currentUser && !isAuth ? (
          /* State 2: Authenticated with unauthorized email */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Access Restricted
                </div>
                <div className="text-xs text-neutral-300 mt-1">
                  Signed in as <span className="text-white font-mono">{currentUser.email}</span>. Only authorized administrators (mextanimesports@gmail.com) can access this system.
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-rose-900/60 hover:bg-rose-800 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch / Sign Out Account</span>
            </button>
          </div>
        ) : (
          /* State 3: Not Signed In */
          <div className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#E50914] shadow-lg transition-all flex items-center justify-center gap-3 group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
                />
              </svg>
              <span>{loading ? 'Authenticating...' : 'Sign in with Google'}</span>
            </button>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-neutral-400 text-center leading-relaxed">
              <Lock className="w-3.5 h-3.5 text-[#E50914] inline-block mr-1 -mt-0.5" />
              <span>Administrative access is strictly protected via Firebase Authentication and Security Rules.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
