import { useTheme } from '../context/ThemeContext';

export interface ThemeTokens {
  pageBg: string;
  pageBg2: string;
  text: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentDim: string;
  border: string;
  cardBg: string;
  navBg: string;
  display: string;
  body: string;
  mono: string;
  dark: boolean;
  isSerif: boolean;
}

export function useThemeTokens(): ThemeTokens {
  const { styleTheme, colorScheme } = useTheme();
  const dark = colorScheme === 'dark';

  switch (styleTheme) {
    case 'genz':
      return {
        dark,
        pageBg:    dark ? '#0E0630' : '#FFFBEE',
        pageBg2:   dark ? '#130850' : '#FFF3CC',
        text:      dark ? '#FFF8E6' : '#0A0814',
        textMuted: dark ? 'rgba(255,248,230,0.65)' : 'rgba(10,8,20,0.62)',
        textFaint: dark ? 'rgba(255,248,230,0.38)' : 'rgba(10,8,20,0.38)',
        accent:    dark ? '#FF7A1A' : '#F06500',
        accentDim: dark ? 'rgba(255,122,26,0.2)' : 'rgba(240,101,0,0.12)',
        border:    dark ? 'rgba(255,248,230,0.1)' : 'rgba(10,8,20,0.08)',
        cardBg:    dark ? '#1A0F58' : '#FFFFFF',
        navBg:     dark ? 'rgba(14,6,48,0.95)' : 'rgba(255,251,238,0.95)',
        display:   "'Syne', system-ui, sans-serif",
        body:      "'Plus Jakarta Sans', system-ui, sans-serif",
        mono:      "'IBM Plex Mono', monospace",
        isSerif:   false,
      };

    case 'bauhaus':
      return {
        dark,
        pageBg:    dark ? '#111111' : '#F5F0E8',
        pageBg2:   dark ? '#1A1A1A' : '#EDE8DC',
        text:      dark ? '#F5F0E8' : '#111111',
        textMuted: dark ? 'rgba(245,240,232,0.55)' : 'rgba(17,17,17,0.55)',
        textFaint: dark ? 'rgba(245,240,232,0.3)' : 'rgba(17,17,17,0.3)',
        accent:    '#E63329',
        accentDim: 'rgba(230,51,41,0.15)',
        border:    dark ? 'rgba(245,240,232,0.12)' : 'rgba(17,17,17,0.12)',
        cardBg:    dark ? '#1A1A1A' : '#EDE8DC',
        navBg:     dark ? 'rgba(17,17,17,0.96)' : 'rgba(245,240,232,0.96)',
        display:   "'Oswald', 'Plus Jakarta Sans', system-ui, sans-serif",
        body:      "'Plus Jakarta Sans', system-ui, sans-serif",
        mono:      "'IBM Plex Mono', monospace",
        isSerif:   false,
      };

    case 'midcentury':
      return {
        dark,
        pageBg:    dark ? '#1A1008' : '#FAF3E8',
        pageBg2:   dark ? '#211508' : '#F2E8D5',
        text:      dark ? '#EDD8B8' : '#2A1A06',
        textMuted: dark ? 'rgba(237,216,184,0.55)' : 'rgba(42,26,6,0.55)',
        textFaint: dark ? 'rgba(237,216,184,0.32)' : 'rgba(42,26,6,0.32)',
        accent:    dark ? '#E07040' : '#C65C3E',
        accentDim: dark ? 'rgba(224,112,64,0.2)' : 'rgba(198,92,62,0.15)',
        border:    dark ? 'rgba(237,216,184,0.12)' : 'rgba(42,26,6,0.12)',
        cardBg:    dark ? '#211508' : '#F2E8D5',
        navBg:     dark ? 'rgba(26,16,8,0.92)' : 'rgba(250,243,232,0.95)',
        display:   "'Playfair Display', Georgia, serif",
        body:      "'DM Sans', system-ui, sans-serif",
        mono:      "'DM Mono', 'IBM Plex Mono', monospace",
        isSerif:   true,
      };

    case 'luxury':
      return {
        dark,
        pageBg:    dark ? '#0C0B09' : '#FAF7F2',
        pageBg2:   dark ? '#141210' : '#F2EDE4',
        text:      dark ? '#EDE8E0' : '#1A1714',
        textMuted: dark ? 'rgba(237,232,224,0.5)' : 'rgba(26,23,20,0.5)',
        textFaint: dark ? 'rgba(237,232,224,0.28)' : 'rgba(26,23,20,0.28)',
        accent:    dark ? '#C4A882' : '#8A6D48',
        accentDim: dark ? 'rgba(196,168,130,0.2)' : 'rgba(138,109,72,0.15)',
        border:    dark ? 'rgba(237,232,224,0.1)' : 'rgba(26,23,20,0.1)',
        cardBg:    dark ? '#141210' : '#F2EDE4',
        navBg:     dark ? 'rgba(12,11,9,0.94)' : 'rgba(250,247,242,0.94)',
        display:   "'Bodoni Moda', 'Playfair Display', Georgia, serif",
        body:      "'DM Sans', system-ui, sans-serif",
        mono:      "'DM Mono', 'IBM Plex Mono', monospace",
        isSerif:   true,
      };

    case 'myspace':
      return {
        dark,
        pageBg:    dark ? '#111111' : '#e8e8e8',
        pageBg2:   dark ? '#1a1a2a' : '#d5e8f3',
        text:      dark ? '#cccccc' : '#000000',
        textMuted: dark ? '#888888' : '#555555',
        textFaint: dark ? '#555555' : '#999999',
        accent:    dark ? '#ff8833' : '#0033cc',
        accentDim: dark ? 'rgba(255,136,51,0.2)' : 'rgba(0,51,204,0.1)',
        border:    dark ? '#334477' : '#aaaaaa',
        cardBg:    dark ? '#1a1a2a' : '#ffffff',
        navBg:     dark ? '#1a2a5a' : '#4b7bb5',
        display:   '"Arial Black", "Arial Bold", Arial, sans-serif',
        body:      'Verdana, Geneva, Arial, sans-serif',
        mono:      '"Courier New", Courier, monospace',
        isSerif:   false,
      };

    default: // noir
      return {
        dark,
        pageBg:    dark ? '#09090C' : '#F8F4EE',
        pageBg2:   dark ? '#0F0F14' : '#F0EAE0',
        text:      dark ? '#E8DCC8' : '#14110E',
        textMuted: dark ? 'rgba(232,220,200,0.55)' : 'rgba(20,17,14,0.55)',
        textFaint: dark ? 'rgba(232,220,200,0.32)' : 'rgba(20,17,14,0.32)',
        accent:    '#FF3D5A',
        accentDim: 'rgba(255,61,90,0.15)',
        border:    dark ? 'rgba(232,220,200,0.08)' : 'rgba(20,17,14,0.08)',
        cardBg:    dark ? '#0F0F14' : '#F0EAE0',
        navBg:     dark ? 'rgba(9,9,12,0.95)' : 'rgba(248,244,238,0.95)',
        display:   "'Bebas Neue', system-ui, sans-serif",
        body:      "'Space Grotesk', system-ui, sans-serif",
        mono:      "'IBM Plex Mono', monospace",
        isSerif:   false,
      };
  }
}
