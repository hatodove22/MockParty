import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ContestWizard } from './components/wizard/ContestWizard';
import { AppRouter } from './routes/AppRouter';

export function App() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen bg-warm text-navy">
        <Header onOpenWizard={() => setWizardOpen(true)} />
        <AppRouter onOpenWizard={() => setWizardOpen(true)} />
        <Footer />
        <ContestWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      </div>
    </HashRouter>
  );
}
