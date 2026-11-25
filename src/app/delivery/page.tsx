import type { Metadata } from "next";
import { site, swatches, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Доставка та оплата",
  description: "Доставка меблів OLBERG по всій Україні (окрім окупованих територій), самовивіз з магазинів, оплата та виготовлення під замовлення.",
};

const steps = [
  { t: "Замовлення", d: "Оформіть замовлення на сайті, телефоном або в Direct." },
  { t: "Підтвердження", d: "Менеджер узгоджує тканину, колір, розмір і надсилає фото зразків." },
  { t: "Виготовлення", d: "Моделі в наявності відправляємо одразу, під замовлення — після виготовлення." },
  { t: "Доставка", d: "Відправляємо службою доставки у відділення або за адресою (окрім окупованих територій) чи видаємо в магазині." },
];

export default function DeliveryPage() {
  return (
    <div className="page">
      <header className="wrap page-head" data-reveal>
        <p className="eyebrow">Покупцям</p>
        <h1 className="h1">Доставка та оплата</h1>
      </header>
      <div className="wrap steps">
        {steps.map((s, k) => (
          <div key={s.t} className="step" data-reveal style={{ "--d": `${k * 80}ms` } as React.CSSProperties}>
            <span>0{k + 1}</span>
            <h2 className="h3">{s.t}</h2>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
      <section className="wrap info-cols">
        <div data-reveal>
          <h2 className="h3">Доставка</h2>
          <ul className="dash">
            <li>По всій Україні, окрім окупованих територій, — службами доставки у відділення або за адресою.</li>
            <li>Самовивіз — з магазинів в Івано-Франківську, Косові та Смодні.</li>
            <li>Вартість доставки — за тарифами перевізника, розраховується під час підтвердження.</li>
          </ul>
        </div>
        <div data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <h2 className="h3">Оплата</h2>
          <ul className="dash">
            <li>При отриманні — накладений платіж або оплата в магазині.</li>
            <li>Передоплата — за рахунком після підтвердження замовлення.</li>
            <li>Для моделей під замовлення може знадобитися часткова передоплата.</li>
          </ul>
        </div>
      </section>
      <section className="wrap fabrics-page" id="tkanyny" data-reveal>
        <h2 className="h2">Тканини та кольори</h2>
        <p className="lead">Широкий асортимент тканин та кольорів на ваш вибір. Фото зразків надішлемо в месенджер або на пошту.</p>
        <div className="swatch-row">
          {swatches.map((s) => (
            <div key={s.id} className="swatch-big" style={{ "--c": s.hex } as React.CSSProperties}>
              <i />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
        <p className="muted">Кольори на екрані можуть відрізнятися від реальних. Фото зразків тканин надішлемо в месенджер.</p>
      </section>
      <section className="wrap callout" data-reveal>
        <div>
          <h2 className="h2">Залишилися питання?</h2>
          <p>Зателефонуйте або напишіть — відповімо щодо термінів, доставки та оплати.</p>
        </div>
        <div className="callout-cta">
          {site.phones.map((t) => (
            <a key={t.tel} href={telHref(t.tel)} className="btn btn-dark">
              {t.tel}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="btn">
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
