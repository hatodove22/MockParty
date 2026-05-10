import { Route, Routes } from 'react-router-dom';
import { BrowsePage } from '../pages/BrowsePage';
import { ContestCreatedPage } from '../pages/ContestCreatedPage';
import { ContestDetailPage } from '../pages/ContestDetailPage';
import { CreatorPage } from '../pages/CreatorPage';
import { EntryDetailPage } from '../pages/EntryDetailPage';
import { HomePage } from '../pages/HomePage';
import { NewContestPage } from '../pages/NewContestPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SafetyPage } from '../pages/SafetyPage';
import { SubmitEntryPage } from '../pages/SubmitEntryPage';
import { SubmitSuccessPage } from '../pages/SubmitSuccessPage';
import { WinnerReviewPage } from '../pages/WinnerReviewPage';
import { WinnerSuccessPage } from '../pages/WinnerSuccessPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contests" element={<BrowsePage />} />
      <Route path="/contests/new" element={<NewContestPage />} />
      <Route path="/contests/new/success" element={<ContestCreatedPage />} />
      <Route path="/contests/:contestId" element={<ContestDetailPage />} />
      <Route path="/contests/:contestId/entries/:entryId" element={<EntryDetailPage />} />
      <Route path="/contests/:contestId/submit" element={<SubmitEntryPage />} />
      <Route path="/contests/:contestId/submit/success" element={<SubmitSuccessPage />} />
      <Route path="/contests/:contestId/winner-review/:entryId" element={<WinnerReviewPage />} />
      <Route path="/contests/:contestId/winner-review/:entryId/success" element={<WinnerSuccessPage />} />
      <Route path="/creators" element={<CreatorPage />} />
      <Route path="/safety" element={<SafetyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
