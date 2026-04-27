import { Nav, ScrollProgress } from './components/Nav';
import { Hero } from './components/Hero';
import { WhoFor } from './components/WhoFor';
import { Work } from './components/Work';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#08070a] text-[#efeae0] overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <WhoFor />
        <Work />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
