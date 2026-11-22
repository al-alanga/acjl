# ACJL — Plano de desenvolvimento

## Princípios de produto
- Público principal: micro e pequenas empresas moçambicanas; empresas de maior dimensão são público secundário.
- Vender execução e resultados concretos, nunca diagnósticos pagos como produto isolado.
- Catálogo organizado em serviços avulsos, pacotes mensais especializados e pacotes combinados avulsos.
- Backoffice e rede de parceiros geridos internamente; sem marketplace público na fase inicial.
- O esforço operacional e o preço devem ser proporcionais ao âmbito: limitar pedidos pequenos, vagos ou de preço baixo que exigem trabalho excessivo.
- A marca deve usar o ficheiro de logótipo original fornecido pelo cliente como imagem, sem redesenhar letras, símbolo ou assinatura.

## Fase 1 — Base institucional e visual
- [x] Inicializar aplicação Next.js, React e TypeScript.
- [x] Criar a página institucional com navegação por necessidades, modelos de contratação e chamadas para acção.
- [x] Refinar o rodapé, hierarquia visual, estados interactivos e adaptação a ecrãs pequenos.
- [x] Melhorar acessibilidade de navegação por teclado, foco visível e comportamento do menu móvel.
- [x] Uniformizar a linguagem pública dos preços para “Sob proposta”.
- [x] Adicionar metadados SEO/Open Graph e idioma documental português de Moçambique (pt-MZ).
- [ ] Aplicar o logótipo original conforme a orientação visual aprovada; a versão gráfica foi revertida a pedido do cliente e mantém-se a assinatura textual provisória.
- [ ] Rever textos e contactos finais com a ACJL.
- [ ] Validar o aspecto no domínio publicado e confirmar build/deploy; não foi encontrado projecto Vercel ligado ao repositório.
- Critério de aceitação: página responsiva, identidade conforme a última orientação aprovada, navegação funcional e sem dados comerciais inventados apresentados como definitivos.
## Fase 2 — Catálogo comercial definitivo
- [x] Formalizar modalidades, serviços, limites e regras comerciais de referência em `docs/CATALOGO-COMERCIAL.md`.
- [ ] Validar conteúdo, entregáveis, limites, prazos e preços com a ACJL antes de publicar o catálogo definitivo.
- [x] Diferenciar: serviço avulso; pacote mensal especializado; pacote combinado avulso; pacote combinado mensal.
- [x] Excluir serviços autónomos de diagnóstico do catálogo e das regras comerciais.
- [x] Documentar regras de escalonamento para urgências, volumes extraordinários, períodos em atraso e trabalho fora do âmbito; exigir orçamento prévio.
- [ ] Não publicar preços de referência como preços finais sem validação comercial da ACJL.
- [x] Acrescentada matriz de especificação por oferta, com resultado, entregáveis mínimos, limites a definir e exclusões.
- [x] Acrescentadas regras obrigatórias para propostas, responsabilidades do cliente, prazos, pagamentos e revisão profissional.
- [ ] Validar os limites operacionais, prazos, preços e condições comerciais com a ACJL.
- Critério de aceitação: cada produto explica qual problema resolve, o que será entregue, o que não está incluído e como é calculado o preço.

## Fase 3 — Pedidos e área do cliente
- [x] Desenhar e aplicar o modelo inicial de dados no projecto Supabase ACJL; seis tabelas com RLS activo.
- [x] Confirmar o projecto Supabase ACJL e aplicar o esquema inicial.
- [x] Ligar o formulário a `POST /api/requests`, com validação de dados e gravação server-side quando as credenciais estiverem configuradas.
- [ ] Configurar `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` nos ambientes local e Vercel; testar o fluxo real ponta a ponta.
- [ ] Implementar conta de cliente, autenticação, recuperação de acesso e perfis.
- [ ] Permitir anexar documentos e consultar o histórico e estado dos pedidos.
- [ ] Criar backoffice interno para triagem, atribuição, mensagens, prazos e entrega.
- Estados mínimos: rascunho, recebido, a aguardar informação, proposta enviada, aguarda pagamento, pago, em execução, aguarda cliente/entidade externa, concluído, cancelado.

