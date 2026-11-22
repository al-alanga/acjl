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
- [x] Criar primeira página institucional e catálogo demonstrativo.
- [x] Colocar o ficheiro de imagem do logótipo original na pasta pública e usá-lo como imagem na navegação e no rodapé.\n- [x] Reforçar a aplicação fiel do logótipo no cabeçalho e remover lettering “ACJL” decorativo que podia parecer uma versão recriada da marca.
- [ ] Afinar a hierarquia visual para seguir a referência ALINVEST sem copiar a identidade nem o conteúdo.
- [ ] Rever todos os textos, contactos e preços provisórios antes da publicação pública.
- Critério de aceitação: página responsiva, identidade fiel ao logótipo original, navegação funcional e sem dados comerciais inventados apresentados como definitivos.

## Fase 2 — Catálogo comercial definitivo
- [x] Formalizar modalidades, serviços, limites e regras comerciais de referência em `docs/CATALOGO-COMERCIAL.md`.
- [ ] Validar conteúdo, entregáveis, limites, prazos e preços com a ACJL antes de publicar o catálogo definitivo.
- [x] Diferenciar: serviço avulso; pacote mensal especializado; pacote combinado avulso; pacote combinado mensal.
- [ ] Eliminar definitivamente qualquer serviço autónomo de diagnóstico.
- [ ] Definir regras de escalonamento para pedidos complexos, urgentes ou fora do âmbito, com orçamento prévio.
- [ ] Não publicar preços de referência como preços finais sem validação comercial da ACJL.
- Critério de aceitação: cada produto explica qual problema resolve, o que será entregue, o que não está incluído e como é calculado o preço.

## Fase 3 — Pedidos e área do cliente
- [x] Desenhar e aplicar o modelo inicial de dados no projecto Supabase ACJL; seis tabelas com RLS activo.
- [x] Confirmar o projecto Supabase ACJL e aplicar o esquema inicial.
- [x] Ligar o formulário a `POST /api/requests`, com validação de dados e gravação server-side quando as credenciais estiverem configuradas.\n- [ ] Configurar `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` nos ambientes local e Vercel; testar o fluxo real ponta a ponta.
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
- [ ] Configurar variáveis de ambiente e ambientes de desenvolvimento/produção.\n- [ ] Confirmar o projecto Vercel associado ao repositório ACJL; a listagem actual não mostrou um projecto ACJL identificado.
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
