"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type Product, catOf, priceText, uah } from "@/lib/catalog";
import { Icon } from "./Icons";
import { useStore } from "./Store";

export function Card({ p, eager }: { p: Product; eager?: boolean }) {
  const { wish, toggleWish, add } = useStore();
  const on = wish.includes(p.slug);
  return (
    <article className="card">
      <div className="card-media">
        <Link href={`/product/${p.slug}`} className="card-imgs" aria-label={p.name}>
          <img src={p.imgs[0]} alt={p.name} width={720} height={900} loading={eager ? "eager" : "lazy"} />
          <img src={p.imgs[1]} alt="" width={720} height={900} loading="lazy" className="card-alt" />
        </Link>
        {p.tag && <span className={`tag tag-${p.tag === "Новинка" ? "new" : p.tag === "Хіт" ? "hit" : "sale"}`}>{p.tag}</span>}
        <button className={`card-wish ${on ? "on" : ""}`} aria-pressed={on} aria-label={on ? "Прибрати з обраного" : "Додати в обране"} onClick={() => toggleWish(p.slug)}>
          <Icon name="heart" size={18} />
        </button>
        <button className="card-add" onClick={() => add({ slug: p.slug })}>
          <Icon name="plus" size={14} /> У кошик
        </button>
      </div>
      <Link href={`/product/${p.slug}`} className="card-body">
        <span className="card-cat">{p.name.includes("«") ? p.name.split("«")[0].trim() : catOf(p.cat).one}</span>
        <h3 className="card-name">{p.name.match(/«(.+)»/)?.[1] ?? p.name}</h3>
        <p className="card-short">{p.short}</p>
        <p className={`card-price ${p.price ? "" : "ask"}`}>
          {p.price ? <small>від </small> : null}
          {priceText(p.price)}
          {p.old && <s>{uah(p.old)}</s>}
        </p>
      </Link>
    </article>
  );
}

export function Rail({ items, label }: { items: Product[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ l: true, r: false });
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdge({ l: el.scrollLeft < 8, r: el.scrollLeft > max - 8 });
      setProg(max > 0 ? el.scrollLeft / max : 0);
    };
    on();
    el.addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    // drag to scroll with the mouse
    let down = false,
      sx = 0,
      sl = 0,
      moved = false;
    const md = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      sx = e.clientX;
      sl = el.scrollLeft;
    };
    const mm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 5) {
        moved = true;
        el.classList.add("dragging");
      }
      el.scrollLeft = sl - dx;
    };
    const mu = () => {
      down = false;
      el.classList.remove("dragging");
    };
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", md);
    addEventListener("pointermove", mm);
    addEventListener("pointerup", mu);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("scroll", on);
      removeEventListener("resize", on);
      el.removeEventListener("pointerdown", md);
      removeEventListener("pointermove", mm);
      removeEventListener("pointerup", mu);
      el.removeEventListener("click", click, true);
    };
  }, []);

  const go = (d: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".rail-item");
    el.scrollBy({ left: d * ((card?.offsetWidth || 300) + 24) * 2, behavior: "smooth" });
  };

  return (
    <div className="rail">
      <div className="rail-track" ref={ref} role="region" aria-label={label} tabIndex={0}>
        {items.map((p) => (
          <div className="rail-item" key={p.slug}>
            <Card p={p} />
          </div>
        ))}
      </div>
      <div className="rail-ctrl wrap">
        <div className="rail-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${0.15 + prog * 0.85})` }} />
        </div>
        <div className="rail-btns">
          <button className="round" aria-label="Назад" disabled={edge.l} onClick={() => go(-1)}>
            <Icon name="arrowLeft" size={18} />
          </button>
          <button className="round" aria-label="Далі" disabled={edge.r} onClick={() => go(1)}>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
