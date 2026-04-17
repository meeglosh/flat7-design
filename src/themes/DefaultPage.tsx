import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Work } from '../components/Work';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';
import { Grain } from '../components/Grain';

export function DefaultPage() {
  return (
    <div className="min-h-screen text-fg font-body bg-bg">
      <Grain />
      <div className="fixed inset-3 z-50 border border-fg/[0.1] pointer-events-none" />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
