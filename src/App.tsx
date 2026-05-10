import { HashRouter } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { LanguageProvider } from './i18n/LanguageContext';
import { AppRouter } from './routes/AppRouter';

export function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="min-h-screen bg-warm text-navy">
          <Header />
          <AppRouter />
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}
