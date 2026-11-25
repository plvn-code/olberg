import Link from "next/link";
import { CatRail, Fabrics, Feature, Hero, Tabs, Usp } from "@/components/Home";
import { Icon } from "@/components/Icons";
import { Rail } from "@/components/Product";
import { bySlug, pick, priceText } from "@/lib/catalog";
import { site, stores, usp } from "@/lib/site";

const classic = pick(["stilets-henuia", "stilets-franceska", "stilets-palermo", "stilets-vanessa"]);

export default function Home() {
  return (
    <>
      <Hero />
      <Usp items={usp} />

      <Feature
        p={bySlug("kutovyi-dyvan-amanto")!}
        eyebrow="Хіт продажів"
        points={["270 × 185 см", "Спальне місце 210 × 124 см", "Велюр антикіготь", "Стьобана спинка та декоративні кільця", "Інший колір і розмір — під замовлення"]}
      />

      <section className="sec">
        <div className="wrap sec-head" data-reveal>
          <div>
            <h2 className="h2">Новинки</h2>
            <p className="lead">Моделі, які щойно з&apos;явилися в магазинах.</p>
          </div>
          <Link href="/catalog?sort=new" className="ulink">
            Усі новинки
          </Link>
        </div>
        <Rail
          label="Новинки"
          items={pick([
            "kutovyi-dyvan-milan",
            "krislo-amanda",
            "lizhko-shell",
            "stilets-vertu",
            "stil-feniks",
            "modulnyi-dyvan-modul",
            "krislo-kokon",
            "stil-keramika-marmur",
            "lizhko-adele-new",
            "stilets-roial",
            "kutovyi-dyvan-bukle",
            "puf-stolyk-2-v-1",
            "krislo-otto",
            "stil-dub-ryflenyi",
          ])}
        />
      </section>

      <CatRail />

      <Fabrics />

      <section className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2 className="h2">Популярне</h2>
              <p className="lead">Те, що найчастіше замовляють у наших магазинах.</p>
            </div>
            <Link href="/catalog" className="ulink">
              Весь каталог
            </Link>
          </div>
          <Tabs
            groups={[
              { label: "Дивани", slugs: ["kutovyi-dyvan-evelina", "dyvan-dublin", "dyvan-bonn", "kutovyi-dyvan-chicago"] },
              { label: "Ліжка", slugs: ["lizhko-shell", "lizhko-relaxo", "lizhko-riviera", "lizhko-adele-new"] },
              { label: "Крісла", slugs: ["krislo-otto", "krislo-mushlia", "krislo-kokon", "krislo-z-vukhamy"] },
              { label: "Столи", slugs: ["stil-suchava", "stil-feniks", "stil-malibu", "stil-nero"] },
              { label: "Пуфи", slugs: ["puf-transformer-5-v-1", "puf-kapitone", "puf-tamburo", "lavochka-lidiia"] },
            ]}
          />
        </div>
      </section>

      <section className="duo">
        <div className="duo-text" data-reveal>
          <p className="eyebrow">Столи та обідні групи</p>
          <h2 className="h2">Стіл, за яким збирається вся родина</h2>
          <p>Розкладні столи з масиву, кераміки та шпону. Підберемо стільці в комплект і виготовимо стільницю під розмір вашої кухні.</p>
          <Link href="/catalog/stoly" className="btn btn-light">
            Дивитися столи
          </Link>
        </div>
        <Link href="/product/stil-ovalnyi-ryflenyi" className="duo-img duo-img-1" aria-label="Овальний стіл на рифленій основі">
          <img src="/img/p/ed-dining.webp" alt="Овальний стіл на рифленій основі" width={1000} height={1778} loading="lazy" data-reveal="zoom" />
        </Link>
        <Link href="/product/stil-dub-ryflenyi" className="duo-img duo-img-2" aria-label="Круглий стіл з масиву">
          <img src="/img/p/oak-round-1.webp" alt="Круглий стіл з масиву" width={496} height={620} loading="lazy" data-reveal="zoom" style={{ "--d": "150ms" } as React.CSSProperties} />
        </Link>
      </section>

      <section className="sec classic">
        <div className="wrap">
          <div className="sec-head center" data-reveal>
            <p className="eyebrow">Класична колекція</p>
            <h2 className="h2">Стільці з масиву буку</h2>
            <p className="lead">Різьблення, патина, тасьма та декоративні цвяхи. Колір каркаса й тканину обираєте ви.</p>
          </div>
          <div className="classic-grid">
            {classic.map((p, k) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="classic-item" data-reveal style={{ "--d": `${k * 90}ms` } as React.CSSProperties}>
                <div className="classic-img">
                  <img src={p.imgs[0]} alt={p.name} width={720} height={900} loading="lazy" />
                </div>
                <h3>{p.name.match(/«(.+)»/)?.[1]}</h3>
                <p>
                  {p.specs.find((s) => s[0] === "Висота")?.[1]} · від {priceText(p.price)}
                </p>
              </Link>
            ))}
          </div>
          <div className="center" data-reveal>
            <Link href="/catalog/stiltsi" className="btn">
              Усі стільці
            </Link>
          </div>
        </div>
      </section>

      <Feature
        p={bySlug("puf-transformer-5-v-1")!}
        flip
        bg="sand"
        img="/img/p/ed-pouf5.webp"
        eyebrow="П'ять місць в одному пуфі"
        points={["Пуф + 4 табурети всередині", "Виготовимо в кольорі вашого дивану", "Ніжки чорні, білі або сірі", "Займає місце одного пуфа"]}
      />

      <section className="sec stores-sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2 className="h2">Магазини OLBERG</h2>
              <p className="lead">Івано-Франківськ, Косів і Смодна. В інші міста відправляємо службами доставки — по всій Україні, окрім окупованих територій.</p>
            </div>
            <Link href="/stores" className="ulink">
              Усі адреси
            </Link>
          </div>
          <div className="stores-row">
            {stores.map((s, k) => (
              <a key={s.address} href={s.map} target="_blank" rel="noopener noreferrer" className="store-mini" data-reveal style={{ "--d": `${k * 80}ms` } as React.CSSProperties}>
                <Icon name="pin" size={20} />
                <b>{s.city}</b>
                <span>{s.address}</span>
                <small>Маршрут →</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="insta">
        <div className="wrap insta-head" data-reveal>
          <h2 className="h2">{site.instagramHandle}</h2>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="ulink">
            Підписатися в Instagram
          </a>
        </div>
        <div className="insta-grid">
          {["royal-1", "cocoon-2", "genua-2", "emerald-2", "marble-2", "otto-2"].map((n, k) => (
            <a key={n} href={site.instagram} target="_blank" rel="noopener noreferrer" data-reveal style={{ "--d": `${k * 60}ms` } as React.CSSProperties} aria-label="Instagram OLBERG">
              <img src={`/img/p/${n}.webp`} alt="" width={720} height={900} loading="lazy" />
              <Icon name="instagram" size={22} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
