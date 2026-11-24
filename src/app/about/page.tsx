import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Про OLBERG",
  description: `OLBERG — український виробник м'яких меблів, стільців і столів з ${site.since} року.`,
};

const facts = [
  { n: String(site.since), t: "рік, з якого OLBERG на ринку України" },
  { n: "4", t: "магазини в Івано-Франківську, Косові та Смодні" },
  { n: "6", t: "видів тканин і десятки відтінків для оббивки" },
  { n: "40+", t: "моделей у каталозі сайту" },
];

export default function AboutPage() {
  return (
    <div className="page">
      <section className="about-hero wrap">
        <div data-reveal>
          <p className="eyebrow">Про нас</p>
          <h1 className="h1">Виробник меблів з {site.since} року</h1>
          <p className="lead">
            OLBERG виготовляє м&apos;які меблі, стільці та столи й продає їх напряму — без посередників. Дивани, крісла й пуфи шиємо в тканині та кольорі, які обирає покупець. Ліжка комплектуємо матрацами власного
            виробництва.
          </p>
          <Link href="/catalog" className="btn btn-dark">
            Перейти до каталогу
          </Link>
        </div>
        <div className="about-imgs" aria-hidden="true">
          <img src="/img/p/ed-expo.webp" alt="" width={720} height={1280} data-reveal="zoom" />
          <img src="/img/p/ed-genua.webp" alt="" width={720} height={900} data-reveal="zoom" style={{ "--d": "150ms" } as React.CSSProperties} />
        </div>
      </section>
      <section className="facts">
        <div className="wrap facts-in">
          {facts.map((f, k) => (
            <div key={f.t} data-reveal style={{ "--d": `${k * 80}ms` } as React.CSSProperties}>
              <b>{f.n}</b>
              <span>{f.t}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap about-cols">
        <div data-reveal>
          <h2 className="h3">Під ваш розмір</h2>
          <p>Кутові дивани, столи та лавки виготовляємо під розміри конкретної кімнати. Колір каркаса класичних стільців — від білого з патиною до горіха.</p>
        </div>
        <div data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <h2 className="h3">Матеріали</h2>
          <p>Масив буку та гевеї для каркасів, кераміка й шпон для стільниць, тканини UNITEX, велюр антикіготь, букле, оксамит та екошкіра для оббивки.</p>
        </div>
        <div data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          <h2 className="h3">Новинки щосезону</h2>
          <p>Оновлюємо колекції після міжнародних меблевих виставок — у 2025 році представили нові моделі на виставці в Києві.</p>
        </div>
      </section>
      <section className="duo">
        <div className="duo-text" data-reveal>
          <h2 className="h2">Слідкуйте за новинками</h2>
          <p>Нові моделі та наявність публікуємо в Instagram.</p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            {site.instagramHandle}
          </a>
        </div>
        <div className="duo-img duo-img-1">
          <img src="/img/p/ed-expo2.webp" alt="Стенд OLBERG на меблевій виставці" width={720} height={1280} loading="lazy" data-reveal="zoom" />
        </div>
        <div className="duo-img duo-img-2">
          <img src="/img/p/royal-1.webp" alt="Стільці «Роял»" width={1000} height={1250} loading="lazy" data-reveal="zoom" style={{ "--d": "150ms" } as React.CSSProperties} />
        </div>
      </section>
    </div>
  );
}
