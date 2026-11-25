"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type CatId, type Product, categories } from "@/lib/catalog";
import { Card } from "./Product";

const sorts = [
  { id: "pop", label: "Популярні" },
  { id: "new", label: "Спочатку новинки" },
  { id: "asc", label: "Ціна: від низької" },
  { id: "desc", label: "Ціна: від високої" },
] as const;
type SortId = (typeof sorts)[number]["id"];

const rank = (p: Product) => (p.tag === "Хіт" ? 0 : p.tag === "Новинка" ? 1 : 2);

export function Catalog({ items, cat }: { items: Product[]; cat?: CatId }) {
  const [sort, setSort] = useState<SortId>("pop");
  const [max, setMax] = useState<number | null>(null);
  useEffect(() => {
    const s = new URLSearchParams(location.search).get("sort");
    if (s && sorts.some((x) => x.id === s)) setSort(s as SortId);
  }, []);

  const top = useMemo(() => Math.max(0, ...items.map((p) => p.price || 0)), [items]);
  const steps = useMemo(() => {
    const b = [2000, 5000, 10000, 20000, 30000].filter((v) => v < top && items.some((p) => !!p.price && p.price <= v));
    return b.slice(-3);
  }, [items, top]);

  const list = useMemo(() => {
    const l = items.filter((p) => max === null || (!!p.price && p.price <= max));
    const pr = (p: Product) => p.price ?? Infinity;
    if (sort === "asc") return [...l].sort((a, b) => pr(a) - pr(b));
    if (sort === "desc") return [...l].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === "new") return [...l].sort((a, b) => Number(b.tag === "Новинка") - Number(a.tag === "Новинка"));
    return [...l].sort((a, b) => rank(a) - rank(b));
  }, [items, sort, max]);

  return (
    <>
      <div className="cat-bar">
        <nav className="cat-chips" aria-label="Категорії">
          <Link href="/catalog" className={`chip ${!cat ? "on" : ""}`}>
            Усі
          </Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/catalog/${c.id}`} className={`chip ${cat === c.id ? "on" : ""}`}>
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="cat-tools">
          {steps.length > 0 && (
            <div className="chips" aria-label="Ціна">
              {steps.map((v) => (
                <button key={v} className={`chip chip-s ${max === v ? "on" : ""}`} onClick={() => setMax(max === v ? null : v)} aria-pressed={max === v}>
                  до {v.toLocaleString("uk-UA")} ₴
                </button>
              ))}
            </div>
          )}
          <label className="select">
            <span className="sr">Сортування</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortId)}>
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <p className="cat-count">{list.length} моделей</p>
      <div className="grid grid-4 cat-grid" key={`${sort}-${max}`}>
        {list.map((p, k) => (
          <div key={p.slug} className="fade-in" style={{ "--d": `${Math.min(k, 8) * 50}ms` } as React.CSSProperties}>
            <Card p={p} eager={k < 4} />
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="empty">У цьому ціновому діапазоні моделей немає.</p>}
    </>
  );
}
