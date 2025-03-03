
import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedText from '@/components/AnimatedText';
import CheckoutContainer from '@/components/CheckoutContainer';
import GamingStats from '@/components/GamingStats';
import WalletButton from '@/components/WalletButton';
import { Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  
  const stats = [
    { value: '10,000+', label: 'Digital Games' },
    { value: '2 Million', label: 'Gaming Accounts' },
    { value: 'Gtalux', label: 'Gaming Database' }
  ];
  
  const handleWalletConnect = () => {
    setWalletConnected(true);
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
                  text="Connect your wallet to complete this transaction securely."
                  delay={800}
                  className="text-sm text-gaming-light/70"
                />
              </div>
              
              <WalletButton onConnect={handleWalletConnect} />
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <AnimatedText
                  text="Payment Complete!"
                  className="text-2xl font-bold text-gradient mb-2"
                />
                <AnimatedText
                  text="Thank you for your purchase. Your digital items are ready for download."
                  delay={200}
                  className="text-sm text-gaming-light/70"
                />
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
        
        {/* Footer */}
        <div className="text-center mt-6">
          <AnimatedText
            text="© 2023 Gtalux Gaming. All rights reserved."
            delay={1000}
            className="text-sm text-gaming-light/60"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
