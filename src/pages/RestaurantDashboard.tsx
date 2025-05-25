
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Clock,
  ChefHat,
  CalendarCheck,
  LogOut,
  Settings,
  Menu as MenuIcon,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StaffSession {
  staff_id?: string;
  restaurant_id: string;
  restaurant_slug: string;
  role: string;
  name: string;
  is_manager?: boolean;
  permissions?: any;
}

const RestaurantDashboard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [staffSession, setStaffSession] = useState<StaffSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem('staff_session');
    if (!session) {
      navigate(`/${slug}/staff-login`);
      return;
    }

    const parsedSession = JSON.parse(session);
    if (parsedSession.restaurant_slug !== slug) {
      navigate(`/${slug}/staff-login`);
      return;
    }

    setStaffSession(parsedSession);
  }, [slug, navigate]);

  // Fetch restaurant data
  const { data: restaurant } = useQuery({
    queryKey: ['restaurant', staffSession?.restaurant_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', staffSession?.restaurant_id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!staffSession?.restaurant_id
  });

  // Fetch dashboard metrics
  const { data: todayOrders = 0 } = useQuery({
    queryKey: ['today-orders', staffSession?.restaurant_id],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .eq('restaurant_id', staffSession?.restaurant_id)
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lt('created_at', `${today}T23:59:59.999Z`);
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: !!staffSession?.restaurant_id
  });

  const { data: pendingOrders = 0 } = useQuery({
    queryKey: ['pending-orders', staffSession?.restaurant_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .eq('restaurant_id', staffSession?.restaurant_id)
        .in('status', ['pending', 'preparing']);
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: !!staffSession?.restaurant_id
  });

  const { data: todayRevenue = 0 } = useQuery({
    queryKey: ['today-revenue', staffSession?.restaurant_id],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('restaurant_id', staffSession?.restaurant_id)
        .eq('status', 'paid')
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lt('created_at', `${today}T23:59:59.999Z`);
      
      if (error) throw error;
      return data?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;
    },
    enabled: !!staffSession?.restaurant_id
  });

  const { data: activeStaff = 0 } = useQuery({
    queryKey: ['active-staff', staffSession?.restaurant_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurant_staff')
        .select('id', { count: 'exact' })
        .eq('restaurant_id', staffSession?.restaurant_id)
        .eq('is_active', true);
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: !!staffSession?.restaurant_id
  });

  const handleLogout = () => {
    sessionStorage.removeItem('staff_session');
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yapıldı.",
    });
    navigate(`/${slug}`);
  };

  const getMenuItems = () => {
    if (!staffSession) return [];

    const baseItems = [
      { path: 'dashboard', label: 'Dashboard', icon: BarChart3 }
    ];

    switch (staffSession.role) {
      case 'admin':
        return [
          ...baseItems,
          { path: 'orders', label: 'Siparişler', icon: ShoppingCart },
          { path: 'tables', label: 'Masalar', icon: MenuIcon },
          { path: 'menu', label: 'Menü Yönetimi', icon: ChefHat },
          { path: 'reservations', label: 'Rezervasyonlar', icon: CalendarCheck },
          { path: 'staff', label: 'Personel Yönetimi', icon: Users },
          { path: 'reports', label: 'Raporlar', icon: BarChart3 },
          { path: 'settings', label: 'Ayarlar', icon: Settings }
        ];
      case 'waiter':
        return [
          ...baseItems,
          { path: 'orders', label: 'Siparişler', icon: ShoppingCart },
          { path: 'tables', label: 'Masalar', icon: MenuIcon }
        ];
      case 'kitchen':
        return [
          ...baseItems,
          { path: 'kitchen', label: 'Mutfak Ekranı', icon: ChefHat }
        ];
      case 'cashier':
        return [
          ...baseItems,
          { path: 'orders', label: 'Siparişler', icon: ShoppingCart }
        ];
      default:
        return baseItems;
    }
  };

  if (!staffSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const menuItems = getMenuItems();
  const stats = [
    {
      title: "Bugünkü Siparişler",
      value: todayOrders,
      icon: ShoppingCart,
      description: "Toplam sipariş sayısı"
    },
    {
      title: "Bekleyen Siparişler",
      value: pendingOrders,
      icon: Clock,
      description: "Hazırlanıyor durumunda"
    },
    {
      title: "Bugünkü Ciro",
      value: `₺${todayRevenue.toLocaleString('tr-TR')}`,
      icon: DollarSign,
      description: "Tamamlanan ödemeler"
    },
    {
      title: "Aktif Personel",
      value: activeStaff + (staffSession.is_manager ? 1 : 0),
      icon: Users,
      description: "Çalışan sayısı"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <ChefHat className="h-4 w-4 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-lg font-bold text-gray-900">
                  {restaurant?.restaurant_name || 'Restoran'}
                </span>
                <p className="text-xs text-gray-500">{staffSession.name}</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(`/${slug}/${item.path}`)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left ${
                      window.location.pathname.endsWith('/dashboard')
                        ? 'bg-primary-50 text-primary-600 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleLogout}
            className={`${sidebarOpen ? 'w-full' : 'w-12 h-12 p-0'} flex items-center justify-center`}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Çıkış</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Hoş geldiniz, {staffSession.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 capitalize">
                {staffSession.role === 'admin' ? 'Yönetici' : 
                 staffSession.role === 'waiter' ? 'Garson' :
                 staffSession.role === 'kitchen' ? 'Mutfak' :
                 staffSession.role === 'cashier' ? 'Kasiyer' : staffSession.role}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </CardTitle>
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {menuItems.slice(1).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => navigate(`/${slug}/${item.path}`)}
                        className="p-4 bg-primary-50 rounded-lg text-center hover:bg-primary-100 transition-colors"
                      >
                        <Icon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-primary-700">{item.label}</p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
