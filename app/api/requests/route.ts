import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Pedido inválido." }, { status: 400 }); }

  // Hidden honeypot: silently reject basic automated spam.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true, referenceCode: "ACJL-RECEBIDO" });

  const serviceName = clean(body.serviceName, 160);
  const customerName = clean(body.customerName, 120);
  const businessName = clean(body.businessName, 160);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const description = clean(body.description, 3000);
  if (!serviceName || !customerName || !validEmail(email) || !phone) {
    return NextResponse.json({ error: "Preencha o serviço, nome, email válido e telefone." }, { status: 400 });
  }
  if (description.length < 8) {
    return NextResponse.json({ error: "Descreva brevemente a necessidade (mínimo 8 caracteres)." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "O formulário ainda não está ligado à base de dados. A equipa técnica precisa configurar as variáveis seguras do Supabase no ambiente de produção." }, { status: 503 });
  }

  const referenceCode = `ACJL-${new Date().getUTCFullYear()}-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/service_requests`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ reference_code: referenceCode, service_name_snapshot: serviceName, customer_name: customerName, business_name: businessName || null, email, phone, description: description || "Pedido de proposta comercial.", status: "received" }),
      cache: "no-store",
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("ACJL request insert failed", response.status, detail.slice(0, 500));
      return NextResponse.json({ error: "Não foi possível registar o pedido neste momento. Tente novamente mais tarde." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, referenceCode }, { status: 201 });
  } catch (error) {
    console.error("ACJL request endpoint failed", error);
    return NextResponse.json({ error: "Falha de ligação ao serviço. Tente novamente mais tarde." }, { status: 502 });
  }
}
