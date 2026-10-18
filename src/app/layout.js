/**
 * Layout racine.
 * Server Component — aucune logique client.
 * Charge les polices, métadonnées globales, skip link,
 * en-tête et pied de page communs.
 */

import { Manrope, Inter } from "next/font/google";
import { site } from "@/data/site";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: site.metadata.defaultTitle,
    template: site.metadata.titleTemplate,
  },
  description: site.metadata.defaultDescription,
  metadataBase: site.url ? new URL(site.url) : undefined,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.metadata.defaultTitle,
    description: site.metadata.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.defaultTitle,
    description: site.metadata.defaultDescription,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a href="#contenu-principal" className="skipLink">
          Aller au contenu principal
        </a>
        <SiteHeader />
        <main id="contenu-principal" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}