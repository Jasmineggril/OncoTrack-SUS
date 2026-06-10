import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-6">
          <AlertTriangle className="h-9 w-9 text-destructive" />
        </div>

        <p className="text-7xl font-black text-primary mb-2 tabular-nums">404</p>
        <h1 className="text-2xl font-bold mb-3">Página não encontrada</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          O endereço que você tentou acessar não existe ou foi movido. Verifique o link ou volte ao início.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="outline"
            className="gap-2 bg-transparent flex-1"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button className="gap-2 flex-1" asChild>
            <a href="/">
              <Home className="h-4 w-4" />
              Página inicial
            </a>
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
          <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-5 w-auto opacity-60" />
          <span>OncoTrack <span className="text-primary">SUS</span></span>
        </div>
      </motion.div>
    </div>
  );
}
