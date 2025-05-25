
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CreateRestaurantModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateRestaurantModal = ({ open, onClose }: CreateRestaurantModalProps) => {
  const [formData, setFormData] = useState({
    businessName: "",
    restaurantName: "",
    slug: "",
    address: "",
    phone: "",
    managerName: "",
    managerPhone: "",
    managerPin: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-generate slug from restaurant name
      if (name === 'restaurantName') {
        const slug = value
          .toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        updated.slug = slug;
      }
      
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase integration
    console.log("Creating restaurant:", formData);
    onClose();
  };

  const generatePin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData(prev => ({ ...prev, managerPin: pin }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Restoran Ekle</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Ticari Ünvan</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="ABC Gıda Ltd. Şti."
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restoran Adı</Label>
              <Input
                id="restaurantName"
                name="restaurantName"
                placeholder="Güzel Kebapçı"
                value={formData.restaurantName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                restonom.com/
              </span>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="rounded-l-none"
                required
              />
            </div>
            <p className="text-xs text-gray-500">
              Bu URL ile restoranınıza erişilecek. Benzersiz olmalıdır.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Atatürk Cad. No:123, Şişli/İstanbul"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+90 212 123 45 67"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Yönetici Bilgileri</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">Yetkili Kişi Adı Soyadı</Label>
                <Input
                  id="managerName"
                  name="managerName"
                  placeholder="Ahmet Yılmaz"
                  value={formData.managerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerPhone">Yetkili Kişi Telefon</Label>
                <Input
                  id="managerPhone"
                  name="managerPhone"
                  type="tel"
                  placeholder="+90 532 123 45 67"
                  value={formData.managerPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="managerPin">Yönetici PIN (6 Haneli)</Label>
              <div className="flex space-x-2">
                <Input
                  id="managerPin"
                  name="managerPin"
                  type="text"
                  placeholder="123456"
                  value={formData.managerPin}
                  onChange={handleChange}
                  maxLength={6}
                  pattern="[0-9]{6}"
                  required
                />
                <Button type="button" variant="outline" onClick={generatePin}>
                  Oluştur
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Bu PIN ile restoran yöneticisi sisteme giriş yapacak. Güvenli bir PIN oluşturun.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
              Restoran Oluştur
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRestaurantModal;
