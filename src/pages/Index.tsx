
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Star, Clock, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: "Gerçek Zamanlı Sipariş Takibi",
      description: "Siparişlerinizi anlık olarak takip edin ve mutfakla entegre çalışın"
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Personel Yönetimi",
      description: "Tüm personelinizi tek platformda yönetin, yetkilendirin"
    },
    {
      icon: <Settings className="h-8 w-8 text-primary-600" />,
      title: "QR Menü Sistemi",
      description: "Dinamik QR menüler ile müşterilerinize modern deneyim sunun"
    }
  ];

  const plans = [
    {
      name: "Başlangıç",
      price: "299",
      features: ["1 Restoran", "5 Personel", "Temel Raporlar", "QR Menü"],
      popular: false
    },
    {
      name: "Profesyonel",
      price: "599",
      features: ["3 Restoran", "15 Personel", "Gelişmiş Raporlar", "Rezervasyon Sistemi"],
      popular: true
    },
    {
      name: "Kurumsal",
      price: "999",
      features: ["Sınırsız Restoran", "Sınırsız Personel", "API Erişimi", "Özel Destek"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Restonom</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/giris-yap">
              <Button variant="outline" className="hidden sm:inline-flex">Giriş Yap</Button>
            </Link>
            <Link to="/kayit-ol">
              <Button className="bg-primary-600 hover:bg-primary-700">
                Hemen Başla
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Geleceğin Restoran
            <span className="text-primary-600"> Otomasyonu</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Restoranınızı tamamen dijitalleştirin. Sipariş almadan mutfak yönetimine, 
            rezervasyondan personel takibine kadar her şeyi tek platformda yönetin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kayit-ol">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 px-8 py-3 text-lg">
                Ücretsiz Dene
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              Demo İzle
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neden Restonom?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modern restoran işletmeciliği için ihtiyacınız olan tüm araçlar
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow animate-scale-in border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Size Uygun Planı Seçin
          </h2>
          <p className="text-lg text-gray-600">
            İhtiyaçlarınıza göre ölçeklenebilir çözümler
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-6 ${plan.popular ? 'border-primary-600 border-2 shadow-xl' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    En Popüler
                  </span>
                </div>
              )}
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₺{plan.price}</span>
                  <span className="text-gray-600">/ay</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Başla
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Restoranınızı Dönüştürmeye Hazır mısınız?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hemen ücretsiz deneme sürümünü başlatın ve farkı yaşayın
          </p>
          <Link to="/kayit-ol">
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Ücretsiz Başla
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold">Restonom</span>
              </div>
              <p className="text-gray-400">
                Geleceğin restoran otomasyon platformu
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Özellikler</li>
                <li>Fiyatlandırma</li>
                <li>Demo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Yardım Merkezi</li>
                <li>İletişim</li>
                <li>SSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Şirket</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Hakkımızda</li>
                <li>Blog</li>
                <li>Kariyer</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Restonom. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
