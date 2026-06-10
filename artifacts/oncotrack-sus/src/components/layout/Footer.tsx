import { Activity } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-2">
            <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-8 w-auto" />
            <span className="font-bold text-base tracking-tight">
              OncoTrack <span className="text-primary">SUS</span>
            </span>
          </a>

          <p className="text-sm text-muted-foreground text-center">
            Inteligência para acelerar o cuidado oncológico no Brasil
          </p>

          <p className="text-xs text-muted-foreground">
            &copy; {year} OncoTrack SUS. Desenvolvido para o Hackathon SUS.
          </p>
        </div>
      </div>
    </footer>
  );
}
