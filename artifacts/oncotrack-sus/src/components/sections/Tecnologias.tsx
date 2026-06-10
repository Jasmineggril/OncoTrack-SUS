import { motion } from "framer-motion";
import { Cpu, BarChart3, Database, Shield, Wifi, Brain, Monitor } from "lucide-react";

const technologies = [
  {
    icon: <Monitor className="h-7 w-7 text-primary" />,
    name: "Power Platform",
    detail: "Microsoft",
    description: "Desenvolvimento low-code integrado ao ecossistema Microsoft para agilidade e escalabilidade."
  },
  {
    icon: <Brain className="h-7 w-7 text-secondary" />,
    name: "Inteligência Artificial",
    detail: "IA Generativa & Preditiva",
    description: "Modelos treinados com dados clínicos do SUS para apoio à decisão e triagem automatizada."
  },
  {
    icon: <Cpu className="h-7 w-7 text-primary" />,
    name: "Machine Learning",
    detail: "Modelos Preditivos",
    description: "Algoritmos de classificação de risco e predição de diagnóstico com aprendizado contínuo."
  },
  {
    icon: <Database className="h-7 w-7 text-secondary" />,
    name: "Big Data",
    detail: "Analytics",
    description: "Processamento de grandes volumes de dados clínicos e epidemiológicos em tempo real."
  },
  {
    icon: <BarChart3 className="h-7 w-7 text-primary" />,
    name: "Power BI",
    detail: "Dashboards",
    description: "Painéis analíticos interativos para gestores e equipes de saúde com visualizações ricas."
  },
  {
    icon: <Wifi className="h-7 w-7 text-secondary" />,
    name: "IoT & Wearables",
    detail: "Dispositivos Vestíveis",
    description: "Integração com dispositivos de monitoramento contínuo para coleta de dados vitais remotamente."
  },
  {
    icon: <Shield className="h-7 w-7 text-primary" />,
    name: "Segurança & LGPD",
    detail: "Criptografia",
    description: "Proteção de dados sensíveis com criptografia ponta-a-ponta e conformidade total com a LGPD."
  }
];

export function Tecnologias() {
  return (
    <section id="tecnologias" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20 mb-4"
          >
            Stack Tecnológico
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Tecnologias
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Uma arquitetura moderna e robusta construída para o contexto do SUS.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                {tech.icon}
              </div>
              <h3 className="font-bold text-lg mb-0.5">{tech.name}</h3>
              <span className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-3 block">{tech.detail}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
