import { useEffect, useState } from 'react';

function Hero() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setTitleVisible(true), 200);
    setTimeout(() => setTaglineVisible(true), 800);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto">
        <h1
          className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
            Zenthic Studio
          </span>
        </h1>

        <p
          className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-300 leading-relaxed ${
            taglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Crafting immersive Roblox experiences with advanced gameplay systems,
          <br className="hidden md:block" />
          polished UI/UX design, and optimized performance
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
          taglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="#projects"
            className="px-8 py-4 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all duration-300 hover:scale-105 transform-gpu"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-gray-800 border-2 border-yellow-500 text-yellow-400 rounded-lg font-semibold hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all duration-300 hover:scale-105 transform-gpu"
          >
            Get In Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400/60 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-yellow-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
