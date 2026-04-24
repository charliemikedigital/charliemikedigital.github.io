import { Nav, ScrollProgress } from './components/Nav';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { WhoFor } from './components/WhoFor';
import { Work } from './components/Work';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#08070a] text-[#efeae0] overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <WhoFor />
        <Work />
        <Services />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <About />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
