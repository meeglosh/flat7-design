import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const theme = colorScheme;
  return (
    <button
      onClick={toggleColorScheme}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center text-fg/40 hover:text-fg/80 transition-colors duration-300"
    >
      {theme === 'dark' ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="7" cy="7" r="3" />
          <line x1="7" y1="0.5" x2="7" y2="2.5" />
          <line x1="7" y1="11.5" x2="7" y2="13.5" />
          <line x1="0.5" y1="7" x2="2.5" y2="7" />
          <line x1="11.5" y1="7" x2="13.5" y2="7" />
          <line x1="2.4" y1="2.4" x2="3.8" y2="3.8" />
          <line x1="10.2" y1="10.2" x2="11.6" y2="11.6" />
          <line x1="11.6" y1="2.4" x2="10.2" y2="3.8" />
          <line x1="3.8" y1="10.2" x2="2.4" y2="11.6" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M11.5 7.5A5 5 0 1 1 6.5 2.5a3.5 3.5 0 0 0 5 5z" />
        </svg>
      )}
    </button>
  );
}

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
      <div className="flex items-center gap-4 shrink-0">
        <ThemeToggle />
        <a
          href="#contact"
          className="font-mono text-[10px] text-fg/45 tracking-[0.3em] uppercase hover:text-fg/75 transition-colors duration-300"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
