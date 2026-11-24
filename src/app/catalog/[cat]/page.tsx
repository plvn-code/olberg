import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/Catalog";
import { type CatId, byCat, categories } from "@/lib/catalog";

type Props = { params: Promise<{ cat: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ cat: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat } = await params;
  const c = categories.find((x) => x.id === cat);
  return c ? { title: c.title, description: c.text, openGraph: { images: [c.cover] } } : {};
}

export default async function CatPage({ params }: Props) {
  const { cat } = await params;
  const c = categories.find((x) => x.id === cat);
  if (!c) notFound();
  const items = byCat(c.id as CatId);
  return (
    <div className="page">
      <header className="cat-hero">
        <div className="cat-hero-text wrap" data-reveal>
          <nav className="crumbs" aria-label="Навігація">
            <Link href="/">Головна</Link> <span>/</span> <Link href="/catalog">Каталог</Link> <span>/</span> {c.name}
          </nav>
          <h1 className="h1">{c.title}</h1>
          <p className="lead">{c.text}</p>
        </div>
        <div className="cat-hero-imgs" aria-hidden="true">
          {items.slice(0, 3).map((p, k) => (
            <img key={p.slug} src={p.imgs[k === 1 ? 1 : 0]} alt="" width={720} height={900} data-reveal="zoom" style={{ "--d": `${k * 120}ms` } as React.CSSProperties} />
          ))}
        </div>
      </header>
      <div className="wrap">
        <Catalog items={items} cat={c.id} />
      </div>
    </div>
  );
}
