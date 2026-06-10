import { motion } from "framer-motion";
import { AlertCircle, Clock, Database, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const problems = [
  {
    icon: <Clock className="h-8 w-8 text-destructive" />,
    title: "Diagnóstico tardio",
    description: "A maioria dos cânceres no SUS é detectada em estágios avançados, reduzindo as chances de cura."
  },
  {
    icon: <Database className="h-8 w-8 text-orange-500" />,
    title: "Informações fragmentadas",
    description: "Dados espalhados entre UBSs, hospitais e sistemas desconectados dificultam a visão unificada do paciente."
  },
  {
    icon: <AlertCircle className="h-8 w-8 text-yellow-500" />,
    title: "Dificuldade de acompanhamento",
    description: "Pacientes se perdem na fila sem monitoramento ativo, atrasando o início do tratamento especializado."
  },
  {
    icon: <MapPin className="h-8 w-8 text-blue-500" />,
    title: "Desigualdade no acesso",
    description: "Regiões periféricas têm menor infraestrutura oncológica, sobrecarregando os centros de referência."
  }
];

export function Problema() {
  return (
    <section id="problema" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Desafio do Cuidado Oncológico</h2>
          <p className="text-lg text-muted-foreground">
            O fluxo de atendimento no SUS enfrenta gargalos que impactam diretamente a sobrevida dos pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 bg-background p-3 rounded-lg inline-block w-fit shadow-sm">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
