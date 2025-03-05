
import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Package,
  Bell,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { logout } = useAdminAuth();
  const [greeting, setGreeting] = useState("");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);
  
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: ShoppingCart, label: "Transactions", path: "/admin/transactions" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel.",
    });
    navigate("/admin/login");
  };
  
  // Get current page title
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard";
    const item = navItems.find(item => item.path === path);
    return item ? item.label : "Admin Panel";
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 bg-gradient-to-r from-gaming-primary to-gaming-secondary shadow-sm flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <h1 className="text-xl font-bold text-white">
          Gtalux Admin
        </h1>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "w-64 bg-gradient-to-b from-gaming-dark to-gray-900 shadow-xl transition-all duration-300 ease-in-out",
          "fixed md:static h-full z-30",
          sidebarOpen ? "left-0" : "-left-64",
          "flex flex-col justify-between"
        )}
      >
        {/* Logo & Navigation */}
        <div>
          <div className="p-6 border-b border-gray-800">
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
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      "hover:bg-white/10",
                      isActive 
                        ? "bg-gradient-to-r from-gaming-primary/20 to-gaming-secondary/20 text-white font-medium" 
                        : "text-gray-300"
                    )}
                  >
                    <item.icon size={20} className={({ isActive }) => cn(
                      isActive ? "text-gaming-primary" : "text-gray-400"
                    )} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Logout */}
        <div className="p-4 border-t border-gray-800 mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-300 hover:text-red-400 gap-3"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Backdrop overlay on mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Header */}
        <header className="bg-gradient-to-r from-gaming-dark to-gray-900 text-white shadow-md p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">{getCurrentPageTitle()}</h2>
            <p className="text-sm text-gray-300">{greeting}, Admin</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64 bg-gray-800/50 border-gray-700 text-gray-200 focus:border-gaming-primary"
              />
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-gray-700">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-gaming-primary/20 text-gaming-primary">AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">Profile</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-gray-800 focus:bg-gray-800">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-6 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
