import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

export function Equipe() {
  return (
    <section id="equipe" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20 mb-4"
          >
            Quem está por trás
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Nossa Equipe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Construindo uma solução que une tecnologia e humanidade para transformar o cuidado oncológico no Brasil.
          </motion.p>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative max-w-sm w-full"
          >
            {/* Decorative glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-primary/40 via-secondary/20 to-primary/10 rounded-2xl blur-sm" />

            <div className="relative bg-card border border-border rounded-2xl p-8 text-center">
              {/* Avatar */}
              <div className="mx-auto mb-6 relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/40">
                  JS
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-1">Jasmine de Sá Araujo</h3>
              <p className="text-sm font-semibold text-primary mb-1 tracking-wide">
                Fundadora &amp; Idealizadora do OncoTrack SUS
              </p>
              <p className="text-xs text-muted-foreground mb-5">Brasília, DF · Engenharia de Software</p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Estudante de Engenharia de Software, desenvolvedora de soluções digitais e idealizadora do OncoTrack SUS. Responsável pela concepção, desenvolvimento do MVP, arquitetura de IA e estratégia de impacto para o Sistema Único de Saúde.
              </p>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="mailto:jasminedesaraujo@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg bg-muted/50 hover:bg-primary/10"
                  data-testid="link-email-jasmine"
                >
                  <Mail className="h-4 w-4" />
                  E-mail
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg bg-muted/50 hover:bg-primary/10"
                  data-testid="link-linkedin-jasmine"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
