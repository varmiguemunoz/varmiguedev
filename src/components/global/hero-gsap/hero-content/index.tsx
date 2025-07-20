export default function HeroContent() {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-sm">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="text-sm font-medium text-muted-foreground">Dev Partner for Agencies</span>
      </div>

      <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
        <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
          Miguel Angel
        </span>
        <br />
        <span className="text-muted-foreground">Software Engineer</span>
      </h1>

      <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
        Need to <span className="font-semibold text-primary">launch fast</span>, deliver{' '}
        <span className="font-semibold text-primary">clean code</span>, and{' '}
        <span className="font-semibold text-primary">scale without hiring</span>? <br /> I help agencies ship fast,
        high-performance digital experiences for their clients from landing pages and storefronts to mobile apps and
        automations.
      </p>
    </div>
  );
}
