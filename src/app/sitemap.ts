import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/catalog", "/stores", "/delivery", "/about", ...categories.map((c) => `/catalog/${c.id}`), ...products.map((p) => `/product/${p.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, priority: p ? (p.startsWith("/product") ? 0.6 : 0.8) : 1 }));
}
