export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 h-14 border-b border-parchment/[0.06] backdrop-blur-sm bg-ink/80">
      <span className="font-mono text-xs text-parchment/60 tracking-widest">
        flat7.design
      </span>
      <a
        href="mailto:mike@flat7.design"
        className="font-mono text-xs text-parchment/60 hover:text-amber transition-colors duration-300 tracking-wider"
      >
        mike@flat7.design
      </a>
    </nav>
  );
}
