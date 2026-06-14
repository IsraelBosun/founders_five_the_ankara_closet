"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isShop = pathname?.startsWith("/shop");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around h-16 px-2">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 min-w-[48px] ${isHome ? "text-black" : "text-gray-400"}`}
        >
          <HomeIcon />
          <span className="text-[9px] font-medium tracking-wider uppercase">Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 min-w-[48px] ${isShop && !isHome ? "text-black" : "text-gray-400"}`}
        >
          <GridIcon />
          <span className="text-[9px] font-medium tracking-wider uppercase">Shop</span>
        </Link>

        <Link href="/shop" className="flex flex-col items-center -mt-5">
          <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg border-4 border-white">
            <BagCenterIcon />
          </div>
        </Link>

        <button className="flex flex-col items-center gap-1 min-w-[48px] text-gray-400">
          <UserIcon />
          <span className="text-[9px] font-medium tracking-wider uppercase">Account</span>
        </button>
      </div>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function BagCenterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
