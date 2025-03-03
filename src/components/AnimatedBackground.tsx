
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [dots, setDots] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  
  useEffect(() => {
    // Create random dots for the background
    const newDots = [];
    for (let i = 0; i < 15; i++) {
      newDots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 150 + 50
      });
    }
    setDots(newDots);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden z-[-1]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {dots.map((dot) => (
        <div 
          key={dot.id}
          className="blur-dot animate-float"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.id * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
