import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

const traditional = [
  "Apenas registra dados clínicos",
  "Sem classificação de risco",
  "Profissional decide sem apoio de dados",
  "Sem alertas de prazos críticos",
  "Informações fragmentadas por sistema",
  "Gestão reativa (age depois do problema)",
];

const oncotrack = [
  "IA analisa e prioriza automaticamente",
  "Score de risco por Machine Learning",
  "Apoio à decisão clínica em tempo real",
  "Alertas proativos para casos urgentes",
  "Visão 360° integrada do paciente",
  "Gestão preditiva e preventiva",
];

export function Diferenciais() {
  return (
    <section id="diferenciais" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4"
          >
            Diferenciais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Por que o OncoTrack SUS é diferente?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Não é só mais um sistema de cadastro. É uma plataforma inteligente que transforma dados em decisões clínicas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Sistema Tradicional */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <X className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-bold text-base">Sistema Tradicional</p>
                  <p className="text-xs text-muted-foreground">Prontuário digital comum</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {traditional.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/40">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* OncoTrack SUS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-primary/30 rounded-2xl overflow-hidden shadow-lg shadow-primary/10 relative"
          >
            <div className="absolute top-3 right-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-white">Recomendado</span>
            </div>
            <div className="px-6 py-5 border-b border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <img src="/oncotrack-logo.png" alt="" className="h-6 w-auto" />
                </div>
                <div>
                  <p className="font-bold text-base">OncoTrack <span className="text-primary">SUS</span></p>
                  <p className="text-xs text-muted-foreground">Plataforma de IA para oncologia</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {oncotrack.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-secondary" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a href="#risco-ia" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Ver como a IA classifica riscos
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
