import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { site } from "@/content/site";
import { asset } from "@/lib/utils";
import "./globals.css";

// Titulares en serif editorial fina; textos y etiquetas en sans compacta.
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif-face" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans-face" });

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: site.seo.keywords,
  alternates: { canonical: "./" },
  icons: { icon: asset("/icon.svg"), apple: asset("/apple-touch-icon.png") },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    images: [{ url: site.seo.image, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a3550", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#contenido" className="fixed left-4 top-[-60px] z-[100] bg-laton px-4 py-2 text-white focus:top-4">Saltar al contenido</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site.jsonLd) }} />
      </body>
    </html>
  );
}
