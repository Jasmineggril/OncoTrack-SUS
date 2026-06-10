import { useState, useEffect } from "react";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const NAV_LINKS = [
  { href: "#problema", label: "Problema" },
  { href: "#solucao", label: "Solução" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#prototipo", label: "Protótipo" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#risco-ia", label: "IA" },
  { href: "#impacto", label: "Impacto" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 z-50 relative">
          <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-8 md:h-10 w-auto" />
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            OncoTrack <span className="text-primary">SUS</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {!loading && (
            user ? (
              <Button asChild size="sm" className="gap-1.5 bg-secondary hover:bg-secondary/90">
                <a href="/dashboard" data-testid="link-navbar-dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </a>
              </Button>
            ) : (
              <>
                <Button asChild size="sm" variant="outline" className="bg-transparent gap-1.5">
                  <a href="/auth" data-testid="link-navbar-entrar">
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href="#solucao">Ver solução</a>
                </Button>
              </>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden z-50 relative text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <div
          className={`fixed inset-0 bg-background flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <ul className="flex flex-col items-center gap-6 text-lg font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              {user ? (
                <Button
                  className="gap-1.5 bg-secondary hover:bg-secondary/90"
                  onClick={() => { setIsMobileMenuOpen(false); window.location.href = "/dashboard"; }}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => { setIsMobileMenuOpen(false); window.location.href = "/auth"; }}
                  className="gap-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
