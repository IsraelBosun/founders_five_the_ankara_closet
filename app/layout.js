import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "The Ankara Closet — Ankara Season.",
  description:
    "Shop ready-to-wear Ankara outfits — dresses, kimono sets, 2-pieces & Asoke. Fast delivery across Nigeria & worldwide.",
  keywords: "Ankara, African print, ready-to-wear, fashion, Nigeria, Abuja, gown, kimono, Asoke",
  openGraph: {
    title: "The Ankara Closet",
    description: "Ready-to-wear. No tailor stress.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-black">
        {children}
      </body>
    </html>
  );
}
