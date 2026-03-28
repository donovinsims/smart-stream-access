import { Link } from "react-router-dom";

const Disclaimer = () => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Disclaimer</h1>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Home
        </Link>
      </div>
    </header>
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="prose prose-neutral max-w-none">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Disclaimer — Shea's Legacy Scalping
        </h2>
        <p className="text-foreground/80 leading-relaxed">
          Shea's Legacy Scalping provides educational content, trading insights, and personal
          trading opinions for informational purposes only. We are not licensed financial advisors,
          brokers, or investment professionals. Nothing shared by Shea's Legacy Scalping should be
          interpreted as personalized investment advice, trading recommendations, or a guarantee of
          future results.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Trading in financial markets, especially day trading, involves significant risk and may
          not be suitable for all investors. Past performance is not indicative of future results.
          You may lose some or all of your capital. You are solely responsible for your trading
          decisions and investments.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Always do your own research and consult with a qualified financial advisor before making
          financial decisions. By engaging with our services, content, or platforms, you acknowledge
          that Shea's Legacy Scalping is not liable for any losses or damages resulting from your
          trading activities.
        </p>
      </div>
    </main>
  </div>
);

export default Disclaimer;
