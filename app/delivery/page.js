import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Delivery Information | The Ankara Closet",
  description:
    "Delivery details for The Ankara Closet — timelines, areas covered, shipping costs and pay on delivery options.",
};

export default function DeliveryPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-black py-16 md:py-20 px-6 md:px-10 text-center">
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-4">
          SHIPPING & DELIVERY
        </p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold text-white uppercase tracking-tight leading-none">
          DELIVERY<br />INFORMATION
        </h1>
      </section>

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-6 md:px-10">

          {/* Quick summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              { icon: <TruckIcon />, title: "2–4 Days", desc: "Standard delivery within Nigeria" },
              { icon: <ShieldIcon />, title: "Pay on Delivery", desc: "Available for most locations in Nigeria" },
              { icon: <GlobeIcon />, title: "Worldwide", desc: "We ship to the diaspora — UK, US, Canada & more" },
            ].map((item) => (
              <div key={item.title} className="border border-gray-100 p-6 text-center">
                <div className="flex justify-center mb-3 text-black">{item.icon}</div>
                <p className="font-display text-xl font-bold text-black tracking-tight uppercase mb-1">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-0">
            {[
              {
                title: "When will my order arrive?",
                body: "We deliver within 2–4 business days for most locations in Nigeria. Delivery to Abuja and Jos typically takes 1–2 days. For remote areas, allow up to 5 days. International shipping varies by destination — WhatsApp us for an estimate.",
              },
              {
                title: "Delivery schedule",
                body: "Dispatch happens Monday to Friday. Orders placed before 12pm are processed the same day. Saturday dispatch is available for urgent orders — message us on WhatsApp to arrange.",
              },
              {
                title: "Delivery fees",
                body: "Delivery is free on all orders above ₦25,000. Below that, a flat fee of ₦2,000–₦3,500 applies depending on your location. International shipping costs are quoted individually — reach out on WhatsApp.",
              },
              {
                title: "Pay on delivery",
                body: "Pay on delivery is available for most areas in Nigeria including Lagos, Abuja, Port Harcourt, Kano, Enugu, and Jos. You only pay when your item arrives in perfect condition. International orders require upfront payment.",
              },
              {
                title: "Where do you deliver?",
                body: "We deliver to all 36 states in Nigeria via our courier partners. For international orders, we ship to the UK, USA, Canada, and other countries with significant Nigerian diaspora. Ask us on WhatsApp for your specific location.",
              },
              {
                title: "What if my order is delayed?",
                body: "If your order hasn't arrived within the expected timeframe, WhatsApp us immediately. We track all orders and will investigate and resolve any delays as quickly as possible.",
              },
              {
                title: "Returns & exchanges",
                body: "We want you to love your purchase. If there's an issue with your order — wrong size, damage, or quality concern — message us on WhatsApp within 48 hours of receiving your item. We'll sort it out promptly.",
              },
            ].map((item, i) => (
              <div key={item.title} className={`py-6 ${i < 6 ? "border-b border-gray-100" : ""}`}>
                <p className="font-display text-lg font-bold text-black tracking-tight uppercase mb-2">
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-black p-8 text-center">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-3">
              STILL HAVE QUESTIONS?
            </p>
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
              Chat with us on WhatsApp
            </h2>
            <a
              href="https://wa.me/2348133053455"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-3.5 hover:bg-[#1eb358] transition-colors"
            >
              <WhatsAppIcon />
              CHAT NOW
            </a>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/contact"
              className="text-[10px] font-bold tracking-[0.16em] uppercase text-black hover:opacity-50 transition-opacity underline underline-offset-2"
            >
              VIEW ALL CONTACT OPTIONS →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="18.5" r="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
