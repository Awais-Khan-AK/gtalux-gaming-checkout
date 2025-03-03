
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CheckoutContainerProps {
  children: ReactNode;
  className?: string;
}

const CheckoutContainer = ({ children, className }: CheckoutContainerProps) => {
  return (
    <div 
      className={cn(
        'glassmorphism rounded-xl p-8 max-w-xl w-full mx-auto',
        'shadow-[0_10px_50px_rgba(15,160,206,0.2)]',
        'animate-scale-in',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CheckoutContainer;
