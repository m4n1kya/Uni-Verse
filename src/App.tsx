import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Route-level code splitting for optimized initial bundle delivery
const Index = lazy(() => import("./pages/Index"));
const EBooks = lazy(() => import("./pages/EBooks"));
const Transport = lazy(() => import("./pages/Transport"));
const FoodCourt = lazy(() => import("./pages/FoodCourt"));
const Faculty = lazy(() => import("./pages/Faculty"));
const Journey = lazy(() => import("./pages/Journey"));
const Career = lazy(() => import("./pages/Career"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Tuned query cache to eliminate duplicate network calls and unnecessary re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Sleek pitch-black loading fallback matching application dark theme
const PageLoader = () => (
  <div className="min-h-screen bg-[#09090b] flex items-center justify-center" aria-live="polite" aria-busy="true">
    <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ebooks" element={<EBooks />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/food" element={<FoodCourt />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/career" element={<Career />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Main application router component
export default App;
