import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { DefaultPage } from './themes/DefaultPage';
import { MySpacePage } from './themes/myspace/MySpacePage';
import { MidCenturyPage } from './themes/midcentury/MidCenturyPage';
import { BauhausPage } from './themes/bauhaus/BauhausPage';
import { GenZPage } from './themes/genz/GenZPage';
import { LuxuryPage } from './themes/luxury/LuxuryPage';
import { CaseStudiesGallery } from './pages/CaseStudiesGallery';
import { CaseStudyDetail } from './pages/CaseStudyDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

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
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PageRouter />} />
          <Route path="/case-studies" element={<CaseStudiesGallery />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