## Fase 4 — Pagamentos
- [ ] Confirmar o fornecedor e os termos comerciais de integração M-Pesa.
- [ ] Implementar iniciação e confirmação de pagamento no servidor.
- [ ] Registar referência, montante, moeda, estado, data e associação ao pedido.
- [ ] Implementar reconciliação e tratamento de pagamentos pendentes, falhados ou duplicados.
- Critério de aceitação: o estado “pago” só é atribuído após confirmação verificável do fornecedor; nunca confiar apenas no retorno do navegador.

## Fase 5 — Execução operacional e qualidade
- [ ] Criar painel interno com filas de trabalho, responsáveis, SLA e alertas.
- [ ] Definir modelos de proposta, checklist de documentos e controlo de qualidade.
- [ ] Registar atividade e alterações relevantes para auditoria.
- [ ] Delimitar tarefas regulamentadas e atribuí-las a profissionais devidamente habilitados.
- [ ] Comunicar claramente que decisões de entidades públicas e resultados de concursos não são garantidos.

## Fase 6 — Testes e publicação
- [ ] Configurar variáveis de ambiente e ambientes de desenvolvimento/produção.
- [ ] Confirmar o projecto Vercel associado ao repositório ACJL; a listagem actual não mostrou um projecto ACJL identificado.
- [ ] Executar testes de build, lint, formulários, permissões e fluxos de pagamento.
- [ ] Testar em computador e telemóvel.
- [ ] Rever privacidade, segurança, termos de serviço e retenção de documentos.
- [ ] Publicar no Vercel e validar o domínio de produção.

## Arquitetura técnica proposta
- Frontend: Next.js App Router, React, TypeScript.
- Backend e dados: Supabase (PostgreSQL, Auth e Storage), após configuração segura das credenciais.
- Pagamentos: integração M-Pesa através de API oficial ou fornecedor autorizado, após validação.
- Deploy: Vercel ligado ao repositório `al-alanga/acjl`.
- Segredos: apenas em variáveis de ambiente, nunca no código nem no repositório.

## Fora do âmbito inicial
- Marketplace aberto de prestadores.
- Diagnóstico pago como produto isolado.
- Automatização de decisões que dependem de entidades públicas.
- Publicação de preços finais não aprovados pela ACJL.


## Estado de implementação — 22/11/2026
- [x] Criada página inicial da Área do Cliente em `/area-cliente` com registo, login e listagem de pedidos ligados à conta.
- [x] Adicionado cliente Supabase para autenticação no navegador; depende das variáveis públicas de ambiente.
- [x] Adicionadas políticas RLS de leitura dos próprios pedidos, eventos públicos e metadados dos documentos.
- [ ] Associar com segurança os novos pedidos submetidos por clientes autenticados ao respectivo `customer_id`.
- [ ] Configurar confirmação de email e URL de redireccionamento no Supabase Auth.
- [ ] Configurar as variáveis no Vercel e executar build e testes reais.
- [ ] Construir área interna de backoffice e fluxo de actualização de estados.


## Website — simplificação da descoberta de serviços (22/11/2026)
- [x] Substituída a listagem inicial com pesquisa e filtros simultâneos por seis caminhos orientados às necessidades do visitante.
- [x] Os serviços específicos aparecem apenas depois de o visitante escolher uma área.
- [x] Incluídas acções claras para solicitar cada solução e uma alternativa para quem não sabe por onde começar.
- [x] Layout adaptável para computador, tablet e telemóvel.
- [ ] Verificar o resultado visual no site publicado e testar o build no Vercel.


## Website — modelos de contratação e linguagem dos serviços (22/11/2026)
- [x] Actualizados os títulos para “Preciso organizar a contabilidade” e “Preciso tratar assuntos fiscais”.
- [x] Substituída a grelha inicial de pacotes por três caminhos: contratação pontual, apoio mensal recorrente e contratação integrada.
- [x] Opções detalhadas aparecem depois da escolha do modelo, com acções claras para pedir proposta.
- [x] Mantidos preços “Sob proposta” até aprovação comercial.
- [ ] Validar visualmente em produção e executar build de verificação.


