import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as SonnerToaster } from "./components/ui/sonner.tsx"; // Renamed import
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider, ThemeProvider } from "../deps.ts"; // Added ThemeProvider
import { BrowserRouter, Routes, Route } from "../deps.ts";
import { AuthProvider } from "./hooks/useAuth.tsx";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Restaurants from "./pages/Restaurants.tsx";
import Account from "./pages/Account.tsx";
import Subscriptions from "./pages/Subscriptions.tsx";
import AppStore from "./pages/AppStore.tsx";
import Support from "./pages/Support.tsx";
import RestaurantTenant from "./pages/RestaurantTenant.tsx";
import StaffLogin from "./pages/StaffLogin.tsx";
import RestaurantDashboard from "./pages/RestaurantDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster /> {/* This is Radix Toaster */}
          <SonnerToaster /> {/* This is the Sonner component */}
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
            <Route path="/:slug/staff-login" element={<StaffLogin />} />
            <Route path="/:slug/dashboard" element={<RestaurantDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
