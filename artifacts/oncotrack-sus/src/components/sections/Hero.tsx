import { motion, useInView } from "framer-motion";
import { ArrowRight, PlayCircle, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip } from "recharts";

function CountUp({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString("pt-BR")}{suffix}</span>;
}

const HERO_STATS = [
  { value: 1284, suffix: "+", label: "Pacientes monitorados" },
  { value: 342, suffix: "", label: "Triagens este mês" },
  { value: 18, suffix: "", label: "Encaminhamentos urgentes" },
  { value: 5, suffix: "", label: "Unidades de saúde" },
];

const chartData = [
  { name: "Jan", v: 48, fill: "#22d3ee" },
  { name: "Fev", v: 62, fill: "#22d3ee" },
  { name: "Mar", v: 55, fill: "#22d3ee" },
  { name: "Abr", v: 74, fill: "#34d399" },
  { name: "Mai", v: 88, fill: "#34d399" },
  { name: "Jun", v: 95, fill: "#34d399" },
];

const patients = [
  { name: "Maria S.", exam: "Mamografia", risk: "Alto", riskColor: "text-red-400 bg-red-400/10" },
  { name: "João P.", exam: "Colonoscopia", risk: "Médio", riskColor: "text-amber-400 bg-amber-400/10" },
  { name: "Ana C.", exam: "Biópsia", risk: "Crítico", riskColor: "text-red-500 bg-red-500/15" },
  { name: "Pedro L.", exam: "PSA", risk: "Baixo", riskColor: "text-emerald-400 bg-emerald-400/10" },
];

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      className="relative w-full"
    >
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
          </div>
          <span className="text-xs font-medium text-muted-foreground ml-2">OncoTrack SUS — Dashboard</span>
        </div>

        <div className="p-4 space-y-4">
          {/* Mini KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <TrendingUp className="h-3.5 w-3.5 text-secondary" />, val: "1.284", label: "Pacientes", color: "text-secondary" },
              { icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />, val: "18", label: "Urgentes", color: "text-amber-400" },
              { icon: <CheckCircle2 className="h-3.5 w-3.5 text-primary" />, val: "94%", label: "Resolvidos", color: "text-primary" },
            ].map((kpi, i) => (
              <div key={i} className="bg-muted/30 rounded-lg p-2.5 border border-border/60">
                <div className="flex items-center gap-1 mb-1">{kpi.icon}</div>
                <p className={`text-base font-black ${kpi.color} leading-none`}>{kpi.val}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="bg-muted/20 rounded-lg p-3 border border-border/60">
            <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Triagens — 2026</p>
            <ResponsiveContainer width="100%" height={70}>
              <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{ background: "hsl(220 55% 10%)", border: "1px solid hsl(220 30% 25%)", borderRadius: 8, fontSize: 11 }}
                  labelStyle={{ color: "hsl(220 20% 70%)" }}
                  itemStyle={{ color: "#22d3ee" }}
                />
                <Bar dataKey="v" radius={[3, 3, 0, 0]} maxBarSize={18}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mini patient list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Pacientes em Espera</p>
              <Clock className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              {patients.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-muted/20 border border-border/40">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[11px] font-medium leading-none">{p.name}</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{p.exam}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${p.riskColor}`}>{p.risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <img
                src="/oncotrack-logo.png"
                alt="OncoTrack SUS"
                className="h-20 md:h-28 w-auto"
                data-testid="img-hero-logo"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                Hackathon SUS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
            >
              Inteligência para acelerar o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                cuidado oncológico
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              Plataforma inteligente que utiliza IA, análise preditiva e integração de dados para apoiar o SUS no monitoramento de pacientes oncológicos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <a href="#solucao">
                  Ver solução
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm" asChild>
                <a href="#prototipo">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Ver MVP
                </a>
              </Button>
            </motion.div>

            {/* Animated Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            >
              {HERO_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-card/80 backdrop-blur-sm px-5 py-4 text-center hover:bg-card transition-colors"
                >
                  <p className="text-2xl md:text-3xl font-black text-primary tabular-nums">
                    <CountUp target={stat.value} suffix={stat.suffix} duration={1600 + i * 150} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard visual */}
          <div className="hidden lg:block">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
