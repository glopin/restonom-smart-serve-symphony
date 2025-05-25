
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star } from "lucide-react";

const RestaurantTenant = () => {
  const { slug } = useParams();

  // Mock restaurant data - TODO: Fetch from Supabase
  const restaurant = {
    name: "Güzel Kebapçı",
    slug: "guzel-kebapci",
    description: "Geleneksel lezzetlerle modern sunum",
    address: "Atatürk Cad. No:123, Şişli/İstanbul",
    phone: "+90 212 123 45 67",
    hours: "09:00 - 23:00",
    rating: 4.8,
    coverImage: "/api/placeholder/800/400"
  };

  const menuCategories = [
    {
      name: "Ana Yemekler",
      items: [
        { name: "Adana Kebap", price: "₺45", description: "Acılı dana eti" },
        { name: "Urfa Kebap", description: "Acısız dana eti", price: "₺45" },
        { name: "Tavuk Şiş", description: "Özel marinatlı tavuk", price: "₺35" }
      ]
    },
    {
      name: "Başlangıçlar",
      items: [
        { name: "Humus", description: "Özel tahin sosu ile", price: "₺15" },
        { name: "Cacık", description: "Taze salatalık ve nane", price: "₺12" },
        { name: "Ezme", description: "Acılı domates ezme", price: "₺14" }
      ]
    }
  ];

  if (slug !== restaurant.slug) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Restoran Bulunamadı
            </h1>
            <p className="text-gray-600">
              Aradığınız restoran mevcut değil veya geçici olarak kullanım dışı.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
                <p className="text-sm text-gray-600">Dijital Menü</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Açık</Badge>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-4xl mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                
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
                    <Clock className="h-4 w-4 mr-2" />
                    {restaurant.hours}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    {restaurant.rating} / 5.0
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-500">Restoran Görseli</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Menümüz</h3>
          
          {menuCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{category.name}</h4>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div className="ml-4">
                        <span className="text-lg font-semibold text-primary-600">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center py-6 border-t">
          <p className="text-sm text-gray-500">
            Bu dijital menü Restonom tarafından güçlendirilmektedir
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTenant;
