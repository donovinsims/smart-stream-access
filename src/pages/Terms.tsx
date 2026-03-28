import { Link } from "react-router-dom";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Terms of Purchase</h1>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Home
        </Link>
      </div>
    </header>
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="prose prose-neutral max-w-none">
        <h2 className="font-display text-2xl font-semibold text-foreground">Please Note:</h2>
        <p className="text-foreground/80 leading-relaxed text-lg">
          Purchase of the SLS Strategy Vault includes access to previously recorded educational
          material only. It does not include any ongoing education, future updates, live sessions,
          consultation, one-on-one assistance, coaching, trade reviews, or direct support of any
          kind from Shea.
        </p>
      </div>
    </main>
  </div>
);

export default Terms;
