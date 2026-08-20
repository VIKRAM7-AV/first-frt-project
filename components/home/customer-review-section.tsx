"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "review-1",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
  {
    id: "review-2",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
  {
    id: "review-3",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
  {
    id: "review-4",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
  {
    id: "review-5",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
  {
    id: "review-6",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
  {
    id: "review-7",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
  {
    id: "review-8",
    name: "Poornima",
    rating: 5,
    text: `" Excellent service! The entire income tax filing process was smooth, quick, and completely hassle-free. The team was professional, knowledgeable, and guided me through every step with patience. Highly recommended for anyone looking for reliable and stress-free IT return filing services.Thank You @Poornima "`,
    avatar: "/images/poornima.jpg",
  },
];

/* Google logo SVG as a component */
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
          className={`w-3.5 h-3.5 ${i < rating ? "text-[#F4B400]" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* Single Review Card */
function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="review-card flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-md">
      {/* Top Row: Avatar + Name + Verified Badge  |  Google Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src={review.avatar}
              alt={review.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          {/* Name + Stars */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[#111827]">
                {review.name}
              </span>
              {/* Verified badge */}
              <svg
                className="w-4 h-4 text-[#F4B400]"
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
            <StarRating rating={review.rating} />
          </div>
        </div>
        {/* Google Logo */}
        <GoogleLogo className="w-16 h-5 flex-shrink-0" />
      </div>

      {/* Review Text */}
      <p className="text-[12.5px] sm:text-[13px] text-[#374151] leading-[1.65] font-normal line-clamp-6">
        {review.text}
      </p>
    </div>
  );
}

export default function CustomerReviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          ".review-quote-icon",
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
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
          "-=0.3"
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

  // Split reviews into two rows
  const row1Reviews = REVIEWS.slice(0, 4);
  const row2Reviews = REVIEWS.slice(4, 8);

  return (
    <section
      id="customer-reviews"
      ref={sectionRef}
      className="relative w-full bg-[#FBF9F5] overflow-hidden select-none pt-14 sm:pt-16 lg:pt-20 pb-36 sm:pb-44 md:pb-56 lg:pb-72"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-orange-100/25 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Giant Background Quote Watermark (Top Left) */}
      {/* <div
        aria-hidden="true"
        className="absolute top-2 left-6 sm:left-12 lg:left-20 text-[140px] sm:text-[200px] lg:text-[260px] font-serif font-black text-[#111827]/[0.05] leading-none pointer-events-none select-none z-0"
      >
        “
      </div> */}

      {/* Bottom Farm Illustration Background Image - Prominent & Clearly Visible */}
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
          {/* Large Quote Icon */}
          {/* <div className="review-quote-icon mb-4">
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 text-gray-200"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
          </div> */}

          {/* Title */}
          <h2 className="review-title-anim text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            What our Customers say!
          </h2>

          {/* Underline accent */}
          <div
            className="review-underline-anim mt-3 h-[3.5px] w-24 sm:w-28 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg, #148200d0, #00a70eff)" }}
          />
        </div>

        {/* Row 1 — Scrolls Left */}
        <div className="review-row-1 relative w-full overflow-hidden mb-6 sm:mb-8">
          {/* Left edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-[#FBF9F5] to-transparent z-10 pointer-events-none" />
          {/* Right edge fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-[#FBF9F5] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 sm:gap-6 animate-marquee-left">
            {/* Double the cards for seamless loop */}
            {[...row1Reviews, ...row1Reviews].map((review, idx) => (
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
            {[...row2Reviews, ...row2Reviews].map((review, idx) => (
              <ReviewCard key={`row2-${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { CustomerReviewSection };
