import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, LogIn, UserPlus, Lock, Mail, User, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

interface LoginForm {
  email: string;
  password: string;
}

interface CadastroForm {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  confirmPassword: string;
}

type AlertState = { type: "success" | "error"; message: string } | null;

export default function Auth() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<"login" | "cadastro">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [cadastroLoading, setCadastroLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);

  const loginForm = useForm<LoginForm>();
  const cadastroForm = useForm<CadastroForm>();

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    if (type === "success") {
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const onLogin = async (data: LoginForm) => {
    setLoginLoading(true);
    setAlert(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        showAlert("error", error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos. Verifique seus dados."
          : error.message);
      } else {
        showAlert("success", "Acesso realizado com sucesso! Redirecionando…");
        setTimeout(() => setLocation("/dashboard"), 1500);
      }
    } catch {
      showAlert("error", "Erro inesperado. Tente novamente.");
    } finally {
      setLoginLoading(false);
    }
  };

  const onCadastro = async (data: CadastroForm) => {
    setCadastroLoading(true);
    setAlert(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            phone: data.phone,
            role: data.role,
          },
        },
      });
      if (error) {
        showAlert("error", error.message === "User already registered"
          ? "Este e-mail já está cadastrado. Faça login."
          : error.message);
      } else {
        showAlert("success", "Cadastro realizado! Verifique seu e-mail para confirmar a conta.");
        setTimeout(() => {
          setAlert(null);
          setTab("login");
          cadastroForm.reset();
        }, 4000);
      }
    } catch {
      showAlert("error", "Erro inesperado. Tente novamente.");
    } finally {
      setCadastroLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/15 via-background to-background pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border/50">
        <a href="/" className="flex items-center gap-2" data-testid="link-logo-home">
          <img src="/oncotrack-logo.png" alt="OncoTrack SUS" className="h-9 w-auto" />
          <span className="font-bold text-base hidden sm:block">
            OncoTrack <span className="text-primary">SUS</span>
          </span>
        </a>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => setLocation("/")}
          data-testid="button-back-home"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Button>
      </header>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <img
              src="/oncotrack-logo.png"
              alt="OncoTrack SUS"
              className="h-20 w-auto mx-auto mb-4"
              data-testid="img-auth-logo"
            />
            <p className="text-muted-foreground text-sm">
              Plataforma de monitoramento oncológico do SUS
            </p>
          </motion.div>

          {/* Alert */}
          <AnimatePresence>
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`flex items-start gap-3 p-4 rounded-xl mb-4 text-sm ${
                  alert.type === "success"
                    ? "bg-secondary/15 border border-secondary/30 text-secondary"
                    : "bg-destructive/15 border border-destructive/30 text-destructive"
                }`}
                data-testid={`alert-${alert.type}`}
              >
                {alert.type === "success"
                  ? <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  : <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                <span>{alert.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
          >
            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-border">
              <button
                onClick={() => { setTab("login"); setAlert(null); }}
                className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                  tab === "login"
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="tab-login"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </button>
              <button
                onClick={() => { setTab("cadastro"); setAlert(null); }}
                className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                  tab === "cadastro"
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="tab-cadastro"
              >
                <UserPlus className="h-4 w-4" />
                Cadastrar
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* LOGIN */}
                {tab === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-xl font-bold mb-1">Bem-vindo de volta</h2>
                    <p className="text-sm text-muted-foreground mb-6">Acesse sua conta na plataforma</p>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">E-mail</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="seu@email.gov.br"
                            className={`pl-9 ${loginForm.formState.errors.email ? "border-destructive" : ""}`}
                            data-testid="input-login-email"
                            {...loginForm.register("email", { required: true })}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-sm font-medium">Senha</label>
                          <button type="button" className="text-xs text-primary hover:underline">
                            Esqueci minha senha
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={`pl-9 pr-10 ${loginForm.formState.errors.password ? "border-destructive" : ""}`}
                            data-testid="input-login-password"
                            {...loginForm.register("password", { required: true })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full gap-2 mt-2"
                        disabled={loginLoading}
                        data-testid="button-login-submit"
                      >
                        {loginLoading
                          ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          : <LogIn className="h-4 w-4" />}
                        {loginLoading ? "Entrando…" : "Entrar na plataforma"}
                      </Button>
                    </form>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Ainda não tem conta?{" "}
                      <button
                        onClick={() => { setTab("cadastro"); setAlert(null); }}
                        className="text-primary hover:underline font-medium"
                        data-testid="link-go-cadastro"
                      >
                        Cadastre-se
                      </button>
                    </p>
                  </motion.div>
                )}

                {/* CADASTRO */}
                {tab === "cadastro" && (
                  <motion.div
                    key="cadastro"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-xl font-bold mb-1">Crie sua conta</h2>
                    <p className="text-sm text-muted-foreground mb-6">Acesso para profissionais e gestores do SUS</p>
                    <form onSubmit={cadastroForm.handleSubmit(onCadastro)} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Nome completo</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Dr. João da Silva"
                            className={`pl-9 ${cadastroForm.formState.errors.name ? "border-destructive" : ""}`}
                            data-testid="input-cadastro-name"
                            {...cadastroForm.register("name", { required: true })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">E-mail institucional</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="nome@saude.gov.br"
                            className={`pl-9 ${cadastroForm.formState.errors.email ? "border-destructive" : ""}`}
                            data-testid="input-cadastro-email"
                            {...cadastroForm.register("email", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Telefone</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="(61) 9 0000-0000"
                              className="pl-9"
                              data-testid="input-cadastro-phone"
                              {...cadastroForm.register("phone")}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Perfil</label>
                          <select
                            className={`w-full h-10 px-3 rounded-md border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                              cadastroForm.formState.errors.role ? "border-destructive" : "border-input"
                            }`}
                            data-testid="select-cadastro-role"
                            {...cadastroForm.register("role", { required: true })}
                          >
                            <option value="">Selecione</option>
                            <option value="medico">Médico(a)</option>
                            <option value="enfermeiro">Enfermeiro(a)</option>
                            <option value="gestor">Gestor(a)</option>
                            <option value="admin">Administrador</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 6 caracteres"
                            className={`pl-9 pr-10 ${cadastroForm.formState.errors.password ? "border-destructive" : ""}`}
                            data-testid="input-cadastro-password"
                            {...cadastroForm.register("password", { required: true, minLength: 6 })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {cadastroForm.formState.errors.password?.type === "minLength" && (
                          <p className="text-xs text-destructive mt-1">Mínimo de 6 caracteres</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Confirmar senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Repita a senha"
                            className={`pl-9 pr-10 ${cadastroForm.formState.errors.confirmPassword ? "border-destructive" : ""}`}
                            data-testid="input-cadastro-confirm"
                            {...cadastroForm.register("confirmPassword", {
                              required: true,
                              validate: (v) =>
                                v === cadastroForm.watch("password") || "As senhas não conferem",
                            })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirm(!showConfirm)}
                          >
                            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {cadastroForm.formState.errors.confirmPassword && (
                          <p className="text-xs text-destructive mt-1">
                            {cadastroForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full gap-2 mt-2 bg-secondary hover:bg-secondary/90"
                        disabled={cadastroLoading}
                        data-testid="button-cadastro-submit"
                      >
                        {cadastroLoading
                          ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          : <UserPlus className="h-4 w-4" />}
                        {cadastroLoading ? "Criando conta…" : "Criar conta"}
                      </Button>
                    </form>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Já tem uma conta?{" "}
                      <button
                        onClick={() => { setTab("login"); setAlert(null); }}
                        className="text-primary hover:underline font-medium"
                        data-testid="link-go-login"
                      >
                        Fazer login
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Plataforma protegida por criptografia e em conformidade com a LGPD
          </p>
        </div>
      </div>
    </div>
  );
}
