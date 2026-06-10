import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, AlertTriangle, Lightbulb, Cog,
  Cpu, TrendingUp, Target, BarChart2, MapPin, Heart,
  BrainCircuit, Database, Wifi, Layers, CheckCircle2,
  ArrowRight, Users, Presentation
} from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    type: "title",
    tag: "Hackathon SUS",
    title: "OncoTrack SUS",
    subtitle:
      "Plataforma inteligente de monitoramento oncológico para transformar dados em decisões mais rápidas, eficientes e humanizadas no Sistema Único de Saúde.",
    author: "Autora: Jasmine de Sá Araujo",
  },
  {
    id: 2,
    type: "problem",
    tag: "O Problema",
    title: "O Câncer no Brasil: Um Desafio Urgente",
    subtitle:
      "O câncer é uma das principais causas de mortalidade no país. O SUS enfrenta barreiras estruturais que comprometem diretamente os resultados clínicos dos pacientes.",
    items: [
      {
        icon: <AlertTriangle className="h-6 w-6 text-red-400" />,
        color: "border-red-400/20 bg-red-400/5",
        iconBg: "bg-red-400/10",
        title: "Diagnóstico Tardio",
        desc: "Atrasos entre suspeita clínica e início do tratamento comprometem a sobrevida dos pacientes",
      },
      {
        icon: <Database className="h-6 w-6 text-amber-400" />,
        color: "border-amber-400/20 bg-amber-400/5",
        iconBg: "bg-amber-400/10",
        title: "Informações Fragmentadas",
        desc: "Falta de integração entre sistemas dificulta o acompanhamento contínuo da jornada do paciente",
      },
      {
        icon: <TrendingUp className="h-6 w-6 text-orange-400" />,
        color: "border-orange-400/20 bg-orange-400/5",
        iconBg: "bg-orange-400/10",
        title: "Recursos Limitados",
        desc: "Regiões com menor infraestrutura enfrentam maiores dificuldades no acesso ao cuidado especializado",
      },
    ],
  },
  {
    id: 3,
    type: "solution",
    tag: "Nossa Solução",
    title: "O Que é o OncoTrack SUS?",
    body: "Uma plataforma inteligente de monitoramento oncológico desenvolvida para apoiar profissionais de saúde no rastreamento, priorização e acompanhamento de pacientes com suspeita ou diagnóstico de câncer.",
    highlight:
      "Diferente de sistemas tradicionais que apenas armazenam dados, o OncoTrack SUS atua como ferramenta ativa de apoio à decisão clínica, identificando situações críticas antes que se agravem.",
  },
  {
    id: 4,
    type: "how",
    tag: "Tecnologia",
    title: "Como Funciona",
    subtitle:
      "A plataforma centraliza informações, processa dados clínicos com IA e gera alertas automáticos — reduzindo perdas de acompanhamento e atrasos em encaminhamentos em tempo real.",
    steps: [
      { icon: <Database className="h-5 w-5" />, label: "Coleta", desc: "Dados clínicos e integração sistêmica", color: "text-primary bg-primary/10 border-primary/20" },
      { icon: <BrainCircuit className="h-5 w-5" />, label: "Análise", desc: "Modelos preditivos com IA", color: "text-secondary bg-secondary/10 border-secondary/20" },
      { icon: <AlertTriangle className="h-5 w-5" />, label: "Alertas", desc: "Notificações para pacientes de maior risco", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
      { icon: <BarChart2 className="h-5 w-5" />, label: "Dashboards", desc: "Visão gerencial para decisão clínica", color: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
    ],
  },
  {
    id: 5,
    type: "tech",
    tag: "Stack",
    title: "Tecnologias que Impulsionam a Solução",
    items: [
      { icon: <BrainCircuit className="h-6 w-6 text-primary" />, iconBg: "bg-primary/10", title: "Inteligência Artificial", desc: "Algoritmos preditivos para identificar pacientes de maior risco e antecipar complicações clínicas" },
      { icon: <BarChart2 className="h-6 w-6 text-secondary" />, iconBg: "bg-secondary/10", title: "Análise de Dados", desc: "Processamento de dados clínicos para gerar insights acionáveis em tempo real" },
      { icon: <Wifi className="h-6 w-6 text-violet-400" />, iconBg: "bg-violet-400/10", title: "Integração IoT", desc: "Conectividade com sensores e dispositivos vestíveis para monitoramento contínuo" },
      { icon: <Layers className="h-6 w-6 text-amber-400" />, iconBg: "bg-amber-400/10", title: "Power Platform", desc: "MVP funcional com arquitetura escalável e acessível para o contexto do SUS" },
    ],
  },
  {
    id: 6,
    type: "diff",
    tag: "Diferenciais",
    title: "O Que Nos Diferencia",
    body: "O OncoTrack SUS foi desenvolvido com foco específico nas necessidades reais do SUS — não é uma adaptação de sistemas privados, mas uma solução construída para o contexto da saúde pública brasileira.",
    items: [
      { icon: <Target className="h-5 w-5 text-primary" />, iconBg: "bg-primary/10", title: "Apoio à Decisão", desc: "Identifica situações críticas antes que se agravem" },
      { icon: <TrendingUp className="h-5 w-5 text-secondary" />, iconBg: "bg-secondary/10", title: "Escalável e Acessível", desc: "Tecnologias de baixo custo com alto impacto" },
      { icon: <Cog className="h-5 w-5 text-violet-400" />, iconBg: "bg-violet-400/10", title: "Integração Nativa", desc: "Conectado aos fluxos existentes do SUS" },
    ],
  },
  {
    id: 7,
    type: "status",
    tag: "Status do Projeto",
    title: "Em Fase de Validação",
    subtitle:
      "O projeto encontra-se atualmente em fase de validação, com desenvolvimento de MVP funcional e arquitetura planejada para expansão nacional.",
    milestones: [
      { num: 1, title: "MVP Funcional", desc: "Desenvolvimento com Power Platform, IA e análise de dados clínicos", done: true },
      { num: 2, title: "Validação Clínica", desc: "Testes com profissionais de saúde para refinamento dos fluxos e alertas", done: false },
      { num: 3, title: "Integração IoT", desc: "Conexão com sensores, dispositivos vestíveis e sistemas de saúde", done: false },
      { num: 4, title: "Expansão Nacional", desc: "Implementação em hospitais, ambulatórios e unidades básicas de saúde", done: false },
    ],
  },
  {
    id: 8,
    type: "impact",
    tag: "Impacto",
    title: "Impacto Esperado no SUS",
    items: [
      { icon: <CheckCircle2 className="h-6 w-6 text-primary" />, iconBg: "bg-primary/10", title: "Redução do Tempo de Diagnóstico", desc: "Alertas inteligentes encurtam o caminho entre suspeita e tratamento" },
      { icon: <Users className="h-6 w-6 text-secondary" />, iconBg: "bg-secondary/10", title: "Melhoria no Acompanhamento", desc: "Monitoramento contínuo reduz perdas de follow-up e abandonos" },
      { icon: <MapPin className="h-6 w-6 text-violet-400" />, iconBg: "bg-violet-400/10", title: "Ampliação do Acesso", desc: "Solução escalável para regiões com menor infraestrutura de saúde" },
    ],
  },
  {
    id: 9,
    type: "where",
    tag: "Cobertura",
    title: "Onde o OncoTrack SUS Pode Atuar",
    subtitle:
      "A plataforma foi projetada para ser implementada em diferentes níveis de atenção à saúde, com potencial de alcance nacional:",
    levels: [
      { icon: <MapPin className="h-6 w-6 text-primary" />, iconBg: "bg-primary/10", title: "Unidades Básicas de Saúde (UBS)", desc: "Rastreamento e triagem inicial de pacientes com suspeita de câncer" },
      { icon: <Lightbulb className="h-6 w-6 text-secondary" />, iconBg: "bg-secondary/10", title: "Ambulatórios Especializados", desc: "Acompanhamento da jornada e gestão de encaminhamentos" },
      { icon: <BarChart2 className="h-6 w-6 text-violet-400" />, iconBg: "bg-violet-400/10", title: "Hospitais e Centros de Referência", desc: "Monitoramento de casos complexos e dashboards gerenciais" },
    ],
  },
  {
    id: 10,
    type: "closing",
    tag: "Missão",
    title: "Transformando Dados em Vidas",
    body: "O OncoTrack SUS busca contribuir para um atendimento oncológico mais eficiente, humanizado e acessível para milhares de brasileiros — especialmente nas regiões que mais precisam.",
    items: [
      { emoji: "🔬", title: "Inovação com Propósito", desc: "Tecnologia a serviço da saúde pública" },
      { emoji: "🤝", title: "Parcerias Estratégicas", desc: "Buscamos gestores, parceiros e financiadores alinhados à missão" },
      { emoji: "📈", title: "Escala Nacional", desc: "Arquitetura preparada para impacto em todo o Brasil" },
    ],
  },
  {
    id: 11,
    type: "thanks",
    tag: "Encerramento",
    title: "Agradecemos a sua atenção!",
    subtitle: "Juntos, podemos transformar o futuro da oncologia no SUS.",
  },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

function SlideContent({ slide }: { slide: typeof slides[number] }) {
  if (slide.type === "title") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-6">{slide.tag}</span>
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          OncoTrack <span className="text-primary">SUS</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed mb-8">{slide.subtitle}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
          {slide.author}
        </div>
      </div>
    );
  }

  if (slide.type === "problem") {
    return (
      <div className="flex flex-col h-full px-2 py-4 gap-5">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-red-400 uppercase bg-red-400/10 rounded-full border border-red-400/20 mb-3">{slide.tag}</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">{slide.title}</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">{slide.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {(slide.items as any[]).map((item, i) => (
            <div key={i} className={`rounded-xl border p-5 flex flex-col gap-3 ${item.color}`}>
              <div className={`w-11 h-11 rounded-lg ${item.iconBg} flex items-center justify-center`}>{item.icon}</div>
              <div>
                <p className="font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "solution") {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4 py-6 text-center gap-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20">{slide.tag}</span>
        <h2 className="text-2xl md:text-3xl font-bold">{slide.title}</h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed">{slide.body}</p>
        <div className="max-w-xl bg-primary/5 border border-primary/20 rounded-xl p-5 text-left">
          <div className="flex items-start gap-3">
            <BrainCircuit className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">{(slide as any).highlight}</p>
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === "how") {
    return (
      <div className="flex flex-col h-full px-2 py-4 gap-5">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-3">{slide.tag}</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">{slide.title}</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-1 items-stretch">
          {(slide.steps as any[]).map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center gap-3">
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center ${step.color}`}>{step.icon}</div>
              <div>
                <p className="font-bold text-sm">{step.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
              {i < (slide.steps as any[]).length - 1 && (
                <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground absolute" style={{ right: "-1.2rem", top: "1.3rem" }} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground max-w-lg mx-auto">{slide.subtitle}</p>
      </div>
    );
  }

  if (slide.type === "tech") {
    return (
      <div className="flex flex-col h-full px-2 py-4 gap-5">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-3">{slide.tag}</span>
          <h2 className="text-2xl md:text-3xl font-bold">{slide.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {(slide.items as any[]).map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 flex gap-4">
              <div className={`w-11 h-11 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
              <div>
                <p className="font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "diff") {
    return (
      <div className="flex flex-col h-full px-2 py-4 gap-5">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20 mb-3">{slide.tag}</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">{(slide as any).body}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {(slide.items as any[]).map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
              <div className={`w-11 h-11 rounded-lg ${item.iconBg} flex items-center justify-center`}>{item.icon}</div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "status") {
    return (
      <div className="flex flex-col h-full px-2 py-4 gap-5">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-400/10 rounded-full border border-amber-400/20 mb-3">{slide.tag}</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">{slide.title}</h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">{slide.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
          {(slide.milestones as any[]).map((m, i) => (
            <div key={i} className={`rounded-xl border p-4 flex gap-4 ${m.done ? "border-secondary/30 bg-secondary/5" : "border-border bg-card"}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${m.done ? "bg-secondary text-white" : "bg-muted text-muted-foreground"}`}>
                {m.done ? <CheckCircle2 className="h-4 w-4" /> : m.num}
              </div>
              <div>
                <p className="font-semibold text-sm">{m.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "impact" || slide.type === "where") {
    const items = (slide as any).items || (slide as any).levels;
    return (
      <div className="flex flex-col h-full px-2 py-4 gap-5">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-3">{slide.tag}</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">{slide.title}</h2>
          {slide.subtitle && <p className="text-muted-foreground text-sm max-w-lg mx-auto">{slide.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {items.map((item: any, i: number) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
              <div className={`w-11 h-11 rounded-lg ${item.iconBg} flex items-center justify-center`}>{item.icon}</div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "closing") {
    return (
      <div className="flex flex-col h-full px-2 py-4 gap-5">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20 mb-3">{slide.tag}</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">{(slide as any).body}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {(slide.items as any[]).map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
              <div className="text-2xl">{item.emoji}</div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === "thanks") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8 gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Heart className="h-9 w-9 text-white" />
        </div>
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4">{slide.tag}</span>
          <h2 className="text-3xl md:text-4xl font-black mb-3">{slide.title}</h2>
          <p className="text-muted-foreground text-lg">{slide.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-8 w-auto opacity-80" />
          <span className="text-sm font-semibold text-muted-foreground">OncoTrack <span className="text-primary">SUS</span></span>
        </div>
      </div>
    );
  }

  return null;
}

export function Apresentacao() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback((delta: number) => {
    const next = current + delta;
    if (next < 0 || next >= slides.length) return;
    setDirection(delta);
    setCurrent(next);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const slide = slides[current];

  return (
    <section id="apresentacao" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4"
          >
            Apresentação
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Slide Deck
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Navegue pelos slides da apresentação do OncoTrack SUS. Use as setas ou as teclas ← → do teclado.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Slide container */}
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Presentation className="h-3.5 w-3.5" />
                <span className="font-medium">OncoTrack SUS — Apresentação</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {current + 1} / {slides.length}
              </span>
            </div>

            {/* Slide content */}
            <div className="relative h-[420px] md:h-[480px] overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={slide.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 px-6 py-4 flex flex-col"
                >
                  <SlideContent slide={slide} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="h-0.5 bg-muted/50">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-muted/20">
              <Button
                variant="outline"
                size="sm"
                onClick={() => go(-1)}
                disabled={current === 0}
                className="gap-2 bg-transparent"
                data-testid="slide-prev"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all ${
                      i === current
                        ? "w-5 h-2 bg-primary"
                        : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                    data-testid={`slide-dot-${i}`}
                  />
                ))}
              </div>

              <Button
                size="sm"
                onClick={() => go(1)}
                disabled={current === slides.length - 1}
                className="gap-2"
                data-testid="slide-next"
              >
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
