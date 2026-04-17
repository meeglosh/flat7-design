import { useTheme, type StyleTheme } from '../context/ThemeContext';

const THEMES: { id: StyleTheme; label: string }[] = [
  { id: 'noir',       label: 'Neo'         },
  { id: 'midcentury', label: 'Mid-Century' },
  { id: 'luxury',     label: 'Luxury'      },
  { id: 'bauhaus',    label: 'Bauhaus'     },
  { id: 'genz',       label: 'Gen Z'       },
  { id: 'myspace',    label: 'MySpace'     },
];

export function ThemeTabBar({ className = '', wrap = false }: { className?: string; wrap?: boolean }) {
  const { styleTheme, setStyleTheme } = useTheme();
  return (
    <div
      className={`flex gap-2 ${wrap ? 'flex-wrap justify-center' : 'overflow-x-auto'} ${className}`}
      style={wrap ? undefined : { scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {THEMES.map(t => (
        <button
          key={t.id}
          onClick={() => setStyleTheme(t.id)}
          className={`theme-tab${styleTheme === t.id ? ' theme-tab-active' : ''}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
