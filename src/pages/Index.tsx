
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShoppingCart, 
  QrCode, 
  Calendar, 
  BarChart3, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary-600" />,
      title: "Akıllı Sipariş Yönetimi",
      description: "Gerçek zamanlı sipariş takibi ve mutfak entegrasyonu"
    },
    {
      icon: <QrCode className="h-8 w-8 text-primary-600" />,
      title: "QR Menü Sistemi",
      description: "Temassız menü görüntüleme ve dinamik fiyat güncellemeleri"
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-600" />,
      title: "Online Rezervasyon",
      description: "Otomatik rezervasyon yönetimi ve müşteri bildirimleri"
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Personel Yönetimi",
      description: "Rol bazlı yetkilendirme ve performans takibi"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary-600" />,
      title: "Gerçek Zamanlı Raporlar",
      description: "Detaylı satış analizleri ve işletme metrikleri"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "Güvenli Altyapı",
      description: "Kurumsal düzeyde güvenlik ve veri koruması"
    }
  ];

  const plans = [
    {
      name: "Başlangıç",
      price: "99",
      description: "Küçük işletmeler için ideal",
      features: [
        "1 Restoran",
        "5 Personel",
        "Temel sipariş yönetimi",
        "QR menü",
        "Rezervasyon sistemi",
        "E-posta desteği"
      ],
      popular: false
    },
    {
      name: "Profesyonel",
      price: "199",
      description: "Büyüyen işletmeler için",
      features: [
        "3 Restoran",
        "15 Personel",
        "Gelişmiş raporlama",
        "Çoklu restoran yönetimi",
        "Personel yetkilendirme",
        "API erişimi",
        "Öncelikli destek"
      ],
      popular: true
    },
    {
      name: "Kurumsal",
      price: "399",
      description: "Büyük zincirler için",
      features: [
        "10 Restoran",
        "50 Personel",
        "Sınırsız özellikler",
        "Özel entegrasyonlar",
        "Gelişmiş analizler",
        "Dedike hesap yöneticisi",
        "7/24 telefon desteği"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Restonom</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/giris-yap">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Giriş Yap
                </Button>
              </Link>
              <Link to="/kayit-ol">
                <Button className="bg-primary-600 hover:bg-primary-700">
                  Hemen Başla
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-primary-50 text-primary-600 border-primary-200">
              🚀 Geleceğin Restoran Teknolojisi
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Restoranınızı
              <span className="text-primary-600"> Dijital Çağa</span>
              <br />Taşıyın
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Akıllı sipariş yönetimi, gerçek zamanlı takip ve kurumsal SaaS çözümleriyle 
              restoranınızın tüm operasyonlarını tek platformda yönetin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kayit-ol">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700 px-8 py-4 text-lg">
                  Ücretsiz Deneyin
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Demo İzleyin
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Restonom?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern restoran işletmeciliği için tasarlanmış, kapsamlı özellikler sunan 
              tek platform çözümü.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary-50 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              İhtiyacınıza Uygun Paket Seçin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her büyüklükteki işletme için esnek abonelik seçenekleri.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white">
                    En Popüler
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">₺{plan.price}</span>
                    <span className="text-gray-600">/ay</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link to="/kayit-ol">
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      >
                        Hemen Başla
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Aktif Restoran</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50k+</div>
              <div className="text-gray-600">Günlük Sipariş</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Garantisi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Teknik Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Restoranınızı Dönüştürmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Bugün başlayın, 14 gün ücretsiz deneyin. Kurulum ücreti yok, 
            taahhüt yok, istediğiniz zaman iptal edebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kayit-ol">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Ücretsiz Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg">
              Satış Ekibiyle Konuş
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="text-xl font-bold text-white">Restonom</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Geleceğin restoran otomasyonu. Akıllı, gerçek zamanlı ve kurumsal SaaS platformu.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 text-white">4.9/5</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Ürün</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Özellikler</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Fiyatlandırma</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Entegrasyonlar</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Destek</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Yardım Merkezi</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">İletişim</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Durum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Güvenlik</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Restonom. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
