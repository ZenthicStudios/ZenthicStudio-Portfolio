import { useEffect, useState, useRef } from 'react';
import { Gamepad2, Eye, Clock } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    if (label === 'Games Made') {
      let current = 0;
      const target = 10;
      const increment = 1;
      const duration = 1200;
      const steps = target / increment;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayValue('10+');
          clearInterval(timer);
        } else {
          setDisplayValue(current.toString());
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else if (label === 'Total Visits') {
      let current = 0;
      const target = 2000000;
      const duration = 1500;
      const steps = 50;
      const increment = target / steps;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayValue('2M+');
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current / 1000) + 'K');
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else if (label === 'Experience') {
      let current = 0;
      const target = 4;
      const increment = 1;
      const duration = 1200;
      const steps = target / increment;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayValue(target + ' Years');
          clearInterval(timer);
        } else {
          setDisplayValue(current + ' Years');
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, label]);

  return (
    <div
      ref={ref}
      className={`bg-gray-800 border border-yellow-500/40 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 hover:border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-yellow-400">
          {icon}
        </div>
        <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
          {displayValue}
        </div>
        <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<Gamepad2 size={48} />}
            value="10+"
            label="Games Made"
            delay={0}
          />
          <StatCard
            icon={<Eye size={48} />}
            value="2M+"
            label="Total Visits"
            delay={200}
          />
          <StatCard
            icon={<Clock size={48} />}
            value="4 Years"
            label="Experience"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
}

export default Stats;
