
import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedText from '@/components/AnimatedText';
import CheckoutContainer from '@/components/CheckoutContainer';
import GamingStats from '@/components/GamingStats';
import WalletButton from '@/components/WalletButton';
import { Download, Coin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { WalletState, formatBalance } from '@/utils/phantomWallet';

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
                    <Coin size={18} className="text-gaming-primary" />
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
