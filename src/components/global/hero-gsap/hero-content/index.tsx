interface HighlightText {
  text: string;
  highlight?: boolean;
}

export interface HeroContentProps {
  badge?: string;
  title?: { text: string; gradient?: boolean }[];
  description?: HighlightText[];
}

export default function HeroContent({
  badge = 'Dev Partner for Agencies',
  title = [
    { text: 'Launch your product 3× faster', gradient: true },
    { text: '\n' }, // salto de línea
    { text: 'without internal team' },
  ],
  description = [
    { text: 'Need to ' },
    { text: 'launch fast', highlight: true },
    { text: ', deliver ' },
    { text: 'clean code', highlight: true },
    { text: ', and ' },
    { text: 'scale without hiring', highlight: true },
    {
      text: '? I help agencies ship fast, high-performance digital experiences for their clients from landing pages and storefronts to mobile apps and automations.',
    },
  ],
}: HeroContentProps) {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-sm">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="text-sm font-medium text-muted-foreground">{badge}</span>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
        {title.map((part, i) =>
          part.text === '\n' ? (
            <br key={i} />
          ) : (
            <span
              key={i}
              className={
                part.gradient
                  ? 'bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent'
                  : 'text-muted-foreground'
              }
            >
              {part.text}
            </span>
          )
        )}
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
        {description.map((part, i) =>
          part.highlight ? (
            <span key={i} className="font-semibold text-primary">
              {part.text}
            </span>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </p>
    </div>
  );
}
