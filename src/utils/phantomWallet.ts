
// This utility handles Phantom wallet connection and interactions

export interface PhantomProvider {
  isPhantom?: boolean;
  connect: (args?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: (args: any) => void) => void;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  signTransaction: (transaction: any) => Promise<any>;
  signAllTransactions: (transactions: any[]) => Promise<any[]>;
  getBalance: () => Promise<number>;
}

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  balance: number | null;
}

export const getProvider = (): PhantomProvider | null => {
  if (typeof window !== 'undefined' && 'solana' in window) {
    const provider = (window as any).solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  return null;
};

export const connectWallet = async (): Promise<WalletState> => {
  try {
    const provider = getProvider();
    
    if (!provider) {
      // No provider found - open download page
      window.open('https://phantom.app/', '_blank');
      return {
        connected: false,
        publicKey: null,
        balance: null
      };
    }
    
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();
    const balance = await provider.getBalance();
    
    return {
      connected: true,
      publicKey,
      balance
    };
  } catch (error) {
    console.error('Error connecting to Phantom wallet:', error);
    return {
      connected: false,
      publicKey: null,
      balance: null
    };
  }
};

export const disconnectWallet = async (): Promise<void> => {
  const provider = getProvider();
  if (provider) {
    await provider.disconnect();
  }
};

export const formatBalance = (balance: number | null): string => {
  if (balance === null) return '0.00 SOL';
  return (balance / 1000000000).toFixed(4) + ' SOL';
};
