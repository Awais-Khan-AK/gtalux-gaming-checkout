
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

interface Stat {
  value: string;
  label: string;
}

interface GamingStatsProps {
  stats: Stat[];
  className?: string;
}

const GamingStats = ({ stats, className }: GamingStatsProps) => {
  return (
    <div className={cn('flex flex-wrap justify-center gap-6 my-8', className)}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="glassmorphism p-4 rounded-lg text-center animate-float hover-glow"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <AnimatedText 
            text={stat.value}
            delay={index * 150}
            className="text-2xl font-bold text-gradient mb-1"
          />
          <AnimatedText 
            text={stat.label}
            delay={index * 150 + 100}
            className="text-sm text-gaming-light/80"
          />
        </div>
      ))}
    </div>
  );
};

export default GamingStats;
