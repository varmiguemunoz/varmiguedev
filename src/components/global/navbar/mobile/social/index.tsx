import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Social() {
  return (
    <div className="mt-4 border-t border-border/50 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <a href="https://github.com" className="group rounded-lg p-2 transition-colors hover:bg-primary/10">
            <Github className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a href="https://linkedin.com" className="group rounded-lg p-2 transition-colors hover:bg-primary/10">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a href="mailto:hello@miguel.dev" className="group rounded-lg p-2 transition-colors hover:bg-accent/10">
            <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
          </a>
        </div>
        <Button variant="hero" size="sm">
          Let's Talk
        </Button>
      </div>
    </div>
  );
}
