'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
  startAnimation?: boolean;
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  className = '',
  startAnimation = true 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          setIsVisible(true);
          hasStarted.current = true;
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !startAnimation) return;

    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = Math.floor(easeOutQuart * end);
      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end with exact number
      }
    };

    // Small delay to make the animation feel more natural
    const timer = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 200);

    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible, end, duration, startAnimation]);

  const formatNumber = (num: number) => {
    // Add comma separators for large numbers
    return num.toLocaleString();
  };

  return (
    <div ref={countRef} className={`tabular-nums ${className}`}>
      {formatNumber(count)}{suffix}
    </div>
  );
}