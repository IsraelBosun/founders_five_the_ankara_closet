import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import Reveal from "@/components/Reveal";
import { getProducts, getCategories } from "@/lib/db";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Shop All | The Ankara Closet",
  description:
    "Browse our full collection of ready-to-wear Ankara outfits — dresses, kimono sets, 2-pieces and Asoke styles.",
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = params?.category || "All";

  const [allProducts, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="bg-black py-10 px-5 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C4703A] mb-2">
            THE COLLECTION
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
            {activeCategory === "All" ? "All Styles" : activeCategory}
          </h1>
          <p className="text-white/40 mt-2 text-xs tracking-wide">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} available
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
          <ShopFilters categories={categories} active={activeCategory} />

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-8">
              {filtered.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 7) * 70}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="text-center py-24 text-gray-400">
                <p className="font-display text-2xl font-bold text-black mb-2 uppercase tracking-tight">
                  Nothing here yet
                </p>
                <p className="text-sm">Check back soon — new drops weekly!</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
