import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://acjl.alinvest-group.com"),
  title: {
    default: "ACJL — Contabilidade & Serviços",
    template: "%s | ACJL",
  },
  description:
    "Apoio empresarial em Moçambique: contabilidade, fiscalidade, Recursos Humanos, formalização e organização administrativa para empresas.",
  applicationName: "ACJL — Contabilidade & Serviços",
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    url: "https://acjl.alinvest-group.com",
    siteName: "ACJL — Contabilidade & Serviços",
    title: "ACJL — Contabilidade & Serviços",
    description:
      "Soluções práticas de apoio contabilístico, fiscal e administrativo para empresas em Moçambique.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-MZ"><body>{children}</body></html>;
}
