import Button from '../components/Button';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found — Horizon Properties');

  return (
    <div className="not-found">
      <span className="label">404</span>
      <h1>We couldn’t find that page</h1>
      <p>The address may have changed, or the property is no longer listed.</p>
      <div className="not-found__actions">
        <Button to="/" variant="primary" arrow>
          Back to home
        </Button>
        <Button to="/properties" variant="outline">
          Browse properties
        </Button>
      </div>
    </div>
  );
}
