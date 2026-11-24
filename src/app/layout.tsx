import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import { CartDrawer, Header, Search } from "@/components/Chrome";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/components/Store";
import { site, stores } from "@/lib/site";
import "./globals.css";

const display = Cormorant({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600"], variable: "--font-display", display: "swap" });
const body = Montserrat({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500", "600"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "OLBERG — меблі від виробника · дивани, крісла, стільці, столи", template: "%s — OLBERG" },
  description: site.description,
  openGraph: { type: "website", locale: "uk_UA", siteName: "OLBERG", images: ["/img/p/amanto-1.webp"] },
  robots: process.env.NEXT_PUBLIC_SITE_LIVE === "1" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f6f3ec" };

const ld = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "OLBERG",
  url: site.url,
  telephone: site.phone.replace(/\s/g, ""),
  foundingDate: String(site.since),
  sameAs: [site.instagram, site.tiktok],
  address: stores.map((s) => ({ "@type": "PostalAddress", streetAddress: s.address, addressLocality: s.city, addressCountry: "UA" })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${display.variable} ${body.variable}`}>
      <body>
        <StoreProvider>
          <a href="#main" className="skip">
            До змісту
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <Search />
          <Effects />
        </StoreProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
