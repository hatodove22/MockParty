import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { StatusPanel } from '../components/common/StatusPanel';

export function NotFoundPage() {
  return (
    <main>
      <StatusPanel
        eyebrow="404"
        title="This page is not available."
        description="The route may have moved, or the contest link may no longer match a page in this prototype."
        actions={
          <>
            <Link to="/contests">
              <Button>Browse contests</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">Back home</Button>
            </Link>
          </>
        }
      />
    </main>
  );
}
