import { createContext, useContext, useEffect, useState } from 'react';

export type ColorScheme = 'dark' | 'light';
export type StyleTheme  = 'noir' | 'midcentury' | 'bauhaus' | 'genz' | 'myspace' | 'luxury';

// Default color scheme for first-time visits only.
// Add entries here as each theme's default is decided.
const THEME_COLOR_DEFAULTS: Partial<Record<StyleTheme, ColorScheme>> = {
  myspace:    'light',
  midcentury: 'light',
  bauhaus:    'light',
  genz:       'dark',
};

const schemeKey = (t: StyleTheme) => `colorScheme_${t}`;

function resolveScheme(theme: StyleTheme): ColorScheme {
  const stored = localStorage.getItem(schemeKey(theme)) as ColorScheme | null;
  if (stored === 'dark' || stored === 'light') return stored;
  return THEME_COLOR_DEFAULTS[theme] ?? 'dark';
}

interface ThemeState {
  colorScheme: ColorScheme;
  styleTheme:  StyleTheme;
  toggleColorScheme: () => void;
  setStyleTheme: (t: StyleTheme) => void;
}

const ThemeContext = createContext<ThemeState>({
  colorScheme: 'dark',
  styleTheme:  'noir',
  toggleColorScheme: () => {},
  setStyleTheme:     () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [styleTheme, setStyleThemeState] = useState<StyleTheme>(
    () => (localStorage.getItem('styleTheme') as StyleTheme) ?? 'noir'
  );
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    () => resolveScheme((localStorage.getItem('styleTheme') as StyleTheme) ?? 'noir')
  );

  // Persist color scheme per theme and apply to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    localStorage.setItem(schemeKey(styleTheme), colorScheme);
  }, [colorScheme, styleTheme]);

  // Persist style theme
  useEffect(() => {
    document.documentElement.setAttribute('data-style-theme', styleTheme);
    localStorage.setItem('styleTheme', styleTheme);
  }, [styleTheme]);

  const toggleColorScheme = () =>
    setColorScheme(s => (s === 'dark' ? 'light' : 'dark'));

  const setStyleTheme = (t: StyleTheme) => {
    setStyleThemeState(t);
    setColorScheme(resolveScheme(t));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, styleTheme, toggleColorScheme, setStyleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
