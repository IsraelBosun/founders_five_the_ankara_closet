import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWhatsAppGeneralLink } from "@/lib/products";

export const metadata = {
  title: "About Us | The Ankara Closet",
  description: "Learn the story behind The Ankara Closet — ready-to-wear Ankara for every woman.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #C8935A 0%, #7A2E10 100%)" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/photos/photo_1.jpeg"
            alt="The Ankara Closet"
            fill
            className="object-cover opacity-20 mix-blend-multiply"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/60 mb-4">
            OUR STORY
          </p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold text-white uppercase leading-none tracking-tight">
            WE MAKE ANKARA SIMPLE,<br />AFFORDABLE & BEAUTIFUL.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/products/product_2_photo_1.jpeg"
                alt="The Ankara Closet collection"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-4">
                WHO WE ARE
              </p>
              <h2 className="font-display text-4xl font-bold text-black tracking-tight uppercase mb-6">
                Born from a love of African print
              </h2>
              <div className="flex flex-col gap-4 text-gray-500 text-sm leading-relaxed">
                <p>
                  The Ankara Closet was founded by Aishat Oyiza Anaha with one simple belief:
                  every Nigerian woman deserves to look stunning without the stress of a tailor,
                  the wait of a custom order, or the price tag of a luxury boutique.
                </p>
                <p>
                  We curate and create ready-to-wear Ankara outfits — gowns, kimono sets,
                  2-pieces, and Asoke pieces — that you can order today and wear tomorrow.
                  Our pieces celebrate bold African prints in silhouettes that flatter every
                  body and suit every occasion.
                </p>
                <p>
                  From Abuja and Jos to Lagos, Port Harcourt, and the Nigerian diaspora
                  in London, North America, and beyond — we&apos;re making Ankara accessible
                  to every woman who wants to own her culture with confidence.
                </p>
              </div>
              <a
                href={getWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gray-900 transition-colors"
              >
                SHOP THE COLLECTION
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-2">
              WHAT DRIVES US
            </p>
            <h2 className="font-display text-4xl font-bold text-black tracking-tight uppercase">
              Our values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Accessible Style",
                desc: "Great fashion shouldn't be out of reach. Our prices are designed so every woman — from students to executives — can afford to look exceptional.",
              },
              {
                title: "Authentic Print",
                desc: "We source vibrant, high-quality Ankara and Asoke fabrics that honour the richness of African textile tradition in every single piece.",
              },
              {
                title: "Ready When You Are",
                desc: "No waiting for a tailor. Our ready-to-wear model means you order today and wear it to your next occasion — fast, easy, stress-free.",
              },
            ].map((v) => (
              <div key={v.title} className="border border-gray-100 p-6">
                <h3 className="font-display text-lg font-bold text-black tracking-tight uppercase mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-4xl font-bold text-white tracking-tight uppercase mb-4">
            Ready to find your next look?
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
            Browse our collection of ready-to-wear Ankara styles and order directly on WhatsApp.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-white/90 transition-colors"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
