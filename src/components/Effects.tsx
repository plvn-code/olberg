"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide motion, mounted once:
 * - [data-reveal] → data-in="1" when it enters the viewport (CSS does the animation);
 * - [data-count] numbers count up once;
 * - [data-parallax="0.1"] drift with scroll (--py);
 * - --sp on <html> = page scroll progress (top hairline).
 * Never put state-driven classes on a [data-reveal] element.
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = (el: HTMLElement) => {
      const end = Number(el.dataset.count);
      const dec = Number(el.dataset.dec || 0);
      if (reduce || !end) return;
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1600);
        el.textContent = (end * (1 - Math.pow(1 - k, 4))).toFixed(dec);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.dataset.in = "1";
          if (el.dataset.count) count(el);
          io.unobserve(el);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    const scan = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), [data-count]:not([data-in])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const d = document.documentElement;
      d.style.setProperty("--sp", String(scrollY / Math.max(1, d.scrollHeight - innerHeight)));
      if (reduce) return;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        el.style.setProperty("--py", `${((r.top + r.height / 2 - innerHeight / 2) * Number(el.dataset.parallax)).toFixed(1)}px`);
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, [pathname]);

  return null;
}
