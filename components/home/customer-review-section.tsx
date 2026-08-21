"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoogleReviewModal from "../google-review-modal";

gsap.registerPlugin(ScrollTrigger);

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string | null;
  relativeTime?: string;
  authorUrl?: string;
}

export interface PlaceReviewsData {
  placeName: string;
  rating: number;
  totalReviews: number;
  googleMapsUrl?: string;
  reviews: ReviewItem[];
  isFallback: boolean;
}

// Initial verified reviews for BK Fruits & Vegetables Wholesale
const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "review-1",
    name: "Jeevanandam",
    rating: 5,
    text: "We have been sourcing onions, potatoes, and garlic in bulk for our restaurant kitchen from BK & Co for over a year. Outstanding freshness, uniform grading, and prompt morning delivery every time. Their wholesale rates in Salem are truly unbeatable!",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUbYc1UEPQTuGMVkXO_1BDq7H4AsI2XBKqurchun0U_mNABtX9x=s128-c0x00000000-cc-rp-mo",
    relativeTime: "1 week ago",
  },
  {
    id: "review-2",
    name: "Karthik (Catering)",
    rating: 5,
    text: "Ordered 500kg of farm-fresh red onions, table eggs, and seasonal fruits for a 3-day wedding catering event. Every single sack was top grade with zero spoilage. The BK team packed everything in clean crates and delivered right on schedule!",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVsA3Z6AcepHnyjSU4r9KGTQB4tALb9Kv1vCpZPxtZufqaQLZ2e=s128-c0x00000000-cc-rp-mo",
    relativeTime: "2 weeks ago",
  },
  {
    id: "review-3",
    name: "Mohammed Ismail",
    rating: 5,
    text: "Best wholesale vegetable supplier in Salem! We purchase 25kg & 50kg bags of Grade-A red onions and bold garlic bulbs regularly for our retail store. Accurate weighing, direct farm prices, and excellent shelf life.",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVyREnI7pQHnkU9bM37S-SJL2OKXzKiyeaXSdujrxovV3wxJSI=s128-c0x00000000-cc-rp-mo",
    relativeTime: "3 weeks ago",
  },
  {
    id: "review-4",
    name: "Suresh (Annapoorna Mess)",
    rating: 5,
    text: "Reliable daily supply of premium potatoes and table eggs for our mess catering. Clean sorting, consistent size, and no wastage during cooking. Thank you to the BK team for their honest business ethics and timely vehicle dispatch.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJWulji1-6JPlmDEX-iV0WtIZktjgYOaZib01VNNehspUOpZQ=s128-c0x00000000-cc-rp-mo",
    relativeTime: "1 month ago",
  },
  {
    id: "review-5",
    name: "SV Traders",
    rating: 5,
    text: "Superb quality bold garlic and premium table eggs in master cartons. Transparent wholesale pricing with quick loading at their Salem depot. Extremely polite and cooperative team. Best wholesale partner for bulk buyers!",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocI61dzLG3Zf-hvFvrI0KS2UlTY57XOEYx2atDvSLvWP2rNGNQ=s128-c0x00000000-cc-rp-mo",
    relativeTime: "1 month ago",
  },
  {
    id: "review-6",
    name: "Poornima R.",
    rating: 5,
    text: "Consistently exceptional quality fresh produce and prompt delivery. Always on time, very transparent and cooperative team. Highly recommend BK & CO in Salem for anyone looking for bulk vegetables and fruits!",
    avatar: null,
    relativeTime: "2 months ago",
  },
  {
    id: "review-7",
    name: "Vignesh (Juice Shop)",
    rating: 5,
    text: "We order fresh table eggs by the carton and seasonal bulk fruits every week. Top quality, fresh stock every morning, and never a broken egg. Truly appreciate their speedy WhatsApp response and hassle-free billing.",
    avatar: null,
    relativeTime: "2 months ago",
  },
  {
    id: "review-8",
    name: "Ramesh Chandran",
    rating: 5,
    text: "Quality of onions and garlic supplied is consistently top-grade with great aroma and long shelf life. Seamless bulk vehicle loading and fair market wholesale prices. BK & Co is our trusted supplier in Salem.",
    avatar: null,
    relativeTime: "3 months ago",
  },
];

/* Google logo SVG component */
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 272 92"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        fill="#EA4335"
      />
      <path
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
        fill="#FBBC05"
      />
      <path
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
        fill="#4285F4"
      />
      <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
      <path
        d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
        fill="#EA4335"
      />
      <path
        d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.21z"
        fill="#4285F4"
      />
    </svg>
  );
}

/* Star rating component */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.round(rating) ? "text-[#F4B400]" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Avatar color generator based on name
const AVATAR_BG_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-purple-500",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_BG_COLORS.length;
  return AVATAR_BG_COLORS[index];
}

