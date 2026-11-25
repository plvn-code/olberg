import Link from "next/link";
import { categories } from "@/lib/catalog";
import { site, stores, telHref } from "@/lib/site";
import { Icon } from "./Icons";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-brand">
            <Link href="/" className="logo logo-lg">
              OLBERG
            </Link>
            <p>Меблі від виробника з {site.since} року. Дивани, крісла, стільці, столи, ліжка та пуфи — у тканині та кольорі на ваш вибір.</p>
            <div className="ftr-social">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={20} />
              </a>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="tt">
                TikTok
              </a>
            </div>
          </div>
          <div className="ftr-col">
            <h3>Каталог</h3>
            {categories.map((c) => (
              <Link key={c.id} href={`/catalog/${c.id}`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="ftr-col">
            <h3>Покупцям</h3>
            <Link href="/delivery">Доставка та оплата</Link>
            <Link href="/delivery#tkanyny">Тканини та кольори</Link>
            <Link href="/wishlist">Обране</Link>
            <Link href="/checkout">Кошик</Link>
            <Link href="/about">Про OLBERG</Link>
          </div>
          <div className="ftr-col">
            <h3>Магазини</h3>
            {stores.map((s) => (
              <a key={s.address} href={s.map} target="_blank" rel="noopener noreferrer">
                {s.city}, {s.address}
              </a>
            ))}
            {site.phones.map((t) => (
              <a key={t.tel} href={telHref(t.tel)} className="ftr-phone">
                {t.tel} <small>{t.note}</small>
              </a>
            ))}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="ftr-bottom">
          <span>© {new Date().getFullYear()} OLBERG. Усі права захищені.</span>
          <span>Ціни «від» — орієнтовні, точну вартість уточнюйте за телефоном або поштою.</span>
        </div>
      </div>
    </footer>
  );
}
