
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star, QrCode, Calendar, ChefHat } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const RestaurantTenant = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showStaffLogin, setShowStaffLogin] = useState(false);

  // Fetch restaurant by slug
  const { data: restaurant, isLoading: restaurantLoading } = useQuery({
    queryKey: ['restaurant-by-slug', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  // Fetch menu categories and items
  const { data: menuData = [] } = useQuery({
    queryKey: ['restaurant-menu', restaurant?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_categories')
        .select(`
          *,
          menu_items (*)
        `)
        .eq('restaurant_id', restaurant?.id)
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
    enabled: !!restaurant?.id
  });

  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Restoran yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Restoran Bulunamadı
            </h1>
            <p className="text-gray-600 mb-6">
              Aradığınız restoran mevcut değil veya geçici olarak kullanım dışı.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Ana Sayfaya Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStaffLogin = () => {
    navigate(`/${slug}/staff-login`);
  };

  const handleReservation = () => {
    navigate(`/${slug}/rezervasyon`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {restaurant.restaurant_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{restaurant.restaurant_name}</h1>
                <p className="text-sm text-gray-600">{restaurant.business_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">Açık</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleStaffLogin}
                className="hidden sm:flex"
              >
                <ChefHat className="h-4 w-4 mr-2" />
                Personel Girişi
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-4xl mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.restaurant_name}</h2>
                <p className="text-gray-600 mb-4">{restaurant.business_name}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {restaurant.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {restaurant.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    09:00 - 23:00
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    4.8 / 5.0
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleReservation} className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Rezervasyon Yap
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Menü
                  </Button>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-8 text-center border border-primary-100">
                <QrCode className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">QR Kod ile Menüyü Görüntüle</p>
                <p className="text-sm text-gray-500 mt-2">Telefonunuzla QR kodu okutun</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu */}
        {menuData.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Menümüz</h3>
              <Button variant="outline" size="sm" onClick={handleStaffLogin} className="sm:hidden">
                <ChefHat className="h-4 w-4 mr-2" />
                Personel
              </Button>
            </div>
            
            {menuData.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{category.name}</h4>
                  {category.description && (
                    <p className="text-gray-600 mb-4">{category.description}</p>
                  )}
                  <div className="space-y-4">
                    {category.menu_items?.filter(item => item.is_available).map((item) => (
                      <div key={item.id} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          )}
                        </div>
                        <div className="ml-4">
                          <span className="text-lg font-semibold text-primary-600">
                            ₺{Number(item.price).toLocaleString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Menü Hazırlanıyor</h4>
              <p className="text-gray-600">
                Lezzetli menümüz yakında burada olacak. Rezervasyon için arayabilirsiniz.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center py-6 border-t">
          <p className="text-sm text-gray-500">
            Bu dijital menü <span className="font-semibold text-primary-600">Restonom</span> tarafından güçlendirilmektedir
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTenant;
