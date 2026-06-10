import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ClipboardList, FlaskConical, ArrowRightLeft, Building2,
  LayoutDashboard, BrainCircuit, ExternalLink, Play, Maximize2, Info, X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const POWER_APPS_DIRECT_URL =
  "https://apps.powerapps.com/play/e/ae5cad1c-bf33-e2aa-a62d-32db7d0984e2/a/e0bb0113-4f0a-4b60-b60b-73122ae79eba?tenantId=c7eb8b68-77dd-4f4d-922e-6802cea85fa6&hint=4ffdfc9c-47dd-4a3f-aa2a-e283eb6a69fd&sourcetime=1781105455149";

const POWER_APPS_EMBED_URL =
  "https://apps.powerapps.com/play/e/ae5cad1c-bf33-e2aa-a62d-32db7d0984e2/a/e0bb0113-4f0a-4b60-b60b-73122ae79eba?tenantId=c7eb8b68-77dd-4f4d-922e-6802cea85fa6&hint=4ffdfc9c-47dd-4a3f-aa2a-e283eb6a69fd&sourcetime=1781105455149&source=iframe&hidenavbar=true";

const modules = [
  { icon: <Users className="h-5 w-5" />, title: "Pacientes", iconColor: "text-primary", desc: "Registros com suspeita ou diagnóstico oncológico" },
  { icon: <ClipboardList className="h-5 w-5" />, title: "Triagens", iconColor: "text-secondary", desc: "Triagens clínicas padronizadas dos pacientes" },
  { icon: <FlaskConical className="h-5 w-5" />, title: "Exames", iconColor: "text-violet-400", desc: "Exames solicitados e seus resultados" },
  { icon: <ArrowRightLeft className="h-5 w-5" />, title: "Encaminhamentos", iconColor: "text-amber-400", desc: "Encaminhamentos para hospitais e especialistas" },
  { icon: <Building2 className="h-5 w-5" />, title: "Unidades de Saúde", iconColor: "text-rose-400", desc: "Unidades de saúde vinculadas aos pacientes" },
  { icon: <LayoutDashboard className="h-5 w-5" />, title: "Dashboard", iconColor: "text-primary", desc: "Visão consolidada em tempo real" },
  { icon: <BrainCircuit className="h-5 w-5" />, title: "Análise de Risco IA", iconColor: "text-secondary", desc: "Classificação inteligente de urgência" },
];

export function Prototipo() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <section id="prototipo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4"
          >
            MVP — Power Platform
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Protótipo da Plataforma
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Aplicativo funcional desenvolvido no Power Apps com 7 módulos prontos para uso real no SUS.
          </motion.p>
        </div>

        {/* Main content: screenshot + modules side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">

          {/* Screenshot mockup — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {/* Browser chrome frame */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-black/40">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <span className="w-3 h-3 rounded-full bg-secondary/70" />
                  </div>
                  <div className="ml-2 flex-1 bg-background/60 rounded px-3 py-1 text-xs text-muted-foreground font-mono hidden sm:block">
                    apps.powerapps.com — OncoTrack SUS
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium hidden sm:block">Power Apps</span>
              </div>

              {/* App screenshot */}
              <div className="relative group">
                <img
                  src="/powerapps-preview.png"
                  alt="Tela de Boas-vindas do OncoTrack SUS no Power Apps"
                  className="w-full object-cover"
                  data-testid="img-powerapps-preview"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => setShowEmbed(true)}
                    className="gap-2"
                    data-testid="button-abrir-embed"
                  >
                    <Play className="h-4 w-4" />
                    Testar ao vivo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 bg-transparent"
                    asChild
                  >
                    <a href={POWER_APPS_DIRECT_URL} target="_blank" rel="noopener noreferrer" data-testid="link-open-full">
                      <Maximize2 className="h-4 w-4" />
                      Tela cheia
                    </a>
                  </Button>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/40 border-t border-border text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5 flex-shrink-0" />
                Tela de Boas-vindas — acesso requer conta Microsoft autorizada no Power Platform
              </div>
            </div>
          </motion.div>

          {/* Module list — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col justify-center gap-3"
          >
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Módulos do MVP</p>
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-background flex items-center justify-center ${mod.iconColor}`}>
                  {mod.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{mod.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="h-12 px-8 gap-2" asChild data-testid="button-abrir-powerapps">
            <a href={POWER_APPS_DIRECT_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-5 w-5" />
              Abrir aplicativo completo
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 gap-2 bg-transparent"
            onClick={() => setShowEmbed(true)}
            data-testid="button-testar-embed"
          >
            <Play className="h-5 w-5" />
            Testar versão interativa
          </Button>
        </motion.div>
      </div>

      {/* Full-screen embed modal */}
      <AnimatePresence>
        {showEmbed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
            data-testid="modal-embed"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-8 w-auto" />
                <div>
                  <p className="font-bold text-sm">OncoTrack SUS</p>
                  <p className="text-xs text-muted-foreground">Power Apps — versão interativa</p>
                </div>
              </div>
              <button
                onClick={() => setShowEmbed(false)}
                className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* iframe */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <iframe
                src={POWER_APPS_EMBED_URL}
                title="OncoTrack SUS — Power Apps"
                className="absolute inset-0 w-full h-full border-0 z-10"
                allow="geolocation; microphone; camera"
                data-testid="iframe-powerapps-modal"
              />
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-border flex-shrink-0 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                Requer login com conta Microsoft autorizada
              </span>
              <a
                href={POWER_APPS_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Abrir em nova aba
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
