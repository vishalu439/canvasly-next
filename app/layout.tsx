import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/components/context/CartContext"; // ✅ Import CartProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ✅ Move viewport to a separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ✅ Metadata stays clean now
export const metadata: Metadata = {
  metadataBase: new URL("https://canvasly.in"),
  title: {
    default: "Canvasly | Custom Prints & Personalized Gifts",
    template: "%s | Canvasly",
  },
  description:
    "Create personalized t-shirts, tote bags, mugs, and more with Canvasly. High-quality prints, fast delivery, and endless creativity.",
  keywords: [
    "custom t-shirts",
    "personalized gifts",
    "canvas prints",
    "custom tote bags",
    "photo gifts",
    "custom photo frame",
    "Canvasly",
  ],
  authors: [{ name: "Canvasly Team" }],
  alternates: {
    canonical: "https://canvasly.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://canvasly.in",
    title: "Canvasly | Custom Prints & Personalized Gifts",
    description:
      "Design and order high-quality personalized products easily with Canvasly.",
    siteName: "Canvasly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Canvasly custom print products preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canvasly | Custom Prints & Personalized Gifts",
    description:
      "Make every gift special with Canvasly's custom printing options.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO Structured Data (Organization Schema with YouTube + Instagram) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Canvasly",
              url: "https://canvasly.in",
              logo: "https://canvasly.in/og-image.png",
              description:
                "Canvasly creates custom printed t-shirts, tote bags, and personalized gifts with love and creativity.",
              sameAs: [
                "https://www.instagram.com/canvasly.in",
                "https://www.youtube.com/@canvasly01",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7619538167",
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Entire App Wrapped in CartProvider */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
