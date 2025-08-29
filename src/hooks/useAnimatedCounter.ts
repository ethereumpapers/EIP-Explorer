import { useState, useEffect } from 'react';

interface UseAnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
  delay?: number;
}

export function useAnimatedCounter({ 
  end, 
  duration = 2000, 
  start = 0, 
  delay = 0 
}: UseAnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      const startTime = Date.now();
      const startValue = start;
      const endValue = end;
      const totalDuration = duration;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, start, delay]);

  return { count, isAnimating };
}
