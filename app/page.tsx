"use client";

import { useState } from "react";
import { ArrowRight, Check, FileCheck2, Menu, ShieldCheck, Calculator, ReceiptText, UsersRound, BriefcaseBusiness, Building2, ClipboardList, X, Mail, MapPin } from "lucide-react";

const services = [
  { category: "Formalização", title: "Constituição de empresa", description: "Apoio na criação do negócio e no encaminhamento dos registos e procedimentos aplicáveis.", deliverables: ["Checklist de requisitos aplicáveis", "Documentos e formulários abrangidos", "Orientação sobre próximos passos"], type: "Avulso", icon: Building2, price: "Sob proposta" },
  { category: "Formalização", title: "Alteração de dados da empresa", description: "Tratamento de alterações de sede, actividade, representantes ou outros dados sujeitos a actualização.", deliverables: ["Lista de dados a actualizar", "Preparação documental incluída", "Comprovativos disponíveis do processo"], type: "Avulso", icon: Building2, price: "Sob proposta" },
  { category: "Formalização", title: "Licenciamento e renovação", description: "Apoio aos procedimentos de licenciamento ou renovação adequados à actividade e ao local.", deliverables: ["Checklist documental da actividade", "Organização do dossier", "Registo de submissão, quando aplicável"], type: "Avulso", icon: FileCheck2, price: "Sob proposta" },
  { category: "Contabilidade", title: "Contabilidade mensal", description: "Registos contabilísticos e informação financeira organizados para acompanhar a actividade do negócio.", deliverables: ["Registos do período contratado", "Lista de documentos em falta", "Resumo periódico acordado"], type: "Mensal", icon: Calculator, price: "Sob proposta" },
  { category: "Contabilidade", title: "Organização de contabilidade em atraso", description: "Recuperação de registos de um período definido, com âmbito e volume acordados previamente.", deliverables: ["Período de recuperação delimitado", "Registos abrangidos pelo orçamento", "Lista de pendências identificadas"], type: "Avulso combinado", icon: Calculator, price: "Sob proposta" },
  { category: "Fiscalidade", title: "Declarações fiscais", description: "Preparação e submissão das obrigações fiscais abrangidas pelo serviço contratado.", deliverables: ["Identificação da obrigação e período", "Preparação da declaração contratada", "Comprovativo disponível da submissão"], type: "Avulso", icon: ReceiptText, price: "Sob proposta" },
  { category: "Fiscalidade", title: "Regularização de obrigações fiscais", description: "Apoio no tratamento de declarações em falta e outras pendências fiscais dentro do âmbito acordado.", deliverables: ["Lista das pendências incluídas", "Declarações abrangidas pela proposta", "Comprovativos disponíveis"], type: "Avulso combinado", icon: ReceiptText, price: "Sob proposta" },
  { category: "Fiscalidade", title: "Apoio a notificações fiscais", description: "Preparação de resposta e organização dos elementos necessários para uma notificação concreta.", deliverables: ["Organização dos elementos relevantes", "Preparação da resposta abrangida", "Registo da documentação entregue"], type: "Avulso", icon: FileCheck2, price: "Sob proposta" },
  { category: "Recursos Humanos", title: "Processamento salarial", description: "Cálculo periódico dos salários e procedimentos administrativos incluídos no contrato.", deliverables: ["Cálculo do período contratado", "Mapa salarial acordado", "Documentos administrativos incluídos"], type: "Mensal ou avulso", icon: UsersRound, price: "Sob proposta" },
  { category: "Recursos Humanos", title: "Admissão e inscrição de trabalhador", description: "Apoio à recolha de dados e aos procedimentos aplicáveis de contratação e inscrição.", deliverables: ["Checklist de dados do trabalhador", "Documentação incluída no âmbito", "Apoio aos procedimentos aplicáveis"], type: "Avulso", icon: UsersRound, price: "Sob proposta" },
  { category: "Recursos Humanos", title: "Gestão de saída de trabalhador", description: "Apoio aos procedimentos de saída e ao cálculo dos valores abrangidos pelo serviço.", deliverables: ["Checklist de saída aplicável", "Cálculos abrangidos pela proposta", "Documentação final acordada"], type: "Avulso", icon: UsersRound, price: "Sob proposta" },
  { category: "Concursos e fornecedores", title: "Preparação de dossier de fornecedor", description: "Organização dos documentos exigidos por um cliente empresarial para iniciar ou manter uma relação comercial.", deliverables: ["Checklist do cliente empresarial", "Organização dos documentos fornecidos", "Dossier preparado para revisão"], type: "Avulso", icon: FileCheck2, price: "Sob proposta" },
  { category: "Concursos e fornecedores", title: "Preparação documental para concurso", description: "Organização de documentos para uma oportunidade ou concurso identificado, sem garantia de adjudicação.", deliverables: ["Checklist da oportunidade identificada", "Organização dos documentos exigidos", "Revisão de completude documental"], type: "Avulso", icon: ClipboardList, price: "Sob proposta" },
  { category: "Gestão empresarial", title: "Regularização empresarial", description: "Tratamento coordenado de pendências administrativas, fiscais ou laborais com âmbito definido.", deliverables: ["Lista de pendências contratadas", "Plano de tratamento por tarefa", "Resumo dos elementos concluídos"], type: "Avulso combinado", icon: ClipboardList, price: "Sob proposta" },
];

