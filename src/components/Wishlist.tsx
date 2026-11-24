"use client";

import Link from "next/link";
import { bySlug } from "@/lib/catalog";
import { Card } from "./Product";
import { useStore } from "./Store";

export function Wishlist() {
  const { wish } = useStore();
  const items = wish.map((s) => bySlug(s)!).filter(Boolean);
  return (
    <>
      <header className="page-head" data-reveal>
        <h1 className="h1">Обране</h1>
        <p className="lead">{items.length ? `${items.length} моделей, які вам сподобалися.` : "Тут з'являться моделі, які ви позначите сердечком."}</p>
      </header>
      {items.length ? (
        <div className="grid grid-4">
          {items.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <Link href="/catalog" className="btn btn-dark">
          До каталогу
        </Link>
      )}
    </>
  );
}
