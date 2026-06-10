import { motion } from "framer-motion";
import { UserPlus, Stethoscope, Brain, Send, Bell } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UserPlus className="h-6 w-6" />,
    title: "Cadastro do Paciente",
    description: "Registro completo na plataforma com histórico clínico, dados demográficos e fatores de risco identificados na atenção básica."
  },
  {
    number: "02",
    icon: <Stethoscope className="h-6 w-6" />,
    title: "Triagem Clínica",
    description: "Protocolo padronizado de rastreio aplicado por profissionais de saúde, com formulários digitais e critérios clínicos validados."
  },
  {
    number: "03",
    icon: <Brain className="h-6 w-6" />,
    title: "Análise de Risco com IA",
    description: "Algoritmos de Machine Learning avaliam sinais e sintomas, histórico e exames para classificar o nível de urgência automaticamente."
  },
  {
    number: "04",
    icon: <Send className="h-6 w-6" />,
    title: "Encaminhamento Priorizado",
    description: "Pacientes de alto risco são encaminhados automaticamente ao especialista mais próximo disponível, reduzindo tempo de espera."
  },
  {
    number: "05",
    icon: <Bell className="h-6 w-6" />,
    title: "Acompanhamento Contínuo",
    description: "Alertas proativos garantem que nenhum paciente seja perdido na fila. Dashboards em tempo real monitoram toda a jornada."
  }
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4"
          >
            Fluxo da Plataforma
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Como Funciona
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Um fluxo clínico inteligente, do primeiro contato ao acompanhamento especializado.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent hidden sm:block md:-translate-x-px" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 mb-8 md:mb-12 ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Step number bubble - center on desktop */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30 z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0">
                  {step.icon}
                </div>

                {/* Content card */}
                <div className={`flex-1 md:w-5/12 ${index % 2 === 0 ? "md:pr-16 md:text-right md:mr-auto" : "md:pl-16 md:ml-auto"}`}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                    <span className="text-4xl font-black text-primary/20 block mb-1">{step.number}</span>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
