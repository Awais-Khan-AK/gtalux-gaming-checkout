
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock, User } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - in a real app, you would validate against an API
    setTimeout(() => {
      // Simple validation - in a real app, use proper authentication
      if (username === "admin" && password === "password") {
        // Set a flag in localStorage to indicate authenticated state
        localStorage.setItem("adminAuthenticated", "true");
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid credentials. Try admin/password",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gaming-dark to-gray-900 p-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 blur-dot animate-float" style={{ backgroundColor: 'rgba(15, 160, 206, 0.2)' }}></div>
        <div className="absolute top-2/3 right-1/3 w-64 h-64 blur-dot animate-float" style={{ animationDelay: '1s', backgroundColor: 'rgba(139, 92, 246, 0.2)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blur-dot animate-float" style={{ animationDelay: '2s', backgroundColor: 'rgba(51, 195, 240, 0.2)' }}></div>
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaming-primary to-gaming-secondary animate-pulse-soft">
            Gtalux Admin
          </h1>
          <p className="text-gray-400 mt-2">Login to access the dashboard</p>
        </div>
        
        <Card className="border-none bg-white/10 backdrop-blur-lg shadow-2xl animate-fade-in">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gaming-primary h-4 w-4" />
                    <Input
                      id="username"
                      placeholder="admin"
                      className="pl-10 bg-white/10 border-gray-700 text-white placeholder:text-gray-500 focus:border-gaming-primary"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gaming-primary h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="password"
                      className="pl-10 bg-white/10 border-gray-700 text-white placeholder:text-gray-500 focus:border-gaming-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-gaming-primary to-gaming-secondary hover:opacity-90 transition-all hover:shadow-glow hover-glow" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Use <span className="text-gaming-primary">admin</span> / <span className="text-gaming-primary">password</span> to login
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
