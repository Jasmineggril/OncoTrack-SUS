import { Mail, Linkedin, FileDown, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_COLS = [
  {
    title: "Plataforma",
    links: [
      { label: "O Problema", href: "#problema" },
      { label: "A Solução", href: "#solucao" },
      { label: "Como Funciona", href: "#como-funciona" },
      { label: "Protótipo MVP", href: "#prototipo" },
    ],
  },
  {
    title: "Tecnologia",
    links: [
      { label: "Tecnologias", href: "#tecnologias" },
      { label: "Diferenciais", href: "#diferenciais" },
      { label: "Análise de Risco IA", href: "#risco-ia" },
      { label: "Apresentação", href: "#apresentacao" },
    ],
  },
  {
    title: "Sobre",
    links: [
      { label: "Impacto", href: "#impacto" },
      { label: "ODS", href: "#ods" },
      { label: "Equipe", href: "#equipe" },
      { label: "Contato", href: "#contato" },
    ],
  },
];

const ODS_BADGES = [
  { number: "3", label: "Saúde e Bem-Estar", color: "bg-green-600" },
  { number: "9", label: "Indústria e Inovação", color: "bg-orange-500" },
  { number: "10", label: "Redução das Desigualdades", color: "bg-pink-600" },
  { number: "17", label: "Parcerias e Meios de Implementação", color: "bg-blue-600" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* CTA strip */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border-b border-border py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-base">Quer conhecer mais?</p>
            <p className="text-sm text-muted-foreground">Baixe o pitch deck completo ou entre em contato.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
              <a href="#apresentacao">
                <FileDown className="h-4 w-4" />
                Ver Apresentação
              </a>
            </Button>
            <Button size="sm" className="gap-2" asChild>
              <a href="#contato">
                Falar com a equipe
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2.5 mb-4">
              <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-9 w-auto" />
              <span className="font-bold text-lg">OncoTrack <span className="text-primary">SUS</span></span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              Plataforma inteligente de monitoramento oncológico para o Sistema Único de Saúde. Tecnologia a serviço de quem mais precisa.
            </p>

            {/* ODS */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Objetivos de Desenvolvimento Sustentável</p>
              <div className="flex flex-wrap gap-2">
                {ODS_BADGES.map((ods) => (
                  <div key={ods.number} className={`${ods.color} text-white rounded-lg px-2.5 py-1 text-center min-w-[42px]`} title={ods.label}>
                    <p className="text-xs font-black leading-tight">ODS</p>
                    <p className="text-lg font-black leading-tight">{ods.number}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:jasminedesaraujo@gmail.com"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-primary/10"
              >
                <Mail className="h-3.5 w-3.5" />
                E-mail
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-primary/10"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-5">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>&copy; {year} OncoTrack SUS.</span>
            <span className="hidden sm:inline">Desenvolvido com</span>
            <Heart className="h-3 w-3 text-red-400 hidden sm:inline" />
            <span className="hidden sm:inline">para o Hackathon SUS · Brasília, DF.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">Hackathon SUS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
