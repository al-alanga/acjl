# ACJL — Fluxo interno de recepção e tratamento de pedidos

## Objectivo
Estabelecer um procedimento simples para a equipa tratar os pedidos recebidos pelo formulário público, sem criar cadastro de clientes, área reservada ou backoffice nesta fase.

## 1. Recepção
- O cliente submete o formulário público e recebe uma referência quando a gravação é confirmada.
- A equipa consulta os novos registos de `service_requests` através do acesso administrativo autorizado ao Supabase.
- Não se deve considerar uma mensagem de sucesso visual como prova suficiente se não existir registo correspondente na base de dados.

## 2. Triagem inicial
Para cada pedido, confirmar:
- serviço ou necessidade pretendida;
- nome e contacto de retorno;
- descrição suficiente para compreender o resultado esperado;
- empresa, quando indicada;
- urgência e prazo mencionado;
- documentos ou informações ainda necessários.

Se faltarem elementos essenciais, contactar o cliente para os solicitar. Não iniciar trabalho com base num pedido vago.

## 3. Qualificação e âmbito
Antes de preparar a proposta, registar internamente:
- resultado contratado e entregáveis;
- período, volume e complexidade;
- responsabilidades e documentos a cargo do cliente;
- exclusões, dependências externas e taxas não incluídas;
- prazo estimado e condições que o podem alterar;
- necessidade de profissional habilitado ou parceiro especializado.

Não vender serviços autónomos de diagnóstico. A análise inicial serve apenas para esclarecer e delimitar o pedido comercial.

## 4. Proposta e autorização
- Preparar proposta com âmbito, entregáveis, exclusões, prazo, preço, validade e condições de pagamento.
- Manter o preço como “Sob proposta” no site; o valor concreto só é apresentado numa proposta aprovada internamente.
- Não iniciar execução antes da aceitação documentada da proposta e do cumprimento das condições de pagamento acordadas.
- Não garantir decisões de entidades públicas, emissão de licenças/certidões ou adjudicação de concursos.

## 5. Execução e comunicação
Após aceitação, atribuir um responsável, checklist documental, prazo interno e pontos de controlo. Comunicar atrasos ou dependências assim que sejam identificados. Separar claramente trabalho incluído de pedidos adicionais e obter aprovação de preço antes de os executar.

## 6. Encerramento
Entregar os produtos acordados, comprovativos disponíveis e resumo do que foi concluído. Confirmar pendências e responsabilidades remanescentes. Registar internamente a data de conclusão e eventuais recomendações operacionais sem as transformar num serviço autónomo de diagnóstico.

## 7. Estados operacionais sugeridos
Estes estados são uma convenção de trabalho para a equipa; não implicam que já exista um painel automático:
1. Recebido
2. A aguardar informação do cliente
3. Em qualificação comercial
4. Proposta em preparação
5. Proposta enviada
6. Aceite — aguarda condições de início
7. Em execução
8. A aguardar terceiro/cliente
9. Concluído
10. Não avançou / cancelado

## 8. Prazo de resposta
A ACJL deve aprovar e comunicar o prazo de primeira resposta antes de o publicar no website. Até essa aprovação, não anunciar um SLA ou prazo garantido.

## 9. Protecção de dados e acesso
- Limitar o acesso aos pedidos à equipa autorizada.
- Não partilhar dados pessoais em canais públicos nem copiar informação para folhas abertas.
- Recolher apenas os dados necessários para responder ao pedido.
- Definir política de retenção e procedimento de eliminação/arquivo antes da operação regular.

## Limites da fase actual
O website recebe pedidos e apresenta uma referência. O tratamento interno é manual através de acesso autorizado à base de dados; ainda não existe painel de equipa, notificações automáticas, gestão de responsáveis, SLA automático nem acompanhamento de pedidos pelo cliente.