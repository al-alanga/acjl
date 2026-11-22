# ACJL — Contabilidade & Serviços

Plataforma institucional e de contratação de serviços empresariais para o mercado moçambicano.

## Stack
- Next.js App Router, React e TypeScript
- Supabase PostgreSQL como base de dados
- Vercel para publicação

## Executar localmente
1. Instalar Node.js LTS.
2. Executar `npm install`.
3. Copiar `.env.example` para `.env.local`.
4. Preencher as variáveis de ambiente no ambiente local (não commitar `.env.local`).
5. Executar `npm run dev`.
6. Verificar `npm run build` e `npm run lint` antes de publicar.

## Estado do produto
- Site institucional, catálogo e modelos de contratação: implementados como primeira versão.
- Formulário comercial: ligado ao endpoint `POST /api/requests`; gera uma referência e tenta registar o pedido no Supabase.
- Endpoint de pedidos: valida campos, limita comprimentos, valida email, inclui honeypot básico e não devolve dados privados da base de dados.
- Base de dados: esquema inicial aplicado ao projecto Supabase ACJL; tabelas privadas protegidas por RLS sem políticas de acesso ao cliente.
- Área de cliente/autenticação, backoffice, gestão de documentos privados e acompanhamento de pedidos: ainda por implementar.
- Pagamentos e integração M-Pesa: ainda por implementar; requer escolha do fornecedor, credenciais e validação de callbacks.

## Configuração obrigatória para o formulário
Configurar no ambiente de execução (local e Vercel):
- `NEXT_PUBLIC_SUPABASE_URL`: URL do projecto Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: chave secreta de servidor do mesmo projecto. **Nunca** usar prefixo `NEXT_PUBLIC_`, expor no browser, ou guardar no GitHub.

Se estas variáveis não estiverem configuradas, o endpoint responde com erro de configuração (HTTP 503), sem fingir que o pedido foi guardado. Depois de configurar, testar o formulário de ponta a ponta e confirmar a inserção em `public.service_requests`.

## Segurança
- Não guardar segredos reais no GitHub.
- A chave service role só pode ser usada no servidor e deve ser protegida como segredo.
- Não foram criadas políticas públicas de leitura/escrita para pedidos, eventos, documentos ou pagamentos. A inserção actual é feita pelo endpoint de servidor.
- Antes de disponibilizar o endpoint publicamente, acrescentar rate limiting robusto e monitorização anti-abuso.
- Documentos empresariais devem ficar em armazenamento privado com políticas de acesso.
- O estado de pagamento só pode mudar após confirmação autenticada do fornecedor.
- Não garantir decisões de entidades públicas nem resultados de concursos.

## Documentação
- Plano: `docs/PLANO-DESENVOLVIMENTO.md`
- Catálogo comercial: `docs/CATALOGO-COMERCIAL.md`
- Esquema inicial: `supabase/schema.sql`
