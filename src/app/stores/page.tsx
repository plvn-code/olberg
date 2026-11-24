import type { Metadata } from "next";
import { Icon } from "@/components/Icons";
import { site, stores } from "@/lib/site";

export const metadata: Metadata = {
  title: "Магазини",
  description: "Магазини OLBERG в Івано-Франківську, Косові та Смодні. Доставка по всій Україні.",
};

export default function StoresPage() {
  return (
    <div className="page">
      <header className="wrap page-head" data-reveal>
        <p className="eyebrow">Магазини</p>
        <h1 className="h1">Де купити OLBERG</h1>
        <p className="lead">Чотири магазини на Прикарпатті. Якщо ви з іншого міста — оформіть замовлення на сайті, і ми відправимо його службою доставки.</p>
      </header>
      <div className="wrap stores-grid">
        {stores.map((s, k) => (
          <article key={s.address} className="store" data-reveal style={{ "--d": `${k * 90}ms` } as React.CSSProperties}>
            <div className="store-img">
              <img src={s.img} alt="" width={720} height={1280} loading="lazy" />
            </div>
            <div className="store-body">
              <p className="eyebrow">{s.city}</p>
              <h2 className="h3">{s.title}</h2>
              <p className="store-addr">
                <Icon name="pin" size={18} /> {s.address}
              </p>
              <p className="muted">{s.note}</p>
              <a href={s.map} target="_blank" rel="noopener noreferrer" className="btn">
                Прокласти маршрут
              </a>
            </div>
          </article>
        ))}
      </div>
      <section className="wrap callout" data-reveal>
        <div>
          <h2 className="h2">Потрібна консультація?</h2>
          <p>Підберемо модель, тканину й розмір, надішлемо фото зразків.</p>
        </div>
        <div className="callout-cta">
          <a href={site.phoneHref} className="btn btn-dark">
            {site.phone}
          </a>
          <a href={site.direct} className="btn" target="_blank" rel="noopener noreferrer">
            Написати в Direct
          </a>
        </div>
      </section>
    </div>
  );
}
