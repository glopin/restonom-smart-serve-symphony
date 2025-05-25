
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Settings, 
  Menu,
  LogOut,
  Building2,
  CreditCard,
  Store,
  HelpCircle
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const menuItems = [
    { 
      path: "/dashboard", 
      label: "Genel Bakış", 
      icon: <Settings className="h-5 w-5" /> 
    },
    { 
      path: "/isletmelerim", 
      label: "İşletmelerim", 
      icon: <Building2 className="h-5 w-5" /> 
    },
    { 
      path: "/uygulama-pazari", 
      label: "Uygulama Pazarı", 
      icon: <Store className="h-5 w-5" /> 
    },
    { 
      path: "/aboneliklerim", 
      label: "Aboneliklerim", 
      icon: <CreditCard className="h-5 w-5" /> 
    },
    { 
      path: "/hesabim", 
      label: "Hesabım", 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      path: "/destek-merkezi", 
      label: "Destek Merkezi", 
      icon: <HelpCircle className="h-5 w-5" /> 
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Çıkış yapıldı",
        description: "Başarıyla çıkış yapıldı.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Hata",
        description: "Çıkış yaparken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-gray-900">Restonom</span>
            )}
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleLogout}
            className={`${sidebarOpen ? 'w-full' : 'w-12 h-12 p-0'} flex items-center justify-center`}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Çıkış</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <Card className="p-2 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                    </div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
