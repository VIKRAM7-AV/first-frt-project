import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bkfarms.in";

export default function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["WholesaleStore", "LocalBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "BK AND CO",
    alternateName: [
      "BK AND CO",
      "BK AND CO Salem",
      "BK Farms Wholesale Produce",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "BK AND CO is Salem's trusted wholesale supplier of farm-fresh Onion, Potato, Garlic, Eggs & Seasonal Fruits. Bulk orders, competitive mandi prices, and on-time delivery across Tamil Nadu.",
    telephone: "+91 84899 34449",
    email: "bkfarmssalem@gmail.com",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Net Banking, Credit Card, NEFT/RTGS",
    hasMap:
      "https://maps.google.com/?q=No.28,+Chairman+Rajarathnam+Street,+Opp.+Kamala+Hospital,+Salem+-+636001",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No.28, Chairman Rajarathnam Street, Opp. Kamala Hospital",
      addressLocality: "Salem",
      addressRegion: "Tamil Nadu",
      postalCode: "636001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.6643,
      longitude: 78.146,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "04:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "04:00",
        closes: "12:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Salem" },
      { "@type": "City", name: "Namakkal" },
      { "@type": "City", name: "Erode" },
      { "@type": "City", name: "Dharmapuri" },
      { "@type": "City", name: "Coimbatore" },
      { "@type": "AdministrativeArea", name: "Tamil Nadu" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 84899 34449",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91 93635 26993",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wholesale Farm Produce Catalog",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Wholesale Red Onions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Grade-A Red Onions (Bulk Supply)",
                description:
                  "Farm-fresh high quality red onions directly sourced from farms for bulk wholesale supply.",
                category: "Vegetables > Onions",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Wholesale Potatoes",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Fresh Harvest Potatoes (Bulk Supply)",
                description:
                  "Top quality sorted farm potatoes for hotels, caterers, and wholesale distributors.",
                category: "Vegetables > Potatoes",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Wholesale Table Eggs",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Farm Fresh Table Eggs (Bulk Tray)",
                description:
                  "Graded white and brown table eggs sourced from certified poultry farms with daily bulk delivery.",
                category: "Poultry > Eggs",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Wholesale Garlic",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Premium Cured White Garlic (Bulk)",
                description:
                  "Dry cured aromatic garlic bulbs for commercial kitchens, spice manufacturers, and retail sellers.",
                category: "Spices & Herbs > Garlic",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Seasonal Wholesale Fruits",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Fresh Seasonal Fruits (Bulk Crates)",
                description:
                  "Orchard-fresh seasonal fruits in wholesale crates for retail stores, supermarkets, and events.",
                category: "Fruits",
              },
            },
          ],
        },
      ],
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "BK AND CO",
    description:
      "BK AND CO — Fresh Wholesale Produce Supplier in Salem, Tamil Nadu",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "BK AND CO",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [
      "https://maps.google.com/?q=No.28,+Chairman+Rajarathnam+Street,+Opp.+Kamala+Hospital,+Salem+-+636001",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 84899 34449",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91 93635 26993",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}
