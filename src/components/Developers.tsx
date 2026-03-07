import { Code2, Zap } from 'lucide-react';

function Developers() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-yellow-400">
            Our Team
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 border border-yellow-500/40 backdrop-blur-sm p-8 rounded-xl transition-all duration-300 hover:border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="flex items-start gap-4 mb-4 relative z-10">
              <div className="p-3 bg-gray-900 rounded-lg border border-yellow-500/50">
                <Code2 className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Zenthic</h3>
                <p className="text-yellow-400 font-semibold">Owner</p>
                <p className="text-gray-400 text-sm mt-1">Developer of Campfire Labs</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 relative z-10 font-medium">3 years of experience</p>
            <ul className="space-y-2 text-gray-400 relative z-10">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Simulator Development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Tycoon Frameworks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                UI/UX Design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Gameplay Mechanics
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Full-Scale Game Development
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 border border-yellow-500/40 backdrop-blur-sm p-8 rounded-xl transition-all duration-300 hover:border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="flex items-start gap-4 mb-4 relative z-10">
              <div className="p-3 bg-gray-900 rounded-lg border border-yellow-500/50">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Kexy</h3>
                <p className="text-yellow-400 font-semibold">Co Owner</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 relative z-10 font-medium">5 years of experience</p>
            <ul className="space-y-2 text-gray-400 relative z-10">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Physics Systems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Combat Mechanics
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Vehicle Systems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Datastore Architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Advanced Scripting
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Developers;
