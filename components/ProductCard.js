import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group">
      {/* Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block overflow-hidden bg-[#D4A87A]"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {discount && (
          <span className="absolute top-2.5 left-2.5 bg-black text-white text-[9px] font-bold px-2 py-0.5">
            -{discount}%
          </span>
        )}


      </Link>

      {/* Info */}
      <div className="pt-2.5">
        <Link
          href={`/shop/${product.slug}`}
          className="block text-[12px] text-black hover:opacity-60 transition-opacity leading-snug line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-1">
          {discount ? (
            <>
              <span className="text-[12px] font-semibold text-red-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-[11px] text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </>
          ) : (
            <span className="text-[12px] font-medium text-black">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
