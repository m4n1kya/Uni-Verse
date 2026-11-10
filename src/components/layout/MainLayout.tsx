import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { AIConcierge } from "../ai/AIConcierge";
import { X, User, Mail, Lock, LogIn, LogOut, Plus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSignOut = () => {
    setIsUserLoggedIn(false);
    setUserEmail("");
    setIsProfileDropdownOpen(false);
    toast.success("Successfully signed out!");
  };

  const getInitials = (email: string) => email ? email.charAt(0).toUpperCase() : "U";

  const getFirstName = (email: string) => {
    if (!email) return "User";
    const namePart = email.split('@')[0].split('.')[0].replace(/[0-9]/g, '');
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      toast.error("Please enter both email and password.");
      return;
    }
    // Simulate auth success
    setIsUserLoggedIn(true);
    setUserEmail(emailInput);
    setIsSignInModalOpen(false);
    toast.success("Successfully signed in!");
  };

  const handleLoginClick = () => {
    toast.info("Login functionality coming soon. Please use Sign In for now.");
  };

  return (
    <div className="flex min-h-screen w-full bg-background selection:bg-primary/20">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden relative">
        {/* Sleek Top Navigation Action Bar */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] flex items-center gap-3 animate-fade-in">
          {isUserLoggedIn ? (
            <div className="relative">
              <button 
                aria-label="Toggle profile menu" 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2e6b36] to-[#43964d] hover:brightness-110 flex items-center justify-center text-white text-base font-semibold shadow-lg transition-all border-2 border-white/20 focus:border-primary/50 select-none cursor-pointer"
              >
                {getInitials(userEmail)}
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute top-14 right-0 w-80 md:w-[22rem] sleek-card border border-white/10 shadow-2xl flex flex-col p-2 z-[70] animate-scale-in origin-top-right bg-card/95 backdrop-blur-2xl">
                  <div className="p-4 flex flex-col items-center relative">
                    <button 
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <p className="text-sm font-semibold text-foreground tracking-tight mt-1">{userEmail}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-5 font-medium">Managed by {userEmail.split('@')[1] || 'vitbhopal.ac.in'}</p>
                    
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2e6b36] to-[#43964d] flex items-center justify-center text-white text-2xl font-bold shadow-md mb-3 border-2 border-white/20">
                      {getInitials(userEmail)}
                    </div>
                    
                    <h2 className="text-xl font-bold text-foreground tracking-tight mb-4">
                      Hi, {getFirstName(userEmail)}!
                    </h2>
                    
                    <button className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-primary transition-all shadow-sm">
                      Manage Campus Account
                    </button>
                  </div>
                  
                  <div className="flex bg-muted/30 rounded-2xl overflow-hidden border border-white/5 mx-2 mb-2 p-1">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/[0.06] transition-colors rounded-xl text-xs font-medium text-foreground">
                      <Plus className="w-4 h-4 text-muted-foreground" />
                      Add account
                    </button>
                    <div className="w-[1px] bg-white/10 my-1.5"></div>
                    <button 
                      onClick={handleSignOut}
                      className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/[0.06] transition-colors rounded-xl text-xs font-medium text-destructive hover:text-destructive/90"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 py-2.5 text-[11px] text-muted-foreground font-medium">
                    <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40"></span>
                    <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-glass-bar px-2 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg border border-white/10">
              <button 
                onClick={handleLoginClick}
                className="px-4 py-2 text-muted-foreground hover:text-foreground font-medium text-xs transition-colors rounded-xl hover:bg-white/[0.04]"
              >
                Log In
              </button>
              <button 
                onClick={() => setIsSignInModalOpen(true)}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold text-xs shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            </div>
          )}
        </div>
        {children}
      </main>
      <BottomNav />
      <AIConcierge />

      {/* Modern Sleek Sign In Modal */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-md p-6 md:p-8 animate-scale-in relative border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <button
              aria-label="Close modal" 
              onClick={() => setIsSignInModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/10 text-primary flex items-center justify-center mx-auto mb-3 border border-primary/25 shadow-inner">
                <User className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground tracking-tight">Student Sign In</h2>
              <p className="text-muted-foreground text-xs mt-1">Authenticate with your campus credentials</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">College Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-sm font-medium placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-sm font-medium placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Sign In Securely
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
