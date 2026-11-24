"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type Product, bySlug, categories, products, uah } from "@/lib/catalog";
import { fabrics, swatches } from "@/lib/site";
import { Icon } from "./Icons";
import { Card } from "./Product";
import { useStore } from "./Store";

/** Hero: headline + three tall panels (photo · video · photo) that rise in and drift on scroll. */
export function Hero() {
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, []);
  return (
    <section className="hero">
      <div className="wrap hero-head">
        <p className="eyebrow hero-eb">Меблі від виробника · з 1994 року</p>
        <h1 className="hero-title">
          <span>Меблі, в які</span> <span>закохуєшся</span>
        </h1>
        <div className="hero-cta">
          <Link href="/catalog" className="btn btn-dark">
            Перейти до каталогу
          </Link>
          <Link href="/catalog/dyvany" className="btn">
            Дивани
          </Link>
        </div>
      </div>
      <div className="hero-panels">
        <Link href="/product/krislo-mushlia" className="hero-p hero-p1" data-parallax="0.06">
          <img src="/img/p/ed-shell.webp" alt="Крісло «Мушля» в інтер'єрі" width={720} height={1280} />
          <span className="hero-cap">Крісло «Мушля»</span>
        </Link>
        <Link href="/product/stil-dub-ryflenyi" className="hero-p hero-p2">
          <video ref={vid} src="/video/oak-table.mp4" poster="/video/oak-table.webp" muted loop playsInline preload="metadata" aria-label="Стіл «Фенікс» з масиву" />
          <span className="hero-cap">Стіл «Фенікс»</span>
        </Link>
        <Link href="/product/krislo-hirchychne" className="hero-p hero-p3" data-parallax="-0.06">
          <img src="/img/p/ed-mustard.webp" alt="Крісло «Мілано» в гірчичному оксамиті" width={720} height={1280} />
          <span className="hero-cap">Крісло «Мілано»</span>
        </Link>
      </div>
    </section>
  );
}

export function CatRail() {
  return (
    <section className="sec catrail">
      <div className="wrap sec-head center" data-reveal>
        <h2 className="h2">Що шукаєте?</h2>
        <p className="lead">Шість категорій, понад сорок моделей у наявності та під замовлення.</p>
      </div>
      <div className="catrail-track">
        {categories.map((c, k) => (
          <Link key={c.id} href={`/catalog/${c.id}`} className="catrail-item" data-reveal style={{ "--d": `${k * 70}ms` } as React.CSSProperties}>
            <div className="catrail-img">
              <img src={c.cover} alt="" width={720} height={900} loading="lazy" />
            </div>
            <h3>{c.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Bolia-style 50/50 feature: photo + cream text block with key facts. */
export function Feature({ p, flip, eyebrow, points, img, bg = "cream" }: { p: Product; flip?: boolean; eyebrow: string; points: string[]; img?: string; bg?: string }) {
  const { add } = useStore();
  return (
    <section className={`feature ${flip ? "flip" : ""} bg-${bg}`}>
      <Link href={`/product/${p.slug}`} className="feature-media" aria-label={p.name}>
        <img src={img || p.imgs[0]} alt={p.name} width={720} height={900} loading="lazy" data-reveal="zoom" />
      </Link>
      <div className="feature-text" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2">{p.name}</h2>
        <ul className="feature-pts">
          {points.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="feature-price">
          від <b>{uah(p.price)}</b>
        </p>
        <div className="feature-cta">
          <button className="btn btn-dark" onClick={() => add({ slug: p.slug })}>
            Додати в кошик
          </button>
          <Link href={`/product/${p.slug}`} className="btn">
            Детальніше
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Tabs({ groups }: { groups: { label: string; slugs: string[] }[] }) {
  const [t, setT] = useState(0);
  const items = groups[t].slugs.map((s) => bySlug(s)!).filter(Boolean);
  return (
    <div>
      <div className="tabs" role="tablist">
        {groups.map((g, k) => (
          <button key={g.label} role="tab" aria-selected={k === t} className={k === t ? "on" : ""} onClick={() => setT(k)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="grid grid-4 tabs-grid" key={t}>
        {items.map((p, k) => (
          <div key={p.slug} className="fade-in" style={{ "--d": `${k * 60}ms` } as React.CSSProperties}>
            <Card p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Fabric & colour block: pick a colour → the big swatch and caption change. */
export function Fabrics() {
  const [c, setC] = useState(4);
  const [f, setF] = useState(0);
  const sw = swatches[c];
  return (
    <section className="feature flip bg-linen fabrics" id="tkanyny">
      <div className="feature-media fabrics-media">
        <img src="/img/p/ed-boucle.webp" alt="Фактура тканини букле" width={720} height={900} loading="lazy" data-reveal="zoom" />
        <div className="fabrics-chip" style={{ "--c": sw.hex } as React.CSSProperties}>
          <i />
          <span>
            {fabrics[f].name}
            <b>{sw.name}</b>
          </span>
        </div>
      </div>
      <div className="feature-text" data-reveal>
        <p className="eyebrow">Тканина й колір</p>
        <h2 className="h2">Будь-яка модель — у вашому кольорі</h2>
        <p>Більшість диванів, крісел, стільців і пуфів ми шиємо під замовлення. Оберіть тканину та відтінок — менеджер надішле фото зразків і точну вартість.</p>
        <div className="fabrics-list">
          {fabrics.map((x, k) => (
            <button key={x.id} className={`fabric ${k === f ? "on" : ""}`} onClick={() => setF(k)} aria-pressed={k === f}>
              <b>{x.name}</b>
              <span>{x.note}</span>
            </button>
          ))}
        </div>
        <div className="swatches swatches-lg">
          {swatches.map((s, k) => (
            <button key={s.id} className={`sw ${k === c ? "on" : ""}`} style={{ "--c": s.hex } as React.CSSProperties} onClick={() => setC(k)} aria-label={s.name} aria-pressed={k === c} title={s.name} />
          ))}
        </div>
        <Link href="/catalog/dyvany" className="btn btn-dark">
          Обрати модель
        </Link>
      </div>
    </section>
  );
}

export function Usp({ items }: { items: { t: string; d: string }[] }) {
  const icons = ["factory", "scissors", "truck", "store"] as const;
  return (
    <section className="usp">
      <div className="wrap usp-in">
        {items.map((u, k) => (
          <div key={u.t} className="usp-item" data-reveal style={{ "--d": `${k * 80}ms` } as React.CSSProperties}>
            <Icon name={icons[k]} size={26} stroke={1.2} />
            <div>
              <b>{u.t}</b>
              <span>{u.d}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const allCount = products.length;
