import { NextResponse } from "next/server";
import { bySlug, unitPrice } from "@/lib/catalog";

type Line = { slug: string; qty: number; size?: string; fabric?: string };
type Order = { name: string; phone: string; city?: string; address?: string; store?: string; comment?: string; delivery: string; pay: string; lines: Line[] };

const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);
const cut = (v: unknown, n = 300) => String(v ?? "").slice(0, n);

/**
 * Orders: validated server-side (prices are recomputed from the catalogue, never trusted from the client).
 * If TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID are set, the order goes to the shop's Telegram chat; otherwise it is only logged.
 */
export async function POST(req: Request) {
  let o: Order;
  try {
    o = (await req.json()) as Order;
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const phone = cut(o.phone, 20).replace(/[^\d+]/g, "");
  const lines = (Array.isArray(o.lines) ? o.lines : []).slice(0, 50).flatMap((l) => {
    const p = bySlug(cut(l.slug, 120));
    const qty = Math.max(1, Math.min(99, Math.floor(Number(l.qty) || 1)));
    const size = p?.sizes?.some((s) => s.label === l.size) ? l.size : undefined;
    return p ? [{ p, qty, size, fabric: cut(l.fabric, 120), price: unitPrice(p, size) }] : [];
  });
  if (!cut(o.name).trim() || phone.replace(/\D/g, "").length < 10 || !lines.length) return NextResponse.json({ error: "invalid" }, { status: 422 });

  const total = lines.reduce((s, l) => s + (l.price || 0) * l.qty, 0);
  const id = `${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dl = { np: "Нова пошта", courier: "Доставка за адресою", pickup: "Самовивіз" }[o.delivery] || cut(o.delivery, 30);
  const text = [
    `<b>Замовлення № ${id}</b>`,
    `${esc(cut(o.name, 80))} · ${esc(phone)}`,
    `${dl}: ${esc(o.delivery === "pickup" ? cut(o.store, 120) : `${cut(o.city, 80)}, ${cut(o.address, 160)}`)}`,
    `Оплата: ${o.pay === "invoice" ? "передоплата" : "при отриманні"}`,
    "",
    ...lines.map((l) => `• ${esc(l.p.name)}${l.size ? `, ${esc(l.size)}` : ""} × ${l.qty} — ${l.price ? `від ${(l.price * l.qty).toLocaleString("uk-UA")} ₴` : "ціна за запитом"}${l.fabric ? ` (тканина: ${esc(l.fabric)})` : ""}`),
    `<b>Разом: від ${total.toLocaleString("uk-UA")} ₴${lines.some((l) => !l.price) ? " + позиції за запитом" : ""}</b>`,
    o.comment ? `\n💬 ${esc(cut(o.comment, 600))}` : "",
  ].join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (token && chat) {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML" }),
    }).catch(() => null);
    if (!r?.ok) return NextResponse.json({ error: "delivery failed" }, { status: 502 });
  } else {
    console.log("[order]", text.replace(/<[^>]+>/g, ""));
  }
  return NextResponse.json({ id });
}
