import { motion } from "framer-motion";
import { Timer, HeartPulse, TrendingDown, Globe } from "lucide-react";

const impacts = [
  {
    icon: <Timer className="h-8 w-8 text-primary" />,
    metric: "Menos espera",
    title: "Redução no tempo de encaminhamento",
    description: "Alertas automáticos e fluxo priorizado reduzem drasticamente o intervalo entre suspeita e consulta especializada."
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-secondary" />,
    metric: "Cuidado contínuo",
    title: "Melhoria no acompanhamento clínico",
    description: "Monitoramento longitudinal ativo garante que nenhum paciente caia no esquecimento durante a espera por diagnóstico."
  },
  {
    icon: <TrendingDown className="h-8 w-8 text-primary" />,
    metric: "Mais eficiência",
    title: "Otimização dos recursos do SUS",
    description: "Priorização inteligente reduz consultas desnecessárias e direciona recursos para quem mais precisa, no momento certo."
  },
  {
    icon: <Globe className="h-8 w-8 text-secondary" />,
    metric: "Cobertura ampliada",
    title: "Mais acesso em regiões periféricas",
    description: "Plataforma digital reduz barreiras geográficas, levando o rastreio especializado a regiões com menor infraestrutura oncológica."
  }
];

export function Impacto() {
  return (
    <section id="impacto" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20 mb-4"
          >
            Resultados esperados
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Impacto Esperado
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Cada paciente atendido mais cedo é uma vida com maiores chances de cura.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impacts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex gap-5 p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">{item.metric}</span>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
