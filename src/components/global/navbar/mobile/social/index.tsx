import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Social() {
  return (
    <div className="mt-4 border-t border-border/50 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/varmiguemunoz"
            className="group rounded-lg p-2 transition-colors hover:bg-primary/10"
          >
            <Github className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a
            href="https://linkedin.com/in/varmiguemunoz/"
            className="group rounded-lg p-2 transition-colors hover:bg-primary/10"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
          <a
            href="mailto:miguel.munoz@growthlyfast.com"
            className="group rounded-lg p-2 transition-colors hover:bg-accent/10"
          >
            <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
          </a>
        </div>
        <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3T7zeEOYTFQmof-sbNifFo37K0uW123TO1tf3L6AEUr-2qhDbR8Txol7-9zoAdi6NfmfNTOtQs">
          <Button variant="hero" size="sm">
            Let's Talk
          </Button>
        </a>
      </div>
    </div>
  );
}
