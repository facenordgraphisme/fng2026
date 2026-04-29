import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";

const nunito = Nunito({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600", "700"],
  variable: '--font-nunito'
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: {
    template: "%s | Face Nord Graphisme",
    default: "Face Nord Graphisme | Création de site internet Hautes-Alpes"
  },
  description: "Création de site internet sur-mesure, E-commerce, UX-UI design et référencement SEO dans les Hautes-Alpes (Embrun, Gap, Guillestre, Briançon).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`scroll-smooth ${nunito.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.facenordgraphisme.fr/#organization",
                  "name": "Face Nord Graphisme",
                  "url": "https://www.facenordgraphisme.fr",
                  "logo": "https://www.facenordgraphisme.fr/assets/logo.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "contact@facenordgraphisme.fr",
                    "contactType": "customer service"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.facenordgraphisme.fr/#website",
                  "url": "https://www.facenordgraphisme.fr",
                  "name": "Face Nord Graphisme",
                  "publisher": {
                    "@id": "https://www.facenordgraphisme.fr/#organization"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`antialiased min-h-screen flex flex-col md:flex-row transition-colors duration-300 font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <CustomCursor />
            <CookieBanner />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
