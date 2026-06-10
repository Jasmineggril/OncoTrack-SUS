import { motion } from "framer-motion";
import { Activity, BellRing, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Activity className="h-6 w-6 text-primary" />,
    title: "Monitoramento oncológico integrado",
    description: "Visão 360° do paciente, conectando dados da atenção primária à especializada em um único prontuário."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-secondary" />,
    title: "Classificação de risco com IA",
    description: "Priorização automática por nível de urgência utilizando algoritmos de inteligência artificial."
  },
  {
    icon: <BellRing className="h-6 w-6 text-primary" />,
    title: "Alertas inteligentes",
    description: "Notificações proativas para profissionais de saúde sobre prazos críticos e desvios de protocolo."
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-secondary" />,
    title: "Dashboard clínico",
    description: "Painéis analíticos para gestores, médicos e equipes multidisciplinares acompanharem a jornada."
  }
];

export function Solucao() {
  return (
    <section id="solucao" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">A Solução OncoTrack SUS</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Uma plataforma desenvolvida para orquestrar o cuidado, empoderando as equipes de saúde com dados acionáveis e preditivos.
            </p>
            <div className="hidden lg:block relative w-full aspect-square rounded-2xl overflow-hidden border border-border bg-muted/20">
              {/* Abstract decorative element representing AI/Data */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-2/3 h-2/3 rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]" />
                <Activity className="absolute h-16 w-16 text-primary opacity-50" />
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors shadow-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
