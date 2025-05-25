
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";
import Account from "./pages/Account";
import Subscriptions from "./pages/Subscriptions";
import AppStore from "./pages/AppStore";
import Support from "./pages/Support";
import RestaurantTenant from "./pages/RestaurantTenant";
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
          <Route path="/giris-yap" element={<Login />} />
          <Route path="/kayit-ol" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/isletmelerim" element={<Restaurants />} />
          <Route path="/hesabim" element={<Account />} />
          <Route path="/aboneliklerim" element={<Subscriptions />} />
          <Route path="/uygulama-pazari" element={<AppStore />} />
          <Route path="/destek-merkezi" element={<Support />} />
          <Route path="/:slug" element={<RestaurantTenant />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
