import { Route, Routes } from 'react-router-dom';
import { BrowsePage } from '../pages/BrowsePage';
import { ContestDetailPage } from '../pages/ContestDetailPage';
import { CreatorPage } from '../pages/CreatorPage';
import { HomePage } from '../pages/HomePage';
import { SafetyPage } from '../pages/SafetyPage';

export function AppRouter({ onOpenWizard }: { onOpenWizard: () => void }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage onOpenWizard={onOpenWizard} />} />
      <Route path="/contests" element={<BrowsePage />} />
      <Route path="/contests/:contestId" element={<ContestDetailPage />} />
      <Route path="/creators" element={<CreatorPage />} />
      <Route path="/safety" element={<SafetyPage />} />
    </Routes>
  );
}
