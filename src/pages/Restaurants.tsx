
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Phone, Users, Settings, ExternalLink, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import CreateRestaurantModal from "@/components/CreateRestaurantModal";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface RestaurantCreationAbility {
  can_create: boolean;
  limit: number;
  current_count: number;
  plan_name: string;
}

const Restaurants = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  const {
    data: creationAbility,
    isLoading: isLoadingAbility,
    error: errorAbility
  } = useQuery<RestaurantCreationAbility, Error>({
    queryKey: ['restaurantCreationAbility'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get_restaurant_creation_ability');
      if (error) {
        console.error("Error fetching creation ability:", error);
        throw new Error('Restoran oluşturma yetkisi alınamadı: ' + error.message);
      }
      // Ensure data.data structure if Supabase function wraps response
      return data?.data || data;
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Yetki Kontrol Hatası",
        description: err.message || "Restoran oluşturma yetkisi kontrol edilirken bir sorun oluştu.",
      });
    }
  });

  const restaurants = [
    {
      id: 1,
      name: "Güzel Kebapçı",
      slug: "guzel-kebapci",
      address: "Atatürk Cad. No:123, Şişli/İstanbul",
      phone: "+90 212 123 45 67",
      manager: "Ahmet Yılmaz",
      staff: 8,
      status: "active",
      revenue: "₺8,540"
    },
    {
      id: 2,
      name: "Lezzet Durağı",
      slug: "lezzet-duragi",
      address: "Bağdat Cad. No:456, Kadıköy/İstanbul",
      phone: "+90 216 987 65 43",
      manager: "Fatma Demir",
      staff: 5,
      status: "active",
      revenue: "₺12,300"
    },
    {
      id: 3,
      name: "Cafe Corner",
      slug: "cafe-corner",
      address: "İstiklal Cad. No:789, Beyoğlu/İstanbul",
      phone: "+90 212 555 44 33",
      manager: "Mehmet Kaya",
      staff: 4,
      status: "inactive",
      revenue: "₺3,740"
    }
  ];

  // Determine if the limit is reached based on backend data
  const isLimitReached = creationAbility ? !creationAbility.can_create : true;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">İşletmelerim</h1>
            <p className="text-gray-600 mt-1">Restoranlarınızı yönetin ve yeni işletme ekleyin</p>
          </div>
          <div className="text-right">
            <Button
              onClick={() => {
                if (!isLimitReached && !isLoadingAbility) {
                  setShowCreateModal(true);
                }
              }}
              className="bg-primary-600 hover:bg-primary-700 min-w-[150px]" // Added min-width for consistent size
              disabled={isLoadingAbility || isLimitReached}
            >
              {isLoadingAbility ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Restoran
                </>
              )}
            </Button>
            {isLoadingAbility && <p className="text-sm text-gray-500 mt-2">Restoran ekleme durumu kontrol ediliyor...</p>}
            {errorAbility && !isLoadingAbility && (
              <p className="text-sm text-red-600 mt-2">
                Restoran ekleme durumu kontrol edilirken bir hata oluştu: {errorAbility.message}
              </p>
            )}
            {creationAbility && !creationAbility.can_create && !isLoadingAbility && !errorAbility && (
              <p className="text-sm text-red-600 mt-2">
                Restoran limitinize ulaştınız. Mevcut '{creationAbility.plan_name}' planınız en fazla {creationAbility.limit} restorana izin vermektedir. Şu anda {creationAbility.current_count} restoranınız bulunmaktadır. Daha fazla eklemek için lütfen abonelik planınızı yükseltin.
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{restaurants.length}</p>
                <p className="text-sm text-gray-600">Toplam Restoran</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {restaurants.filter(r => r.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Aktif Restoran</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {restaurants.reduce((sum, r) => sum + r.staff, 0)}
                </p>
                <p className="text-sm text-gray-600">Toplam Personel</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">restonom.com/{restaurant.slug}</p>
                  </div>
                  <Badge 
                    variant={restaurant.status === 'active' ? 'default' : 'secondary'}
                    className={restaurant.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {restaurant.status === 'active' ? 'Aktif' : 'Pasif'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {restaurant.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {restaurant.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {restaurant.staff} Personel • Yönetici: {restaurant.manager}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bu Ay Ciro</span>
                    <span className="text-lg font-semibold text-gray-900">{restaurant.revenue}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Yönet
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(`/${restaurant.slug}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Görüntüle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Restaurant Modal */}
        <CreateRestaurantModal 
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Restaurants;
