import { useEffect, useState, useRef } from 'react';
import { Gamepad2, Eye, Clock } from 'lucide-react';

// ============================================================
// EDIT YOUR STATS HERE
// ============================================================
const STATS = {
  games: {
    count: 10,          // Number of games
    label: 'Games Made',
  },
  visits: {
    count: 2000000,     // Total visits (number)
    label: 'Total Visits',
  },
  experience: {
    years: 4,           // Years of experience
    label: 'Experience',
  },
};
// ============================================================

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  delay: number;
  animateTo: number;
  type: 'count' | 'visits' | 'years';
}

function formatVisits(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return Math.floor(n / 1000) + 'K';
  return n.toString();
}

function StatCard({ icon, label, delay, animateTo, type }: StatCardProps) {
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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1400;
    const steps = type === 'visits' ? 50 : animateTo;
    const increment = animateTo / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= animateTo) {
        if (type === 'visits') setDisplayValue(formatVisits(animateTo) + '+');
        else if (type === 'years') setDisplayValue(animateTo + ' Years');
        else setDisplayValue(animateTo + '+');
        clearInterval(timer);
      } else {
        if (type === 'visits') setDisplayValue(formatVisits(Math.floor(current)));
        else if (type === 'years') setDisplayValue(Math.floor(current) + ' Years');
        else setDisplayValue(Math.floor(current).toString());
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, animateTo, type]);

  return (
    <div
      ref={ref}
      className={`bg-gray-800 border border-yellow-500/40 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 hover:border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-yellow-400">{icon}</div>
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
            label={STATS.games.label}
            animateTo={STATS.games.count}
            type="count"
            delay={0}
          />
          <StatCard
            icon={<Eye size={48} />}
            label={STATS.visits.label}
            animateTo={STATS.visits.count}
            type="visits"
            delay={200}
          />
          <StatCard
            icon={<Clock size={48} />}
            label={STATS.experience.label}
            animateTo={STATS.experience.years}
            type="years"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
}

export default Stats;
