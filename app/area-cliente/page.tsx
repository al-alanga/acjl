"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, LoaderCircle, LogOut, RefreshCw, ShieldCheck } from "lucide-react";

type RequestItem = {
  id: string;
  reference_code: string;
  service_name_snapshot: string;
  status: string;
  requested_at: string;
  description: string;
};

const statusLabels: Record<string, string> = {
  received: "Recebido",
  awaiting_information: "A aguardar informação",
  proposal_sent: "Proposta enviada",
  awaiting_payment: "A aguardar pagamento",
  paid: "Pagamento confirmado",
  in_progress: "Em execução",
  awaiting_external: "A aguardar entidade externa",
  completed: "Concluído",
  cancelled: "Cancelado",
};

export default function CustomerPortalPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup" | "reset" | "update">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [items, setItems] = useState<RequestItem[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadRequests = useCallback(async () => {
    if (!supabase) return;
    setLoadingRequests(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setUserEmail("");
      setItems([]);
      setLoadingRequests(false);
      return;
    }
    setUserEmail(user.email ?? "");
    const { data, error: queryError } = await supabase
      .from("service_requests")
      .select("id, reference_code, service_name_snapshot, status, requested_at, description")
      .eq("customer_id", user.id)
      .order("requested_at", { ascending: false });
    if (queryError) setError("Não foi possível carregar os pedidos. Tente actualizar a página.");
    else setItems((data ?? []) as RequestItem[]);
    setLoadingRequests(false);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void loadRequests();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("update");
      void loadRequests();
    });
    return () => subscription.unsubscribe();
  }, [loadRequests]);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError("A área do cliente ainda não está configurada. A equipa técnica deve definir as variáveis públicas do Supabase no Vercel.");
      return;
    }
    setBusy(true);
    setError("");
    setMessage("");
    try {
      if (mode === "update") {
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
        setPassword("");
        setMode("login");
        setMessage("Palavra-passe actualizada. Já pode entrar com a nova palavra-passe.");
      } else if (mode === "reset") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
          redirectTo: `${window.location.origin}/area-cliente`,
        });
        if (resetError) throw resetError;
        setMessage("Se existir uma conta associada a este email, receberá instruções para recuperar o acesso.");
      } else if (mode === "signup") {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: { data: { full_name: name.trim() } },
        });
        if (authError) throw authError;
        if (data.user && data.session) {
          const { error: profileError } = await supabase.from("customer_profiles").upsert({
            id: data.user.id,
            full_name: name.trim(),
          });
          if (profileError) throw profileError;
          setMessage("Conta criada. Já pode consultar os seus pedidos nesta área.");
          await loadRequests();
        } else {
          setMessage("Registo iniciado. Verifique o seu email para confirmar a conta e depois entre nesta área.");
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (authError) throw authError;
        setPassword("");
        setMessage("Sessão iniciada com sucesso.");
        await loadRequests();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível concluir a operação.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setItems([]);
    setUserEmail("");
    setMessage("Sessão terminada.");
  }

  if (!supabase) {
    return <main className="portal-page"><div className="portal-card portal-config"><BriefcaseBusiness size={30}/><h1>Área do cliente</h1><p>Estamos a preparar o acesso seguro aos seus pedidos.</p><p className="portal-muted">Configuração necessária: NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no ambiente de produção.</p><a className="portal-back" href="/">Voltar ao site <ArrowLeft size={16}/></a></div></main>;
  }

  return (
    <main className="portal-page">
      <div className="portal-shell">
        <a className="portal-back" href="/"><ArrowLeft size={16}/> Voltar ao site ACJL</a>
        <header className="portal-heading">
          <div className="portal-icon"><BriefcaseBusiness size={25}/></div>
          <div><p className="portal-eyebrow">ACJL · CONTABILIDADE & SERVIÇOS</p><h1>Área do cliente</h1><p className="portal-muted">Acompanhe os seus pedidos e os respectivos estados.</p></div>
        </header>

        {userEmail ? (
          <section className="portal-panel">
            <div className="portal-panel-head"><div><p className="portal-eyebrow">SESSÃO ACTIVA</p><h2>{userEmail}</h2></div><button className="portal-secondary" onClick={signOut}><LogOut size={16}/> Terminar sessão</button></div>
            <div className="portal-list-heading"><div><h2>Os meus pedidos</h2><p>Os dados apresentados são privados e associados à sua conta.</p></div><button className="portal-icon-button" onClick={() => void loadRequests()} aria-label="Actualizar pedidos"><RefreshCw size={17}/></button></div>
            {loadingRequests ? <div className="portal-empty"><LoaderCircle className="portal-spin" size={24}/> A carregar pedidos…</div> : items.length ? (
              <div className="portal-request-list">{items.map(item => <article className="portal-request" key={item.id}><div className="portal-request-top"><span className="portal-reference">{item.reference_code}</span><span className="portal-status">{statusLabels[item.status] ?? item.status}</span></div><h3>{item.service_name_snapshot}</h3><p>{item.description}</p><small>Submetido em {new Date(item.requested_at).toLocaleDateString("pt-PT")}</small></article>)}</div>
            ) : <div className="portal-empty"><CheckCircle2 size={24}/><h3>Ainda não tem pedidos associados</h3><p>Quando submeter um pedido autenticado, poderá acompanhá-lo nesta área. Pedidos enviados antes da criação da conta não são associados automaticamente.</p><a className="button" href="/#servicos">Consultar serviços</a></div>}
          </section>
        ) : (
          <section className="portal-panel portal-auth-panel">
            <div className="portal-tabs"><button className={mode === "login" ? "portal-tab active" : "portal-tab"} onClick={() => {setMode("login");setError("");setMessage("");}}>Entrar</button><button className={mode === "signup" ? "portal-tab active" : "portal-tab"} onClick={() => {setMode("signup");setError("");setMessage("");}}>Criar conta</button></div>
            <h2>{mode === "login" ? "Bem-vindo de volta" : mode === "signup" ? "Crie a sua conta de cliente" : mode === "reset" ? "Recuperar acesso" : "Definir nova palavra-passe"}</h2>
            <p className="portal-muted">{mode === "login" ? "Entre para consultar os pedidos associados à sua conta." : mode === "signup" ? "Use um email válido para poder confirmar e proteger a sua conta." : mode === "reset" ? "Indique o email da sua conta para receber instruções de recuperação." : "Escolha uma nova palavra-passe com pelo menos 8 caracteres."}</p>
            <form className="portal-form" onSubmit={submitAuth}>
              {mode === "signup" && <label>Nome completo<input autoComplete="name" required value={name} onChange={e => setName(e.target.value)} placeholder="O seu nome"/></label>}
              <label>Email<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@empresa.co.mz"/></label>
              {(mode === "login" || mode === "signup" || mode === "update") && <label>Palavra-passe<input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo de 8 caracteres"/></label>}
              <button className="button portal-submit" type="submit" disabled={busy}>{busy ? <LoaderCircle className="portal-spin" size={17}/> : <ShieldCheck size={17}/>} {busy ? "A processar…" : mode === "login" ? "Entrar na minha conta" : mode === "signup" ? "Criar conta segura" : mode === "reset" ? "Enviar instruções" : "Actualizar palavra-passe"}</button>
            </form>
            {mode === "login" && <button type="button" className="portal-text-button" onClick={() => {setMode("reset");setError("");setMessage("");}}>Esqueci-me da palavra-passe</button>}
            {(mode === "reset" || mode === "update") && <button type="button" className="portal-text-button" onClick={() => {setMode("login");setError("");setMessage("");}}>Voltar ao início de sessão</button>}
            {mode === "signup" && <p className="portal-terms">Ao criar a conta, os dados serão utilizados para gerir o seu acesso e os pedidos submetidos à ACJL.</p>}
          </section>
        )}
        {message && <div className="portal-message success">{message}</div>}
        {error && <div className="portal-message error">{error}</div>}
        <footer className="portal-footer"><ShieldCheck size={15}/> Acesso protegido por autenticação Supabase. <span>ACJL · Moçambique</span></footer>
      </div>
    </main>
  );
}