const packages = [
  { name: "Contabilidade & Fiscalidade", label: "Mensal especializado", price: "Sob proposta", text: "Acompanhamento contabilístico e fiscal ajustado ao volume e às obrigações da empresa.", features: ["Registos contabilísticos mensais", "Organização de documentos", "Obrigações fiscais contratadas", "Resumo periódico de execução"] },
  { name: "Fiscalidade Recorrente", label: "Mensal especializado", price: "Sob proposta", text: "Acompanhamento periódico das obrigações fiscais incluídas no contrato e dos respectivos prazos.", features: ["Calendário de obrigações contratadas", "Preparação das declarações incluídas", "Organização dos comprovativos", "Avisos sobre prazos acordados"] },
  { name: "Recursos Humanos", label: "Mensal especializado", price: "Sob proposta", text: "Apoio recorrente à gestão administrativa dos trabalhadores, com limites claros.", features: ["Processamento salarial", "Admissões e saídas acordadas", "Férias e faltas", "Procedimentos aplicáveis do INSS"] },
  { name: "Gestão Empresarial Integrada", label: "Pacote combinado mensal", price: "Sob proposta", text: "Uma solução coordenada para empresas que precisam de várias funções num único parceiro.", features: ["Contabilidade e fiscalidade", "Recursos Humanos", "Coordenação administrativa acordada", "Resumo consolidado da execução"] },
  { name: "Administração & Recursos Humanos", label: "Pacote combinado mensal", price: "Sob proposta", text: "Apoio coordenado às rotinas administrativas e de pessoal, com responsabilidades e limites definidos para cada período.", features: ["Processamento salarial dentro do limite contratado", "Apoio administrativo a admissões e saídas acordadas", "Organização de registos de férias e faltas", "Calendário de tarefas e resumo periódico da execução"] },
];

