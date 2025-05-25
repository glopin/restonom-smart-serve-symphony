
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Building2, Users, DollarSign, CalendarCheck, ShoppingCart, Clock } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch user's restaurants
  const { data: restaurants = [] } = useQuery({
    queryKey: ['restaurants', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Fetch total orders for user's restaurants
  const { data: totalOrders = 0 } = useQuery({
    queryKey: ['total-orders', user?.id],
    queryFn: async () => {
      const restaurantIds = restaurants.map(r => r.id);
      if (restaurantIds.length === 0) return 0;
      
      const { data, error } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .in('restaurant_id', restaurantIds);
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: restaurants.length > 0
  });

  // Fetch total reservations for user's restaurants
  const { data: totalReservations = 0 } = useQuery({
    queryKey: ['total-reservations', user?.id],
    queryFn: async () => {
      const restaurantIds = restaurants.map(r => r.id);
      if (restaurantIds.length === 0) return 0;
      
      const { data, error } = await supabase
        .from('reservations')
        .select('id', { count: 'exact' })
        .in('restaurant_id', restaurantIds);
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: restaurants.length > 0
  });

  // Calculate total revenue from completed orders
  const { data: totalRevenue = 0 } = useQuery({
    queryKey: ['total-revenue', user?.id],
    queryFn: async () => {
      const restaurantIds = restaurants.map(r => r.id);
      if (restaurantIds.length === 0) return 0;
      
      const { data, error } = await supabase
        .from('orders')
        .select('total_amount')
        .in('restaurant_id', restaurantIds)
        .eq('status', 'paid');
      
      if (error) throw error;
      return data?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;
    },
    enabled: restaurants.length > 0
  });

  // Fetch total staff count
  const { data: totalStaff = 0 } = useQuery({
    queryKey: ['total-staff', user?.id],
    queryFn: async () => {
      const restaurantIds = restaurants.map(r => r.id);
      if (restaurantIds.length === 0) return 0;
      
      const { data, error } = await supabase
        .from('restaurant_staff')
        .select('id', { count: 'exact' })
        .in('restaurant_id', restaurantIds)
        .eq('is_active', true);
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: restaurants.length > 0
  });

  // Fetch pending orders count
  const { data: pendingOrders = 0 } = useQuery({
    queryKey: ['pending-orders', user?.id],
    queryFn: async () => {
      const restaurantIds = restaurants.map(r => r.id);
      if (restaurantIds.length === 0) return 0;
      
      const { data, error } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .in('restaurant_id', restaurantIds)
        .in('status', ['pending', 'preparing']);
      
      if (error) throw error;
      return data?.length || 0;
    },
    enabled: restaurants.length > 0
  });

  const stats = [
    {
      title: "Toplam Restoran",
      value: restaurants.length,
      icon: Building2,
      description: "Aktif işletme sayısı"
    },
    {
      title: "Toplam Personel",
      value: totalStaff,
      icon: Users,
      description: "Aktif çalışan sayısı"
    },
    {
      title: "Toplam Ciro",
      value: `₺${totalRevenue.toLocaleString('tr-TR')}`,
      icon: DollarSign,
      description: "Tamamlanan siparişler"
    },
    {
      title: "Toplam Rezervasyon",
      value: totalReservations,
      icon: CalendarCheck,
      description: "Tüm rezervasyonlar"
    },
    {
      title: "Toplam Sipariş",
      value: totalOrders,
      icon: ShoppingCart,
      description: "Tüm siparişler"
    },
    {
      title: "Bekleyen Siparişler",
      value: pendingOrders,
      icon: Clock,
      description: "Hazırlanıyor durumunda"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Genel Bakış</h1>
          <p className="text-gray-600 mt-1">
            Restoranlarınızın performansını takip edin
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary-50 rounded-lg text-center hover:bg-primary-100 transition-colors cursor-pointer">
                  <Building2 className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-primary-700">Yeni Restoran</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors cursor-pointer">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-700">Personel Ekle</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors cursor-pointer">
                  <CalendarCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-700">Rezervasyonlar</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors cursor-pointer">
                  <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-700">Siparişler</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Performans Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aktif Restoranlar</span>
                  <span className="text-sm font-semibold">{restaurants.filter(r => r.is_active).length}/{restaurants.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ortalama Ciro</span>
                  <span className="text-sm font-semibold">
                    ₺{restaurants.length > 0 ? Math.round(totalRevenue / restaurants.length).toLocaleString('tr-TR') : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Personel Başına Ciro</span>
                  <span className="text-sm font-semibold">
                    ₺{totalStaff > 0 ? Math.round(totalRevenue / totalStaff).toLocaleString('tr-TR') : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sipariş Başına Ortalama</span>
                  <span className="text-sm font-semibold">
                    ₺{totalOrders > 0 ? Math.round(totalRevenue / totalOrders).toLocaleString('tr-TR') : 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
