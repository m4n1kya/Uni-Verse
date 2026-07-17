import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EBooks from "./pages/EBooks";
import Transport from "./pages/Transport";
import FoodCourt from "./pages/FoodCourt";
import Faculty from "./pages/Faculty";
import Journey from "./pages/Journey";
import Career from "./pages/Career";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
