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
  metadataBase: new URL("https://www.facenordgraphisme.fr"),
  title: {
    template: "%s | Face Nord Graphisme",
    default: "Face Nord Graphisme | Création de site internet Hautes-Alpes"
  },
  description: "Création de site internet sur-mesure, E-commerce, UX-UI design et référencement SEO dans les Hautes-Alpes (Embrun, Gap, Guillestre, Briançon).",
  keywords: ["création site internet", "webdesign", "SEO", "Hautes-Alpes", "Embrun", "Gap", "Briançon", "E-commerce", "UX-UI Design"],
  authors: [{ name: "François-Xavier Pin" }],
  creator: "François-Xavier Pin",
  publisher: "Face Nord Graphisme",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Face Nord Graphisme | Création de site internet Hautes-Alpes",
    description: "Expert en création de site web et SEO basé à Embrun. Accompagnement local sur Gap, Briançon et Guillestre.",
    url: "https://www.facenordgraphisme.fr",
    siteName: "Face Nord Graphisme",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/assets/home_intro.png",
        width: 1200,
        height: 630,
        alt: "Face Nord Graphisme - Création de site internet dans les Hautes-Alpes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Face Nord Graphisme | Création de site internet Hautes-Alpes",
    description: "Expert en création de site web et SEO basé à Embrun. Accompagnement local sur Gap, Briançon et Guillestre.",
    images: ["/assets/home_intro.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`scroll-smooth ${nunito.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="FR-05" />
        <meta name="geo.placename" content="Puy Sanières" />
        <meta name="geo.position" content="44.5385;6.4328" />
        <meta name="ICBM" content="44.5385, 6.4328" />
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
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.facenordgraphisme.fr/assets/logo.png",
                    "width": "512",
                    "height": "512"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "contact@facenordgraphisme.fr",
                    "contactType": "customer service",
                    "areaServed": "FR",
                    "availableLanguage": "French"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/face-nord-graphisme"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.facenordgraphisme.fr/#website",
                  "url": "https://www.facenordgraphisme.fr",
                  "name": "Face Nord Graphisme",
                  "publisher": {
                    "@id": "https://www.facenordgraphisme.fr/#organization"
                  },
                  "inLanguage": "fr-FR"
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.facenordgraphisme.fr/#localbusiness",
                  "name": "Face Nord Graphisme",
                  "image": "https://www.facenordgraphisme.fr/assets/home_intro.png",
                  "url": "https://www.facenordgraphisme.fr",
                  "telephone": "+33600000000",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "45 impasse du Serre",
                    "addressLocality": "Puy Sanières",
                    "postalCode": "05200",
                    "addressRegion": "Hautes-Alpes",
                    "addressCountry": "FR"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 44.5385,
                    "longitude": 6.4328
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                  },
                  "priceRange": "€€"
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
