"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { bySlug, categories, catOf, priceText, products, unitPrice, uah } from "@/lib/catalog";
import { site, telHref } from "@/lib/site";
import { Icon } from "./Icons";
import { useStore } from "./Store";

const bar = [site.delivery, `Власне виробництво з ${site.since} року`, "Широкий асортимент тканин та кольорів на ваш вибір"];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label="OLBERG — на головну">
      OLBERG
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const { count, wish, setDrawer, setSearch } = useStore();
  const [menu, setMenu] = useState(false);
  const [msg, setMsg] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const prev = useRef(count);

  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    document.documentElement.classList.toggle("lock-menu", menu);
  }, [menu]);
  useEffect(() => {
    const t = setInterval(() => setMsg((m) => (m + 1) % bar.length), 4200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    let last = scrollY;
    const handler = () => {
      const y = scrollY;
      setScrolled(y > 40);
      if (y > 260 && y > last + 4) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
    };
    handler();
    addEventListener("scroll", handler, { passive: true });
    return () => removeEventListener("scroll", handler);
  }, []);
  useEffect(() => {
    if (count > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 600);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  const active = (href: string) => (path === href || path.startsWith(href + "/") ? "is-active" : "");

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-in">
          <span className="topbar-l">Магазини: Івано-Франківськ · Косів</span>
          <p className="topbar-msg" aria-live="polite">
            {bar.map((b, k) => (
              <span key={b} className={k === msg ? "on" : ""}>
                {b}
              </span>
            ))}
          </p>
          <span className="topbar-r">
            {site.phones.slice(0, 2).map((p) => (
              <a key={p.tel} href={telHref(p.tel)}>
                {p.tel}
              </a>
            ))}
          </span>
        </div>
      </div>
      <header className={`hdr ${hidden && !menu ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap hdr-in">
          <button className="hdr-burger" aria-label="Меню" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <Icon name={menu ? "close" : "menu"} size={22} />
          </button>
          <nav className="hdr-nav" aria-label="Каталог">
            {categories.map((c) => (
              <Link key={c.id} href={`/catalog/${c.id}`} className={active(`/catalog/${c.id}`)}>
                {c.id === "pufy" ? "Пуфи" : c.name}
              </Link>
            ))}
          </nav>
          <Logo />
          <div className="hdr-right">
            <nav className="hdr-nav hdr-nav-r" aria-label="Інформація">
              <Link href="/stores" className={active("/stores")}>
                Магазини
              </Link>
              <Link href="/delivery" className={active("/delivery")}>
                Доставка
              </Link>
              <Link href="/about" className={active("/about")}>
                Про нас
              </Link>
            </nav>
            <button className="hdr-ic" aria-label="Пошук" onClick={() => setSearch(true)}>
              <Icon name="search" size={21} />
            </button>
            <Link className="hdr-ic hdr-wish" href="/wishlist" aria-label={`Обране: ${wish.length}`}>
              <Icon name="heart" size={21} />
              {wish.length > 0 && <i className="dot">{wish.length}</i>}
            </Link>
            <button className={`hdr-ic ${bump ? "bump" : ""}`} aria-label={`Кошик: ${count}`} onClick={() => setDrawer(true)}>
              <Icon name="bag" size={21} />
              {count > 0 && <i className="dot">{count}</i>}
            </button>
          </div>
        </div>
      </header>
      <div className={`mnav ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <div className="mnav-in">
          <p className="eyebrow">Каталог</p>
          {categories.map((c, k) => (
            <Link key={c.id} href={`/catalog/${c.id}`} className="mnav-cat" style={{ "--d": `${k * 40}ms` } as React.CSSProperties} tabIndex={menu ? 0 : -1}>
              <img src={c.cover} alt="" width={64} height={80} />
              <span>{c.name}</span>
              <Icon name="arrow" size={18} />
            </Link>
          ))}
          <div className="mnav-links">
            <Link href="/catalog" tabIndex={menu ? 0 : -1}>Весь каталог</Link>
            <Link href="/stores" tabIndex={menu ? 0 : -1}>Магазини</Link>
            <Link href="/delivery" tabIndex={menu ? 0 : -1}>Доставка та оплата</Link>
            <Link href="/about" tabIndex={menu ? 0 : -1}>Про нас</Link>
          </div>
          <div className="mnav-phones">
            {site.phones.map((p) => (
              <a key={p.tel} href={telHref(p.tel)} tabIndex={menu ? 0 : -1}>
                {p.tel} <small>{p.note}</small>
              </a>
            ))}
            <a href={`mailto:${site.email}`} tabIndex={menu ? 0 : -1}>
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function CartDrawer() {
  const { lines, total, onRequest, drawer, setDrawer, setQty, remove, lastAdded } = useStore();
  const path = usePathname();
  useEffect(() => setDrawer(false), [path, setDrawer]);
  useEffect(() => {
    if (!drawer) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [drawer, setDrawer]);

  return (
    <div className={`drawer ${drawer ? "open" : ""}`} aria-hidden={!drawer}>
      <button className="drawer-veil" aria-label="Закрити кошик" tabIndex={-1} onClick={() => setDrawer(false)} />
      <aside className="drawer-panel" role="dialog" aria-label="Кошик">
        <div className="drawer-head">
          <h2>Кошик</h2>
          <button className="icon-btn" aria-label="Закрити" onClick={() => setDrawer(false)}>
            <Icon name="close" />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>У кошику поки порожньо.</p>
            <Link href="/catalog" className="btn">
              Перейти до каталогу
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer-list">
              {lines.map((l) => {
                const p = bySlug(l.slug)!;
                return (
                  <li key={l.key} className={l.key === lastAdded ? "is-new" : ""}>
                    <Link href={`/product/${p.slug}`} className="drawer-img">
                      <img src={p.imgs[0]} alt={p.name} width={88} height={110} />
                    </Link>
                    <div className="drawer-info">
                      <Link href={`/product/${p.slug}`} className="drawer-name">
                        {p.name}
                      </Link>
                      {(l.size || l.fabric) && <p className="muted">{[l.size, l.fabric && `Тканина: ${l.fabric}`].filter(Boolean).join(" · ")}</p>}
                      <div className="drawer-row">
                        <Qty value={l.qty} onChange={(q) => setQty(l.key, q)} small />
                        <b>{priceText((unitPrice(p, l.size) || 0) * l.qty)}</b>
                      </div>
                      <button className="link-btn" onClick={() => remove(l.key)}>
                        Видалити
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="drawer-foot">
              <div className="drawer-total">
                <span>Разом</span>
                <b>{total ? uah(total) : "—"}</b>
              </div>
              <p className="muted small">
                {onRequest ? "Ціну позицій «за запитом» менеджер назве після підтвердження. " : ""}Вартість доставки — за тарифами перевізника.
              </p>
              <Link href="/checkout" className="btn btn-dark btn-block">
                Оформити замовлення
              </Link>
              <button className="btn btn-block" onClick={() => setDrawer(false)}>
                Продовжити покупки
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function Qty({ value, onChange, small }: { value: number; onChange: (n: number) => void; small?: boolean }) {
  return (
    <div className={`qty ${small ? "qty-s" : ""}`}>
      <button aria-label="Менше" onClick={() => onChange(value - 1)} disabled={value <= 1}>
        <Icon name="minus" size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button aria-label="Більше" onClick={() => onChange(value + 1)}>
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}

const norm = (s: string) => s.toLowerCase().replace(/[«»"'’ʼ]/g, "").trim();

export function Search() {
  const { search, setSearch } = useStore();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => setSearch(false), [path, setSearch]);
  useEffect(() => {
    if (search) setTimeout(() => input.current?.focus(), 250);
    else setQ("");
    if (!search) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setSearch(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [search, setSearch]);

  const res = useMemo(() => {
    const n = norm(q);
    if (n.length < 2) return [];
    return products.filter((p) => norm(`${p.name} ${catOf(p.cat).name} ${p.short}`).includes(n)).slice(0, 8);
  }, [q]);

  return (
    <div className={`search ${search ? "open" : ""}`} aria-hidden={!search}>
      <button className="drawer-veil" aria-label="Закрити пошук" tabIndex={-1} onClick={() => setSearch(false)} />
      <div className="search-panel" role="dialog" aria-label="Пошук">
        <div className="wrap">
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (res[0]) router.push(`/product/${res[0].slug}`);
            }}
          >
            <Icon name="search" size={24} />
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Диван, крісло, «Генуя»…" aria-label="Пошук по каталогу" />
            <button type="button" className="icon-btn" aria-label="Закрити" onClick={() => setSearch(false)}>
              <Icon name="close" />
            </button>
          </form>
          {q.length < 2 ? (
            <div className="search-hint">
              <p className="eyebrow">Популярне</p>
              <div className="chips">
                {["Кутовий диван", "Крісло", "Генуя", "Стіл розкладний", "Пуф"].map((s) => (
                  <button key={s} className="chip" onClick={() => setQ(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : res.length ? (
            <ul className="search-res">
              {res.map((p) => (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`}>
                    <img src={p.imgs[0]} alt="" width={64} height={80} />
                    <span>
                      <b>{p.name}</b>
                      <small>{catOf(p.cat).one}</small>
                    </span>
                    <em>{priceText(p.price)}</em>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-none">Нічого не знайшли. Напишіть нам у Direct — підберемо модель під ваш запит.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function FabricWish({ value, onChange }: { value: string; onChange: (s: string) => void }) {
  return (
    <div className="picker">
      <p className="picker-title">Широкий асортимент тканин та кольорів на ваш вибір</p>
      <label className="picker-field">
        <span>Побажання щодо тканини та кольору (необов&apos;язково)</span>
        <input value={value} maxLength={120} onChange={(e) => onChange(e.target.value)} placeholder="Наприклад: світлий велюр, сірий, як на фото…" />
      </label>
      <p className="picker-note">Менеджер надішле фото зразків і підтвердить вартість у вибраній тканині.</p>
    </div>
  );
}
