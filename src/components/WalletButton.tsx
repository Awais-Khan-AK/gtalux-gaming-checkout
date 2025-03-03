
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Wallet } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface WalletButtonProps {
  onConnect?: () => void;
  price?: string;
  className?: string;
}

const WalletButton = ({ onConnect, price = "0.1 SOL", className }: WalletButtonProps) => {
  const [connecting, setConnecting] = useState(false);
  
  const handleConnect = () => {
    setConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setConnecting(false);
      
      toast({
        title: "Wallet Connected",
        description: "You can now proceed with your payment.",
        duration: 3000,
      });
      
      if (onConnect) onConnect();
    }, 1500);
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
        <Wallet size={22} />
        {connecting ? 'Connecting...' : `Connect Wallet & Pay ${price}`}
      </span>
      
      {/* Button glow effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gaming-primary/40 to-gaming-secondary/40 blur-md animate-pulse-soft" />
    </button>
  );
};

export default WalletButton;
