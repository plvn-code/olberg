"use client";

import Link from "next/link";
import { useState } from "react";
import { type Product, catOf, uah } from "@/lib/catalog";
import { fabrics, site, swatches } from "@/lib/site";
import { FabricPicker, Qty } from "./Chrome";
import { Icon } from "./Icons";
import { useStore } from "./Store";

export function ProductView({ p }: { p: Product }) {
  const { add, wish, toggleWish } = useStore();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [fabric, setFabric] = useState(fabrics[0].name);
  const [color, setColor] = useState(swatches[0].name);
  const [open, setOpen] = useState<number | null>(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const on = wish.includes(p.slug);
  const c = catOf(p.cat);

  const info = [
    { t: "Характеристики", body: <dl className="specs">{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl> },
    {
      t: "Доставка та оплата",
      body: (
        <p>
          Доставляємо по всій Україні службами доставки або забираєте самостійно з магазину. Спосіб оплати та дату доставки менеджер узгоджує під час підтвердження замовлення. Детальніше —{" "}
          <Link href="/delivery">«Доставка та оплата»</Link>.
        </p>
      ),
    },
    ...(p.fabric
      ? [
          {
            t: "Тканина під замовлення",
            body: <p>Модель шиємо в обраній тканині та кольорі. Після оформлення менеджер надішле фото зразків і підтвердить термін виготовлення та фінальну вартість.</p>,
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
          {p.fabric && <small>від </small>}
          {uah(p.price)}
        </p>
        <p className="pv-desc">{p.desc}</p>

        {p.fabric && <FabricPicker fabric={fabric} color={color} onFabric={setFabric} onColor={setColor} />}

        <div className="pv-buy">
          <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />
          <button className="btn btn-dark pv-add" onClick={() => add({ slug: p.slug, fabric: p.fabric ? fabric : undefined, color: p.fabric ? color : undefined }, qty)}>
            Додати в кошик · {uah(p.price * qty)}
          </button>
          <button className={`round pv-wish ${on ? "on" : ""}`} aria-pressed={on} aria-label={on ? "Прибрати з обраного" : "В обране"} onClick={() => toggleWish(p.slug)}>
            <Icon name="heart" size={20} />
          </button>
        </div>
        <div className="pv-alt">
          <a href={site.direct} target="_blank" rel="noopener noreferrer">
            <Icon name="chat" size={18} /> Запитати в Direct
          </a>
          <a href={site.phoneHref}>
            <Icon name="phone" size={18} /> {site.phone}
          </a>
        </div>

        <ul className="pv-usp">
          <li>
            <Icon name="truck" size={20} /> Доставка по всій Україні
          </li>
          <li>
            <Icon name="factory" size={20} /> Власне виробництво
          </li>
          {p.fabric && (
            <li>
              <Icon name="scissors" size={20} /> Тканина й колір на вибір
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
