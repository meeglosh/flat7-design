export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center h-14 px-6 md:px-14">
      <a
        href="#work"
        className="font-mono text-[10px] text-fg/45 tracking-[0.3em] uppercase hover:text-fg/75 transition-colors duration-300 shrink-0"
      >
        Work
      </a>
      <div className="flex-1 flex items-center px-4 md:px-8 gap-4 md:gap-8">
        <div className="flex-1 h-px bg-fg/[0.1]" />
        <span className="font-mono text-[11px] text-fg/55 tracking-[0.45em] uppercase shrink-0">
          Mike Jerugim
        </span>
        <div className="flex-1 h-px bg-fg/[0.1]" />
      </div>
      <a
        href="#contact"
        className="font-mono text-[10px] text-fg/45 tracking-[0.3em] uppercase hover:text-fg/75 transition-colors duration-300 shrink-0"
      >
        Contact
      </a>
    </nav>
  );
}