## Website — rodapé (22/11/2026)
- [x] Reorganizada a hierarquia do rodapé com descrição institucional e CTA principal para contacto.
- [x] Separadas as ligações de navegação das áreas de serviço.
- [x] Melhorado o contraste, a legibilidade, os estados hover e o comportamento responsivo.
- [x] Criada faixa inferior distinta para copyright e assinatura institucional.
- [x] Removidas ligações provisórias de privacidade/termos que apontavam para a mesma âncora sem apresentar páginas legais.
- [ ] Criar e validar páginas legais antes de voltar a apresentar essas ligações no rodapé.
- [ ] Validar a renderização final e os destinos das ligações no site publicado.

## Fecho da Fase 1 — auditoria de 22/11/2026
- Estado: trabalho de código e conteúdo-base substancialmente concluído; fecho formal ainda condicionado à decisão final sobre a aplicação do logótipo e à validação de produção.
- Alterações adicionais: acessibilidade de teclado/foco, menu móvel com atributos ARIA, salvaguardas de movimento reduzido, metadados de partilha e SEO.
- Bloqueio de publicação: a consulta ao Vercel não encontrou projecto ligado ao repositório `al-alanga/acjl`; por isso não foi possível confirmar build nem visualização publicada.
- Não alterado nesta fase: base de dados, autenticação, pagamentos e funcionalidades de backend.

## Registo de validação técnica — 22/11/2026
- [x] Inspeccionados os ficheiros principais da página inicial, layout, configuração TypeScript, configuração ESLint e endpoint de pedidos.
- [x] Confirmados scripts de build e lint em `package.json`.
- [x] Criado workflow GitHub Actions `.github/workflows/quality.yml` para executar `npm run lint` e `npm run build` em pushes para `main`, pull requests e execução manual.
- [ ] Build local e lint executados com sucesso — pendente; o ambiente desta sessão não conseguiu executar o projecto localmente.
- [ ] Resultado do workflow GitHub Actions confirmado — pendente de execução/resultado.
- [ ] Deployment Vercel validado — pendente; a ligação Vercel acessível não encontrou projecto associado ao repositório `al-alanga/acjl`.
- Estado: os testes foram preparados para execução automatizada, mas a Fase 1 não pode ser declarada tecnicamente fechada até o lint e o build terminarem com sucesso e o deployment ser validado.


## Continuidade em modo bulk — 22/11/2026
- [x] Adicionado acesso directo à Área do Cliente na navegação principal e no rodapé, apontando para `/area-cliente`.
- [x] Substituído o pacote mensal redundante “Contabilidade & Gestão Fiscal” por “Administração & Recursos Humanos” na página inicial.
- [x] Sincronizada a nomenclatura do catálogo comercial com o pacote apresentado no website.
- [x] Mantida a política de preços “Sob proposta”, sem criar preços finais sem aprovação.
- [ ] Confirmar build e lint através de execução real do workflow; configuração do workflow, por si só, não comprova sucesso.
- [ ] Resolver a ligação do Vercel ao repositório `al-alanga/acjl`: o contexto disponível só apresenta o projecto `build`, enquanto o estado de verificação do commit ACJL aparece como pendente e a integração não consegue abrir essa implantação.
- [ ] Após restabelecer a ligação Vercel, validar navegação, formulário, área do cliente, domínio e comportamento em dispositivos móveis.
- [ ] Configurar e testar as variáveis Supabase no ambiente publicado antes de prometer registo real de pedidos ou autenticação funcional.

### Bloqueios e critérios para declarar a Fase 1 concluída
- Não considerar “publicado” ou “testado” sem um URL de implantação acessível e resultado verificável de build/lint.
- A Área do Cliente está implementada na interface, mas depende das variáveis públicas Supabase e das políticas/configuração de autenticação.
- O formulário depende de `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` no servidor; sem elas, devolve um erro controlado e não regista o pedido.
- O conteúdo comercial e os limites operacionais continuam sujeitos à aprovação final da ACJL.


