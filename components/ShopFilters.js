"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ShopFilters({ categories, active }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const all = [{ name: "All" }, ...categories];

  const setCategory = (name) => {
    const params = new URLSearchParams(searchParams.toString());
    if (name === "All") {
      params.delete("category");
    } else {
      params.set("category", name);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const isActive =
          cat.name === active || (cat.name === "All" && active === "All");
        return (
          <button
            key={cat.name}
            onClick={() => setCategory(cat.name)}
            className={`px-4 py-2 text-[10px] font-bold tracking-[0.14em] uppercase transition-colors border ${
              isActive
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-200 hover:border-black"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
