import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx';
import ProgramPage from './pages/ProgramPage.jsx';

/* Routed navigation should land at the top of the new page, not keep the
 * scroll offset from the previous one. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="page">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/programs/:slug" element={<ProgramPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
