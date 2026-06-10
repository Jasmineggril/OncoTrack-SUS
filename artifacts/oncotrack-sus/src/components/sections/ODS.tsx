import { motion } from "framer-motion";
import { Heart, Lightbulb, Scale, Handshake } from "lucide-react";

const sdgs = [
  {
    number: "3",
    icon: <Heart className="h-8 w-8" />,
    title: "Saúde e Bem-Estar",
    description: "Assegurar uma vida saudável e promover o bem-estar para todas as idades, com acesso universal ao cuidado oncológico.",
    bgColor: "bg-[#4C9F38]",
    textColor: "text-white",
    borderColor: "border-[#4C9F38]/30"
  },
  {
    number: "9",
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Indústria, Inovação e Infraestrutura",
    description: "Construir infraestrutura resiliente e fomentar a inovação para transformar o sistema de saúde público brasileiro.",
    bgColor: "bg-[#F36D25]",
    textColor: "text-white",
    borderColor: "border-[#F36D25]/30"
  },
  {
    number: "10",
    icon: <Scale className="h-8 w-8" />,
    title: "Redução das Desigualdades",
    description: "Reduzir desigualdades no acesso ao diagnóstico e tratamento oncológico entre regiões e populações vulneráveis.",
    bgColor: "bg-[#DD1367]",
    textColor: "text-white",
    borderColor: "border-[#DD1367]/30"
  },
  {
    number: "17",
    icon: <Handshake className="h-8 w-8" />,
    title: "Parcerias e Meios de Implementação",
    description: "Fortalecer parcerias entre governo, academia e setor privado para escalar a solução em todo o território nacional.",
    bgColor: "bg-[#19486A]",
    textColor: "text-white",
    borderColor: "border-[#19486A]/30"
  }
];

export function ODS() {
  return (
    <section id="ods" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4"
          >
            Agenda 2030 - ONU
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Objetivos de Desenvolvimento Sustentável
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            O OncoTrack SUS contribui diretamente com quatro ODS da Agenda 2030 das Nações Unidas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group bg-card border ${sdg.borderColor} rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300`}
            >
              <div className={`${sdg.bgColor} p-5 flex items-center justify-between`}>
                <div className={`${sdg.textColor}`}>{sdg.icon}</div>
                <span className={`text-5xl font-black opacity-30 ${sdg.textColor}`}>{sdg.number}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">ODS {sdg.number}</span>
                <h3 className="font-bold text-base mb-3 leading-snug">{sdg.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{sdg.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
