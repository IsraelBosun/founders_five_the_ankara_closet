import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWhatsAppGeneralLink } from "@/lib/products";

export const metadata = {
  title: "Contact | The Ankara Closet",
  description: "Get in touch with The Ankara Closet on WhatsApp, Instagram or TikTok.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-black py-16 md:py-20 px-6 md:px-10 text-center">
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-4">
          GET IN TOUCH
        </p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold text-white uppercase tracking-tight leading-none">
          WE&apos;D LOVE TO<br />HEAR FROM YOU
        </h1>
      </section>

      {/* Contact cards */}
      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WhatsApp */}
            <a
              href={getWhatsAppGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center bg-[#25D366] p-10 text-white hover:opacity-95 transition-opacity"
            >
              <div className="w-14 h-14 bg-white/20 flex items-center justify-center mb-4">
                <WhatsAppIcon size={28} />
              </div>
              <p className="font-display text-2xl font-bold tracking-tight uppercase mb-1">WhatsApp</p>
              <p className="text-white/75 text-sm mb-5 max-w-xs">
                The fastest way to reach us — order, ask questions, or request the wholesale catalogue.
              </p>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase bg-white/20 px-5 py-2">
                CHAT NOW →
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/theanakaracloset"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-10 text-white hover:opacity-95 transition-opacity"
              style={{ background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F56040)" }}
            >
              <div className="w-14 h-14 bg-white/20 flex items-center justify-center mb-4">
                <InstagramIcon size={28} />
              </div>
              <p className="font-display text-2xl font-bold tracking-tight uppercase mb-1">Instagram</p>
              <p className="text-white/75 text-sm mb-5 max-w-xs">
                Follow us for new arrivals, styling inspiration, and behind-the-scenes looks.
              </p>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase bg-white/20 px-5 py-2">
                @THEANAKARACLOSET →
              </span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@theankaracloset"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center bg-black p-10 text-white hover:opacity-90 transition-opacity"
            >
              <div className="w-14 h-14 bg-white/10 flex items-center justify-center mb-4">
                <TikTokIcon size={28} />
              </div>
              <p className="font-display text-2xl font-bold tracking-tight uppercase mb-1">TikTok</p>
              <p className="text-white/75 text-sm mb-5 max-w-xs">
                Watch our pieces in motion — outfit reveals, styling videos, and customer clips.
              </p>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase bg-white/10 px-5 py-2">
                @THEANKARACLOSET →
              </span>
            </a>

            {/* Hours */}
            <div className="flex flex-col items-center text-center p-10 border border-gray-100">
              <div className="w-14 h-14 border border-gray-200 flex items-center justify-center mb-4">
                <ClockIcon />
              </div>
              <p className="font-display text-2xl font-bold tracking-tight uppercase text-black mb-1">Hours</p>
              <div className="text-gray-400 text-sm flex flex-col gap-2 mt-2 w-full max-w-xs">
                {[
                  { day: "Monday – Friday", time: "8am – 6pm" },
                  { day: "Saturday (Delivery)", time: "7am – 7pm" },
                  { day: "Sunday", time: "Closed" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between gap-4">
                    <span>{row.day}</span>
                    <span className="text-black font-semibold">{row.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 text-xs mt-5">Online only · Ships nationwide & worldwide</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-14">
            <h2 className="font-display text-3xl font-bold text-black tracking-tight uppercase text-center mb-8">
              Common questions
            </h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  q: "How do I place an order?",
                  a: "All orders are placed directly via WhatsApp. Click the 'Order Now' button on any product page and a pre-filled message will be ready. Just send it and we'll take it from there.",
                },
                {
                  q: "How long does delivery take?",
                  a: "We deliver on Saturdays from 7am–7pm. Order by Thursday to receive your item that Saturday. For express needs, WhatsApp us and we'll advise on options.",
                },
                {
                  q: "Do you ship internationally?",
                  a: "Yes! We ship to the Nigerian diaspora worldwide — UK, USA, Canada, and more. WhatsApp us for international shipping quotes.",
                },
                {
                  q: "What sizes do you carry?",
                  a: "Most pieces are available in S, M, L, and XL. Our Kimono & Pant Sets are free size (S–XL). The Asoke Dress also comes in XXL. Check each product page for specifics.",
                },
                {
                  q: "Can I become a reseller?",
                  a: "Absolutely! We work with boutique owners, Instagram vendors, and fashion entrepreneurs. Visit our Wholesale page or message us on WhatsApp to get started.",
                },
              ].map((item) => (
                <div key={item.q} className="border border-gray-100 p-5">
                  <p className="font-semibold text-black text-sm mb-2">{item.q}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}
