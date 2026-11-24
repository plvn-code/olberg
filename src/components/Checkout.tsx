"use client";

import Link from "next/link";
import { useState } from "react";
import { bySlug, uah } from "@/lib/catalog";
import { site, stores } from "@/lib/site";
import { Qty } from "./Chrome";
import { Icon } from "./Icons";
import { useStore } from "./Store";

type Delivery = "np" | "courier" | "pickup";

export function Checkout() {
  const { lines, total, setQty, remove, clear } = useStore();
  const [delivery, setDelivery] = useState<Delivery>("np");
  const [pay, setPay] = useState("cod");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<string | null>(null);

  if (done)
    return (
      <div className="done" data-reveal>
        <span className="done-ic">
          <Icon name="check" size={30} />
        </span>
        <h1 className="h1">Дякуємо за замовлення!</h1>
        <p className="lead">
          Номер замовлення <b>№ {done}</b>. Менеджер зателефонує найближчим часом, щоб підтвердити тканину, колір, вартість доставки та оплату.
        </p>
        <div className="done-cta">
          <Link href="/catalog" className="btn btn-dark">
            Повернутися до каталогу
          </Link>
          <a href={site.instagram} className="btn" target="_blank" rel="noopener noreferrer">
            Ми в Instagram
          </a>
        </div>
      </div>
    );

  if (!lines.length)
    return (
      <div className="done">
        <h1 className="h1">Кошик порожній</h1>
        <p className="lead">Додайте моделі з каталогу, щоб оформити замовлення.</p>
        <Link href="/catalog" className="btn btn-dark">
          До каталогу
        </Link>
      </div>
    );

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const phone = String(f.get("phone") || "").replace(/[^\d+]/g, "");
    if (phone.replace(/\D/g, "").length < 10) {
      setErr("Перевірте номер телефону.");
      return;
    }
    setErr("");
    setBusy(true);
    const order = {
      name: String(f.get("name") || "").trim(),
      phone,
      city: String(f.get("city") || "").trim(),
      address: String(f.get("address") || "").trim(),
      store: String(f.get("store") || ""),
      comment: String(f.get("comment") || "").trim(),
      delivery,
      pay,
      lines: lines.map((l) => ({ slug: l.slug, name: bySlug(l.slug)?.name, qty: l.qty, fabric: l.fabric, color: l.color, price: bySlug(l.slug)?.price })),
      total,
    };
    try {
      const r = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) });
      const j = (await r.json()) as { id?: string; error?: string };
      if (!r.ok || !j.id) throw new Error(j.error || "error");
      clear();
      setDone(j.id);
      scrollTo({ top: 0 });
    } catch {
      setErr(`Не вдалося надіслати замовлення. Спробуйте ще раз або зателефонуйте ${site.phone}.`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="co">
      <form className="co-form" onSubmit={submit}>
        <h1 className="h1">Оформлення замовлення</h1>
        <fieldset>
          <legend>Контакти</legend>
          <div className="row2">
            <label className="field">
              <span>Ім&apos;я та прізвище</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span>Телефон</span>
              <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+380" />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Доставка</legend>
          <div className="opts">
            {(
              [
                ["np", "Нова пошта", "У відділення або поштомат"],
                ["courier", "Адресна доставка", "До дверей, по всій Україні"],
                ["pickup", "Самовивіз", "З магазину OLBERG"],
              ] as const
            ).map(([id, t, d]) => (
              <label key={id} className={`opt ${delivery === id ? "on" : ""}`}>
                <input type="radio" name="delivery" checked={delivery === id} onChange={() => setDelivery(id)} />
                <b>{t}</b>
                <span>{d}</span>
              </label>
            ))}
          </div>
          {delivery === "pickup" ? (
            <label className="field">
              <span>Магазин</span>
              <select name="store">
                {stores.map((s) => (
                  <option key={s.address}>{`${s.city}, ${s.address}`}</option>
                ))}
              </select>
            </label>
          ) : (
            <div className="row2">
              <label className="field">
                <span>Місто</span>
                <input name="city" required autoComplete="address-level2" />
              </label>
              <label className="field">
                <span>{delivery === "np" ? "Відділення / поштомат" : "Вулиця, будинок, квартира"}</span>
                <input name="address" required autoComplete="street-address" />
              </label>
            </div>
          )}
        </fieldset>
        <fieldset>
          <legend>Оплата</legend>
          <div className="opts opts-2">
            {(
              [
                ["cod", "При отриманні", "Накладений платіж або в магазині"],
                ["invoice", "Передоплата", "За рахунком після підтвердження"],
              ] as const
            ).map(([id, t, d]) => (
              <label key={id} className={`opt ${pay === id ? "on" : ""}`}>
                <input type="radio" name="pay" checked={pay === id} onChange={() => setPay(id)} />
                <b>{t}</b>
                <span>{d}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span>Коментар до замовлення</span>
          <textarea name="comment" rows={3} placeholder="Розмір, кут дивану, зручний час для дзвінка…" />
        </label>
        {err && (
          <p className="err" role="alert">
            {err}
          </p>
        )}
        <button className="btn btn-dark btn-block btn-lg" disabled={busy}>
          {busy ? "Надсилаємо…" : `Підтвердити замовлення · ${uah(total)}`}
        </button>
        <p className="muted small">Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних для виконання замовлення.</p>
      </form>

      <aside className="co-sum">
        <h2>Ваше замовлення</h2>
        <ul>
          {lines.map((l) => {
            const p = bySlug(l.slug)!;
            return (
              <li key={l.key}>
                <img src={p.imgs[0]} alt="" width={80} height={100} />
                <div>
                  <Link href={`/product/${p.slug}`}>{p.name}</Link>
                  {(l.fabric || l.color) && <p className="muted small">{[l.fabric, l.color].filter(Boolean).join(" · ")}</p>}
                  <div className="drawer-row">
                    <Qty value={l.qty} onChange={(q) => setQty(l.key, q)} small />
                    <b>{uah(p.price * l.qty)}</b>
                  </div>
                  <button className="link-btn" type="button" onClick={() => remove(l.key)}>
                    Видалити
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="co-total">
          <div>
            <span>Товари</span>
            <span>{uah(total)}</span>
          </div>
          <div>
            <span>Доставка</span>
            <span>{delivery === "pickup" ? "безкоштовно" : "за тарифом перевізника"}</span>
          </div>
          <div className="co-sum-total">
            <span>Разом</span>
            <b>{uah(total)}</b>
          </div>
        </div>
      </aside>
    </div>
  );
}
