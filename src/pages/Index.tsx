
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedText from '@/components/AnimatedText';
import CheckoutContainer from '@/components/CheckoutContainer';
import GamingStats from '@/components/GamingStats';
import WalletButton from '@/components/WalletButton';
import { Download, Coins, Settings, Shield, Zap, Database } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { WalletState, formatBalance } from '@/utils/phantomWallet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Import cyberpunk images
import cyberpunkCity from '/cyberpunk-city.jpg';
import cyberpunkChar from '/cyberpunk-character.jpg';
import cyberpunkTech from '/cyberpunk-tech.jpg';

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  
  const stats = [
    { value: '10,000+', label: 'Digital Games' },
    { value: '2 Million', label: 'Gaming Accounts' },
    { value: 'Gtalux', label: 'Gaming Database' }
  ];
  
  const handleWalletConnect = (walletState: WalletState) => {
    setWalletConnected(walletState.connected);
    setWalletBalance(walletState.balance);
    setPublicKey(walletState.publicKey);
  };
  
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your digital items will download shortly.",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 relative">
      <AnimatedBackground />
      
      {/* Admin Link */}
      <Link 
        to="/admin" 
        className="fixed top-4 right-4 z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        title="Admin Panel"
      >
        <Settings size={20} />
      </Link>
      
      {/* Privacy Policy Link */}
      <Link 
        to="/privacy-policy" 
        className="fixed top-4 left-4 z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        title="Privacy Policy"
      >
        <Shield size={20} />
      </Link>
      
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <AnimatedText
            text="Gtalux Checkout"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient text-shadow mb-4"
          />
          <AnimatedText
            text="Complete Payment to Download Your Digital Items"
            delay={300}
            className="text-xl md:text-2xl text-gaming-light/90 max-w-md mx-auto"
          />
        </div>
        
        {/* Gaming Stats */}
        <GamingStats stats={stats} />
        
        {/* Checkout Container */}
        <CheckoutContainer className="my-8">
          {!walletConnected ? (
            <>
              <div className="mb-8 text-center">
                <AnimatedText
                  text="Ready to access your premium gaming content?"
                  delay={600}
                  className="text-xl font-medium mb-2"
                />
                <AnimatedText
                  text="Connect your Phantom wallet to complete this transaction securely."
                  delay={800}
                  className="text-sm text-gaming-light/70"
                />
              </div>
              
              <WalletButton onConnect={handleWalletConnect} />
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                <AnimatedText
                  text="Payment Complete!"
                  className="text-2xl font-bold text-gradient mb-2"
                />
                <AnimatedText
                  text="Thank you for your purchase. Your digital items are ready for download."
                  delay={200}
                  className="text-sm text-gaming-light/70 mb-4"
                />
                
                {/* Wallet Balance Display */}
                <div className="glassmorphism p-4 rounded-lg mt-4 mx-auto max-w-sm animate-fade-in">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins size={18} className="text-gaming-primary" />
                    <span className="text-lg font-medium">Wallet Balance:</span>
                  </div>
                  <div className="text-2xl font-bold text-gradient">
                    {formatBalance(walletBalance)}
                  </div>
                  {publicKey && (
                    <div className="mt-2 text-xs text-gaming-light/60 truncate max-w-[250px] mx-auto">
                      {publicKey.slice(0, 6)}...{publicKey.slice(-6)}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-lg w-full
                  bg-gradient-to-r from-gaming-secondary to-gaming-primary
                  text-white font-medium text-lg shadow-lg
                  transition-all duration-300 ease-out transform
                  hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] hover:-translate-y-1
                  active:scale-[0.98]"
              >
                <Download size={22} />
                Download Digital Items
              </button>
            </>
          )}
        </CheckoutContainer>
        
        {/* New Cyberpunk Feature Sections */}
        <section className="w-full my-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient text-shadow mb-4">
              Explore Cyberpunk Gaming Universe
            </h2>
            <p className="text-gaming-light/70 max-w-2xl mx-auto">
              Immerse yourself in the neon-lit streets and high-tech future with our premium digital assets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glassmorphism rounded-xl overflow-hidden hover-glow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={cyberpunkCity} 
                  alt="Cyberpunk City" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-gaming-primary" size={20} />
                  <h3 className="text-xl font-bold text-gradient">Night City Chronicles</h3>
                </div>
                <p className="text-gaming-light/70 mb-4">
                  Explore the dangerous streets and towering megacorporations in this cybernetic future.
                </p>
                <Button variant="outline" className="w-full border-gaming-primary/30 text-gaming-primary hover:bg-gaming-primary/10">
                  Explore Assets
                </Button>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="glassmorphism rounded-xl overflow-hidden hover-glow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={cyberpunkChar} 
                  alt="Cyberpunk Character" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="text-gaming-secondary" size={20} />
                  <h3 className="text-xl font-bold text-gradient">Augmented Reality</h3>
                </div>
                <p className="text-gaming-light/70 mb-4">
                  Customize your character with cutting-edge cybernetic enhancements and digital weapons.
                </p>
                <Button variant="outline" className="w-full border-gaming-secondary/30 text-gaming-secondary hover:bg-gaming-secondary/10">
                  View Characters
                </Button>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="glassmorphism rounded-xl overflow-hidden hover-glow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={cyberpunkTech} 
                  alt="Cyberpunk Technology" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-gaming-accent" size={20} />
                  <h3 className="text-xl font-bold text-gradient">Neural Networks</h3>
                </div>
                <p className="text-gaming-light/70 mb-4">
                  Access exclusive hacking tools and digital enhancements for your gaming experience.
                </p>
                <Button variant="outline" className="w-full border-gaming-accent/30 text-gaming-accent hover:bg-gaming-accent/10">
                  Unlock Access
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full my-16 text-center">
          <div className="glassmorphism rounded-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient text-shadow mb-4">
              Ready to Join the Digital Revolution?
            </h2>
            <p className="text-gaming-light/70 max-w-2xl mx-auto mb-8">
              Get access to exclusive cyberpunk digital assets, character mods, and in-game items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-gaming-primary to-gaming-secondary hover:opacity-90">
                Explore Marketplace
              </Button>
              <Link to="/privacy-policy">
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  Read Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <div className="w-full mt-16 mb-8">
          <Separator className="bg-white/10 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gaming-light/60 text-sm">
              © 2023 Gtalux Gaming. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-gaming-light/60 hover:text-gaming-primary text-sm">
                Privacy Policy
              </Link>
              <a href="#" className="text-gaming-light/60 hover:text-gaming-primary text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gaming-light/60 hover:text-gaming-primary text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
