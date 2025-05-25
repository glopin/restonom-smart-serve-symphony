
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star } from "lucide-react";

const Subscriptions = () => {
  const currentPlan = {
    name: "Profesyonel",
    price: "599",
    nextBilling: "15 Şubat 2024",
    status: "active"
  };

  const plans = [
    {
      name: "Başlangıç",
      price: "299",
      period: "ay",
      features: [
        "1 Restoran",
        "5 Personel",
        "Temel Raporlar",
        "QR Menü Sistemi",
        "Sipariş Yönetimi",
        "E-posta Desteği"
      ],
      popular: false,
      current: false
    },
    {
      name: "Profesyonel",
      price: "599",
      period: "ay",
      features: [
        "3 Restoran",
        "15 Personel",
        "Gelişmiş Raporlar",
        "Rezervasyon Sistemi",
        "Çoklu Lokasyon",
        "Öncelikli Destek",
        "Özel Entegrasyonlar"
      ],
      popular: true,
      current: true
    },
    {
      name: "Kurumsal",
      price: "999",
      period: "ay",
      features: [
        "Sınırsız Restoran",
        "Sınırsız Personel",
        "API Erişimi",
        "Özel Geliştirme",
        "7/24 Destek",
        "Eğitim ve Danışmanlık",
        "SLA Garantisi"
      ],
      popular: false,
      current: false
    }
  ];

  const billingHistory = [
    { date: "15 Ocak 2024", plan: "Profesyonel", amount: "₺599", status: "Ödendi" },
    { date: "15 Aralık 2023", plan: "Profesyonel", amount: "₺599", status: "Ödendi" },
    { date: "15 Kasım 2023", plan: "Başlangıç", amount: "₺299", status: "Ödendi" },
    { date: "15 Ekim 2023", plan: "Başlangıç", amount: "₺299", status: "Ödendi" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Aboneliklerim</h1>
          <p className="text-gray-600 mt-1">Mevcut paketinizi görüntüleyin ve yönetin</p>
        </div>

        {/* Current Subscription */}
        <Card className="border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 text-primary-600 mr-2" />
                  Mevcut Aboneliğiniz
                </CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800">Aktif</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <p className="text-xl font-bold text-gray-900">{currentPlan.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Aylık Ücret</p>
                <p className="text-xl font-bold text-gray-900">₺{currentPlan.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sonraki Fatura</p>
                <p className="text-xl font-bold text-gray-900">{currentPlan.nextBilling}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mevcut Planlar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.current ? 'border-primary-600 border-2' : 'border-gray-200'} ${plan.popular ? 'shadow-xl' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      En Popüler
                    </Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-primary-600 text-white">
                      Mevcut Plan
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">₺{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.current ? 'bg-gray-400 cursor-not-allowed' : plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
                    variant={plan.current ? 'secondary' : plan.popular ? 'default' : 'outline'}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Mevcut Plan' : 'Planı Seç'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Fatura Geçmişi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Tarih</th>
                    <th className="text-left py-3 px-4">Plan</th>
                    <th className="text-left py-3 px-4">Tutar</th>
                    <th className="text-left py-3 px-4">Durum</th>
                    <th className="text-left py-3 px-4">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">{item.plan}</td>
                      <td className="py-3 px-4 font-semibold">{item.amount}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          Faturayı İndir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
