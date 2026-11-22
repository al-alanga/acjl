import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACJL — Contabilidade & Serviços",
  description: "Soluções empresariais em contabilidade, fiscalidade, recursos humanos e gestão administrativa em Moçambique.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt"><body>{children}</body></html>;
}
