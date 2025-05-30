
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast"; // Assuming useToast hook is available

// Define types for Plan and Subscription data
interface Plan {
  id: string; // UUID
  plan_id: string; // e.g., 'starter', 'professional'
  name: string;
  price: number;
  currency: string;
  features: string[];
  limits: Record<string, any>;
  active: boolean;
  // popular field was in static data, might need to be added to DB or handled differently
  popular?: boolean;
  period?: string; // 'ay' was in static data
}

interface Subscription {
  id: string; // UUID
  user_id: string; // UUID
  plan_id: string; // FK to plans.plan_id
  plan_name?: string; // Denormalized or joined for convenience
  plan_price?: number; // Denormalized or joined
  plan_currency?: string; // Denormalized or joined
  status: string; // e.g., 'active', 'inactive'
  start_date: string; // ISO string
  end_date: string; // ISO string
  // Add other relevant fields from your 'subscriptions' table
}

const Subscriptions = () => {
  const { toast } = useToast();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);

  // Fetch Available Plans
  const {
    data: fetchedPlans,
    isLoading: isLoadingPlans,
    error: errorPlans
  } = useQuery<Plan[], Error>({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('active', true);
      if (error) throw error;
      // Manually add 'popular' and 'period' for UI compatibility for now
      return data.map(p => ({...p, popular: p.plan_id === 'professional', period: 'ay'}));
    }
  });

  useEffect(() => {
    if (fetchedPlans) setPlans(fetchedPlans);
  }, [fetchedPlans]);

  // Fetch Current User's Subscription
  const {
    data: fetchedSubscription,
    isLoading: isLoadingSubscription,
    error: errorSubscription
  } = useQuery<Subscription | null, Error>({
    queryKey: ['userSubscription'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get_user_subscription');
      if (error) throw error;
      // The function might return an empty object/array or null if no active sub
      if (data && data.id) { // Check if a valid subscription object is returned
        return data;
      }
      return null;
    }
  });

  useEffect(() => {
    if (fetchedSubscription) setCurrentSubscription(fetchedSubscription);
  }, [fetchedSubscription]);


  const handleSelectPlan = async (planId: string) => {
    console.log("Selected plan for checkout:", planId);
    try {
      const { data, error } = await supabase.functions.invoke('create_checkout_session', {
        body: { plan_id: planId }
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        toast({
          variant: "destructive",
          title: "Ödeme Hatası",
          description: "Ödeme oturumu oluşturulurken bir sorun oluştu: " + error.message,
        });
        return;
      }

      if (data && data.sessionId) {
        console.log('Checkout session created:', data);
        // In a real app, you would redirect to Stripe here.
        // e.g., const stripe = await loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');
        // if (stripe) stripe.redirectToCheckout({ sessionId: data.sessionId });
        alert(`Checkout session initiated with ID: ${data.sessionId}. Redirect to Stripe here.`);
      } else {
        console.warn('Checkout session data or sessionId missing:', data);
        toast({
          variant: "destructive",
          title: "Ödeme Hatası",
          description: "Ödeme oturumu başlatılamadı. Lütfen tekrar deneyin.",
        });
      }
    } catch (e) {
      console.error('Client-side error calling create_checkout_session:', e);
      toast({
        variant: "destructive",
        title: "İstemci Hatası",
        description: "Ödeme işlemi başlatılırken bir hata oluştu.",
      });
    }
  };

  // const billingHistory = [ /* Static data removed, to be fetched if needed */ ];

  if (isLoadingPlans || isLoadingSubscription) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-primary-600" />
          <p className="ml-4 text-xl">Abonelik bilgileri yükleniyor...</p>
        </div>
      </DashboardLayout>
    );
  }

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
              {currentSubscription && currentSubscription.status === 'active' && (
                <Badge className="bg-green-100 text-green-800">Aktif</Badge>
              )}
               {currentSubscription && currentSubscription.status !== 'active' && (
                <Badge className="bg-yellow-100 text-yellow-800 capitalize">{currentSubscription.status}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {errorSubscription && (
              <p className="text-red-600">Mevcut abonelik yüklenirken hata oluştu: {errorSubscription.message}</p>
            )}
            {!isLoadingSubscription && !errorSubscription && currentSubscription && currentSubscription.plan_id ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="text-xl font-bold text-gray-900">{currentSubscription.plan_name || currentSubscription.plan_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aylık Ücret</p>
                  <p className="text-xl font-bold text-gray-900">
                    {currentSubscription.plan_price !== undefined ?
                     `₺${currentSubscription.plan_price}` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sonraki Fatura</p>
                  <p className="text-xl font-bold text-gray-900">
                    {new Date(currentSubscription.end_date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            ) : (
              !isLoadingSubscription && !errorSubscription && <p>Aktif bir aboneliğiniz bulunmamaktadır.</p>
            )}
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mevcut Planlar</h2>
          {errorPlans && (
            <p className="text-red-600 mb-4">Planlar yüklenirken hata oluştu: {errorPlans.message}</p>
          )}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${plan.plan_id === currentSubscription?.plan_id ? 'border-primary-600 border-2' : 'border-gray-200'} ${plan.popular ? 'shadow-xl' : ''}`}
              >
                {plan.popular && ( // Assuming 'popular' might be a boolean field in your 'plans' table or derived
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      En Popüler
                    </Badge>
                  </div>
                )}
                {plan.plan_id === currentSubscription?.plan_id && (
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
                    {/* Assuming period is 'ay' (month) for all plans for now */}
                    <span className="text-gray-600">/{plan.period || 'ay'}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features && plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.plan_id === currentSubscription?.plan_id ? 'bg-gray-400 cursor-not-allowed' : plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
                    variant={plan.plan_id === currentSubscription?.plan_id ? 'secondary' : plan.popular ? 'default' : 'outline'}
                    disabled={plan.plan_id === currentSubscription?.plan_id || isLoadingSubscription}
                    onClick={() => handleSelectPlan(plan.plan_id)}
                  >
                    {plan.plan_id === currentSubscription?.plan_id ? 'Mevcut Plan' : 'Planı Seç'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History - Commented out for now */}
        {/*
        <Card>
          <CardHeader>
            <CardTitle>Fatura Geçmişi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Fatura geçmişi özelliği yakında eklenecektir.</p>
            {/* Original table structure:
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
            * /}
          </CardContent>
        </Card>
        */}
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
