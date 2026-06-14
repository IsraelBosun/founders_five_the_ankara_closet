"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name, isNew }) {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const MIN_SWIPE = 40;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const dist = touchStart - touchEnd;
    if (dist > MIN_SWIPE && active < images.length - 1) setActive((a) => a + 1);
    else if (dist < -MIN_SWIPE && active > 0) setActive((a) => a - 1);
  };

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="md:hidden">
        {/* Swipeable main image */}
        <div
          className="relative w-full bg-[#D4A87A] select-none overflow-hidden"
          style={{ aspectRatio: "3/4" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            priority
            sizes="100vw"
            className="object-cover pointer-events-none"
          />


          {/* Tap-to-navigate arrows */}
          {active > 0 && (
            <button
              onClick={() => setActive((a) => a - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/25 flex items-center justify-center"
              aria-label="Previous image"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 2L3.5 6L7.5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {active < images.length - 1 && (
            <button
              onClick={() => setActive((a) => a + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/25 flex items-center justify-center"
              aria-label="Next image"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 2L8.5 6L4.5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all ${
                  active === i ? "w-5 h-1.5 bg-black" : "w-1.5 h-1.5 rounded-full bg-gray-300"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 px-4 overflow-x-auto scrollbar-hide">
            {images.slice(0, 5).map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-14 h-14 border-2 transition-all ${
                  active === i ? "border-black" : "border-transparent opacity-60"
                }`}
                style={{ backgroundColor: "#D4A87A" }}
              >
                <Image src={src} alt={`${name} ${i + 1}`} fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex gap-4">
        {/* Vertical thumbnails */}
        {images.length > 1 && (
          <div className="flex flex-col gap-2.5 w-[72px] flex-shrink-0">
            {images.slice(0, 5).map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative w-full border-2 transition-all ${
                  active === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ aspectRatio: "3/4", backgroundColor: "#D4A87A" }}
              >
                <Image src={src} alt={`${name} ${i + 1}`} fill sizes="72px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="relative flex-1 bg-[#D4A87A]" style={{ aspectRatio: "3/4" }}>
          <Image
            src={images[active]}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 50vw, 40vw"
            className="object-cover transition-opacity duration-300"
          />
        </div>
      </div>
    </>
  );
}
