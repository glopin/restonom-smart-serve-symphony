
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Building2, Lock } from "lucide-react";
import { useState } from "react";

const Account = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Admin",
    lastName: "User", 
    email: "admin@restonom.com",
    phone: "+90 532 123 45 67"
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "Restonom Teknoloji A.Ş.",
    taxNumber: "1234567890",
    address: "Teknokent Binası, Şişli/İstanbul",
    website: "https://restonom.com"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase update
    console.log("Updating personal info:", personalInfo);
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase update
    console.log("Updating company info:", companyInfo);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Yeni şifreler eşleşmiyor!");
      return;
    }
    // TODO: Supabase password update
    console.log("Updating password");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hesabım</h1>
          <p className="text-gray-600 mt-1">Kişisel ve kurumsal bilgilerinizi yönetin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-lg bg-primary-100 text-primary-600">
                  AU
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-gray-900">{personalInfo.firstName} {personalInfo.lastName}</h3>
              <p className="text-sm text-gray-600 mt-1">{personalInfo.email}</p>
              <Button variant="outline" className="mt-4 w-full">
                Profil Resmi Değiştir
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Kişisel Bilgiler
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Kurumsal Bilgiler
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Güvenlik
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Kişisel Bilgiler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePersonalSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Ad</Label>
                          <Input
                            id="firstName"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Soyad</Label>
                          <Input
                            id="lastName"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                        Değişiklikleri Kaydet
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company">
                <Card>
                  <CardHeader>
                    <CardTitle>Kurumsal Bilgiler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCompanySubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Firma Adı</Label>
                        <Input
                          id="companyName"
                          value={companyInfo.companyName}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, companyName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxNumber">Vergi Numarası</Label>
                        <Input
                          id="taxNumber"
                          value={companyInfo.taxNumber}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, taxNumber: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adres</Label>
                        <Input
                          id="address"
                          value={companyInfo.address}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={companyInfo.website}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                        Değişiklikleri Kaydet
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Şifre Değiştir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Yeni Şifre</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Yeni Şifre Tekrarı</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                        Şifreyi Güncelle
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
