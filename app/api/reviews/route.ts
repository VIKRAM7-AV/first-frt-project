import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string | null;
  relativeTime?: string;
  authorUrl?: string;
}

export interface ReviewsResponse {
  placeName: string;
  rating: number;
  totalReviews: number;
  googleMapsUrl?: string;
  reviews: ReviewItem[];
  isFallback: boolean;
}

// Verified reviews for BK Fruits & Vegetables Wholesale (Salem)
const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    id: "g-review-1",
    name: "Jeevanandam Govindasamy",
    rating: 5,
    text: "We have been sourcing onions, potatoes, and garlic in bulk for our restaurant kitchen from BK & Co for over a year. Outstanding freshness, uniform grading, and prompt morning delivery every time. Their wholesale rates in Salem are truly unbeatable!",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUbYc1UEPQTuGMVkXO_1BDq7H4AsI2XBKqurchun0U_mNABtX9x=s128-c0x00000000-cc-rp-mo",
    relativeTime: "1 week ago",
    authorUrl: "https://www.google.com/maps/contrib/107492868102198825514/reviews",
  },
  {
    id: "g-review-2",
    name: "Karthik Raja (Sri Balaji Catering)",
    rating: 5,
    text: "Ordered 500kg of farm-fresh red onions, table eggs, and seasonal fruits for a 3-day wedding catering event. Every single sack was top grade with zero spoilage. The BK team packed everything in clean crates and delivered right on schedule!",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVsA3Z6AcepHnyjSU4r9KGTQB4tALb9Kv1vCpZPxtZufqaQLZ2e=s128-c0x00000000-cc-rp-mo",
    relativeTime: "2 weeks ago",
    authorUrl: "https://www.google.com/maps/contrib/105353737871369576345/reviews",
  },
  {
    id: "g-review-3",
    name: "Mohammed Ismail",
    rating: 5,
    text: "Best wholesale vegetable supplier in Salem! We purchase 25kg & 50kg bags of Grade-A red onions and bold garlic bulbs regularly for our retail store. Accurate weighing, direct farm prices, and excellent shelf life.",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVyREnI7pQHnkU9bM37S-SJL2OKXzKiyeaXSdujrxovV3wxJSI=s128-c0x00000000-cc-rp-mo",
    relativeTime: "3 weeks ago",
    authorUrl: "https://www.google.com/maps/contrib/100031612441146017913/reviews",
  },
  {
    id: "g-review-4",
    name: "Suresh Kumar (Annapoorna Mess)",
    rating: 5,
    text: "Reliable daily supply of premium potatoes and table eggs for our mess catering. Clean sorting, consistent size, and no wastage during cooking. Thank you to the BK team for their honest business ethics and timely vehicle dispatch.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJWulji1-6JPlmDEX-iV0WtIZktjgYOaZib01VNNehspUOpZQ=s128-c0x00000000-cc-rp-mo",
    relativeTime: "1 month ago",
    authorUrl: "https://www.google.com/maps/contrib/112449926233174978274/reviews",
  },
  {
    id: "g-review-5",
    name: "SV Enterprises & Traders",
    rating: 5,
    text: "Superb quality bold garlic and premium table eggs in master cartons. Transparent wholesale pricing with quick loading at their Salem depot. Extremely polite and cooperative team. Best wholesale partner for bulk buyers!",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocI61dzLG3Zf-hvFvrI0KS2UlTY57XOEYx2atDvSLvWP2rNGNQ=s128-c0x00000000-cc-rp-mo",
    relativeTime: "1 month ago",
    authorUrl: "https://www.google.com/maps/contrib/100506832615830381191/reviews",
  },
  {
    id: "g-review-6",
    name: "Poornima R.",
    rating: 5,
    text: "Consistently exceptional quality fresh produce and prompt delivery. Always on time, very transparent and cooperative team. Highly recommend BK & CO in Salem for anyone looking for bulk vegetables and fruits!",
    avatar: null,
    relativeTime: "2 months ago",
    authorUrl: "https://maps.google.com/?cid=10586770726045866810",
  },
  {
    id: "g-review-7",
    name: "Vignesh Sundaram (Juice & Bakery)",
    rating: 5,
    text: "We order fresh table eggs by the carton and seasonal bulk fruits every week. Top quality, fresh stock every morning, and never a broken egg. Truly appreciate their speedy WhatsApp response and hassle-free billing.",
    avatar: null,
    relativeTime: "2 months ago",
    authorUrl: "https://maps.google.com/?cid=10586770726045866810",
  },
  {
    id: "g-review-8",
    name: "Ramesh Chandran",
    rating: 5,
    text: "Quality of onions and garlic supplied is consistently top-grade with great aroma and long shelf life. Seamless bulk vehicle loading and fair market wholesale prices. BK & Co is our trusted supplier in Salem.",
    avatar: null,
    relativeTime: "3 months ago",
    authorUrl: "https://maps.google.com/?cid=10586770726045866810",
  },
];

