export const site = {
  name: "OLBERG",
  legal: "OLBERG · меблі від виробника",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3012",
  description:
    "OLBERG — меблі від виробника з 1994 року: дивани, крісла, стільці, столи, ліжка та пуфи. Тканина й колір на вибір, доставка по всій Україні, магазини в Івано-Франківську та Косові.",
  since: 1994,
  instagram: "https://www.instagram.com/mebli.olberg/",
  instagramHandle: "@mebli.olberg",
  tiktok: "https://www.tiktok.com/@olberg_mebli",
  direct: "https://ig.me/m/mebli.olberg",
  // Телефон узгодити з клієнтом (див. docs/STATUS.md)
  phone: "+38 097 904 82 16",
  phoneHref: "tel:+380979048216",
};

export type Store = { city: string; title: string; address: string; note: string; map: string; img: string };

const map = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const stores: Store[] = [
  {
    city: "Івано-Франківськ",
    title: "Фірмовий магазин",
    address: "вул. Василя Стуса, 28",
    note: "Дивани, крісла, стільці, столи",
    map: map("Івано-Франківськ, вул. Василя Стуса, 28"),
    img: "/img/p/ed-showroom.webp",
  },
  {
    city: "Івано-Франківськ",
    title: "ТЦ «МЕНС Простір»",
    address: "ТЦ «МЕНС Простір»",
    note: "Обідні групи та м'які меблі",
    map: map("Івано-Франківськ, ТЦ МЕНС Простір"),
    img: "/img/p/ed-dining.webp",
  },
  {
    city: "Косів",
    title: "Магазин OLBERG",
    address: "вул. Незалежності, 26",
    note: "Повний асортимент і зразки тканин",
    map: map("Косів, вул. Незалежності, 26"),
    img: "/img/p/ed-store.webp",
  },
  {
    city: "с. Смодна",
    title: "Магазин біля виробництва",
    address: "вул. Набережна, 1",
    note: "Косівський район",
    map: map("Смодна, вул. Набережна, 1"),
    img: "/img/p/ed-cloud.webp",
  },
];

export type Fabric = { id: string; name: string; note: string };
export type Swatch = { id: string; name: string; hex: string };

export const fabrics: Fabric[] = [
  { id: "velour", name: "Велюр антикіготь", note: "Стійкий до кігтів і затяжок, легко чиститься" },
  { id: "boucle", name: "Букле", note: "Об'ємна фактура, м'який на дотик" },
  { id: "velvet", name: "Оксамит", note: "Глибокий колір і м'який блиск" },
  { id: "rock", name: "UNITEX Rock", note: "Щільна рогожка для щоденного використання" },
  { id: "lama", name: "UNITEX Lama", note: "Тепла ворсиста тканина з ефектом вовни" },
  { id: "leather", name: "Екошкіра", note: "Практична, не боїться вологи" },
];

export const swatches: Swatch[] = [
  { id: "milk", name: "Молочний", hex: "#ebe4d6" },
  { id: "sand", name: "Пісочний", hex: "#cbb89c" },
  { id: "mocha", name: "Мокко", hex: "#86705c" },
  { id: "graphite", name: "Графіт", hex: "#4d4c4a" },
  { id: "emerald", name: "Смарагд", hex: "#2f5a4a" },
  { id: "terra", name: "Теракота", hex: "#b0583b" },
  { id: "powder", name: "Пудра", hex: "#d8b9b3" },
  { id: "mustard", name: "Гірчиця", hex: "#c69f39" },
  { id: "indigo", name: "Індиго", hex: "#2c3a55" },
];

export const usp = [
  { t: "Власне виробництво", d: `Каркаси, оббивка й матраци — на нашій фабриці з ${site.since} року` },
  { t: "Тканина й колір на вибір", d: "Шиємо модель у потрібному кольорі та розмірі" },
  { t: "Доставка по Україні", d: "Відправляємо службами доставки в будь-яке місто" },
  { t: "4 магазини", d: "Івано-Франківськ, Косів і Смодна" },
];
