import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, categories, testimonials } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black" style={{ minHeight: "85vh" }}>
        <div className="absolute inset-0">
          <Image
            src="/products/product_2_photo_1.jpeg"
            alt="The Ankara Closet"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        </div>

        {/* Mobile hero */}
        <div className="md:hidden relative z-10 flex flex-col px-5 pt-8 pb-10" style={{ minHeight: "85vh" }}>
          <div className="mt-auto">
            <h1 className="font-display text-[80px] font-bold text-white uppercase leading-none tracking-tight mb-2">
              ANKARA<br />SEASON
            </h1>
            <p className="text-white/80 text-sm mb-6">Ready-to-wear. No tailor stress.</p>
            <Link
              href="/shop"
              className="block w-full bg-white text-black text-center text-[11px] font-bold tracking-[0.22em] uppercase py-4 hover:bg-white/90 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Desktop hero */}
        <div
          className="hidden md:flex relative z-10 flex-col px-10 lg:px-16 pt-10 pb-14"
          style={{ minHeight: "100vh" }}
        >
          <div className="mt-auto max-w-3xl">
            <h1 className="font-display text-[clamp(5rem,11vw,9rem)] font-bold text-white uppercase leading-none tracking-tight mb-5">
              ANKARA<br />SEASON.
            </h1>
            <p className="text-white/80 text-lg max-w-md mb-8 leading-relaxed">
              Ready-to-wear. No tailor stress. Delivered to your door across Nigeria and worldwide.
            </p>
            <div className="flex gap-4">
              <Link
                href="/shop"
                className="bg-white text-black text-[11px] font-bold tracking-[0.22em] uppercase px-10 py-4 hover:bg-white/90 transition-colors"
              >
                SHOP NOW
              </Link>
              <Link
                href="/wholesale"
                className="border border-white text-white text-[11px] font-bold tracking-[0.16em] uppercase px-8 py-4 hover:bg-white/10 transition-colors"
              >
                BECOME A RESELLER
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────── */}
      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-5 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {[
              { label: "FAST DELIVERY 2-4 DAYS", short: "FAST DELIVERY", icon: <TruckIcon /> },
              { label: "EASY RETURNS", short: "EASY RETURNS", icon: <ReturnsIcon /> },
              { label: "PAY ON DELIVERY", short: "PAY ON DELIVERY", icon: <ShieldIcon /> },
              { label: "SHIP WORLDWIDE", short: "SHIP WORLDWIDE", icon: <GlobeIcon /> },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white">
                {item.icon}
                <span className="hidden md:inline text-[10px] font-medium tracking-[0.16em] uppercase">
                  {item.label}
                </span>
                <span className="md:hidden text-[10px] font-medium tracking-[0.16em] uppercase">
                  {item.short}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY TABS (mobile) ─────────────────────────────────── */}
      <section className="md:hidden bg-white border-b border-gray-100">
        <div className="flex items-center overflow-x-auto scrollbar-hide px-4 py-3 gap-1.5">
          {[
            { label: "ALL", href: "/shop", active: true },
            { label: "NEW IN", href: "/shop" },
            { label: "DRESSES", href: "/shop?category=Dresses" },
            { label: "TWO-PIECE", href: "/shop?category=2-Pieces" },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex-shrink-0 px-4 py-1.5 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors ${
                tab.active
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-200 hover:border-black"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ──────────────────────────────────────── */}
      <section className="bg-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 md:px-10 lg:px-16 mb-6 md:mb-10 md:text-center">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-2">
              SHOP BY CATEGORY
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black tracking-tight">
              Find your style
            </h2>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
            {[
              { name: "DRESSES", href: "/shop?category=Dresses", bg: "#E8C9A0", img: "/products/product_1_photo_1.jpeg" },
              { name: "TWO-PIECE", href: "/shop?category=2-Pieces", bg: "#C4703A", img: "/products/product_4_photo_1.jpeg" },
              { name: "ASOKE", href: "/shop?category=Asoke", bg: "#A84020", img: "/products/product_5_photo_1.jpeg" },
              { name: "KIMONO", href: "/shop?category=Kimonos+%26+Sets", bg: "#6B3010", img: "/photos/photo_1.jpeg" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex-shrink-0 overflow-hidden"
                style={{ width: "70vw", aspectRatio: "3/4", backgroundColor: cat.bg }}
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  sizes="70vw"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-xl font-bold text-white tracking-[0.1em] uppercase">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 px-10 lg:px-16">
            {[
              { name: "DRESSES", href: "/shop?category=Dresses", bg: "#E8C9A0", img: "/products/product_1_photo_1.jpeg" },
              { name: "TWO-PIECE", href: "/shop?category=2-Pieces", bg: "#C4703A", img: "/products/product_4_photo_1.jpeg" },
              { name: "ASOKE", href: "/shop?category=Asoke", bg: "#A84020", img: "/products/product_5_photo_1.jpeg" },
              { name: "KIMONO", href: "/shop?category=Kimonos+%26+Sets", bg: "#6B3010", img: "/photos/photo_1.jpeg" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative overflow-hidden"
                style={{ aspectRatio: "3/4", backgroundColor: cat.bg }}
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  sizes="25vw"
                  className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-xl font-bold text-white tracking-[0.1em] uppercase">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ───────────────────────────────────────────── */}
      <section className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
          {/* Desktop heading */}
          <div className="hidden md:flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-1">
                NEW ARRIVALS
              </p>
              <h2 className="font-display text-4xl font-bold text-black tracking-tight">
                Fresh off the rack
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-[11px] font-bold tracking-[0.16em] uppercase text-black hover:opacity-50 transition-opacity border-b border-black pb-0.5"
            >
              VIEW ALL →
            </Link>
          </div>

          {/* Mobile heading */}
          <div className="flex md:hidden items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-black tracking-tight uppercase">
              NEW ARRIVALS
            </h2>
            <Link
              href="/shop"
              className="text-[10px] font-bold tracking-[0.16em] uppercase text-black hover:opacity-50 transition-opacity"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESELLER CTA ──────────────────────────────────────────── */}
      <section className="bg-black md:grid md:grid-cols-2">
        <div className="px-6 md:px-12 lg:px-16 py-14 flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-4">
            FOR BUSINESS OWNERS
          </p>
          <h2 className="font-display text-[clamp(2.8rem,8vw,4.5rem)] font-bold text-white uppercase leading-none tracking-tight mb-4">
            BECOME A<br />RESELLER.
          </h2>
          <p className="text-white/55 text-sm mb-7 max-w-md leading-relaxed">
            Boutique owners and fashion vendors: get wholesale prices, bulk discounts,
            and consistent stock for resale.
          </p>
          <div className="flex gap-6 mb-8">
            {["Bulk discounts", "Fast restocking", "Direct line"].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C4703A]" />
                <span className="text-white/60 text-xs">{f}</span>
              </div>
            ))}
          </div>
          <Link
            href="/wholesale"
            className="self-start bg-red-600 text-white text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-red-700 transition-colors"
          >
            APPLY NOW
          </Link>
        </div>

        <div className="hidden md:block relative bg-black">
          <Image
            src="/products/product_3_photo_1.jpeg"
            alt="Reseller"
            fill
            sizes="50vw"
            className="object-cover opacity-80"
          />
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-2">
              REVIEWS &middot; 4.9
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-black tracking-tight">
              <span className="hidden md:inline">Loved by 500+ customers</span>
              <span className="md:hidden">REVIEWS ★ 4.9</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="border border-gray-100 p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-black text-sm">★</span>
                  ))}
                </div>
                <p className="text-black text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-gray-400 text-xs">
                  {t.name} &middot; {t.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL SUBSCRIBE (desktop) ─────────────────────────────── */}
      <section className="hidden md:block bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-10 lg:px-16 text-center">
          <h2 className="font-display text-3xl font-bold text-black tracking-tight mb-2">
            Join the closet
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Be first to know about new drops, restocks and exclusive discounts
          </p>
          <div className="flex gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 border-r-0 px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-gray-900 transition-colors flex-shrink-0"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="18.5" r="2" />
    </svg>
  );
}

function ReturnsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
