"use client";

import { useState } from "react";
import Link from "next/link";

const WHATSAPP_NUMBER = "2348133053455";

function fmt(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function buildLink(product, size, qty) {
  const total = fmt(product.price * qty);
  const msg = encodeURIComponent(
    `Hello! I'd like to order:\n\n*${product.name}*\nSize: ${size}\nQuantity: ${qty}\nPrice per item: ${fmt(product.price)}\nTotal: ${total}\n\nPlease confirm availability and delivery. Thank you! 🙏`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export default function ProductOrderPanel({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);

  const link = buildLink(product, selectedSize, qty);
  const total = fmt(product.price * qty);

  return (
    <div className="flex flex-col gap-4">
      {/* Sizes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-black">SIZE</p>
          <Link
            href="/size-guide"
            className="text-[10px] font-bold tracking-[0.16em] uppercase text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            SIZE GUIDE
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[44px] px-3 py-2 text-[11px] font-semibold border transition-colors ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-black hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-black mb-2">QUANTITY</p>
        <div className="flex items-center border border-gray-200 w-fit">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-black hover:bg-gray-50 transition-colors text-lg font-light"
            aria-label="Decrease quantity"
          >
            &#8722;
          </button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-black hover:bg-gray-50 transition-colors text-lg font-light"
            aria-label="Increase quantity"
          >
            &#43;
          </button>
        </div>
      </div>

      {/* Delivery note */}
      <div className="flex items-start gap-3 text-xs text-gray-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <path d="M16 8h4l3 4v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2" />
          <circle cx="18.5" cy="18.5" r="2" />
        </svg>
        <div>
          <span className="font-medium text-black">Delivery in 2–4 days</span>
          <br />
          Free above &#8358;25,000 &middot; Abuja, Jos & nationwide &middot;{" "}
          <Link href="/delivery" className="underline hover:opacity-60 transition-opacity">
            Delivery info
          </Link>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 pt-1">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-black text-white text-center text-[11px] font-bold tracking-[0.2em] uppercase py-4 hover:bg-gray-900 transition-colors"
        >
          ORDER NOW &middot; {total}
        </a>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white text-[11px] font-bold tracking-[0.2em] uppercase py-4 hover:bg-[#1eb358] transition-colors"
        >
          <WhatsAppIcon />
          ORDER VIA WHATSAPP
        </a>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
