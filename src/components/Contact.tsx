import { Mail, MessageSquare, Users } from 'lucide-react';

function Contact() {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-yellow-400">
            Get In Touch
          </span>
        </h2>

        <div className="text-center mb-12">
          <p className="text-2xl md:text-3xl text-white font-semibold mb-3 leading-tight">
            Open for Commissions & Collaborations
          </p>
          <p className="text-gray-400 text-lg">
            Ready to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <a
            href="https://discord.gg/CZa8HPhxcA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-indigo-600 to-indigo-700 border border-indigo-500/50 backdrop-blur-sm p-8 rounded-xl transition-all duration-300 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105 flex items-center gap-4 group"
          >
            <div className="p-4 bg-indigo-700/50 rounded-lg border border-indigo-400/50 group-hover:bg-indigo-600/50 transition-colors duration-300">
              <MessageSquare className="w-10 h-10 text-indigo-100" />
            </div>
            <div>
              <p className="text-sm text-indigo-200 mb-1 uppercase tracking-wide font-semibold">Discord</p>
              <p className="text-2xl font-bold text-white">ZenthicDev</p>
            </div>
          </a>

          <a
            href="mailto:ZenthicDev@gmail.com"
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/40 backdrop-blur-sm p-8 rounded-xl transition-all duration-300 hover:border-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:scale-105 flex items-center gap-4 group"
          >
            <div className="p-4 bg-gray-900 rounded-lg border border-yellow-500/50 group-hover:border-yellow-400 transition-colors duration-300">
              <Mail className="w-10 h-10 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1 uppercase tracking-wide font-semibold">Email</p>
              <p className="text-2xl font-bold text-white">ZenthicDev@gmail.com</p>
            </div>
          </a>
        </div>

        <div className="text-center">
          <a
            href="https://discord.gg/CZa8HPhxcA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 group transform-gpu"
          >
            <Users className="w-6 h-6" />
            Join Our Discord
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
