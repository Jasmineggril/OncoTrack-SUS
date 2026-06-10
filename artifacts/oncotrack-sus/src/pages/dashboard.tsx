import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ClipboardList, FlaskConical, ArrowRightLeft, Building2,
  LayoutDashboard, BrainCircuit, LogOut, Menu, X, Bell, Search,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock,
  ChevronRight, Activity, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";

const NAV_ITEMS = [
  { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
  { id: "pacientes", label: "Pacientes", icon: Users },
  { id: "triagens", label: "Triagens", icon: ClipboardList },
  { id: "exames", label: "Exames", icon: FlaskConical },
  { id: "encaminhamentos", label: "Encaminhamentos", icon: ArrowRightLeft },
  { id: "unidades", label: "Unidades de Saúde", icon: Building2 },
  { id: "risco-ia", label: "Análise de Risco IA", icon: BrainCircuit },
];

const MOCK_PATIENTS = [
  { id: "P001", name: "Maria Silva Santos", age: 52, type: "Mama", risk: "Alto", status: "Aguardando consulta", date: "03/06/2026" },
  { id: "P002", name: "João Carlos Oliveira", age: 67, type: "Próstata", risk: "Médio", status: "Em acompanhamento", date: "05/06/2026" },
  { id: "P003", name: "Ana Lucia Ferreira", age: 45, type: "Colo do útero", risk: "Alto", status: "Exame pendente", date: "07/06/2026" },
  { id: "P004", name: "Carlos Eduardo Lima", age: 58, type: "Pulmão", risk: "Crítico", status: "Encaminhado", date: "08/06/2026" },
  { id: "P005", name: "Francisca Nunes Costa", age: 71, type: "Colorretal", risk: "Baixo", status: "Alta provisória", date: "10/06/2026" },
];

const MOCK_TRIAGENS = [
  { id: "T001", patient: "Maria Silva Santos", protocol: "Rastreio de mama", score: 8.2, risk: "Alto", date: "03/06/2026", professional: "Dr. Paulo Mendes" },
  { id: "T002", patient: "João Carlos Oliveira", protocol: "PSA + toque retal", score: 5.1, risk: "Médio", date: "05/06/2026", professional: "Dra. Carla Souza" },
  { id: "T003", patient: "Ana Lucia Ferreira", protocol: "Colposcopia", score: 7.4, risk: "Alto", date: "07/06/2026", professional: "Dra. Marina Rocha" },
  { id: "T004", patient: "Carlos Eduardo Lima", protocol: "TC de tórax", score: 9.1, risk: "Crítico", date: "08/06/2026", professional: "Dr. Rodrigo Alves" },
];

const MOCK_EXAMES = [
  { id: "E001", patient: "Maria Silva Santos", exam: "Mamografia bilateral", result: "Birads 4B", status: "Concluído", date: "04/06/2026" },
  { id: "E002", patient: "João Carlos Oliveira", exam: "PSA total", result: "8,7 ng/mL", status: "Concluído", date: "06/06/2026" },
  { id: "E003", patient: "Ana Lucia Ferreira", exam: "Papanicolau", result: "Aguardando", status: "Pendente", date: "08/06/2026" },
  { id: "E004", patient: "Carlos Eduardo Lima", exam: "TC de tórax c/ contraste", result: "Nódulo 2,3cm", status: "Concluído", date: "09/06/2026" },
  { id: "E005", patient: "Francisca Nunes Costa", exam: "Colonoscopia", result: "Sem alterações", status: "Concluído", date: "10/06/2026" },
];

const MOCK_ENCAMINHAMENTOS = [
  { id: "R001", patient: "Carlos Eduardo Lima", from: "UBS Centro", to: "Hospital Oncológico DF", specialty: "Oncologia Pulmonar", priority: "Urgente", status: "Confirmado", date: "09/06/2026" },
  { id: "R002", patient: "Maria Silva Santos", from: "UBS Norte", to: "INCA - Brasília", specialty: "Mastologia", priority: "Alta", status: "Aguardando vaga", date: "04/06/2026" },
  { id: "R003", patient: "João Carlos Oliveira", from: "UBS Sul", to: "Hospital Universitário", specialty: "Urologia", priority: "Normal", status: "Agendado", date: "06/06/2026" },
];

const MOCK_UNIDADES = [
  { id: "U001", name: "UBS Centro — Asa Sul", city: "Brasília", type: "UBS", capacity: 12, available: 4, status: "Operacional" },
  { id: "U002", name: "Hospital Oncológico DF", city: "Brasília", type: "Hospital", capacity: 80, available: 11, status: "Operacional" },
  { id: "U003", name: "UBS Norte — Asa Norte", city: "Brasília", type: "UBS", capacity: 10, available: 0, status: "Lotada" },
  { id: "U004", name: "INCA — Brasília", city: "Brasília", type: "Referência", capacity: 50, available: 6, status: "Operacional" },
  { id: "U005", name: "UBS Sul — Guará", city: "Guará", type: "UBS", capacity: 8, available: 3, status: "Operacional" },
];

const MOCK_RISCO = [
  { patient: "Carlos Eduardo Lima", score: 94, category: "Crítico", factors: ["TC positivo", "Tabagismo 30 anos", "DPOC"], recommendation: "Encaminhar imediatamente" },
  { patient: "Maria Silva Santos", score: 82, category: "Alto", factors: ["Birads 4B", "Histórico familiar", "52 anos"], recommendation: "Consulta oncologista em 7 dias" },
  { patient: "Ana Lucia Ferreira", score: 74, category: "Alto", factors: ["HPV positivo", "ASCUS no Papanicolau"], recommendation: "Colposcopia em 14 dias" },
  { patient: "João Carlos Oliveira", score: 51, category: "Médio", factors: ["PSA elevado", "67 anos"], recommendation: "Biopsia de próstata em 30 dias" },
  { patient: "Francisca Nunes Costa", score: 28, category: "Baixo", factors: ["Colonoscopia normal", "Sem sintomas"], recommendation: "Revisão em 12 meses" },
];

const RISK_COLOR: Record<string, string> = {
  "Crítico": "text-red-400 bg-red-400/10 border-red-400/30",
  "Alto": "text-orange-400 bg-orange-400/10 border-orange-400/30",
  "Médio": "text-amber-400 bg-amber-400/10 border-amber-400/30",
  "Baixo": "text-secondary bg-secondary/10 border-secondary/30",
};

const STATUS_COLOR: Record<string, string> = {
  "Concluído": "text-secondary bg-secondary/10",
  "Pendente": "text-amber-400 bg-amber-400/10",
  "Operacional": "text-secondary bg-secondary/10",
  "Lotada": "text-red-400 bg-red-400/10",
  "Confirmado": "text-secondary bg-secondary/10",
  "Aguardando vaga": "text-amber-400 bg-amber-400/10",
  "Agendado": "text-primary bg-primary/10",
  "Em acompanhamento": "text-primary bg-primary/10",
  "Aguardando consulta": "text-amber-400 bg-amber-400/10",
  "Exame pendente": "text-amber-400 bg-amber-400/10",
  "Encaminhado": "text-secondary bg-secondary/10",
  "Alta provisória": "text-muted-foreground bg-muted/50",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[status] ?? "text-muted-foreground bg-muted"}`}>
      {status}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${RISK_COLOR[risk] ?? "text-muted-foreground bg-muted"}`}>
      {risk}
    </span>
  );
}

