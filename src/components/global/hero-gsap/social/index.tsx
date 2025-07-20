import Social from '@/config/social.json';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function () {
  const { social_links } = Social;

  const icons = { Github, Linkedin, Mail };

  return (
    <div className="flex items-center gap-6 pt-4">
      <span className="text-sm font-medium text-muted-foreground">Let’s build together: </span>
      <div className="flex items-center gap-4">
        {social_links.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <a href="https://github.com" className="group rounded-lg bg-card p-2 transition-colors hover:bg-primary/10">
              <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
