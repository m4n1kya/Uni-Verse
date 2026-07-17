import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { AIConcierge } from "../ai/AIConcierge";
import { X, User, Mail, Lock, LogIn, LogOut, Plus } from "lucide-react";
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
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] flex items-center gap-3 animate-fade-in">
          {isUserLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-[#2e6b36] hover:bg-[#2e6b36]/90 flex items-center justify-center text-white text-lg font-medium shadow-md transition-all border-2 border-transparent focus:border-white/20 select-none"
              >
                {getInitials(userEmail)}
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute top-14 right-0 w-80 md:w-[22rem] bg-[#f0f4f9] dark:bg-[#1a1e23] rounded-3xl shadow-2xl border border-border/10 flex flex-col p-2 z-[70] animate-scale-in origin-top-right">
                  <div className="p-4 flex flex-col items-center relative">
                    <button 
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="absolute top-2 right-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-foreground/70" />
                    </button>
                    
                    <p className="text-sm font-medium text-foreground tracking-tight mt-1">{userEmail}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-6">Managed by {userEmail.split('@')[1] || 'vitbhopal.ac.in'}</p>
                    
                    <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-[#2e6b36] flex items-center justify-center text-white text-[2rem] font-normal shadow-sm mb-3">
                      {getInitials(userEmail)}
                    </div>
                    
                    <h2 className="text-2xl font-normal text-foreground tracking-tight mb-4">
                      Hi, {getFirstName(userEmail)}!
                    </h2>
                    
                    <button className="px-6 py-2 rounded-full border border-border/20 bg-white/50 dark:bg-black/20 hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium text-primary transition-colors shadow-sm">
                      Manage your Google Account
                    </button>
                  </div>
                  
                  <div className="flex bg-white dark:bg-[#20242a] rounded-[1.25rem] overflow-hidden shadow-sm border border-border/10 mx-2 mb-2 p-1">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-xl text-sm font-medium text-foreground">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                      Add account
                    </button>
                    <div className="w-[1px] bg-border/20 my-2"></div>
                    <button 
                      onClick={handleSignOut}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-xl text-sm font-medium text-foreground"
                    >
                      <LogOut className="w-5 h-5 text-muted-foreground" />
                      Sign out
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 py-3 text-xs text-muted-foreground font-medium">
                    <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                    <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground/50"></span>
                    <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button 
                onClick={handleLoginClick}
                className="px-5 py-2.5 text-muted-foreground hover:text-foreground font-medium text-sm transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => setIsSignInModalOpen(true)}
                className="px-5 py-2.5 bg-primary/90 hover:bg-primary text-primary-foreground rounded-xl font-medium text-sm backdrop-blur-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            </>
          )}
        </div>
        {children}
      </main>
      <BottomNav />
      <AIConcierge />

      {/* Sign In Modal */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md p-6 md:p-8 animate-scale-in relative border border-white/5 shadow-2xl">
            <button
              onClick={() => setIsSignInModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20 shadow-inner">
                <User className="w-7 h-7" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground">Student Sign In</h2>
              <p className="text-muted-foreground text-sm mt-1">Authenticate with your college credentials</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">College Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 mt-6 hover:-translate-y-0.5"
              >
                Sign In Securely
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