function OverviewModule() {
  const stats = [
    { label: "Pacientes monitorados", value: "1.284", change: "+12%", trend: "up", icon: <Users className="h-5 w-5 text-primary" /> },
    { label: "Triagens este mês", value: "342", change: "+8%", trend: "up", icon: <ClipboardList className="h-5 w-5 text-secondary" /> },
    { label: "Exames pendentes", value: "47", change: "-3%", trend: "down", icon: <FlaskConical className="h-5 w-5 text-amber-400" /> },
    { label: "Encaminhamentos urgentes", value: "18", change: "+5", trend: "up", icon: <AlertTriangle className="h-5 w-5 text-red-400" /> },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Visão Geral</h2>
        <p className="text-muted-foreground text-sm">Resumo operacional da plataforma OncoTrack SUS</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">{s.icon}</div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${s.trend === "up" ? "text-secondary" : "text-red-400"}`}>
                {s.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {s.change}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-400" /> Pacientes críticos</h3>
          <div className="space-y-3">
            {MOCK_RISCO.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{r.patient}</p>
                  <p className="text-xs text-muted-foreground">{r.recommendation}</p>
                </div>
                <RiskBadge risk={r.category} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Clock className="h-4 w-4 text-amber-400" /> Atividade recente</h3>
          <div className="space-y-3">
            {[
              { action: "Triagem registrada", patient: "Carlos Eduardo Lima", time: "Hoje, 14:32" },
              { action: "Encaminhamento confirmado", patient: "Carlos Eduardo Lima", time: "Hoje, 14:45" },
              { action: "Exame concluído", patient: "Francisca Nunes Costa", time: "Hoje, 11:20" },
              { action: "Novo paciente cadastrado", patient: "Ana Lucia Ferreira", time: "Ontem, 16:00" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{a.action} — <span className="text-primary">{a.patient}</span></p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TableModule<T extends Record<string, unknown>>({
  title, description, icon, data, columns
}: {
  title: string; description: string; icon: React.ReactNode;
  data: T[]; columns: { key: keyof T; label: string; render?: (v: T) => React.ReactNode }[];
}) {
  const [search, setSearch] = useState("");
  const filtered = data.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">{icon}{title}</h2>
          <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {columns.map(col => (
                  <th key={String(col.key)} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={columns.length} className="text-center py-10 text-muted-foreground text-sm">Nenhum registro encontrado</td></tr>
              ) : filtered.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-4 py-3 whitespace-nowrap">
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground">
          {filtered.length} registro{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

function RiscoIAModule() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><BrainCircuit className="h-6 w-6 text-secondary" /> Análise de Risco com IA</h2>
        <p className="text-muted-foreground text-sm mt-0.5">Classificação automática de urgência por algoritmos de Machine Learning</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {MOCK_RISCO.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{r.patient}</p>
                    <p className="text-xs text-muted-foreground">Fatores de risco identificados</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {r.factors.map((f, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{f}</span>
                  ))}
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
                <div className="text-center sm:text-right">
                  <div className={`text-3xl font-black ${r.score >= 80 ? "text-red-400" : r.score >= 60 ? "text-orange-400" : r.score >= 40 ? "text-amber-400" : "text-secondary"}`}>
                    {r.score}
                  </div>
                  <div className="text-xs text-muted-foreground">score de risco</div>
                </div>
                <RiskBadge risk={r.category} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground"><span className="text-foreground font-medium">Recomendação da IA:</span> {r.recommendation}</p>
            </div>
            {/* Score bar */}
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${r.score >= 80 ? "bg-red-400" : r.score >= 60 ? "bg-orange-400" : r.score >= 40 ? "bg-amber-400" : "bg-secondary"}`}
                style={{ width: `${r.score}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeModule, setActiveModule] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuário";
  const role = user?.user_metadata?.role || "profissional";
  const initials = displayName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLocation("/");
  };

  const activeNav = NAV_ITEMS.find(n => n.id === activeModule);

  function renderModule() {
    switch (activeModule) {
      case "overview": return <OverviewModule />;
      case "pacientes": return (
        <TableModule title="Pacientes" description="Pacientes com suspeita ou diagnóstico oncológico monitorados na plataforma"
          icon={<Users className="h-6 w-6 text-primary" />} data={MOCK_PATIENTS}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Nome" },
            { key: "age", label: "Idade" },
            { key: "type", label: "Tipo" },
            { key: "risk", label: "Risco", render: (r) => <RiskBadge risk={r.risk as string} /> },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status as string} /> },
            { key: "date", label: "Última atualização" },
          ]}
        />
      );
      case "triagens": return (
        <TableModule title="Triagens" description="Triagens clínicas protocolares registradas pelos profissionais de saúde"
          icon={<ClipboardList className="h-6 w-6 text-secondary" />} data={MOCK_TRIAGENS}
          columns={[
            { key: "id", label: "ID" },
            { key: "patient", label: "Paciente" },
            { key: "protocol", label: "Protocolo" },
            { key: "score", label: "Score", render: (r) => <span className="font-mono font-bold">{r.score as number}</span> },
            { key: "risk", label: "Risco", render: (r) => <RiskBadge risk={r.risk as string} /> },
            { key: "professional", label: "Profissional" },
            { key: "date", label: "Data" },
          ]}
        />
      );
      case "exames": return (
        <TableModule title="Exames" description="Exames solicitados e resultados dos pacientes monitorados"
          icon={<FlaskConical className="h-6 w-6 text-violet-400" />} data={MOCK_EXAMES}
          columns={[
            { key: "id", label: "ID" },
            { key: "patient", label: "Paciente" },
            { key: "exam", label: "Exame" },
            { key: "result", label: "Resultado" },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status as string} /> },
            { key: "date", label: "Data" },
          ]}
        />
      );
      case "encaminhamentos": return (
        <TableModule title="Encaminhamentos" description="Fluxo de referências e contra-referências entre unidades de saúde"
          icon={<ArrowRightLeft className="h-6 w-6 text-amber-400" />} data={MOCK_ENCAMINHAMENTOS}
          columns={[
            { key: "id", label: "ID" },
            { key: "patient", label: "Paciente" },
            { key: "from", label: "Origem" },
            { key: "to", label: "Destino" },
            { key: "specialty", label: "Especialidade" },
            { key: "priority", label: "Prioridade", render: (r) => <RiskBadge risk={r.priority as string} /> },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status as string} /> },
          ]}
        />
      );
      case "unidades": return (
        <TableModule title="Unidades de Saúde" description="Unidades vinculadas aos pacientes e sua capacidade atual"
          icon={<Building2 className="h-6 w-6 text-rose-400" />} data={MOCK_UNIDADES}
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Nome" },
            { key: "city", label: "Cidade" },
            { key: "type", label: "Tipo" },
            { key: "available", label: "Vagas disponíveis", render: (r) => <span className={`font-bold ${(r.available as number) === 0 ? "text-red-400" : "text-secondary"}`}>{r.available as number}</span> },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status as string} /> },
          ]}
        />
      );
      case "risco-ia": return <RiscoIAModule />;
      default: return null;
    }
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? "" : "w-64 flex-shrink-0"}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-8 w-auto" />
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight">OncoTrack <span className="text-primary">SUS</span></p>
          <p className="text-xs text-muted-foreground truncate">Dashboard Clínico</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveModule(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              data-testid={`nav-${item.id}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
              {isActive && <ChevronRight className="h-3 w-3 ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground capitalize truncate">{role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4" />
          Sair da plataforma
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-border bg-card/50">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card border-r border-border flex flex-col lg:hidden shadow-2xl"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-14 border-b border-border bg-background/95 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setSidebarOpen(true)}
              data-testid="button-open-sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
              {activeNav && (
                <>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-foreground font-medium">{activeNav.label}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" data-testid="button-notifications">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400" />
            </button>
            <Button variant="outline" size="sm" className="gap-1.5 bg-transparent hidden sm:flex" asChild>
              <a href="/">Voltar ao site</a>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
