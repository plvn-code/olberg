import type { Metadata } from "next";
import { Wishlist } from "@/components/Wishlist";

export const metadata: Metadata = { title: "Обране", robots: { index: false } };

export default function WishPage() {
  return (
    <div className="page wrap">
      <Wishlist />
    </div>
  );
}
