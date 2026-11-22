"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, FileCheck2, Menu, ShieldCheck, Calculator, ReceiptText, UsersRound, BriefcaseBusiness, Building2, ClipboardList, Search, X, Phone, Mail, MapPin } from "lucide-react";

const services = [
  { category: "Formalização", title: "Constituição de empresa", description: "Trate da criação do seu negócio com apoio ao processo e à documentação necessária.", type: "Avulso", icon: Building2, price: "Sob orçamento" },
  { category: "Contabilidade", title: "Contabilidade mensal", description: "Registos organizados e informação financeira para acompanhar a atividade do negócio.", type: "Mensal", icon: Calculator, price: "Sob proposta" },
  { category: "Fiscalidade", title: "Declarações fiscais", description: "Preparação e submissão das obrigações fiscais abrangidas pelo serviço contratado.", type: "Avulso", icon: ReceiptText, price: "Sob proposta" },
  { category: "Recursos Humanos", title: "Processamento salarial", description: "Apoio no cálculo mensal dos salários e nos procedimentos associados aos trabalhadores.", type: "Mensal ou avulso", icon: UsersRound, price: "Sob orçamento" },
  { category: "Concursos e fornecedores", title: "Dossier de fornecedor", description: "Prepare a documentação administrativa exigida para fornecer produtos ou serviços a empresas.", type: "Avulso", icon: FileCheck2, price: "Sob proposta" },
  { category: "Gestão empresarial", title: "Regularização empresarial", description: "Tratamento de pendências administrativas, fiscais ou laborais com âmbito definido.", type: "Pacote combinado", icon: ClipboardList, price: "Sob orçamento" },
];

const packages = [
  { name: "Contabilidade & Fiscalidade", label: "Mensal especializado", price: "Sob proposta", text: "Acompanhamento contabilístico e fiscal ajustado ao volume e às obrigações da empresa.", features: ["Registos contabilísticos mensais", "Organização de documentos", "Obrigações fiscais contratadas", "Resumo periódico de execução"] },
  { name: "Recursos Humanos", label: "Mensal especializado", price: "Sob orçamento", text: "Apoio recorrente à gestão administrativa dos trabalhadores, com limites claros.", features: ["Processamento salarial", "Admissões e saídas", "Férias e faltas", "Procedimentos aplicáveis do INSS"] },
  { name: "Gestão Empresarial Integrada", label: "Pacote combinado mensal", price: "Sob orçamento", text: "Uma solução coordenada para empresas que precisam de várias funções num único parceiro.", features: ["Contabilidade e fiscalidade", "Recursos Humanos", "Coordenação administrativa", "Relatório consolidado"] },
];

