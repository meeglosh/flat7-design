import { ThemeProvider, useTheme } from './context/ThemeContext';
import { DefaultPage } from './themes/DefaultPage';
import { MySpacePage } from './themes/myspace/MySpacePage';
import { MidCenturyPage } from './themes/midcentury/MidCenturyPage';
import { BauhausPage } from './themes/bauhaus/BauhausPage';
import { GenZPage } from './themes/genz/GenZPage';
import { LuxuryPage } from './themes/luxury/LuxuryPage';

function PageRouter() {
  const { styleTheme } = useTheme();
  switch (styleTheme) {
    case 'myspace':    return <MySpacePage />;
    case 'midcentury': return <MidCenturyPage />;
    case 'bauhaus':    return <BauhausPage />;
    case 'genz':       return <GenZPage />;
    case 'luxury':     return <LuxuryPage />;
    default:           return <DefaultPage />;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <PageRouter />
    </ThemeProvider>
  );
}
