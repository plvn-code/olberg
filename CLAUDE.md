# OLBERG — сайт-магазин меблів (Instagram @mebli.olberg)

Furniture maker OLBERG (на ринку з 1994, магазини: Івано-Франківськ — вул. Василя Стуса 28 і ТЦ «МЕНС Простір»; Косів, вул. Незалежності 26; с. Смодна, вул. Набережна 1). Brief 2026-11-24: very beautiful shop with moderate animations, **styled after bolia.com/en-au** (same colours + fonts). Client rule: **no "experience" copy** like «Приходьте посидіти на кожному кріслі» — it's a shop to buy, copy must be short and sales-focused. **Talk to the user in Russian; site copy Ukrainian.** Do NOT use the old site olberg.com.ua as a source (user's instruction). Read `docs/STATUS.md` first.

## Commands
```bash
npm run build && npm start               # production on :3012
kill $(lsof -ti tcp:3012 -sTCP:LISTEN)   # restart only our port
npm run lint && npx tsc --noEmit         # must stay clean
open -a "Google Chrome" http://localhost:3012
```
`node_modules` → symlink to `~/Desktop/nudes/node_modules`; `research/.venv` → `~/Desktop/nudes/research/.venv`.

## Stack
Next.js 15 App Router · React 19 · TS strict · plain CSS (`src/app/globals.css`) · fonts **Cormorant** (caps headings, as Bolia) + **Montserrat** (text) · no UI/animation libs.
Palette (from Bolia): white, cream #f6f3ec, linen #f4ebdc, sand #eae4d4, taupe #aaa49a, mocha #837564, plum #59373b (accent blocks), mauve top bar #dccbcb, ink #222. Thin square 1px buttons.

## Layout
```
src/lib/catalog.ts   6 categories + 94 products (slug, price? — undefined = «Ціна за запитом», sizes? with own prices, imgs[], ig post code, specs, fabric?) — all product data
src/lib/site.ts      contacts (3 phones + email, per-store phones/emails), delivery line, stores, colour swatches, USPs (no fabric list — client is choosing)
src/components/      Store (cart + wishlist context, localStorage), Chrome (Header/top bar, CartDrawer, Search, Qty, FabricPicker),
                     Product (Card with hover image swap, Rail carousel), Home (Hero with video panel, CatRail, Feature 50/50, Tabs, Fabrics, Usp),
                     Catalog (chips, price filter, sort), ProductView, Checkout, Wishlist, Effects (data-reveal / data-parallax), Footer, Icons
src/app/             / · /catalog · /catalog/[cat] · /product/[slug] · /checkout · /wishlist · /stores · /delivery · /about · /api/order
public/img/p         <product>-1/-2.webp (4:5) and ed-*.webp (9:16 editorial) · public/video/oak-table.mp4 (hero loop)
research/            feed.json (IG posts, captions, media URLs — expire) + crops.py (crop/grade spec; raw frames deleted for disk)
```
Orders: `/api/order` recomputes prices from the catalogue; sends to Telegram if `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` are set, otherwise only logs.
Photos come from IG reels/carousels; reels with burned-in model names (BONN, MILAN, SHELL…) are used since 2026-11-25 (client wants all products). Product images use object-fit: contain so whole sofas stay visible (landscape photos are letterboxed). Never put state classes on `[data-reveal]`.
Playwright MCP drives the user's Chrome: work in a new tab, don't open IG stories (marks the user's account as a viewer).

## Client feedback log
- 2026-11-25 (owner writes names, prices and content herself): whole sofas visible in photos; white visual OK; «Доставка по всій Україні, окрім окупованих територій»; «Широкий асортимент тканин та кольорів на ваш вибір» instead of a fabric list; «у відділення або за адресою» (not «адресно»); bigger OLBERG logo; more phone numbers; price depends on size for beds/tables; many more products; main source is @mebli.olberg; prices shown as «від» + phone + e-mail link. She will correct names/prices in `docs/OLBERG-tovary.csv` (regenerate: transpile catalog.ts with node_modules/typescript to catalog.js, then `node research/table.js <dir with catalog.js>`).
