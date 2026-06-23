import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Size Guide | The Ankara Closet",
  description:
    "Find your perfect fit with The Ankara Closet size guide. Measurements for dresses, two-pieces, Asoke and Kimonos.",
};

const sizes = [
  { size: "S", uk: "8–10", ng: "36–38", bust: "82–86", waist: "62–66", hips: "88–92" },
  { size: "M", uk: "12", ng: "40", bust: "88–92", waist: "68–72", hips: "94–98" },
  { size: "L", uk: "14", ng: "42", bust: "94–98", waist: "74–78", hips: "100–104" },
  { size: "XL", uk: "16", ng: "44", bust: "100–104", waist: "80–84", hips: "106–110" },
  { size: "XXL", uk: "18", ng: "46", bust: "106–110", waist: "86–90", hips: "112–116" },
];

export default function SizeGuidePage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-black py-16 md:py-20 px-6 md:px-10 text-center">
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-4">
          FIT GUIDE
        </p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold text-white uppercase tracking-tight leading-none">
          SIZE GUIDE
        </h1>
      </section>

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-6 md:px-10">

          {/* Intro */}
          <Reveal>
            <div className="mb-10">
              <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                Our pieces are designed to fit true to Nigerian sizing. If you are between sizes, we recommend sizing up. All measurements are in centimetres unless noted. Not sure? WhatsApp us — we'll help you pick the right fit.
              </p>
            </div>
          </Reveal>

          {/* Size table */}
          <Reveal delay={80}>
            <div className="mb-14">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-black mb-4">
                WOMEN&apos;S SIZING — CM
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {["Size", "UK", "NG", "Bust", "Waist", "Hips"].map((h) => (
                        <th key={h} className="text-left py-3 pr-4 text-[10px] font-bold tracking-[0.16em] uppercase text-gray-400 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((row) => (
                      <tr key={row.size} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-4 font-bold text-black">{row.size}</td>
                        <td className="py-3 pr-4 text-gray-500">{row.uk}</td>
                        <td className="py-3 pr-4 text-gray-500">{row.ng}</td>
                        <td className="py-3 pr-4 text-gray-500">{row.bust}</td>
                        <td className="py-3 pr-4 text-gray-500">{row.waist}</td>
                        <td className="py-3 pr-4 text-gray-500">{row.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* How to measure */}
          <Reveal>
            <div className="mb-14">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-black mb-6">
                HOW TO MEASURE
              </p>
              <div className="flex flex-col gap-5">
                {[
                  {
                    label: "Bust",
                    desc: "Measure around the fullest part of your chest, keeping the tape parallel to the floor. Do not pull tight.",
                  },
                  {
                    label: "Waist",
                    desc: "Measure around the narrowest part of your natural waist — typically about 2.5cm above your belly button.",
                  },
                  {
                    label: "Hips",
                    desc: "Measure around the fullest part of your hips and seat, approximately 20–25cm below your natural waist.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="font-display text-lg font-bold text-black w-16 flex-shrink-0 uppercase">{item.label}</span>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Product notes */}
          <Reveal delay={60}>
            <div className="mb-14">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-black mb-6">
                PRODUCT NOTES
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { cat: "Dresses", note: "Available in S, M, L, XL. Fitted styles — size up if between sizes." },
                  { cat: "Two-Piece Sets", note: "Available in S, M, L, XL. Co-ordinate sets fit slightly relaxed." },
                  { cat: "Asoke Dress", note: "Available in S, M, L, XL and XXL." },
                  { cat: "Kimono & Pant Sets", note: "Free size (S–XL). The kimono is one size fits most; trousers have elasticated waist." },
                ].map((item) => (
                  <div key={item.cat} className="border border-gray-100 p-4 flex gap-4">
                    <span className="font-bold text-xs text-black w-28 flex-shrink-0">{item.cat}</span>
                    <span className="text-gray-500 text-xs leading-relaxed">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="bg-black p-8 text-center">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-3">
                STILL NOT SURE?
              </p>
              <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-2">
                Ask us on WhatsApp
              </h2>
              <p className="text-white/50 text-sm mb-6">
                Send us your measurements and we&apos;ll recommend the perfect size for you.
              </p>
              <a
                href="https://wa.me/2348133053455"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white text-[11px] font-bold tracking-[0.18em] uppercase px-8 py-3.5 hover:bg-[#1eb358] transition-colors"
              >
                <WhatsAppIcon />
                GET SIZING HELP
              </a>
            </div>
          </Reveal>

          <div className="mt-6 text-center">
            <Link
              href="/shop"
              className="text-[10px] font-bold tracking-[0.16em] uppercase text-black hover:opacity-50 transition-opacity underline underline-offset-2"
            >
              ← BACK TO SHOP
            </Link>
          </div>
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
