import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = { title: "Кошик і оформлення замовлення", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="page wrap">
      <Checkout />
    </div>
  );
}
