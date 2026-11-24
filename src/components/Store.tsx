"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { bySlug } from "@/lib/catalog";

export type Line = { key: string; slug: string; qty: number; fabric?: string; color?: string };

type Ctx = {
  lines: Line[];
  count: number;
  total: number;
  add: (l: Omit<Line, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  wish: string[];
  toggleWish: (slug: string) => void;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
  search: boolean;
  setSearch: (v: boolean) => void;
  lastAdded: string | null;
};

const StoreCtx = createContext<Ctx | null>(null);

const read = <T,>(k: string, d: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : d;
  } catch {
    return d;
  }
};
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    setLines(read<Line[]>("olb-cart", []).filter((l) => bySlug(l.slug)));
    setWish(read<string[]>("olb-wish", []).filter((s) => bySlug(s)));
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) write("olb-cart", lines);
  }, [lines, ready]);
  useEffect(() => {
    if (ready) write("olb-wish", wish);
  }, [wish, ready]);

  useEffect(() => {
    document.documentElement.classList.toggle("lock", drawer || search);
  }, [drawer, search]);

  const add = useCallback<Ctx["add"]>((l, qty = 1) => {
    const key = [l.slug, l.fabric || "", l.color || ""].join("|");
    setLines((ls) => {
      const f = ls.find((x) => x.key === key);
      return f ? ls.map((x) => (x.key === key ? { ...x, qty: x.qty + qty } : x)) : [...ls, { ...l, key, qty }];
    });
    setLastAdded(key);
    setDrawer(true);
  }, []);
  const setQty = useCallback((key: string, qty: number) => setLines((ls) => ls.map((x) => (x.key === key ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x))), []);
  const remove = useCallback((key: string) => setLines((ls) => ls.filter((x) => x.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);
  const toggleWish = useCallback((slug: string) => setWish((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])), []);

  const value = useMemo<Ctx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + (bySlug(l.slug)?.price || 0) * l.qty, 0);
    return { lines, count, total, add, setQty, remove, clear, wish, toggleWish, drawer, setDrawer, search, setSearch, lastAdded };
  }, [lines, wish, drawer, search, lastAdded, add, setQty, remove, clear, toggleWish]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
