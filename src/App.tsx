import Hero from './components/Hero';
import Stats from './components/Stats';
import Developers from './components/Developers';
import Projects from './components/Projects';
import UnofficialProjects from './components/UnofficialProjects';
import Payment from './components/Payment';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-black/30 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.1),transparent)] pointer-events-none" />
      <Hero />
      <Stats />
      <Developers />
      <Projects />
      <UnofficialProjects />
      <Payment />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
