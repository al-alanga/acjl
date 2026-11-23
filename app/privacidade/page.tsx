import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Informação sobre a recolha e utilização dos dados enviados à ACJL — Contabilidade & Serviços.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="container">
        <article className="privacy-card">
          <div className="eyebrow"><span></span> INFORMAÇÃO AO UTILIZADOR</div>
          <h1>Política de Privacidade</h1>
          <p>Esta página explica como a ACJL — Contabilidade &amp; Serviços trata os dados pessoais que fornece através do formulário de contacto e pedido de proposta deste website.</p>
          <p className="privacy-updated">Última actualização: 23 de Novembro de 2026</p>

          <h2>1. Que dados recolhemos</h2>
          <p>Quando envia um pedido, podemos recolher o seu nome, nome da empresa (se indicado), endereço de email, telefone, serviço pretendido e a descrição da necessidade que nos comunica.</p>

          <h2>2. Para que utilizamos os dados</h2>
          <p>Utilizamos os dados para receber e gerir o seu pedido, entrar em contacto consigo, esclarecer a necessidade apresentada e, quando aplicável, preparar uma proposta comercial e acompanhar as comunicações relacionadas com esse pedido.</p>

          <h2>3. Base e escolha do utilizador</h2>
          <p>Ao assinalar a autorização no formulário, permite que a ACJL o contacte para responder ao pedido que submeteu. O envio do formulário não obriga à contratação de serviços. Pode solicitar esclarecimentos sobre o tratamento dos seus dados através de um novo pedido de contacto.</p>

          <h2>4. Armazenamento e prestadores tecnológicos</h2>
          <p>Os dados do pedido são registados num sistema de base de dados utilizado para operar o serviço. A infraestrutura tecnológica pode ser fornecida por prestadores que apoiam o alojamento e o funcionamento do website. O acesso aos dados deve ser limitado às pessoas e aos serviços que necessitam deles para gerir o pedido.</p>

          <h2>5. Conservação dos dados</h2>
          <p>Os dados devem ser conservados apenas durante o período necessário para responder e gerir o pedido, cumprir obrigações aplicáveis e tratar eventuais questões relacionadas com o serviço. Os prazos concretos de conservação devem ser definidos de acordo com as necessidades operacionais e as obrigações legais da ACJL.</p>

          <h2>6. Segurança e partilha</h2>
          <p>A ACJL deve aplicar medidas razoáveis para proteger os dados contra acesso, alteração ou divulgação não autorizados. Os dados não devem ser incluídos em comunicações públicas nem utilizados para finalidades incompatíveis com a gestão do pedido, salvo quando exista fundamento legítimo para tal.</p>

          <h2>7. Os seus cuidados ao preencher o formulário</h2>
          <ul>
            <li>Forneça apenas os dados necessários para explicar a sua necessidade.</li>
            <li>Não envie palavras-passe, dados bancários ou documentos confidenciais pelo formulário público.</li>
            <li>Se forem necessários documentos, aguarde que a equipa indique um canal apropriado para a sua partilha.</li>
          </ul>

          <h2>8. Pedidos sobre os seus dados</h2>
          <p>Pode contactar a ACJL para pedir esclarecimentos ou solicitar a correcção ou eliminação dos dados, quando aplicável. Para facilitar a localização, indique a referência do pedido, se a tiver. Os pedidos serão analisados de acordo com as obrigações legais aplicáveis.</p>

          <h2>9. Actualizações desta política</h2>
          <p>Esta política pode ser actualizada para reflectir alterações no website, nos procedimentos de atendimento ou nas obrigações aplicáveis. A versão publicada nesta página é a versão actualmente disponibilizada.</p>

          <Link className="privacy-back" href="/">← Voltar ao website da ACJL</Link>
        </article>
      </div>
    </main>
  );
}