const combined = [
  { name: "Começar o Negócio", text: "Formalização, registos aplicáveis e documentação inicial.", price: "Sob proposta" },
  { name: "Preparar para Fornecer Empresas", text: "Dossier de fornecedor e preparação para requisitos de um cliente identificado.", price: "Sob proposta" },
  { name: "Preparar uma Candidatura", text: "Organização documental para uma oportunidade ou concurso específico.", price: "Sob proposta" },
  { name: "Colocar a Contabilidade em Ordem", text: "Organização de registos de um período previamente definido.", price: "Sob proposta" },
  { name: "Regularização Empresarial Integrada", text: "Tratamento de pendências identificadas e acordadas numa proposta.", price: "Sob proposta" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string | null>(null);
  const [activeContractModel, setActiveContractModel] = useState<string | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceCode, setReferenceCode] = useState("");


  function startRequest(name: string) {
    setSelected(name);
    setSent(false);
    setSubmitting(false);
    setSubmitError("");
    setReferenceCode("");
    setModal("request");
  }

  return (
    <main>
      <div className="topline"><div className="container topline-inner"><span>Parceiro para o crescimento do seu negócio</span><div><span>Atendimento empresarial</span><span className="top-sep">|</span><span>Maputo, Moçambique</span></div></div></div>
      <header className="header">
        <div className="container nav">
          <a className="brand brand-header" href="#inicio" aria-label="ACJL início">
            <span className="brand-text">ACJL</span><span className="brand-subtitle">CONTABILIDADE &amp; SERVIÇOS</span>
          </a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="navegacao-principal">{menuOpen ? <X/> : <Menu/>}</button>
          <nav id="navegacao-principal" className={menuOpen ? "navlinks open" : "navlinks"}>
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
            <div className="visual-top"><span className="visual-kicker">SOLUÇÕES EMPRESARIAIS</span><span className="visual-dot"></span><span>MOÇAMBIQUE</span></div>
            <div className="visual-title">Estrutura para<br/><b>avançar.</b></div>
            <div className="visual-line"></div>
            <div className="visual-metrics"><div><span>01</span><strong>Contabilidade</strong></div><div><span>02</span><strong>Fiscalidade</strong></div><div><span>03</span><strong>Recursos Humanos</strong></div></div>
            <div className="visual-watermark" aria-hidden="true"></div>
            <div className="visual-corner">SOLUÇÕES EMPRESARIAIS · MOÇAMBIQUE</div>
          </div>
        </div>
        <div className="hero-bottom"><div className="container hero-bottom-inner"><span>PARA MICRO, PEQUENAS E MÉDIAS EMPRESAS</span><span className="gold-rule"></span><span>SERVIÇOS AVULSOS · PACOTES MENSAIS · SOLUÇÕES COMBINADAS</span></div></div>
      </section>

      <section className="trust-strip"><div className="container trust-grid"><div><span className="trust-number">01</span><div><strong>Clareza na contratação</strong><small>Âmbito e preço definidos</small></div></div><div><span className="trust-number">02</span><div><strong>Soluções práticas</strong><small>Foco no que precisa resolver</small></div></div><div><span className="trust-number">03</span><div><strong>Contacto contínuo</strong><small>Actualizações pela equipa ACJL</small></div></div><div><span className="trust-number">04</span><div><strong>Um parceiro</strong><small>Várias áreas empresariais</small></div></div></div></section>

      <section className="section intro-section" id="empresa"><div className="container intro-grid"><div><div className="eyebrow"><span></span> SOBRE A ACJL</div><h2>O apoio empresarial deve <em>simplificar.</em></h2></div><div className="intro-copy"><p>A ACJL — Contabilidade & Serviços reúne soluções de apoio à atividade empresarial para que os responsáveis pelos negócios possam dedicar mais tempo aos clientes, às operações e ao crescimento.</p><p>Trabalhamos com serviços avulsos, pacotes mensais especializados e soluções combinadas. Cada contratação deve ter um âmbito claro, entregáveis definidos e condições adequadas à dimensão do trabalho.</p><a className="text-link dark-link" href="#como-funciona">A nossa forma de trabalhar <ArrowRight size={16}/></a></div></div></section>

      <section className="section services-section" id="servicos">
        <div className="container">
          <div className="section-heading services-heading">
            <div><div className="eyebrow"><span></span> O QUE FAZEMOS</div><h2>Encontre apoio para <em>o que precisa resolver.</em></h2></div>
            <p>Comece pela necessidade da sua empresa. Em cada área, veja as soluções disponíveis e escolha a que melhor corresponde à sua situação.</p>
          </div>
          {!activeServiceCategory ? (
            <div className="service-journey-grid">
              <button className="service-journey-card" onClick={() => setActiveServiceCategory("Formalização")}><span className="journey-icon"><Building2 size={25}/></span><span className="journey-number">01</span><h3>Quero abrir ou regularizar a minha empresa</h3><p>Formalização, alterações de dados, licenças e regularização de pendências.</p><span className="journey-link">Ver soluções <ArrowRight size={17}/></span></button>
              <button className="service-journey-card" onClick={() => setActiveServiceCategory("Contabilidade")}><span className="journey-icon"><Calculator size={25}/></span><span className="journey-number">02</span><h3>Preciso organizar a contabilidade</h3><p>Acompanhamento mensal ou organização de registos contabilísticos em atraso.</p><span className="journey-link">Ver soluções <ArrowRight size={17}/></span></button>
              <button className="service-journey-card" onClick={() => setActiveServiceCategory("Fiscalidade")}><span className="journey-icon"><ReceiptText size={25}/></span><span className="journey-number">03</span><h3>Preciso tratar assuntos fiscais</h3><p>Declarações, obrigações fiscais em falta e respostas a notificações.</p><span className="journey-link">Ver soluções <ArrowRight size={17}/></span></button>
              <button className="service-journey-card" onClick={() => setActiveServiceCategory("Recursos Humanos")}><span className="journey-icon"><UsersRound size={25}/></span><span className="journey-number">04</span><h3>Preciso de apoio com trabalhadores</h3><p>Salários, admissões, saídas e procedimentos administrativos de RH.</p><span className="journey-link">Ver soluções <ArrowRight size={17}/></span></button>
              <button className="service-journey-card" onClick={() => setActiveServiceCategory("Concursos e fornecedores")}><span className="journey-icon"><FileCheck2 size={25}/></span><span className="journey-number">05</span><h3>Quero fornecer empresas ou concorrer</h3><p>Preparação de dossier de fornecedor e organização documental para concursos.</p><span className="journey-link">Ver soluções <ArrowRight size={17}/></span></button>
              <button className="service-journey-card service-journey-featured" onClick={() => setActiveServiceCategory("Gestão empresarial")}><span className="journey-icon"><BriefcaseBusiness size={25}/></span><span className="journey-number">06</span><h3>Preciso de apoio em várias áreas</h3><p>Soluções coordenadas para tratar de várias necessidades num só pedido.</p><span className="journey-link">Ver soluções <ArrowRight size={17}/></span></button>
            </div>
          ) : (
            <div className="service-detail-view">
              <div className="service-detail-head"><div><span className="detail-eyebrow">ÁREA DE SERVIÇO</span><h3>{activeServiceCategory}</h3><p>Escolha uma solução para ver o próximo passo e solicitar uma proposta.</p></div><button className="service-back-button" onClick={() => setActiveServiceCategory(null)}><ArrowRight size={16}/> Todas as áreas</button></div>
              <div className="service-grid">{services.filter(s => s.category === activeServiceCategory).map((s, i) => {const Icon = s.icon; return <article className="service-card" key={s.title}><div className="service-card-top"><div className="service-icon"><Icon size={23}/></div><span className="service-index">{String(i + 1).padStart(2,"0")}</span></div><h3>{s.title}</h3><p>{s.description}</p><div className="service-deliverables"><strong>O que pode incluir</strong><ul>{(s.deliverables ?? []).map((item: string) => <li key={item}>{item}</li>)}</ul></div><div className="service-card-foot"><span>{s.type}</span><button onClick={() => startRequest(s.title)} aria-label={"Solicitar " + s.title}><ArrowRight size={18}/></button></div><button className="service-card-action" onClick={() => startRequest(s.title)}>Solicitar esta solução <ArrowRight size={15}/></button></article>})}
              {activeServiceCategory === "Gestão empresarial" && <article className="service-card service-custom-card"><div className="service-icon"><BriefcaseBusiness size={23}/></div><h3>Combinar várias necessidades</h3><p>Explique-nos os assuntos que pretende resolver e prepararemos uma proposta com âmbito definido.</p><div className="service-card-foot"><span>Proposta personalizada</span><button onClick={() => startRequest("Solução empresarial combinada")} aria-label="Solicitar solução combinada"><ArrowRight size={18}/></button></div><button className="service-card-action" onClick={() => startRequest("Solução empresarial combinada")}>Descrever a minha necessidade <ArrowRight size={15}/></button></article>}
              </div>
            </div>
          )}
          <div className="services-help"><div><strong>Não sabe por onde começar?</strong><span>Descreva a situação e ajudamos a definir o serviço adequado.</span></div><button className="button button-outline" onClick={() => startRequest("Pedido personalizado")}>Pedir orientação <ArrowRight size={16}/></button></div>
        </div>
      </section>

      <section className="section packages-section" id="pacotes">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow"><span></span> MODELOS DE CONTRATAÇÃO</div><h2>Escolha como <em>quer trabalhar connosco.</em></h2></div>
            <p>Não precisa de conhecer os nomes dos nossos pacotes. Escolha o tipo de apoio de que precisa e veja as opções.</p>
          </div>
          {!activeContractModel ? (
            <div className="contract-model-grid">
              <button className="contract-model-card" onClick={() => setActiveContractModel("avulso")}><span className="contract-model-icon"><ClipboardList size={25}/></span><span className="contract-model-step">01 · PONTUAL</span><h3>Resolver uma necessidade específica</h3><p>Para uma tarefa concreta, sem compromisso mensal.</p><span className="contract-model-examples">Ex.: licenciamento, declaração fiscal ou dossier de fornecedor</span><span className="contract-model-link">Ver opções <ArrowRight size={17}/></span></button>
              <button className="contract-model-card contract-model-recurring" onClick={() => setActiveContractModel("mensal")}><span className="contract-model-icon"><Calculator size={25}/></span><span className="contract-model-step">02 · RECORRENTE</span><h3>Ter apoio todos os meses</h3><p>Para manter as tarefas contabilísticas, fiscais ou de RH acompanhadas.</p><span className="contract-model-examples">Ex.: contabilidade, fiscalidade ou processamento salarial</span><span className="contract-model-link">Ver opções <ArrowRight size={17}/></span></button>
              <button className="contract-model-card" onClick={() => setActiveContractModel("combinado")}><span className="contract-model-icon"><BriefcaseBusiness size={25}/></span><span className="contract-model-step">03 · INTEGRADO</span><h3>Reunir vários serviços</h3><p>Para tratar de necessidades relacionadas numa única contratação.</p><span className="contract-model-examples">Ex.: iniciar um negócio ou regularizar várias pendências</span><span className="contract-model-link">Ver opções <ArrowRight size={17}/></span></button>
            </div>
          ) : (
            <div className="contract-detail-view">
              <div className="contract-detail-head"><div><span className="detail-eyebrow">MODELO DE CONTRATAÇÃO</span><h3>{activeContractModel === "avulso" ? "Resolver uma necessidade específica" : activeContractModel === "mensal" ? "Ter apoio todos os meses" : "Reunir vários serviços"}</h3><p>{activeContractModel === "avulso" ? "Escolha a tarefa concreta que pretende concluir." : activeContractModel === "mensal" ? "Compare os formatos de acompanhamento recorrente." : "Escolha uma solução coordenada para várias necessidades."}</p></div><button className="service-back-button" onClick={() => setActiveContractModel(null)}><ArrowRight size={16}/> Todos os modelos</button></div>
              {activeContractModel === "mensal" ? (
                <div className="package-grid">{packages.filter(p => p.label.toLowerCase().includes("mensal")).map((p) => <article className="package-card" key={p.name}><div className="package-label">{p.label}</div><h3>{p.name}</h3><div className="package-price">{p.price}</div><p>{p.text}</p><div className="package-rule"></div><ul>{p.features.map(f => <li key={f}><Check size={16}/>{f}</li>)}</ul><button className="button button-outline" onClick={() => startRequest(p.name)}>Solicitar proposta <ArrowRight size={16}/></button></article>)}</div>
              ) : (
                <div className="contract-options-list">{(activeContractModel === "avulso" ? combined.filter(p => !p.name.includes("Integrada")) : combined.filter(p => ["Começar o Negócio","Preparar para Fornecer Empresas","Preparar uma Candidatura","Regularização Empresarial Integrada"].includes(p.name))).map((p, i) => <article className="contract-option" key={p.name}><span className="contract-option-number">{String(i+1).padStart(2,"0")}</span><div><h4>{p.name}</h4><p>{p.text}</p><span>{p.price}</span></div><button onClick={() => startRequest(p.name)} aria-label={"Solicitar " + p.name}><span>Solicitar proposta</span><ArrowRight size={17}/></button></article>)}
                {activeContractModel === "avulso" && services.filter(s => s.type === "Avulso").map((s,i) => <article className="contract-option" key={s.title}><span className="contract-option-number">{String(i+6).padStart(2,"0")}</span><div><h4>{s.title}</h4><p>{s.description}</p><span>{s.price}</span></div><button onClick={() => startRequest(s.title)} aria-label={"Solicitar " + s.title}><span>Solicitar proposta</span><ArrowRight size={17}/></button></article>)}</div>
              )}
              <div className="contract-detail-help"><strong>Ainda não encontrou o formato certo?</strong><span>Explique-nos o que precisa e ajudamos a definir o âmbito da contratação.</span><button className="button button-outline" onClick={() => startRequest("Pedido de proposta personalizada")}>Pedir proposta personalizada <ArrowRight size={16}/></button></div>
            </div>
          )}
        </div>
      </section>

      <section className="section process-section" id="como-funciona"><div className="container process-grid"><div className="process-copy"><div className="eyebrow"><span></span> COMO FUNCIONA</div><h2>Do pedido à entrega, <em>com clareza.</em></h2><p>Um processo simples para saber o que está a contratar e o que acontece a seguir.</p><button className="button" onClick={() => startRequest("")}>Iniciar um pedido <ArrowRight size={16}/></button></div><div className="steps"><div className="step"><span>01</span><div><h3>Escolha a solução</h3><p>Selecione um serviço ou descreva a necessidade da sua empresa.</p></div></div><div className="step"><span>02</span><div><h3>Confirme o âmbito e o preço</h3><p>Receba as condições, os entregáveis e os custos antes da execução.</p></div></div><div className="step"><span>03</span><div><h3>Envie os dados necessários</h3><p>Partilhe a informação e a documentação exigidas para o serviço.</p></div></div><div className="step"><span>04</span><div><h3>Receba actualizações</h3><p>A equipa da ACJL mantém o contacto para esclarecer dúvidas e informar sobre os próximos passos.</p></div></div></div></div></section>

      <section className="section faq-section" id="perguntas-frequentes">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow"><span></span> ANTES DE SOLICITAR</div><h2>Respostas para <em>começar com clareza.</em></h2></div>
            <p>Conheça o processo de contratação e o que pode influenciar a proposta para a sua empresa.</p>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Como são definidos os preços?</summary>
              <p>Os preços são apresentados sob proposta, depois de compreendermos o serviço, o volume de trabalho, os períodos envolvidos e os entregáveis necessários. Não avançamos com trabalho adicional sem acordar previamente as condições.</p>
            </details>
            <details className="faq-item">
              <summary>O que acontece depois de enviar o pedido?</summary>
              <p>A equipa da ACJL analisa a informação e entra em contacto para esclarecer a necessidade, confirmar o âmbito e apresentar as condições aplicáveis. O envio do formulário não cria, por si só, uma obrigação de contratação.</p>
            </details>
            <details className="faq-item">
              <summary>Que documentos devo enviar no formulário?</summary>
              <p>Não envie documentos confidenciais através do formulário. Descreva apenas a necessidade; se forem necessários documentos, a equipa indicará os elementos e o canal adequado para os partilhar.</p>
            </details>
            <details className="faq-item">
              <summary>A ACJL garante licenças, certidões ou adjudicações?</summary>
              <p>Não. Alguns procedimentos dependem de autoridades públicas, clientes empresariais ou outras entidades. A ACJL pode apoiar a preparação e o acompanhamento do processo, mas não garante decisões que dependem de terceiros.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section"><div className="container cta-inner"><div><div className="eyebrow eyebrow-light"><span></span> VAMOS TRABALHAR JUNTOS</div><h2>Tem uma necessidade empresarial para resolver?</h2><p>Conte-nos o que precisa. Ajudamos a identificar o serviço adequado e a definir os próximos passos.</p></div><button className="button button-gold" onClick={() => startRequest("")}>Pedir uma proposta <ArrowRight size={17}/></button></div></section>

      <footer className="footer" id="contactos"><div className="container footer-main"><div className="footer-brand"><a className="brand brand-footer" href="#inicio" aria-label="ACJL — voltar ao início"><span className="footer-brand-name">ACJL</span><span className="footer-brand-subtitle">CONTABILIDADE &amp; SERVIÇOS</span></a><p>Apoio contabilístico, fiscal e administrativo para empresas que precisam de clareza, organização e acompanhamento em Moçambique.</p><button className="footer-primary-cta" onClick={() => startRequest("")}>Falar com a ACJL <ArrowRight size={16}/></button></div><div className="footer-column"><h4>Explore o site</h4><a href="#empresa">Sobre a ACJL</a><a href="#servicos">O que fazemos</a><a href="#pacotes">Modelos de contratação</a><a href="#como-funciona">Como funciona</a></div><div className="footer-column"><h4>Encontre uma solução</h4><a href="#servicos">Formalização empresarial</a><a href="#servicos">Contabilidade</a><a href="#servicos">Fiscalidade</a><a href="#servicos">Recursos Humanos</a><a href="#servicos">Concursos e fornecedores</a></div><div className="footer-column footer-contact-column"><h4>Contactos</h4><p className="footer-contact-note">Tem uma questão ou precisa de uma proposta? Envie-nos o seu pedido.</p><span className="footer-location"><MapPin size={16}/> Maputo, Moçambique</span><button className="footer-contact" onClick={() => startRequest("")}><Mail size={16}/> Solicitar contacto <ArrowRight size={14}/></button></div></div><div className="footer-bottom-wrap"><div className="container footer-bottom"><span>© {new Date().getFullYear()} ACJL — Contabilidade &amp; Serviços</span><span className="footer-signoff">Apoio empresarial com clareza e propósito.</span></div></div></footer>

      {modal && <div className="modal-backdrop" role="presentation" onClick={(e) => {if (e.target === e.currentTarget) setModal(null);}}><div className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title"><button className="modal-close" onClick={() => setModal(null)} aria-label="Fechar"><X size={20}/></button>{sent ? <div className="success-state"><div className="success-icon"><Check size={28}/></div><h2>Pedido recebido</h2><p>O seu pedido foi registado. Guarde esta referência caso precise de a mencionar num contacto com a ACJL.</p><strong className="request-reference">{referenceCode}</strong><button className="button" onClick={() => setModal(null)}>Fechar</button></div> : <><div className="eyebrow"><span></span> CONTACTO COMERCIAL</div><h2 id="request-title">Vamos falar sobre o seu negócio.</h2><p className="modal-intro">Indique a sua necessidade. A equipa poderá confirmar o âmbito e preparar uma proposta.</p><form onSubmit={async (e) => { e.preventDefault(); setSubmitting(true); setSubmitError(""); const form = e.currentTarget; const data = new FormData(form); try { const response = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ serviceName: String(data.get("serviceName") || ""), customerName: String(data.get("customerName") || ""), businessName: String(data.get("businessName") || ""), email: String(data.get("email") || ""), phone: String(data.get("phone") || ""), description: String(data.get("description") || ""), website: String(data.get("website") || "") }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Não foi possível enviar o pedido."); setReferenceCode(result.referenceCode); setSent(true); } catch (error) { setSubmitError(error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente."); } finally { setSubmitting(false); } }}><label>Serviço pretendido<input name="serviceName" value={selected} onChange={(e) => setSelected(e.target.value)} placeholder="Ex.: Contabilidade mensal" required maxLength={160}/></label><div className="form-row"><label>Nome<input name="customerName" required placeholder="O seu nome" maxLength={120}/></label><label>Empresa<input name="businessName" placeholder="Nome do negócio" maxLength={160}/></label></div><div className="form-row"><label>Email<input name="email" type="email" required placeholder="nome@empresa.com" maxLength={254}/></label><label>Telefone<input name="phone" type="tel" required placeholder="+258 ..." maxLength={40}/></label></div><label>Como podemos ajudar?<textarea name="description" rows={3} placeholder="Descreva brevemente o que precisa resolver." required minLength={8} maxLength={3000}/></label><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="consent"><input type="checkbox" required/><span>Autorizo o contacto da ACJL para responder a este pedido.</span></label>{submitError && <p className="form-error" role="alert">{submitError}</p>}<button className="button form-submit" type="submit" disabled={submitting}>{submitting ? "A enviar..." : "Enviar pedido"} <ArrowRight size={17}/></button><small className="form-note">Os seus dados serão utilizados para responder a este pedido. Não envie documentos confidenciais neste formulário.</small></form></>}</div></div>}
    </main>
  );
}
