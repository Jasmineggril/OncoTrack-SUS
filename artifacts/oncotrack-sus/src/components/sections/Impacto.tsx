import { motion, useInView } from "framer-motion";
import { Timer, HeartPulse, TrendingDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const impacts = [
  {
    icon: <Timer className="h-7 w-7 text-primary" />,
    value: 60, suffix: "%",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20 hover:border-primary/40",
    label: "Redução estimada",
    title: "Menos tempo até o diagnóstico",
    description: "Alertas automáticos e fluxo priorizado reduzem drasticamente o intervalo entre suspeita e consulta especializada."
  },
  {
    icon: <HeartPulse className="h-7 w-7 text-secondary" />,
    value: 85, suffix: "%",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20 hover:border-secondary/40",
    label: "Melhoria esperada",
    title: "Mais pacientes em acompanhamento",
    description: "Monitoramento longitudinal ativo garante que nenhum paciente caia no esquecimento durante a espera por diagnóstico."
  },
  {
    icon: <TrendingDown className="h-7 w-7 text-violet-400" />,
    value: 40, suffix: "%",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
    borderColor: "border-violet-400/20 hover:border-violet-400/40",
    label: "Ganho operacional",
    title: "Otimização dos recursos do SUS",
    description: "Priorização inteligente reduz consultas desnecessárias e direciona recursos para quem mais precisa, no momento certo."
  },
  {
    icon: <Globe className="h-7 w-7 text-amber-400" />,
    value: 200, suffix: "+",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20 hover:border-amber-400/40",
    label: "Municípios atendíveis",
    title: "Cobertura nacional escalável",
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
              className={`group flex gap-5 p-6 bg-card border rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-black/10 ${item.borderColor}`}
            >
              <div className={`flex-shrink-0 w-16 h-16 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-4xl font-black tabular-nums ${item.color}`}>
                    <CountUp target={item.value} suffix={item.suffix} duration={1400 + index * 100} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                </div>
                <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
