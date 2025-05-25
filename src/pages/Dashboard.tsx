
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, CreditCard, Clock, TrendingUp, TrendingDown } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Toplam Restoran",
      value: "3",
      change: "+1",
      changeType: "increase",
      icon: <Building2 className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Toplam Ciro",
      value: "₺24,580",
      change: "+12%",
      changeType: "increase",
      icon: <CreditCard className="h-6 w-6 text-green-600" />
    },
    {
      title: "Aktif Personel",
      value: "15",
      change: "+2",
      changeType: "increase", 
      icon: <Users className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Bugünkü Sipariş",
      value: "47",
      change: "-5%",
      changeType: "decrease",
      icon: <Clock className="h-6 w-6 text-orange-600" />
    }
  ];

  const recentActivity = [
    { restaurant: "Güzel Kebapçı", action: "Yeni sipariş alındı", time: "2 dk önce", amount: "₺125" },
    { restaurant: "Lezzet Durağı", action: "Rezervasyon onaylandı", time: "5 dk önce", amount: "4 kişi" },
    { restaurant: "Cafe Corner", action: "Menü güncellendi", time: "12 dk önce", amount: "3 ürün" },
    { restaurant: "Güzel Kebapçı", action: "Ödeme alındı", time: "18 dk önce", amount: "₺240" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Genel Bakış</h1>
          <p className="text-gray-600 mt-1">Tüm restoranlarınızın özet bilgileri</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'increase' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">bu ay</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.restaurant}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{activity.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hızlı Erişim</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg text-center transition-colors">
                  <Building2 className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-primary-700">Yeni Restoran</p>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-700">Personel Ekle</p>
                </button>
                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
                  <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-orange-700">Raporlar</p>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-700">Ayarlar</p>
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
