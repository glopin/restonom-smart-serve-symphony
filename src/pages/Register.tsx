
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("Ad alanı zorunludur.");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Soyad alanı zorunludur.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("E-posta adresi zorunludur.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setError("Bu e-posta adresi zaten kullanımda. Giriş yapmayı deneyin.");
        } else if (error.message.includes("Password should be at least 6 characters")) {
          setError("Şifre en az 6 karakter olmalıdır.");
        } else {
          setError(error.message);
        }
        return;
      }

      if (data.user) {
        // Kullanıcı başarıyla oluşturuldu
        toast({
          title: "Kayıt Başarılı!",
          description: "Hesabınız oluşturuldu. Dashboard'a yönlendiriliyorsunuz...",
        });

        // Başlangıç paketini otomatik olarak ata
        try {
          const { data: plans } = await supabase
            .from('subscription_plans')
            .select('*')
            .eq('name', 'Başlangıç')
            .single();

          if (plans) {
            await supabase
              .from('user_subscriptions')
              .insert({
                user_id: data.user.id,
                plan_id: plans.id,
                status: 'active'
              });
          }
        } catch (subscriptionError) {
          console.error("Subscription assignment error:", subscriptionError);
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { text: "Çok Zayıf", color: "text-red-500" };
      case 2: return { text: "Zayıf", color: "text-orange-500" };
      case 3: return { text: "Orta", color: "text-yellow-500" };
      case 4: return { text: "Güçlü", color: "text-green-500" };
      case 5: return { text: "Çok Güçlü", color: "text-green-600" };
      default: return { text: "", color: "" };
    }
  };

  const strength = passwordStrength();
  const strengthInfo = getStrengthText(strength);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Restonom'a Katılın</h1>
          <p className="text-gray-600 mt-2">Ücretsiz hesabınızı oluşturun</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Hesap Oluştur</CardTitle>
            <CardDescription>
              Bilgilerinizi girerek hesabınızı oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Ad</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Adınız"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyad</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Soyadınız"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="En az 6 karakter"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-4 rounded-full ${
                            i < strength ? strengthInfo.color.replace('text', 'bg') : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={strengthInfo.color}>{strengthInfo.text}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifre Tekrarı</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Şifrenizi tekrar giriniz"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Şifreler eşleşiyor</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-primary-600 hover:bg-primary-700"
              >
                {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Zaten hesabınız var mı?{" "}
                <Link
                  to="/giris-yap"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Giriş yapın
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
