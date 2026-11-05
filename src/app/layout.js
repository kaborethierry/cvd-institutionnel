/**
 * Layout racine.
 * Server Component — aucune logique client.
 * Utilise les polices système pour éviter les erreurs de build Vercel.
 */

import { site } from "@/data/site";
import SiteShell from "@/components/layout/SiteShell";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

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
    <html lang="fr">
      <body>
        <a href="#contenu-principal" className="skipLink">
          Aller au contenu principal
        </a>
        <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
          <main id="contenu-principal" tabIndex={-1}>
            {children}
          </main>
        </SiteShell>
      </body>
    </html>
  );
}