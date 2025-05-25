
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, BarChart3, CreditCard, Truck, MessageSquare } from "lucide-react";

const AppStore = () => {
  const comingSoonApps = [
    {
      name: "Gelişmiş Analitik",
      description: "Detaylı satış analizleri, müşteri segmentasyonu ve tahminleme araçları",
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      category: "Analitik",
      eta: "Q2 2024"
    },
    {
      name: "Online Ödeme Entegrasyonu",
      description: "Kredi kartı, QR kod ve dijital cüzdan ödeme seçenekleri",
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      category: "Ödeme",
      eta: "Q2 2024"
    },
    {
      name: "Teslimat Yönetimi",
      description: "Kurye takibi, teslimat rotası optimizasyonu ve müşteri bilgilendirme",
      icon: <Truck className="h-8 w-8 text-orange-600" />,
      category: "Lojistik",
      eta: "Q3 2024"
    },
    {
      name: "Müşteri İletişim Merkezi",
      description: "WhatsApp, SMS ve e-posta entegrasyonu ile otomatik mesajlaşma",
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      category: "İletişim",
      eta: "Q3 2024"
    },
    {
      name: "AI Menü Optimizasyonu",
      description: "Yapay zeka destekli menü analizi ve fiyat optimizasyonu",
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      category: "AI",
      eta: "Q4 2024"
    },
    {
      name: "Stok Takip Sistemi",
      description: "Otomatik stok takibi, düşük stok uyarıları ve tedarikçi yönetimi",
      icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
      category: "Stok",
      eta: "Q4 2024"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Uygulama Pazarı</h1>
          <p className="text-gray-600 mt-2">Restoranınız için gelişmiş özellikler yakında geliyor</p>
        </div>

        {/* Coming Soon Banner */}
        <Card className="bg-gradient-to-r from-primary-600 to-accent-500 text-white border-0">
          <CardContent className="p-8 text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-2">Çok Yakında!</h2>
            <p className="text-lg opacity-90">
              Restoranınızı daha da güçlendirecek entegrasyonlar ve özellikler geliştiriliyor
            </p>
          </CardContent>
        </Card>

        {/* Coming Soon Apps Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yakında Gelecek Özellikler</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonApps.map((app, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow opacity-75">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {app.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {app.eta}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{app.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {app.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {app.description}
                  </p>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
                    <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Geliştirme Aşamasında</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Yeni özelliklerden haberdar olun
            </h3>
            <p className="text-gray-600 mb-4">
              Yeni entegrasyonlar ve özellikler hakkında bilgilendirme almak için e-posta adresinizi bırakın
            </p>
            <div className="max-w-md mx-auto flex space-x-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Kayıt Ol
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AppStore;
