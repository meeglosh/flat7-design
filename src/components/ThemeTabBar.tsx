import { useTheme, type StyleTheme } from '../context/ThemeContext';

const THEMES: { id: StyleTheme; label: string }[] = [
  { id: 'noir',       label: 'Neo'         },
  { id: 'midcentury', label: 'Mid-Century' },
  { id: 'bauhaus',    label: 'Bauhaus'     },
  { id: 'genz',       label: 'Gen Z'       },
  { id: 'myspace',    label: 'MySpace'     },
  { id: 'luxury',     label: 'Luxury'      },
];

export function ThemeTabBar({ className = '' }: { className?: string }) {
  const { styleTheme, setStyleTheme } = useTheme();
  return (
    <div
      className={`flex gap-2 overflow-x-auto ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
