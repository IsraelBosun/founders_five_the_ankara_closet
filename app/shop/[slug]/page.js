import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ProductOrderPanel from "@/components/ProductOrderPanel";
import Reveal from "@/components/Reveal";
import { getProductBySlug, getRelatedProducts, formatPrice, getSiteContent } from "@/lib/db";

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | The Ankara Closet`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, content] = await Promise.all([
    getProductBySlug(slug),
    getSiteContent(),
  ]);
  if (!product) notFound();

  const related = await getRelatedProducts(slug, 4);
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const whatsappNumber = content.whatsapp_number || '2348133053455';

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase px-10 lg:px-16 pt-6 pb-0 max-w-7xl mx-auto">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hover:text-black transition-colors"
              >
                {product.category}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-black">{product.name.toUpperCase()}</span>
        </nav>

        {/* Product layout */}
        <div className="max-w-7xl mx-auto px-0 md:px-10 lg:px-16 py-0 md:py-8">
          <div className="md:grid md:grid-cols-2 md:gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery
              images={product.images}
              name={product.name}
              isNew={product.is_new}
            />

            {/* Product info */}
            <div className="px-4 md:px-0 pt-5 md:pt-0 flex flex-col gap-4">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                {product.category}
              </p>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-black tracking-tight leading-tight uppercase">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-black">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              <ProductOrderPanel product={product} whatsappNumber={whatsappNumber} />
            </div>
          </div>

          {/* Description + Details */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 px-4 md:px-0 mt-10 md:mt-14 pt-8 border-t border-gray-100">
              <div>
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-black mb-4">DESCRIPTION</p>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-black mb-4">DETAILS</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Material", value: product.material },
                    { label: "Fit", value: product.fit },
                    { label: "Care", value: product.care },
                    { label: "Length", value: product.length },
                  ].map((row) => row.value && (
                    <div key={row.label} className="flex items-start gap-4">
                      <span className="text-xs text-gray-400 w-20 flex-shrink-0">{row.label}</span>
                      <span className="text-xs font-semibold text-black">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* You may also like */}
          <Reveal>
            <div className="px-4 md:px-0 mt-12 pt-8 border-t border-gray-100 pb-12">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#C4703A] mb-1">YOU MAY ALSO LIKE</p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-black tracking-tight">More to love</h2>
                </div>
                <Link href="/shop" className="text-[10px] font-bold tracking-[0.16em] uppercase text-black hover:opacity-50 border-b border-black pb-0.5 transition-opacity hidden md:block">
                  SHOP ALL
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={i * 80}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
