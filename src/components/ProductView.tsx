"use client";

import Link from "next/link";
import { useState } from "react";
import { type Product, catOf, priceText, unitPrice } from "@/lib/catalog";
import { mailHref, site, telHref } from "@/lib/site";
import { FabricWish, Qty } from "./Chrome";
import { Icon } from "./Icons";
import { useStore } from "./Store";

export function ProductView({ p }: { p: Product }) {
  const { add, wish, toggleWish } = useStore();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(p.sizes?.[0]?.label);
  const [fabric, setFabric] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const on = wish.includes(p.slug);
  const c = catOf(p.cat);
  const price = unitPrice(p, size);

  const info = [
    { t: "Характеристики", body: <dl className="specs">{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl> },
    {
      t: "Доставка та оплата",
      body: (
        <p>
          {site.delivery}: службами доставки у відділення або за адресою. Також можна забрати замовлення в нашому магазині. Спосіб оплати та дату доставки менеджер узгоджує під час підтвердження. Детальніше —{" "}
          <Link href="/delivery">«Доставка та оплата»</Link>.
        </p>
      ),
    },
    ...(p.fabric
      ? [
          {
            t: "Тканина під замовлення",
            body: <p>Модель шиємо в обраній тканині та кольорі — широкий асортимент на ваш вибір. Після оформлення менеджер надішле фото зразків і підтвердить термін виготовлення та вартість.</p>,
          },
        ]
      : []),
  ];

  return (
    <div className="pv wrap">
      <div className="pv-gallery">
        <div className="pv-thumbs">
          {p.imgs.map((s, k) => (
            <button key={s} className={k === img ? "on" : ""} onClick={() => setImg(k)} aria-label={`Фото ${k + 1}`}>
              <img src={s} alt="" width={120} height={150} />
            </button>
          ))}
        </div>
        <div
          className={`pv-main ${zoom ? "zoomed" : ""}`}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          onPointerLeave={() => setZoom(null)}
        >
          {p.imgs.map((s, k) => (
            <img
              key={s}
              src={s}
              alt={k === 0 ? p.name : ""}
              width={720}
              height={900}
              className={k === img ? "on" : ""}
              style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
          ))}
          {p.tag && <span className={`tag tag-${p.tag === "Новинка" ? "new" : "hit"}`}>{p.tag}</span>}
          <div className="pv-dots" aria-hidden="true">
            {p.imgs.map((s, k) => (
              <i key={s} className={k === img ? "on" : ""} />
            ))}
          </div>
          <button className="pv-next" aria-label="Наступне фото" onClick={() => setImg((img + 1) % p.imgs.length)}>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>

      <div className="pv-info">
        <nav className="crumbs" aria-label="Навігація">
          <Link href="/catalog">Каталог</Link> <span>/</span> <Link href={`/catalog/${c.id}`}>{c.name}</Link>
        </nav>
        <h1 className="pv-title">{p.name}</h1>
        <p className="pv-short">{p.short}</p>
        <p className="pv-price">
          {price ? (
            <>
              <small>від </small>
              {priceText(price)}
            </>
          ) : (
            <span className="pv-ask">Ціна за запитом</span>
          )}
        </p>
        <div className="pv-contact">
          <span>Точну ціну уточнюйте:</span>
          {site.phones.slice(0, 2).map((t) => (
            <a key={t.tel} href={telHref(t.tel)}>
              {t.tel}
            </a>
          ))}
          <a href={mailHref(`Ціна: ${p.name}`)}>{site.email}</a>
        </div>
        <p className="pv-desc">{p.desc}</p>

        {p.sizes && p.sizes.length > 0 && (
          <div className="sizes">
            <p className="picker-label">
              Розмір: <b>{size}</b>
            </p>
            <div className="chips">
              {p.sizes.map((s) => (
                <button key={s.label} className={`chip ${size === s.label ? "on" : ""}`} aria-pressed={size === s.label} onClick={() => setSize(s.label)}>
                  {s.label}
                  {s.price ? <small> · {priceText(s.price)}</small> : null}
                </button>
              ))}
            </div>
            <p className="picker-note">Ціна залежить від розміру. Нестандартний розмір — під замовлення.</p>
          </div>
        )}

        {p.fabric && <FabricWish value={fabric} onChange={setFabric} />}

        <div className="pv-buy">
          <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />
          <button className="btn btn-dark pv-add" onClick={() => add({ slug: p.slug, size, fabric: p.fabric && fabric.trim() ? fabric.trim() : undefined }, qty)}>
            {price ? `Додати в кошик · від ${priceText(price * qty)}` : "Додати в кошик · ціна за запитом"}
          </button>
          <button className={`round pv-wish ${on ? "on" : ""}`} aria-pressed={on} aria-label={on ? "Прибрати з обраного" : "В обране"} onClick={() => toggleWish(p.slug)}>
            <Icon name="heart" size={20} />
          </button>
        </div>
        <div className="pv-alt">
          <a href={site.direct} target="_blank" rel="noopener noreferrer">
            <Icon name="chat" size={18} /> Запитати в Direct
          </a>
          <a href={mailHref(`Запит: ${p.name}`)}>
            <Icon name="mail" size={18} /> Написати на пошту
          </a>
        </div>

        <ul className="pv-usp">
          <li>
            <Icon name="truck" size={20} /> {site.delivery}
          </li>
          <li>
            <Icon name="factory" size={20} /> Власне виробництво
          </li>
          {p.fabric && (
            <li>
              <Icon name="scissors" size={20} /> Широкий асортимент тканин та кольорів на ваш вибір
            </li>
          )}
        </ul>

        <div className="acc">
          {info.map((x, k) => (
            <div key={x.t} className={`acc-item ${open === k ? "open" : ""}`}>
              <button onClick={() => setOpen(open === k ? null : k)} aria-expanded={open === k}>
                {x.t}
                <Icon name="plus" size={16} />
              </button>
              <div className="acc-body">
                <div>{x.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