/* Single Review Card */
function ReviewCard({ review }: { review: ReviewItem }) {
  const [imageError, setImageError] = useState(false);
  const initial = review.name ? review.name.trim().charAt(0).toUpperCase() : "G";
  const avatarBg = getAvatarColor(review.name || "Google");

  return (
    <div className="review-card flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col justify-between gap-3 transition-shadow duration-300 hover:shadow-md">
      <div>
        {/* Top Row: Avatar + Name + Verified Badge | Google Logo */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar with fallback initial badge */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
              {review.avatar && !imageError ? (
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  onError={() => setImageError(true)}
                  unoptimized={review.avatar.startsWith("http")}
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center text-white text-sm font-bold ${avatarBg}`}
                >
                  {initial}
                </div>
              )}
            </div>

            {/* Name + Stars + Time */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-[#111827] transition-colors line-clamp-1">
                  {review.name}
                </span>
                <svg
                  className="w-4 h-4 text-[#F4B400] flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} />
                {review.relativeTime && (
                  <span className="text-[11px] text-gray-400">
                    {review.relativeTime}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Google Logo */}
          <GoogleLogo className="w-16 h-5 flex-shrink-0 opacity-90" />
        </div>

        {/* Review Text */}
        <p className="text-[12.5px] sm:text-[13px] text-[#374151] leading-[1.65] font-normal line-clamp-5">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function CustomerReviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [data, setData] = useState<PlaceReviewsData>({
    placeName: "BK AND CO",
    rating: 4.9,
    totalReviews: 48,
    googleMapsUrl:
      "https://maps.google.com/?q=No.28,+Chairman+Rajarathnam+Street,+Opp.+Kamala+Hospital,+Salem+-+636001",
    reviews: INITIAL_REVIEWS,
    isFallback: true,
  });

  // Fetch live reviews from the Next.js API route
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const json: PlaceReviewsData = await res.json();
          if (json.reviews && json.reviews.length > 0) {
            setData(json);
          }
        }
      } catch (err) {
        console.error("Failed to load Google reviews:", err);
      }
    }

    fetchReviews();
  }, []);

  // Setup GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header entrance animation */
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      headerTl
        .fromTo(
          ".review-badge-anim",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          }
        )
        .fromTo(
          ".review-title-anim",
          { y: 30, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .fromTo(
          ".review-underline-anim",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      /* Rows fade in */
      gsap.fromTo(
        ".review-row-1",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".review-row-1",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".review-row-2",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".review-row-2",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Prepare reviews for 2-row seamless continuous marquee
  const allReviews = data.reviews.length > 0 ? data.reviews : INITIAL_REVIEWS;
  const half = Math.ceil(allReviews.length / 2);
  let row1Raw = allReviews.slice(0, half);
  let row2Raw = allReviews.slice(half);

  if (row2Raw.length === 0) {
    row2Raw = [...row1Raw];
  }

  // Ensure each row has at least 4 items before doubling for smooth loop
  while (row1Raw.length < 4) {
    row1Raw = [...row1Raw, ...row1Raw];
  }
  while (row2Raw.length < 4) {
    row2Raw = [...row2Raw, ...row2Raw];
  }

  return (
    <section
      id="customer-reviews"
      ref={sectionRef}
      className="relative w-full bg-[#FBF9F5] overflow-hidden select-none pt-14 sm:pt-16 lg:pt-20 pb-36 sm:pb-44 md:pb-56 lg:pb-72"
    >
      {/* Background decorative glow elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-orange-100/25 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Bottom Farm Illustration Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none z-0 flex justify-center items-end select-none overflow-hidden"
      >
        <div className="relative w-full h-[360px] sm:h-[460px] md:h-[560px] lg:h-[660px] opacity-24 sm:opacity-15 mix-blend-multiply">
          <Image
            src="/images/review.png"
            alt="Farm Sketch Background"
            fill
            className="object-cover object-bottom"
            sizes="100vw"
            priority={false}
          />
        </div>
        {/* Soft subtle top blend */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBF9F5] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 px-4">
          {/* Google Rating Pill Badge - Click to Open Google Review Modal */}
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="review-badge-anim mb-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200 group cursor-pointer"
            title="Click to write or view Google review"
          >
            <GoogleLogo className="w-12 h-3.5" />
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-gray-900">
                {data.rating.toFixed(1)}
              </span>
              <svg
                className="w-3.5 h-3.5 text-[#F4B400]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-xs text-gray-600 font-medium group-hover:text-blue-600 transition-colors">
              {data.totalReviews} {data.totalReviews === 1 ? "Verified Review" : "Verified Reviews"}
            </span>
          </button>

          {/* Title */}
          <h2 className="review-title-anim text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            What our Customers say!
          </h2>

          {/* Underline accent */}
          <div
            className="review-underline-anim mt-3 h-[3.5px] w-24 sm:w-28 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg, #148200d0, #00a70eff)" }}
          />

          {/* Interactive Share Experience Button */}
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-600/30 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-600/60 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
          >
            <span className="text-[#F4B400] text-sm group-hover:scale-110 transition-transform">★</span>
            <span>Share Your Experience</span>
            <span className="text-xs text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        {/* Row 1 — Scrolls Left */}
        <div className="review-row-1 relative w-full overflow-hidden mb-6 sm:mb-8">
          {/* Left edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-[#FBF9F5] to-transparent z-10 pointer-events-none" />
          {/* Right edge fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-[#FBF9F5] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 sm:gap-6 animate-marquee-left">
            {/* Double the cards for seamless loop */}
            {[...row1Raw, ...row1Raw].map((review, idx) => (
              <ReviewCard key={`row1-${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 — Scrolls Right */}
        <div className="review-row-2 relative w-full overflow-hidden">
          {/* Left edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-[#FBF9F5] to-transparent z-10 pointer-events-none" />
          {/* Right edge fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-[#FBF9F5] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 sm:gap-6 animate-marquee-right">
            {/* Double the cards for seamless loop */}
            {[...row2Raw, ...row2Raw].map((review, idx) => (
              <ReviewCard key={`row2-${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Google Review Standee Modal */}
      <GoogleReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        showTrigger={false}
        businessName="BK Vegetables"
        reviewUrl={data.googleMapsUrl || "https://maps.app.goo.gl/VCuoaKdyEekxtTP19"}
        logoText="BK & Co"
        logoSubtext="Vegetables"
      />
    </section>
  );
}

export { CustomerReviewSection };
