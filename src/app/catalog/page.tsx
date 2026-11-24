import type { Metadata } from "next";
import Link from "next/link";
import { Catalog } from "@/components/Catalog";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Каталог меблів",
  description: "Дивани, крісла, стільці, столи, ліжка та пуфи від виробника OLBERG. Тканина й колір на вибір, доставка по Україні.",
};

export default function CatalogPage() {
  return (
    <div className="page">
      <header className="wrap page-head" data-reveal>
        <nav className="crumbs" aria-label="Навігація">
          <Link href="/">Головна</Link> <span>/</span> Каталог
        </nav>
        <h1 className="h1">Каталог</h1>
        <p className="lead">Усі моделі OLBERG. Ціна «від» — за базову тканину; точну вартість у вашій тканині назве менеджер.</p>
      </header>
      <div className="wrap">
        <Catalog items={products} />
      </div>
    </div>
  );
}
