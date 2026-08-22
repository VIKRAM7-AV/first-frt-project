import type { Metadata } from "next";
import MandiRatesView from "./mandi-rates-view";
import { getTamilNaduMandiRates } from "@/lib/mandi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bkfarms.in";

export const revalidate = 21600; // Cache / ISR revalidate every 6 hours

export const metadata: Metadata = {
  title: "Tamil Nadu Mandi Rates Today — Daily Wholesale Vegetable & Fruit Prices",
  description:
    "Check today's live Tamil Nadu State Mandi wholesale market prices for Big Onion, Small Onion (Shallots), Potato, Garlic, Table Eggs & Seasonal Fruits. Official Government of India Mandi feed updated daily by BK & Co.",
  keywords: [
    "Tamil Nadu mandi rates today",
    "தமிழ்நாடு தினசரி காய்கறி விலை",
    "Tamil Nadu vegetable wholesale price list",
    "Tamil Nadu state mandi daily rate",
    "onion rate today Tamil Nadu mandi",
    "small onion shallots price Tamil Nadu",
    "garlic wholesale price Tamil Nadu",
    "potato wholesale price Tamil Nadu",
    "egg tray wholesale price Tamil Nadu",
    "Tamil Nadu daily vegetable market rate",
    "BK and Co wholesale produce",
    "Tamil Nadu agricultural mandi rate card",
    "bulk fruit supplier Tamil Nadu mandi",
  ],
  alternates: {
    canonical: "/mandi-rates",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/mandi-rates`,
    siteName: "BK & Co",
    title: "Tamil Nadu Mandi Rates Today — Daily Wholesale Vegetable & Fruit Prices | BK & Co",
    description:
      "Check today's live Tamil Nadu State Mandi wholesale market prices for Onion, Shallots, Potato, Garlic, Eggs & Seasonal Fruits. Official daily market feed.",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tamil Nadu Mandi Rates Today — BK & Co Wholesale Produce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamil Nadu Mandi Rates Today — Daily Wholesale Vegetable & Fruit Prices | BK & Co",
    description:
      "Check today's live Tamil Nadu State Mandi wholesale prices for Onion, Shallots, Potato, Garlic, Eggs & Seasonal Fruits.",
    images: ["/og-image.png"],
  },
};

export default async function MandiRatesPage() {
  // Fetch live Tamil Nadu Mandi dataset dynamically from Government of India feeds
  const data = await getTamilNaduMandiRates();
  const products = data.products || [];
  const arrivalDate = data.arrivalDate || new Date().toLocaleDateString("en-GB");
  const isoDate = new Date().toISOString().split("T")[0];

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tamil Nadu Daily Mandi Rates",
        item: `${SITE_URL}/mandi-rates`,
      },
    ],
  };

  // Dataset Schema
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Daily Tamil Nadu Mandi Agricultural Produce Wholesale Market Prices",
    description:
      "Daily wholesale agricultural market prices, auction rates, modal rates, minimum and maximum ranges for vegetables, fruits, and poultry eggs across Tamil Nadu state.",
    url: `${SITE_URL}/mandi-rates`,
    temporalCoverage: `${isoDate}/${isoDate}`,
    spatialCoverage: {
      "@type": "AdministrativeArea",
      name: "Tamil Nadu",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 11.1271,
        longitude: 78.6569,
      },
    },
    creator: {
      "@type": "Organization",
      name: "BK & Co",
      url: SITE_URL,
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How are the daily Tamil Nadu Mandi rates calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our rates are sourced directly from the Government of India Agricultural Marketing Board (Data.gov.in / Agmarknet) and verified daily against live wholesale auctions across Tamil Nadu state agricultural markets. We present the Minimum, Maximum, and Modal (prevailing wholesale transaction) prices.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Modal Price and Minimum / Maximum Price in Tamil Nadu Mandis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Minimum and Maximum prices represent the day's auction range based on quality grades. The Modal Price is the most frequent wholesale trading rate at which the highest volume of produce was transacted across Tamil Nadu state mandis.",
        },
      },
      {
        "@type": "Question",
        name: "Can businesses place bulk wholesale orders directly through BK & Co across Tamil Nadu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. BK & Co specializes in bulk wholesale supply for supermarkets, hotels, restaurants, catering companies, hostel messes, and retail vendors with daily and scheduled consignments across Tamil Nadu.",
        },
      },
      {
        "@type": "Question",
        name: "Which locations in Tamil Nadu are covered for wholesale doorstep delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide daily bulk dispatch and delivery across Salem, Namakkal, Erode, Dharmapuri, Krishnagiri, Coimbatore, Tirupur, Dindigul, and surrounding districts of Tamil Nadu.",
        },
      },
      {
        "@type": "Question",
        name: "What time are Tamil Nadu market rates updated daily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tamil Nadu Mandi daily wholesale auction prices are synchronized every morning as soon as the daily arrivals and market records are finalized by the Agricultural Marketing authorities.",
        },
      },
    ],
  };

  // ItemList of Products Schema (Populated from Live Data)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tamil Nadu State Wholesale Mandi Produce Prices Today",
    description: `Daily wholesale agricultural mandi rates in Tamil Nadu as of ${arrivalDate} from BK & Co.`,
    numberOfItems: products.length,
    itemListElement: products.map((prod, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: prod.name,
        alternateName: prod.tamilName,
        category: "Agricultural Produce > Wholesale",
        image: prod.image ? `${SITE_URL}${prod.image}` : undefined,
        description: `Today wholesale mandi price for ${prod.name} (${prod.tamilName}) - ${prod.variety} in Tamil Nadu.`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: prod.minPriceKg,
          highPrice: prod.maxPriceKg,
          price: prod.modalPriceKg,
          priceValidUntil: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "WholesaleStore",
            name: "BK & Co",
            telephone: "+91 84899 34449",
            address: {
              "@type": "PostalAddress",
              streetAddress: "No.28, Chairman Rajarathnam Street, Opp. Kamala Hospital",
              addressLocality: "Salem",
              addressRegion: "Tamil Nadu",
              postalCode: "636001",
              addressCountry: "IN",
            },
          },
        },
      },
    })),
  };

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <MandiRatesView
        initialProducts={products}
        arrivalDate={arrivalDate}
        lastUpdated={data.lastUpdated}
      />
    </>
  );
}
