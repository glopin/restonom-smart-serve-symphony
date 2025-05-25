
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react";
import { useState } from "react";

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      question: "Restonom nasıl çalışır?",
      answer: "Restonom, restoranınızın tüm operasyonel süreçlerini dijitalleştiren bir SaaS platformudur. Sipariş almadan menü yönetimine, personel takibinden rezervasyon sistemine kadar her şeyi tek platformda yönetebilirsiniz."
    },
    {
      question: "Personel nasıl sisteme giriş yapar?",
      answer: "Her personel için benzersiz 6 haneli sayısal PIN'ler oluşturulur. Personel, restoran URL'sinden (/[restoran-slug]/login) bu PIN ile güvenli giriş yapabilir."
    },
    {
      question: "QR menü sistemi nasıl çalışır?",
      answer: "Her restoran için özel QR kod oluşturulur. Müşteriler bu kodu okutarak dinamik menünüze erişebilir. Menü değişiklikleri anlık olarak yansır."
    },
    {
      question: "Rezervasyon sistemi nasıl yönetilir?",
      answer: "Müşteriler online rezervasyon yapabilir. Yönetici panelinden rezervasyonları görüntüleyip onaylayabilir veya reddedebilirsiniz."
    },
    {
      question: "Verilerim güvende mi?",
      answer: "Evet, tüm verileriniz Supabase altyapısında güvenli şekilde saklanır. Row-Level Security (RLS) ile veri güvenliği sağlanır."
    },
    {
      question: "Hangi cihazlarda çalışır?",
      answer: "Restonom, masaüstü, tablet ve mobil cihazlarda kusursuz çalışacak şekilde tasarlanmıştır. Responsive tasarım sayesinde her ekran boyutunda optimal deneyim sunar."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send support request
    console.log("Support request:", contactForm);
    setContactForm({ name: "", email: "", subject: "", message: "" });
    alert("Destek talebiniz gönderildi. En kısa sürede dönüş yapacağız.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Destek Merkezi</h1>
          <p className="text-gray-600 mt-2">Size nasıl yardımcı olabiliriz?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Canlı Destek</h3>
              <p className="text-sm text-gray-600">Anında yardım alın</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Telefon Desteği</h3>
              <p className="text-sm text-gray-600">+90 212 123 45 67</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">E-posta Desteği</h3>
              <p className="text-sm text-gray-600">destek@restonom.com</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Sıkça Sorulan Sorular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>İletişim Formu</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Konu</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={contactForm.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                  Mesaj Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Daha Fazla Yardıma İhtiyacınız Var mı?
            </h3>
            <p className="text-gray-600 mb-4">
              Detaylı kullanım kılavuzu ve video eğitimler için dokümantasyon sayfamızı ziyaret edin
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Dokümantasyonu Görüntüle
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Support;
