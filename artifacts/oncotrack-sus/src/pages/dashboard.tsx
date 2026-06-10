import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ClipboardList, FlaskConical, ArrowRightLeft, Building2,
  LayoutDashboard, BrainCircuit, LogOut, Menu, Bell,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock,
  ChevronRight, Activity, User, Download, FileText, FileSpreadsheet, X,
  ChevronsUpDown, ChevronUp, ChevronDown
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
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

const MONTHLY_TRIAGENS = [
  { month: "Jan", triagens: 89 },
  { month: "Fev", triagens: 102 },
  { month: "Mar", triagens: 95 },
  { month: "Abr", triagens: 118 },
  { month: "Mai", triagens: 132 },
  { month: "Jun", triagens: 342 },
];

const RISK_DISTRIBUTION = [
  { name: "Crítico", value: 18, color: "#f87171" },
  { name: "Alto", value: 156, color: "#fb923c" },
  { name: "Médio", value: 487, color: "#fbbf24" },
  { name: "Baixo", value: 623, color: "#34d399" },
];

const RISK_COLOR: Record<string, string> = {
  "Crítico": "text-red-400 bg-red-400/10 border-red-400/30",
  "Urgente": "text-red-400 bg-red-400/10 border-red-400/30",
  "Alto": "text-orange-400 bg-orange-400/10 border-orange-400/30",
  "Alta": "text-orange-400 bg-orange-400/10 border-orange-400/30",
  "Médio": "text-amber-400 bg-amber-400/10 border-amber-400/30",
  "Normal": "text-secondary bg-secondary/10 border-secondary/30",
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

function exportCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; label: string }[],
  filename: string
) {
  const header = columns.map(c => `"${c.label}"`).join(",");
  const rows = data.map(row =>
    columns.map(c => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  const csv = [header, ...rows].join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportPDF<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; label: string }[],
  title: string
) {
  const dateStr = new Date().toLocaleDateString("pt-BR");
  const headerRow = columns.map(c =>
    `<th style="padding:8px 12px;text-align:left;background:#1e3a5f;color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">${c.label}</th>`
  ).join("");
  const bodyRows = data.map((row, i) =>
    `<tr style="background:${i % 2 === 0 ? "#f8fafc" : "#fff"};">` +
    columns.map(c =>
      `<td style="padding:7px 12px;font-size:12px;border-bottom:1px solid #e2e8f0;">${String(row[c.key] ?? "")}</td>`
    ).join("") +
    `</tr>`
  ).join("");

  const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
  <title>${title} — OncoTrack SUS</title>
  <style>
    body{font-family:Arial,sans-serif;margin:0;padding:24px;color:#1a202c;}
    .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding-bottom:12px;border-bottom:2px solid #0ea5e9;}
    .logo-area h1{font-size:18px;color:#0ea5e9;margin:0 0 2px;}
    .logo-area p{font-size:11px;color:#64748b;margin:0;}
    .meta{text-align:right;font-size:11px;color:#64748b;}
    table{width:100%;border-collapse:collapse;margin-top:8px;}
    .footer{margin-top:16px;font-size:10px;color:#94a3b8;text-align:center;}
    @media print{body{padding:0;} .no-print{display:none;}}
  </style></head><body>
  <div class="header">
    <div class="logo-area">
      <h1>OncoTrack SUS — ${title}</h1>
      <p>Plataforma de Monitoramento Oncológico · Sistema Único de Saúde</p>
    </div>
    <div class="meta"><strong>Gerado em:</strong> ${dateStr}<br/><strong>Total:</strong> ${data.length} registro${data.length !== 1 ? "s" : ""}</div>
  </div>
  <table><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table>
  <div class="footer">OncoTrack SUS — Documento gerado automaticamente. Uso restrito a profissionais e gestores do SUS.</div>
  <div class="no-print" style="margin-top:16px;text-align:center;">
    <button onclick="window.print()" style="background:#0ea5e9;color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:13px;">Imprimir / Salvar como PDF</button>
  </div>
  <script>setTimeout(()=>window.print(),400)</script>
  </body></html>`;

  const win = window.open("", "_blank");
  if (win) { win.document.write(html); win.document.close(); }
}

function ExportMenu<T extends Record<string, unknown>>({
  data, filtered, columns, title,
}: {
  data: T[]; filtered: T[];
  columns: { key: keyof T; label: string }[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const filename = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative">
      <Button
        variant="outline" size="sm"
        className="gap-2 bg-transparent"
        onClick={() => setOpen(o => !o)}
        data-testid="button-export"
      >
        <Download className="h-3.5 w-3.5" />
        Exportar
      </Button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 top-full mt-1.5 z-20 bg-popover border border-border rounded-xl shadow-xl shadow-black/20 w-60 py-1.5 overflow-hidden"
            >
              <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Exportar dados
              </p>
              <button
                onClick={() => { exportCSV(filtered, columns, `${filename}-filtrados.csv`); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
                data-testid="export-csv-filtered"
              >
                <FileSpreadsheet className="h-4 w-4 text-secondary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">CSV — filtrados</p>
                  <p className="text-xs text-muted-foreground">{filtered.length} linha{filtered.length !== 1 ? "s" : ""}</p>
                </div>
              </button>
              <button
                onClick={() => { exportCSV(data, columns, `${filename}-completo.csv`); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
                data-testid="export-csv-all"
              >
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">CSV — todos</p>
                  <p className="text-xs text-muted-foreground">{data.length} linha{data.length !== 1 ? "s" : ""}</p>
                </div>
              </button>
              <div className="h-px bg-border mx-3 my-1" />
              <button
                onClick={() => { exportPDF(filtered, columns, title); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
                data-testid="export-pdf-filtered"
              >
                <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">PDF — filtrados</p>
                  <p className="text-xs text-muted-foreground">Abre janela de impressão</p>
                </div>
              </button>
              <button
                onClick={() => { exportPDF(data, columns, title); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
                data-testid="export-pdf-all"
              >
                <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">PDF — todos</p>
                  <p className="text-xs text-muted-foreground">Abre janela de impressão</p>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SortIcon({ col, sortKey, sortDir }: { col: string; sortKey: string; sortDir: "asc" | "desc" }) {
  if (col !== sortKey) return <ChevronsUpDown className="h-3 w-3 opacity-30 ml-1 inline" />;
  return sortDir === "asc"
    ? <ChevronUp className="h-3 w-3 text-primary ml-1 inline" />
    : <ChevronDown className="h-3 w-3 text-primary ml-1 inline" />;
}

function TableModule<T extends Record<string, unknown>>({
  title, description, icon, data, columns,
}: {
  title: string; description: string; icon: React.ReactNode;
  data: T[];
  columns: { key: keyof T; label: string; render?: (v: T) => React.ReactNode; sortable?: boolean }[];
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = data
    .filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (!sortKey) return 0;
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      const num_a = parseFloat(av), num_b = parseFloat(bv);
      const cmp = !isNaN(num_a) && !isNaN(num_b) ? num_a - num_b : av.localeCompare(bv, "pt-BR");
      return sortDir === "asc" ? cmp : -cmp;
    });

  const exportCols = columns.map(c => ({ key: c.key, label: c.label }));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">{icon}{title}</h2>
          <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-full sm:w-52">
            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <ExportMenu data={data} filtered={filtered} columns={exportCols} title={title} />
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {columns.map(col => (
                  <th
                    key={String(col.key)}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                    className={`text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap select-none ${col.sortable !== false ? "cursor-pointer hover:text-foreground transition-colors" : ""}`}
                  >
                    {col.label}
                    {col.sortable !== false && (
                      <SortIcon col={String(col.key)} sortKey={String(sortKey)} sortDir={sortDir} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-10 text-muted-foreground text-sm">
                    Nenhum registro encontrado
                  </td>
                </tr>
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
        <div className="px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
          <span>
            {filtered.length} registro{filtered.length !== 1 ? "s" : ""}
            {filtered.length !== data.length ? ` (de ${data.length})` : ""}
          </span>
          <div className="flex items-center gap-3">
            {sortKey && (
              <button onClick={() => { setSortKey(null); setSortDir("asc"); }} className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <X className="h-3 w-3" /> Limpar ordem
              </button>
            )}
            {filtered.length !== data.length && (
              <button onClick={() => setSearch("")} className="flex items-center gap-1 text-primary hover:underline">
                <X className="h-3 w-3" /> Limpar filtro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
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
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
            <ClipboardList className="h-4 w-4 text-primary" /> Triagens por mês (2026)
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={MONTHLY_TRIAGENS} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                cursor={{ fill: "hsl(var(--muted)/0.3)" }}
              />
              <Bar dataKey="triagens" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-1 flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-400" /> Distribuição por risco
          </h3>
          <p className="text-xs text-muted-foreground mb-3">1.284 pacientes ativos</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={160}>
              <PieChart>
                <Pie data={RISK_DISTRIBUTION} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {RISK_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {RISK_DISTRIBUTION.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: r.color }} />
                    <span className="text-muted-foreground">{r.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-red-400" /> Pacientes críticos
          </h3>
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
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-amber-400" /> Atividade recente
          </h3>
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

function RiscoIAModule() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-secondary" /> Análise de Risco com IA
        </h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          Classificação automática de urgência por algoritmos de Machine Learning
        </p>
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
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Recomendação da IA:</span> {r.recommendation}
              </p>
            </div>
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
            { key: "score", label: "Score" },
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
            { key: "capacity", label: "Capacidade" },
            { key: "available", label: "Vagas", render: (r) => <span className={`font-bold ${(r.available as number) === 0 ? "text-red-400" : "text-secondary"}`}>{r.available as number}</span> },
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
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-8 w-auto" />
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight">OncoTrack <span className="text-primary">SUS</span></p>
          <p className="text-xs text-muted-foreground truncate">Dashboard Clínico</p>
        </div>
      </div>
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
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-border bg-card/50">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card border-r border-border flex flex-col lg:hidden shadow-2xl"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
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