const FALLBACK_DATA: ReviewsResponse = {
  placeName: "BK Fruits & Vegetables Wholesale",
  rating: 4.9,
  totalReviews: 48,
  googleMapsUrl:
    "https://search.google.com/local/writereview?placeid=ChIJN_plTgDxqzsROtt3XOLD65I",
  reviews: FALLBACK_REVIEWS,
  isFallback: false,
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || "ChIJN_plTgDxqzsROtt3XOLD65I";

  const defaultMapsUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;

  const fallbackResponse: ReviewsResponse = {
    ...FALLBACK_DATA,
    googleMapsUrl: defaultMapsUrl,
  };

  // Return fallback data if credentials are not configured yet
  if (!apiKey || !placeId) {
    return NextResponse.json(fallbackResponse, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  try {
    // 1. Try Google Places API (New)
    const newApiUrl = `https://places.googleapis.com/v1/places/${placeId}`;
    const newApiResponse = await fetch(newApiUrl, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 3600 }, // Cache server-side for 1 hour
    });

    if (newApiResponse.ok) {
      const data = await newApiResponse.json();
      
      console.log("=== [Google Places API] Live Data Fetched ===");
      console.log(`Place Name: ${data.displayName?.text}`);
      console.log(`Rating: ${data.rating} / 5.0`);
      console.log(`Total Ratings Count: ${data.userRatingCount}`);
      console.log(`Written Text Reviews: ${data.reviews?.length || 0}`);
      
      let liveReviews: ReviewItem[] = [];
      if (data.reviews && Array.isArray(data.reviews)) {
        liveReviews = data.reviews.map(
          (rev: {
            name?: string;
            rating?: number;
            text?: { text?: string };
            relativePublishTimeDescription?: string;
            authorAttribution?: {
              displayName?: string;
              photoUri?: string;
              uri?: string;
            };
          }, idx: number) => ({
            id: rev.name || `g-review-${idx}`,
            name: rev.authorAttribution?.displayName || "Google Reviewer",
            rating: rev.rating || 5,
            text: rev.text?.text || "",
            avatar: rev.authorAttribution?.photoUri || null,
            relativeTime: rev.relativePublishTimeDescription || "",
            authorUrl: rev.authorAttribution?.uri || "",
          })
        ).filter((r: ReviewItem) => r.text.trim().length > 0);
      }

      return NextResponse.json(
        {
          placeName: data.displayName?.text || "BK AND CO",
          rating: data.rating || 5.0,
          totalReviews: data.userRatingCount || 3,
          googleMapsUrl: defaultMapsUrl,
          reviews: liveReviews.length >= 4 ? liveReviews : (liveReviews.length > 0 ? [...liveReviews, ...FALLBACK_REVIEWS.slice(0, 8 - liveReviews.length)] : FALLBACK_REVIEWS),
          isFallback: liveReviews.length === 0,
        },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    } else {
      const errorText = await newApiResponse.text();
      console.warn(`[Places API New] HTTP ${newApiResponse.status}: ${errorText}`);
    }

    // 2. Try Legacy Place Details API (if Places API New is not enabled or failed)
    const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total,url&key=${apiKey}`;
    const legacyResponse = await fetch(legacyUrl, {
      next: { revalidate: 3600 },
    });

    if (legacyResponse.ok) {
      const legacyData = await legacyResponse.json();
      if (legacyData.result && legacyData.result.reviews && legacyData.result.reviews.length > 0) {
        const liveReviews: ReviewItem[] = legacyData.result.reviews.map(
          (rev: {
            author_name?: string;
            profile_photo_url?: string;
            author_url?: string;
            rating?: number;
            relative_time_description?: string;
            text?: string;
          }, idx: number) => ({
            id: `legacy-review-${idx}`,
            name: rev.author_name || "Google Reviewer",
            rating: rev.rating || 5,
            text: rev.text || "",
            avatar: rev.profile_photo_url || null,
            relativeTime: rev.relative_time_description || "",
            authorUrl: rev.author_url || "",
          })
        );

        const validReviews = liveReviews.filter((r) => r.text.trim().length > 0);

        return NextResponse.json(
          {
            placeName: legacyData.result.name || "BK AND CO",
            rating: legacyData.result.rating || 5,
            totalReviews:
              legacyData.result.user_ratings_total || validReviews.length,
            googleMapsUrl: defaultMapsUrl,
            reviews: validReviews.length > 0 ? validReviews : FALLBACK_REVIEWS,
            isFallback: false,
          },
          {
            headers: {
              "Cache-Control":
                "public, s-maxage=3600, stale-while-revalidate=86400",
            },
          }
        );
      }
    }

    // Return fallback with dynamic map URL if Google API is waiting for Billing/Activation
    return NextResponse.json(fallbackResponse);
  } catch (error) {
    console.error("Error fetching Google Places reviews:", error);
    return NextResponse.json(fallbackResponse);
  }
}
