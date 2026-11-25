export const site = {
  name: "OLBERG",
  legal: "OLBERG · меблі від виробника",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3012",
  description:
    "OLBERG — меблі від виробника з 1994 року: дивани, крісла, стільці, столи, ліжка та пуфи. Широкий асортимент тканин та кольорів, доставка по всій Україні (окрім окупованих територій), магазини в Івано-Франківську та Косові.",
  since: 1994,
  instagram: "https://www.instagram.com/mebli.olberg/",
  instagramHandle: "@mebli.olberg",
  tiktok: "https://www.tiktok.com/@olberg_mebli",
  direct: "https://ig.me/m/mebli.olberg",
  // Номери та пошту узгодити з клієнтом (див. docs/STATUS.md)
  phone: "+38 097 904 82 16",
  phoneHref: "tel:+380979048216",
  phones: [
    { tel: "+38 097 904 82 16", note: "Івано-Франківськ" },
    { tel: "+38 095 014 22 82", note: "Івано-Франківськ" },
    { tel: "+38 068 572 27 75", note: "Косів" },
  ],
  email: "olberg1@ukr.net",
  delivery: "Доставка по всій Україні, окрім окупованих територій",
};

export const telHref = (t: string) => `tel:${t.replace(/[^\d+]/g, "")}`;
export const mailHref = (subject?: string) => `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export type Store = { city: string; title: string; address: string; note: string; map: string; img: string; phones?: string[]; email?: string };

const map = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const stores: Store[] = [
  {
    city: "Івано-Франківськ",
    title: "Фірмовий магазин",
    address: "вул. Василя Стуса, 28",
    note: "Дивани, крісла, стільці, столи",
    map: map("Івано-Франківськ, вул. Василя Стуса, 28"),
    phones: ["+38 097 904 82 16", "+38 095 014 22 82"],
    email: "olbergmebli_if@ukr.net",
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
    phones: ["+38 068 572 27 75"],
    email: "olberg4@ukr.net",
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

export type Swatch = { id: string; name: string; hex: string };


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
  { t: "Тканини та кольори на вибір", d: "Широкий асортимент тканин та кольорів на ваш вибір" },
  { t: "Доставка по Україні", d: "У відділення або за адресою, окрім окупованих територій" },
  { t: "4 магазини", d: "Івано-Франківськ, Косів і Смодна" },
];
