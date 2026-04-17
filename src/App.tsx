import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Grain } from './components/Grain';
import { Background } from './components/Background';

export default function App() {
  return (
    <div className="min-h-screen text-parchment font-body">
      <Background />
      <Grain />
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
