# ACJL — Contabilidade & Serviços

Plataforma institucional e de contratação de serviços empresariais para o mercado moçambicano.

## Stack
- Next.js App Router
- React + TypeScript
- Supabase planeado para PostgreSQL, autenticação e armazenamento
- Vercel para deploy

## Executar localmente
1. Instalar Node.js LTS.
2. Executar `npm install`.
3. Copiar `.env.example` para `.env.local`.
4. Preencher apenas as variáveis correspondentes a serviços já configurados.
5. Executar `npm run dev`.
6. Verificar `npm run build` e `npm run lint` antes de publicar.

## Estado do produto
- Site institucional e catálogo inicial: implementados.
- Modalidades comerciais e documento do catálogo: definidos como referência, pendentes de validação comercial.
- Formulário: demonstração visual; ainda não transmite pedidos para um backend.
- Modelo de dados: proposto em `supabase/schema.sql`; não aplicar até confirmar o projecto Supabase correcto.
- Autenticação, área do cliente, upload seguro de documentos, backoffice e pagamentos: por implementar.
- Integração M-Pesa: aguarda escolha/validação do fornecedor e credenciais.

## Segurança
- Nunca guardar segredos reais no GitHub.
- A chave Supabase service role deve existir apenas no servidor, nunca em variáveis `NEXT_PUBLIC_*` nem no browser.
- Documentos empresariais devem ficar em armazenamento privado com políticas de acesso.
- O estado de pagamento só deve mudar após confirmação autenticada do fornecedor.
- Não garantir decisões de entidades públicas nem resultados de concursos.

## Documentação
- Plano: `docs/PLANO-DESENVOLVIMENTO.md`
- Catálogo comercial: `docs/CATALOGO-COMERCIAL.md`
- Esquema inicial de dados: `supabase/schema.sql`
