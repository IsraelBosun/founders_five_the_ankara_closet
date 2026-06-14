import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Wholesale & Resellers | The Ankara Closet",
  description:
    "Become a reseller of The Ankara Closet. Wholesale prices, consistent stock, fast turnaround.",
};

const WHATSAPP_WHOLESALE = (() => {
  const msg = encodeURIComponent(
    "Hello! I'm interested in becoming a reseller for The Ankara Closet. Please send me details about wholesale pricing, minimum order quantities, and available styles. Thank you!"
  );
  return `https://wa.me/2348133053455?text=${msg}`;
})();

export default function WholesalePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-black text-white md:grid md:grid-cols-2 min-h-[60vh]">
        <div className="px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-4">
            FOR BUSINESS OWNERS
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-bold text-white uppercase leading-none tracking-tight mb-5">
            BECOME A<br />RESELLER.
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
            Join boutique owners, Instagram vendors, and fashion entrepreneurs across
            Nigeria who trust The Ankara Closet as their go-to Ankara supplier.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={WHATSAPP_WHOLESALE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-4 hover:bg-[#1eb358] transition-colors"
            >
              <WhatsAppIcon />
              APPLY NOW
            </a>
            <Link
              href="/shop"
              className="border border-white/30 text-white text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-4 hover:border-white transition-colors"
            >
              VIEW PRODUCTS
            </Link>
          </div>
        </div>

        <div className="hidden md:block relative bg-black">
          <Image
            src="/products/product_4_photo_1.jpeg"
            alt="Wholesale Ankara"
            fill
            sizes="50vw"
            className="object-cover opacity-80"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-2">
              WHY RESELLERS CHOOSE US
            </p>
            <h2 className="font-display text-4xl font-bold text-black tracking-tight uppercase">
              Built for profit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Wholesale Pricing",
                desc: "Access exclusive bulk prices that give you healthy profit margins on every item — whether you're selling 5 pieces or 50.",
              },
              {
                title: "Consistent Stock",
                desc: "We maintain steady supply on our best-selling styles so you can restock quickly and never lose a sale.",
              },
              {
                title: "Fast Turnaround",
                desc: "Orders are processed quickly. Your inventory arrives fast so you can post on Instagram and start making money.",
              },
              {
                title: "Trendy Designs",
                desc: "Our styles are curated to sell. Bold prints and flattering silhouettes your customers will love and come back for.",
              },
              {
                title: "Reliable Supplier",
                desc: "We're available on WhatsApp to answer questions and confirm orders. No ghosting, no delays, no drama.",
              },
              {
                title: "Nationwide & Abroad",
                desc: "Whether you're in Abuja, Lagos, London or Houston — we deliver directly to you so you can sell from anywhere.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-gray-100 p-6">
                <h3 className="font-display text-lg font-bold text-black tracking-tight uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-2">
              SIMPLE PROCESS
            </p>
            <h2 className="font-display text-4xl font-bold text-black tracking-tight uppercase">
              How it works
            </h2>
          </div>

          <div className="flex flex-col">
            {[
              {
                step: "01",
                title: "Message Us on WhatsApp",
                desc: "Send us a message expressing interest in becoming a reseller. Tell us about your business — boutique, Instagram vendor, or just starting out.",
              },
              {
                step: "02",
                title: "Get the Catalogue & Pricing",
                desc: "We'll send you our current wholesale catalogue with all available styles, colorways, and bulk pricing tiers.",
              },
              {
                step: "03",
                title: "Place Your Order",
                desc: "Choose your styles and quantities. We confirm availability and give you payment details. MOQ is flexible.",
              },
              {
                step: "04",
                title: "Receive & Start Selling",
                desc: "We deliver to your location. Post on Instagram, sell in your boutique, or ship to your own customers. It's all profit from here.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-6 py-8 border-b border-gray-100 last:border-0"
              >
                <div className="shrink-0 w-12 text-right">
                  <span className="font-display text-5xl font-bold text-gray-100">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-black tracking-tight uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-4">
            READY TO START?
          </p>
          <h2 className="font-display text-4xl font-bold text-white tracking-tight uppercase mb-4">
            Let&apos;s build something<br />profitable together
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
            Reach out on WhatsApp today. We respond fast and will have you selling in no time.
          </p>
          <a
            href={WHATSAPP_WHOLESALE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#1eb358] transition-colors"
          >
            <WhatsAppIcon />
            START THE CONVERSATION
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
