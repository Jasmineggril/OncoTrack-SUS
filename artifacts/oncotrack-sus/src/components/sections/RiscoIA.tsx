import { motion } from "framer-motion";
import { BrainCircuit, Zap, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from "recharts";

const riskData = [
  { type: "Pulmão", score: 94, fill: "#f87171" },
  { type: "Mama", score: 82, fill: "#fb923c" },
  { type: "Colo do útero", score: 74, fill: "#fbbf24" },
  { type: "Próstata", score: 51, fill: "#60a5fa" },
  { type: "Colorretal", score: 28, fill: "#34d399" },
];

const aiFeatures = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    iconBg: "bg-primary/10",
    title: "Machine Learning Clínico",
    desc: "Modelos treinados com dados epidemiológicos do SUS classificam automaticamente pacientes por prioridade clínica.",
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-400" />,
    iconBg: "bg-amber-400/10",
    title: "Score de Risco em Tempo Real",
    desc: "Cada paciente recebe um score de 0 a 100 atualizado a cada nova informação clínica inserida na plataforma.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-secondary" />,
    iconBg: "bg-secondary/10",
    title: "Prevenção de Perdas de Follow-up",
    desc: "A IA detecta pacientes que podem sair do sistema sem diagnóstico e dispara alertas automáticos para a equipe.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-violet-400" />,
    iconBg: "bg-violet-400/10",
    title: "Análise Preditiva de Desfechos",
    desc: "Identifica padrões que precedem complicações graves, permitindo intervenção antes do agravamento do quadro.",
  },
];

const RISK_LABELS: Record<string, { label: string; color: string }> = {
  "#f87171": { label: "Crítico", color: "text-red-400" },
  "#fb923c": { label: "Alto", color: "text-orange-400" },
  "#fbbf24": { label: "Médio", color: "text-amber-400" },
  "#60a5fa": { label: "Moderado", color: "text-blue-400" },
  "#34d399": { label: "Baixo", color: "text-secondary" },
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0];
    const meta = RISK_LABELS[d.fill] ?? { label: "—", color: "" };
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
        <p className="font-semibold mb-0.5">{d.payload.type}</p>
        <p className="text-muted-foreground">Score: <span className={`font-bold ${meta.color}`}>{d.value}</span></p>
        <p className="text-muted-foreground">Nível: <span className={`font-bold ${meta.color}`}>{meta.label}</span></p>
      </div>
    );
  }
  return null;
};

export function RiscoIA() {
  return (
    <section id="risco-ia" className="py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20 mb-4"
          >
            <BrainCircuit className="h-3.5 w-3.5" />
            Inteligência Artificial
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Análise Inteligente de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Risco Oncológico
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            A IA do OncoTrack SUS vai além do registro — ela lê os dados, classifica riscos e orienta ações antes que o paciente precise de cuidado emergencial.
          </motion.p>
        </div>

        {/* Main content: chart + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          {/* Chart panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-xl shadow-black/10"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  Score de Risco por Tipo de Câncer
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Classificação IA — pacientes ativos na plataforma</p>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-lg">Ao Vivo</span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={riskData}
                layout="vertical"
                margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
              >
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="type" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={100} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted)/0.2)" }} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={28}>
                  {riskData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
              {Object.entries(RISK_LABELS).map(([color, { label, color: textColor }]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className={`text-xs font-medium ${textColor}`}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center mb-3`}>
                  {f.icon}
                </div>
                <h4 className="font-bold text-sm mb-1.5">{f.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8 text-center"
        >
          <BrainCircuit className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            De "sistema de cadastro" a <span className="text-primary">HealthTech inovadora</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            A IA do OncoTrack SUS transforma cada dado clínico em inteligência acionável — identificando quem precisa de atenção antes que seja tarde demais. Isso é o que diferencia uma ferramenta digital de uma solução que salva vidas.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
