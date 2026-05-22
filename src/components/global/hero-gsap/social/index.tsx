import Social from '@/config/social.json';
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react';

type SocialMediaProps = {
  title?: boolean;
};

export default function SocialMedia({ title = true }: SocialMediaProps) {
  const { social_links } = Social;

  const icons = { Github, Linkedin, Mail, BookOpen };

  return (
    <div className="flex items-center gap-6 pt-4">
      {title && <span className="text-sm font-medium text-muted-foreground">Let’s build together: </span>}

      <div className="flex items-center gap-4">
        {social_links.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <a href={item.url} className="group rounded-lg bg-card p-2 transition-colors hover:bg-primary/10">
              <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
