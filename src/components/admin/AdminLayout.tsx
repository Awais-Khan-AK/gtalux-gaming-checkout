
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: ShoppingCart, label: "Transactions", path: "/admin/transactions" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel.",
    });
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 bg-white shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "w-64 bg-white shadow-md transition-all duration-300 ease-in-out",
          "fixed md:static h-full z-30",
          sidebarOpen ? "left-0" : "-left-64",
          "flex flex-col justify-between"
        )}
      >
        {/* Logo & Navigation */}
        <div>
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaming-primary to-gaming-secondary">
              Gtalux Admin
            </h1>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      "hover:bg-gray-100",
                      isActive 
                        ? "bg-gray-100 text-gaming-primary font-medium" 
                        : "text-gray-600"
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Logout */}
        <div className="p-4 border-t mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-red-600 gap-3"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className={cn(
        "flex-1 p-6",
        sidebarOpen ? "md:ml-0" : "md:ml-0"
      )}>
        {/* Backdrop overlay on mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
