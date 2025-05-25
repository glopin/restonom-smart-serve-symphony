
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, ArrowLeft, LogIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const StaffLogin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch restaurant by slug
  const { data: restaurant } = useQuery({
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!restaurant) {
      toast({
        title: "Hata",
        description: "Restoran bilgisi bulunamadı.",
        variant: "destructive",
      });
      return;
    }

    if (pin.length !== 6) {
      toast({
        title: "Hata",
        description: "PIN 6 haneli olmalıdır.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if it's restaurant manager
      if (pin === restaurant.manager_pin) {
        // Store staff session for manager
        sessionStorage.setItem('staff_session', JSON.stringify({
          restaurant_id: restaurant.id,
          restaurant_slug: slug,
          role: 'admin',
          name: restaurant.manager_name,
          is_manager: true
        }));
        
        navigate(`/${slug}/dashboard`);
        return;
      }

      // Check staff members
      const { data: staff, error } = await supabase
        .from('restaurant_staff')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .eq('pin', pin)
        .eq('is_active', true)
        .single();

      if (error || !staff) {
        toast({
          title: "Giriş Başarısız",
          description: "Hatalı PIN. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
        return;
      }

      // Store staff session
      sessionStorage.setItem('staff_session', JSON.stringify({
        staff_id: staff.id,
        restaurant_id: restaurant.id,
        restaurant_slug: slug,
        role: staff.role,
        name: `${staff.first_name} ${staff.last_name}`,
        permissions: staff.permissions
      }));

      toast({
        title: "Giriş Başarılı",
        description: `Hoş geldiniz, ${staff.first_name}!`,
      });

      navigate(`/${slug}/dashboard`);

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Hata",
        description: "Giriş sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinInput = (value: string) => {
    // Only allow numbers and limit to 6 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setPin(numericValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Personel Girişi</CardTitle>
            {restaurant && (
              <p className="text-gray-600">{restaurant.restaurant_name}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pin">6 Haneli PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="••••••"
                  value={pin}
                  onChange={(e) => handlePinInput(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={pin.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Giriş Yap
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => navigate(`/${slug}`)}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Menüye Dön
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffLogin;
