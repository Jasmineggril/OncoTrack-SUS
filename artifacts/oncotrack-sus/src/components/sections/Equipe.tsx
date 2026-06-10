import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const members = [
  {
    initials: "JS",
    name: "Jasmine de Sá Araujo",
    role: "Fundadora & Idealizadora",
    location: "Brasília, DF · Engenharia de Software",
    bio: "Estudante de Engenharia de Software, desenvolvedora de soluções digitais e idealizadora do OncoTrack SUS. Responsável pela concepção, desenvolvimento do MVP, arquitetura de IA e estratégia de impacto para o Sistema Único de Saúde.",
    email: "jasminedesaraujo@gmail.com",
    linkedin: "https://linkedin.com",
    gradFrom: "from-primary",
    gradTo: "to-secondary",
  },
  {
    initials: "PH",
    name: "Pedro Henrique Bento Martins",
    role: "Cofundador & Desenvolvedor Front-end",
    location: "Brasília, DF · Engenharia de Software",
    bio: "Estudante de Engenharia de Software, desenvolvedor de soluções digitais e apaixonado por tecnologia. Um dos idealizadores do OncoTrack SUS, participando da concepção da solução, do desenvolvimento do MVP e da implementação do front-end da aplicação.",
    email: "pbentomartins4569@gmail.com",
    linkedin: "https://www.linkedin.com/in/pedro-henrique-bento-martins-7b19a733a",
    gradFrom: "from-primary",
    gradTo: "to-violet-500",
  },
  {
    initials: "MP",
    name: "Matheus Pontieri de Lemos Silva",
    role: "Co-Founder & Lead Developer",
    location: "Brasília, DF · Ciências da Computação – UCB",
    bio: "Desenvolvedor com experiência no Ministério das Relações Exteriores utilizando Microsoft Power Platform (Power Apps e Power Automate). Contribui com expertise em Python, automação de fluxos e integração de sistemas, apoiando a consolidação técnica da solução.",
    email: "matheus.pontieri@gmail.com",
    linkedin: "https://www.linkedin.com/in/pontieri",
    gradFrom: "from-secondary",
    gradTo: "to-cyan-400",
  },
];

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
            Três engenheiros unidos pela missão de transformar o cuidado oncológico no Brasil com tecnologia e propósito.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Decorative glow */}
              <div className={`absolute -inset-px bg-gradient-to-br ${member.gradFrom}/30 ${member.gradTo}/10 rounded-2xl blur-sm`} />

              <div className="relative bg-card border border-border rounded-2xl p-7 text-center h-full flex flex-col">
                {/* Avatar */}
                <div className="mx-auto mb-5 relative inline-block">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradFrom} ${member.gradTo} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {member.initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{index + 1}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1 leading-tight">{member.name}</h3>
                <p className="text-xs font-semibold text-primary mb-1 tracking-wide">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-4">{member.location}</p>

                <p className="text-muted-foreground text-xs leading-relaxed mb-5 flex-1">
                  {member.bio}
                </p>

                <div className="flex items-center justify-center gap-2 mt-auto">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-primary/10"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    E-mail
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-primary/10"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
