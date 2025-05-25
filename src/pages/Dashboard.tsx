
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { Users, Building2, ShoppingCart, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  totalRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  totalReservations: number;
  totalStaff: number;
  todayOrders: number;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Kullanıcı authentication kontrolü
  useEffect(() => {
    if (!loading && !user) {
      navigate("/giris-yap");
    }
  }, [user, loading, navigate]);

  // Dashboard istatistiklerini çek
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: async (): Promise<DashboardStats> => {
      if (!user?.id) throw new Error('User not authenticated');

      // Paralel olarak tüm verileri çek
      const [restaurants, orders, reservations, staff] = await Promise.all([
        supabase
          .from('restaurants')
          .select('id')
          .eq('owner_id', user.id),
        supabase
          .from('orders')
          .select('total_amount, created_at, restaurant_id')
          .in('restaurant_id', 
            supabase
              .from('restaurants')
              .select('id')
              .eq('owner_id', user.id)
          ),
        supabase
          .from('reservations')
          .select('id, restaurant_id')
          .in('restaurant_id',
            supabase
              .from('restaurants')
              .select('id')
              .eq('owner_id', user.id)
          ),
        supabase
          .from('restaurant_staff')
          .select('id, restaurant_id')
          .in('restaurant_id',
            supabase
              .from('restaurants')
              .select('id')
              .eq('owner_id', user.id)
          )
      ]);

      const totalRestaurants = restaurants.data?.length || 0;
      const totalOrders = orders.data?.length || 0;
      const totalRevenue = orders.data?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;
      const totalReservations = reservations.data?.length || 0;
      const totalStaff = staff.data?.length || 0;

      // Bugünkü siparişleri hesapla
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = orders.data?.filter(order => 
        order.created_at.startsWith(today)
      ).length || 0;

      return {
        totalRestaurants,
        totalOrders,
        totalRevenue,
        totalReservations,
        totalStaff,
        todayOrders
      };
    },
    enabled: !!user?.id
  });

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Genel Bakış</h1>
          <p className="text-gray-600 mt-2">
            Restoranlarınızın performansını takip edin ve yönetin.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Restoran</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "..." : stats?.totalRestaurants || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Aktif restoranlarınız
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "..." : stats?.totalOrders || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Tüm zamanların toplamı
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Ciro</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "..." : `₺${(stats?.totalRevenue || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`}
              </div>
              <p className="text-xs text-muted-foreground">
                Tüm zamanların toplamı
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Rezervasyon</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "..." : stats?.totalReservations || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Tüm zamanların toplamı
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Personel</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "..." : stats?.totalStaff || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Aktif personel sayısı
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugünkü Siparişler</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statsLoading ? "..." : stats?.todayOrders || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Bugün alınan siparişler
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
              <CardDescription>
                Restoranlarınızdaki son gelişmeler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Henüz aktivite bulunmuyor</p>
                    <p className="text-sm">İlk restoranınızı oluşturun</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
              <CardDescription>
                Sık kullanılan işlemlere hızlı erişim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="font-medium">Yeni Restoran Ekle</div>
                      <div className="text-sm text-gray-500">Hızlı restoran kurulumu</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="font-medium">Personel Yönetimi</div>
                      <div className="text-sm text-gray-500">Yetkilendirme ve roller</div>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="font-medium">Raporları Görüntüle</div>
                      <div className="text-sm text-gray-500">Satış ve performans analizi</div>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
