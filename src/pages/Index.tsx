import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface VideoMeta {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  module: string;
  summary: string;
}

const Index = () => {
  const [modules, setModules] = useState<Record<string, VideoMeta[]>>({});
  const [loadingCurriculum, setLoadingCurriculum] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.rpc("get_course_videos");
      if (!error && data) {
        const grouped: Record<string, VideoMeta[]> = {};
        (data as VideoMeta[]).forEach((v) => {
          if (!grouped[v.module]) grouped[v.module] = [];
          grouped[v.module].push(v);
        });
        setModules(grouped);
      }
      setLoadingCurriculum(false);
    };
    load();
  }, []);

  const handleCheckout = async (priceType: "early_bird" | "regular" = "early_bird") => {
    setCheckingOut(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceType },
      });

      if (error || !data?.url) {
        // Fallback to Stripe payment link
        const fallbackUrls: Record<string, string> = {
          early_bird: "https://buy.stripe.com/8x2dR28179hqbAQbv56J200",
          regular: "https://buy.stripe.com/5kQeV66X351a34kfLl6J201",
        };
        window.location.href = fallbackUrls[priceType];
        return;
      }

      window.location.href = data.url;
    } catch {
      // Fallback
      window.location.href = "https://buy.stripe.com/8x2dR28179hqbAQbv56J200";
    } finally {
      setCheckingOut(false);
    }
  };

  const moduleNames = Object.keys(modules);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
        <span className="font-display text-xl font-semibold text-foreground">SLS Trading</span>
        <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24 text-center space-y-6">
        <p className="font-script text-primary text-2xl">Transform your trading</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Master Day Trading
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          24 comprehensive video lessons covering everything from market structure fundamentals to advanced strategies and trading psychology.
        </p>
        <div className="pt-4 space-y-3">
          <Button
            variant="cta"
            size="lg"
            className="text-lg px-10 py-6"
            disabled={checkingOut}
            onClick={() => handleCheckout("early_bird")}
          >
            {checkingOut ? "Loading..." : "Get Instant Access — $149"}
          </Button>
          <p className="text-sm text-muted-foreground">
            <span className="text-destructive font-medium">Limited time offer</span> — price increases to $199 on April 1
          </p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-12">
          <p className="font-script text-primary text-xl mb-2">Curriculum</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            What You'll Learn
          </h2>
        </div>
        {loadingCurriculum ? (
          <p className="text-center text-muted-foreground">Loading curriculum...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moduleNames.map((mod) => (
              <div
                key={mod}
                className="rounded-lg bg-card border border-border p-6 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {mod}
                </h3>
                <ul className="space-y-2">
                  {modules[mod].map((video) => (
                    <li key={video.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {video.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-lg bg-card border-2 border-primary p-8 md:p-12 shadow-md">
          <p className="font-script text-primary text-xl mb-2">One-time payment</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Full Course Access
          </h2>
          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span className="text-4xl md:text-5xl font-display font-bold text-foreground">$149</span>
            <span className="text-xl text-muted-foreground line-through">$199</span>
          </div>
          <p className="text-sm text-destructive font-medium mb-6">
            Limited time — price increases April 1
          </p>
          <ul className="text-left max-w-sm mx-auto space-y-3 mb-8">
            {[
              "24 comprehensive video lessons",
              "Beginner-friendly summaries & transcripts",
              "Lifetime access to all content",
              "6 modules from foundations to psychology",
              "Real trade walkthroughs & examples",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                <svg className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <Button
            variant="cta"
            size="lg"
            className="text-lg px-10 py-6"
            disabled={checkingOut}
            onClick={() => handleCheckout("early_bird")}
          >
            {checkingOut ? "Loading..." : "Get Instant Access"}
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center space-y-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
          Ready to Start?
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Join hundreds of traders who have transformed their approach to the markets.
        </p>
        <Button
          variant="cta"
          size="lg"
          className="text-lg px-10 py-6"
          disabled={checkingOut}
          onClick={() => handleCheckout("early_bird")}
        >
          {checkingOut ? "Loading..." : "Get Instant Access — $149"}
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground space-y-2">
        <div className="flex justify-center gap-4">
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Purchase</Link>
          <span>·</span>
          <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
        </div>
        <p>© {new Date().getFullYear()} SLS Trading. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