const combined = [
  { name: "Começar o Negócio", text: "Formalização, registos aplicáveis e documentação inicial.", price: "Sob orçamento" },
  { name: "Preparar para Fornecer Empresas", text: "Dossier de fornecedor e preparação para requisitos de um cliente identificado.", price: "Sob orçamento" },
  { name: "Preparar uma Candidatura", text: "Organização documental para uma oportunidade ou concurso específico.", price: "Sob orçamento" },
  { name: "Colocar a Contabilidade em Ordem", text: "Organização de registos de um período previamente definido.", price: "Sob orçamento" },
  { name: "Regularização Empresarial Integrada", text: "Tratamento de pendências identificadas e acordadas numa proposta.", price: "Sob orçamento" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState("");
  const [sent, setSent] = useState(false);
  const categories = ["Todos", ...Array.from(new Set(services.map((s) => s.category)))];
  const filtered = useMemo(() => services.filter((s) => (category === "Todos" || s.category === category) && (s.title + " " + s.description + " " + s.category).toLowerCase().includes(query.toLowerCase())), [category, query]);

  function startRequest(name: string) {
    setSelected(name);
    setSent(false);
    setModal("request");
  }

  return (
    <main>
      <div className="topline"><div className="container topline-inner"><span>Parceiro para o crescimento do seu negócio</span><div><span>Atendimento empresarial</span><span className="top-sep">|</span><span>Maputo, Moçambique</span></div></div></div>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#inicio" aria-label="ACJL início">
            <img className="brand-logo" src="/acjl-logo.png" alt="ACJL — Fiscalidade, Contabilidade, RH e Serviços" />
          </a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X/> : <Menu/>}</button>
          <nav className={menuOpen ? "navlinks open" : "navlinks"}>
            <a onClick={() => setMenuOpen(false)} href="#empresa">A empresa</a>
            <a onClick={() => setMenuOpen(false)} href="#servicos">Serviços</a>
            <a onClick={() => setMenuOpen(false)} href="#pacotes">Pacotes</a>
            <a onClick={() => setMenuOpen(false)} href="#como-funciona">Como funciona</a>
            <button className="button button-small" onClick={() => startRequest("")}>Pedir proposta <ArrowRight size={16}/></button>
          </nav>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-pattern"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> CONTABILIDADE & SERVIÇOS EMPRESARIAIS</div>
            <h1>Mais foco no seu negócio. <em>Menos complicações.</em></h1>
            <p className="hero-lead">Apoiamos empresas com contabilidade, fiscalidade, Recursos Humanos e processos administrativos — com soluções práticas, claras e ajustadas à realidade de cada negócio.</p>
            <div className="hero-actions"><a className="button" href="#servicos">Explore os serviços <ArrowRight size={17}/></a><a className="text-link" href="#empresa">Conheça a ACJL <ArrowRight size={16}/></a></div>
            <div className="hero-proof"><div className="proof-icon"><ShieldCheck size={20}/></div><div><strong>Um parceiro para o seu negócio</strong><span>Serviços definidos, execução acompanhada e condições transparentes.</span></div></div>
          </div>
          <div className="hero-visual">
            <div className="visual-top"><span>ACJL</span><span className="visual-dot"></span><span>BUSINESS SERVICES</span></div>
            <div className="visual-title">Estrutura para<br/><b>avançar.</b></div>
            <div className="visual-line"></div>
            <div className="visual-metrics"><div><span>01</span><strong>Contabilidade</strong></div><div><span>02</span><strong>Fiscalidade</strong></div><div><span>03</span><strong>Recursos Humanos</strong></div></div>
            <div className="visual-watermark">ACJL</div>
            <div className="visual-corner">SOLUÇÕES EMPRESARIAIS · MOÇAMBIQUE</div>
          </div>
        </div>
        <div className="hero-bottom"><div className="container hero-bottom-inner"><span>PARA MICRO, PEQUENAS E MÉDIAS EMPRESAS</span><span className="gold-rule"></span><span>SERVIÇOS AVULSOS · PACOTES MENSAIS · SOLUÇÕES COMBINADAS</span></div></div>
      </section>

      <section className="trust-strip"><div className="container trust-grid"><div><span className="trust-number">01</span><div><strong>Clareza na contratação</strong><small>Âmbito e preço definidos</small></div></div><div><span className="trust-number">02</span><div><strong>Soluções práticas</strong><small>Foco no que precisa resolver</small></div></div><div><span className="trust-number">03</span><div><strong>Acompanhamento</strong><small>Visibilidade sobre os pedidos</small></div></div><div><span className="trust-number">04</span><div><strong>Um parceiro</strong><small>Várias áreas empresariais</small></div></div></div></section>

      <section className="section intro-section" id="empresa"><div className="container intro-grid"><div><div className="eyebrow"><span></span> SOBRE A ACJL</div><h2>O apoio empresarial deve <em>simplificar.</em></h2></div><div className="intro-copy"><p>A ACJL — Contabilidade & Serviços reúne soluções de apoio à atividade empresarial para que os responsáveis pelos negócios possam dedicar mais tempo aos clientes, às operações e ao crescimento.</p><p>Trabalhamos com serviços avulsos, pacotes mensais especializados e soluções combinadas. Cada contratação deve ter um âmbito claro, entregáveis definidos e condições adequadas à dimensão do trabalho.</p><a className="text-link dark-link" href="#como-funciona">A nossa forma de trabalhar <ArrowRight size={16}/></a></div></div></section>

      <section className="section services-section" id="servicos"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span></span> O QUE FAZEMOS</div><h2>Soluções para as necessidades <em>do dia a dia.</em></h2></div><p>Escolha o serviço de que precisa. Se a situação exigir um âmbito específico, preparamos uma proposta antes de iniciar o trabalho.</p></div>
        <div className="catalog-tools"><div className="searchbox"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar serviços..." aria-label="Pesquisar serviços"/></div><div className="category-scroll">{categories.map((c) => <button key={c} className={category === c ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
        <div className="service-grid">{filtered.map((s, i) => {const Icon = s.icon; return <article className="service-card" key={s.title}><div className="service-card-top"><div className="service-icon"><Icon size={23}/></div><span className="service-index">0{i + 1}</span></div><span className="service-category">{s.category}</span><h3>{s.title}</h3><p>{s.description}</p><div className="service-card-foot"><span>{s.type}</span><button onClick={() => startRequest(s.title)} aria-label={"Solicitar " + s.title}><ArrowRight size={18}/></button></div></article>})}</div>
        {filtered.length === 0 && <div className="empty-state">Não encontrámos serviços com esses critérios. Experimente outra pesquisa.</div>}
        <div className="center-cta"><span>Não encontrou o serviço de que precisa?</span><button className="button button-outline" onClick={() => startRequest("Pedido personalizado")}>Fale connosco <ArrowRight size={16}/></button></div>
      </div></section>

      <section className="section packages-section" id="pacotes"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span></span> MODELOS DE CONTRATAÇÃO</div><h2>O formato certo para <em>cada necessidade.</em></h2></div><p>Contrate uma tarefa específica ou assegure apoio recorrente. Os limites de cada pacote são definidos com transparência.</p></div>
        <div className="package-grid">{packages.map((p, i) => <article className={"package-card " + (i === 2 ? "package-featured" : "")} key={p.name}><div className="package-label">{p.label}</div><h3>{p.name}</h3><div className="package-price">{p.price}</div><p>{p.text}</p><div className="package-rule"></div><ul>{p.features.map(f => <li key={f}><Check size={16}/>{f}</li>)}</ul><button className={i === 2 ? "button" : "button button-outline"} onClick={() => startRequest(p.name)}>Solicitar proposta <ArrowRight size={16}/></button></article>)}</div>
        <div className="combined-box"><div className="combined-head"><div><div className="eyebrow"><span></span> SEM MENSALIDADE OBRIGATÓRIA</div><h3>Pacotes combinados avulsos</h3><p>Vários serviços relacionados, reunidos numa única contratação.</p></div><div className="combined-badge"><BriefcaseBusiness size={22}/><span>Uma encomenda.<br/>Um âmbito definido.</span></div></div><div className="combined-grid">{combined.map((p, i) => <div className="combined-item" key={p.name}><div className="combined-num">0{i + 1}</div><div><h4>{p.name}</h4><p>{p.text}</p><span>{p.price}</span></div><button onClick={() => startRequest(p.name)} aria-label={"Pedir " + p.name}><ArrowRight size={18}/></button></div>)}</div></div>
      </div></section>

      <section className="section process-section" id="como-funciona"><div className="container process-grid"><div className="process-copy"><div className="eyebrow"><span></span> COMO FUNCIONA</div><h2>Do pedido à entrega, <em>com clareza.</em></h2><p>Um processo simples para saber o que está a contratar e o que acontece a seguir.</p><button className="button" onClick={() => startRequest("")}>Iniciar um pedido <ArrowRight size={16}/></button></div><div className="steps"><div className="step"><span>01</span><div><h3>Escolha a solução</h3><p>Selecione um serviço ou descreva a necessidade da sua empresa.</p></div></div><div className="step"><span>02</span><div><h3>Confirme o âmbito e o preço</h3><p>Receba as condições, os entregáveis e os custos antes da execução.</p></div></div><div className="step"><span>03</span><div><h3>Envie os dados necessários</h3><p>Partilhe a informação e a documentação exigidas para o serviço.</p></div></div><div className="step"><span>04</span><div><h3>Acompanhe a execução</h3><p>Consulte o estado do pedido e receba atualizações sobre o processo.</p></div></div></div></div></section>

      <section className="cta-section"><div className="container cta-inner"><div><div className="eyebrow eyebrow-light"><span></span> VAMOS TRABALHAR JUNTOS</div><h2>Tem uma necessidade empresarial para resolver?</h2><p>Conte-nos o que precisa. Ajudamos a identificar o serviço adequado e a definir os próximos passos.</p></div><button className="button button-gold" onClick={() => startRequest("")}>Pedir uma proposta <ArrowRight size={17}/></button></div></section>

      <footer className="footer" id="contactos"><div className="container footer-grid"><div className="footer-brand"><a className="brand brand-footer" href="#inicio"><img className="brand-logo brand-logo-footer" src="/acjl-logo.png" alt="ACJL — Fiscalidade, Contabilidade, RH e Serviços" /></a><p>Soluções de contabilidade, fiscalidade, Recursos Humanos e apoio empresarial em Moçambique.</p></div><div><h4>Explorar</h4><a href="#empresa">A empresa</a><a href="#servicos">Serviços</a><a href="#pacotes">Pacotes</a><a href="#como-funciona">Como funciona</a></div><div><h4>Áreas de serviço</h4><a href="#servicos">Contabilidade</a><a href="#servicos">Fiscalidade</a><a href="#servicos">Recursos Humanos</a><a href="#servicos">Gestão empresarial</a></div><div><h4>Contactos</h4><button className="footer-contact" onClick={() => startRequest("")}><Mail size={15}/> Solicitar contacto</button><span><MapPin size={15}/> Maputo, Moçambique</span><button className="footer-contact" onClick={() => startRequest("")}><Phone size={15}/> Solicitar contacto</button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} ACJL — Contabilidade & Serviços</span><span>Serviços com âmbito claro. Soluções com propósito.</span></div></footer>

      {modal && <div className="modal-backdrop" role="presentation" onClick={(e) => {if (e.target === e.currentTarget) setModal(null);}}><div className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title"><button className="modal-close" onClick={() => setModal(null)} aria-label="Fechar"><X size={20}/></button>{sent ? <div className="success-state"><div className="success-icon"><Check size={28}/></div><h2>Pedido preparado</h2><p>Esta demonstração ainda não envia o pedido para a ACJL. A integração do formulário com o sistema de pedidos será configurada na próxima fase.</p><button className="button" onClick={() => setModal(null)}>Fechar</button></div> : <><div className="eyebrow"><span></span> CONTACTO COMERCIAL</div><h2 id="request-title">Vamos falar sobre o seu negócio.</h2><p className="modal-intro">Indique a sua necessidade. A equipa poderá confirmar o âmbito e preparar uma proposta.</p><form onSubmit={(e) => {e.preventDefault(); setSent(true);}}><label>Serviço pretendido<input value={selected} onChange={(e) => setSelected(e.target.value)} placeholder="Ex.: Contabilidade mensal" required/></label><div className="form-row"><label>Nome<input required placeholder="O seu nome"/></label><label>Empresa<input placeholder="Nome do negócio"/></label></div><div className="form-row"><label>Email<input type="email" required placeholder="nome@empresa.com"/></label><label>Telefone<input type="tel" required placeholder="+258 ..."/></label></div><label>Como podemos ajudar?<textarea rows={3} placeholder="Descreva brevemente o que precisa resolver."/></label><label className="consent"><input type="checkbox" required/><span>Autorizo o contacto da ACJL para responder a este pedido.</span></label><button className="button form-submit" type="submit">Preparar pedido <ArrowRight size={17}/></button><small className="form-note">Demonstração inicial: o formulário ainda não transmite dados nem processa pagamentos.</small></form></>}</div></div>}
    </main>
  );
}
