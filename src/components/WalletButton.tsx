
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Wallet, Loader2, Coin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { connectWallet, WalletState, formatBalance } from '@/utils/phantomWallet';

interface WalletButtonProps {
  onConnect?: (walletState: WalletState) => void;
  price?: string;
  className?: string;
}

const WalletButton = ({ onConnect, price = "0.1 SOL", className }: WalletButtonProps) => {
  const [connecting, setConnecting] = useState(false);
  
  const handleConnect = async () => {
    setConnecting(true);
    
    try {
      const walletState = await connectWallet();
      
      if (walletState.connected) {
        toast({
          title: "Wallet Connected",
          description: "You can now proceed with your payment.",
          duration: 3000,
        });
        
        if (onConnect) onConnect(walletState);
      } else {
        toast({
          title: "Connection Failed",
          description: "Please install Phantom wallet or try again.",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setConnecting(false);
    }
  };
  
  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className={cn(
        'flex items-center justify-center gap-3 py-4 px-6 rounded-lg w-full',
        'bg-gradient-to-r from-gaming-primary to-gaming-secondary',
        'text-white font-medium text-lg shadow-lg',
        'transition-all duration-300 ease-out transform',
        'hover:shadow-[0_0_20px_rgba(15,160,206,0.7)] hover:-translate-y-1',
        'active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait',
        'relative overflow-hidden',
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {connecting ? <Loader2 size={22} className="animate-spin" /> : <Wallet size={22} />}
        {connecting ? 'Connecting...' : `Connect Phantom & Pay ${price}`}
      </span>
      
      {/* Button glow effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gaming-primary/40 to-gaming-secondary/40 blur-md animate-pulse-soft" />
    </button>
  );
};

export default WalletButton;
