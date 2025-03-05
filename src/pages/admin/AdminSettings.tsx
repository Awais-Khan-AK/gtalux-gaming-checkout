
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Save, 
  RefreshCw,
  Shield,
  CreditCard
} from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Gtalux Checkout",
    siteDescription: "Complete Payment to Download Your Digital Items",
    supportEmail: "support@gtalux.com",
    maintenanceMode: false
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    defaultPrice: "0.1",
    discountEnabled: true,
    taxRate: "7.5",
    allowMultipleWallets: true
  });
  
  const handleGeneralSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
      duration: 3000,
    });
  };
  
  const handlePaymentSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Payment settings have been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Payments
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your checkout platform's general settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneralSave} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input 
                      id="site-name" 
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Input 
                      id="site-description" 
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input 
                      id="support-email" 
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="maintenance-mode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => 
                        setGeneralSettings({...generalSettings, maintenanceMode: checked})
                      }
                    />
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="bg-gaming-primary hover:bg-gaming-primary/90">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                  <Button type="button" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure how payments are processed on your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSave} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="default-price">Default Price (SOL)</Label>
                    <Input 
                      id="default-price" 
                      type="number"
                      step="0.01"
                      value={paymentSettings.defaultPrice}
                      onChange={(e) => setPaymentSettings({...paymentSettings, defaultPrice: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                    <Input 
                      id="tax-rate" 
                      type="number"
                      step="0.1"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="discount-enabled"
                      checked={paymentSettings.discountEnabled}
                      onCheckedChange={(checked) => 
                        setPaymentSettings({...paymentSettings, discountEnabled: checked})
                      }
                    />
                    <Label htmlFor="discount-enabled">Enable Discount Codes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="multiple-wallets"
                      checked={paymentSettings.allowMultipleWallets}
                      onCheckedChange={(checked) => 
                        setPaymentSettings({...paymentSettings, allowMultipleWallets: checked})
                      }
                    />
                    <Label htmlFor="multiple-wallets">Allow Multiple Wallet Connections</Label>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="bg-gaming-primary hover:bg-gaming-primary/90">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                  <Button type="button" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