## Execução prioritária — actualização técnica
- [x] Adicionados cabeçalhos HTTP de segurança no Next.js: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`. Referência: documentação oficial Next.js sobre headers.
- [x] Reforçado o workflow de qualidade para executar verificação explícita de TypeScript (`npx tsc --noEmit`) entre lint e build.
- [x] Confirmado que a rota de pedidos valida campos, limita comprimentos, verifica formato de email e não expõe a chave service-role no navegador.
- [ ] Ainda não foi possível executar o workflow a partir desta integração nem obter logs de compilação; não declarar sucesso técnico até haver um resultado do GitHub Actions.
- [ ] A verificação Vercel do commit mais recente continua pendente/falhada e não é possível abrir a implantação a partir da equipa actualmente ligada.
- [ ] O formulário público ainda não associa automaticamente pedidos à conta autenticada; isso deve ser implementado e testado antes de prometer histórico integrado.
- [ ] Confirmar configuração do Supabase Auth, variáveis de ambiente e domínio de redireccionamento no ambiente correcto.


## Continuação bulk — autenticação e pedidos (22/11/2026)
- [x] Acrescentado fluxo de recuperação de palavra-passe na Área do Cliente, com envio de email e definição da nova palavra-passe após retorno do Supabase Auth.
- [x] O formulário de proposta envia o token da sessão quando o visitante está autenticado.
- [x] A rota server-side valida o token contra o endpoint de utilizador do Supabase e só associa `customer_id` quando a sessão é válida e o email corresponde à conta.
- [x] Actualizado o esquema SQL versionado com políticas RLS para o cliente consultar apenas os seus pedidos, eventos não internos e metadados dos seus documentos.
- [ ] O ficheiro SQL foi actualizado no GitHub, mas as novas políticas ainda não foram aplicadas ao projecto Supabase; a aplicação exige confirmação do ambiente e execução controlada.
- [ ] Configurar a URL de redireccionamento de recuperação no Supabase Auth para o domínio de produção.
- [ ] Confirmar que `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` existem nos ambientes correctos do Vercel; a chave service-role deve permanecer exclusivamente no servidor.
- [ ] Executar lint, TypeScript e build com resultados verificáveis; a integração GitHub disponível não devolveu execuções de Actions e o estado Vercel continua pendente.


## Decisão de produto — experiência leve de solicitação (22/11/2026)
- [x] Removido o acesso “Área do cliente” da navegação principal e do rodapé.
- [x] Removida do website a dependência de sessão Supabase para submeter pedidos de proposta.
- [x] Simplificada a API de pedidos para receber solicitações públicas sem cadastro, autenticação ou associação a conta.
- [x] Removida a página de Área do Cliente; não faz parte do produto aprovado nesta fase.
- [ ] Confirmar se o projecto já tinha políticas/rotas de autenticação activadas no Supabase; não remover utilizadores nem dados existentes sem autorização explícita.
- [ ] Verificar lint, TypeScript, build e implantação após as alterações.
- [ ] Manter apenas os dados de contacto estritamente necessários, a informação sobre utilização dos dados e uma referência de pedido para seguimento directo pela ACJL.
- Decisão: o website é um canal de apresentação e recepção de solicitações, não um portal de cliente nem um backoffice.


## Estado actual do produto — prevalece sobre planos anteriores
A decisão de simplificação substitui as tarefas antigas relacionadas com portal de clientes:
- Não implementar cadastro, login, recuperação de palavra-passe, histórico reservado nem backoffice de cliente.
- Não associar pedidos a `auth.users` nem exigir sessão para submeter o formulário.
- As referências anteriores a testar a Área do Cliente, associar pedidos a contas ou configurar redireccionamento de recuperação ficam obsoletas para esta fase.
- O formulário público continua a precisar de variáveis seguras do Supabase para persistir os pedidos. Sem essas variáveis, a API deve informar que o serviço está temporariamente indisponível; nunca deve fingir que o pedido foi registado.
- O estado Vercel consultado no GitHub para o commit `bd9342f169076c193d6b6377b6a05fce5eb272cf` é `success`. A API Vercel ligada ao ChatGPT não consegue listar o deployment, pelo que ainda falta confirmar o URL de produção e testar o formulário em funcionamento.
