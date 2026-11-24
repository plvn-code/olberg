import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Rail } from "@/components/Product";
import { ProductView } from "@/components/ProductView";
import { bySlug, catOf, products } from "@/lib/catalog";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: `${p.name} — ${p.desc}`, openGraph: { images: [p.imgs[0]] } } : {};
}

export default async function ProductPage({ params }: Props) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const same = products.filter((x) => x.cat === p.cat && x.slug !== p.slug);
  const more = [...same, ...products.filter((x) => x.cat !== p.cat && x.tag)].slice(0, 10);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc,
    image: p.imgs.map((s) => site.url + s),
    category: catOf(p.cat).name,
    brand: { "@type": "Brand", name: "OLBERG" },
    offers: { "@type": "Offer", priceCurrency: "UAH", price: p.price, availability: "https://schema.org/InStock", url: `${site.url}/product/${p.slug}` },
  };
  return (
    <div className="page page-pv">
      <ProductView p={p} />
      <section className="sec">
        <div className="wrap sec-head" data-reveal>
          <h2 className="h2">Вам також сподобається</h2>
        </div>
        <Rail items={more} label="Схожі моделі" />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
