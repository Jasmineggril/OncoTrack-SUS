import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problema } from "@/components/sections/Problema";
import { Solucao } from "@/components/sections/Solucao";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Tecnologias } from "@/components/sections/Tecnologias";
import { Prototipo } from "@/components/sections/Prototipo";
import { Impacto } from "@/components/sections/Impacto";
import { ODS } from "@/components/sections/ODS";
import { Equipe } from "@/components/sections/Equipe";
import { Contato } from "@/components/sections/Contato";
import { Apresentacao } from "@/components/sections/Apresentacao";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { RiscoIA } from "@/components/sections/RiscoIA";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Solucao />
        <ComoFunciona />
        <Tecnologias />
        <Prototipo />
        <Diferenciais />
        <RiscoIA />
        <Impacto />
        <ODS />
        <Apresentacao />
        <Equipe />
        <Contato />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
