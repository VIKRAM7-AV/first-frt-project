"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProductItem {
  id: string;
  name: string;
  watermark: string;
  image: string;
  description: string;
  accentBg: string;
  quoteMessage: string;
}

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "onions",
    name: "Farm-Fresh Red Onions",
    watermark: "ONIONS",
    image: "/images/Onion.png",
    description:
      "Sourced directly from trusted farms, our premium red onions feature firm texture and uniform size. Perfectly cured for minimal weight loss and long shelf life, making them ideal for restaurants, caterers, and retail resellers in 25kg and 50kg bulk bags.",
    accentBg: "from-red-500/10 via-amber-500/5 to-transparent",
    quoteMessage:
      "Hello Freshway Wholesale, I would like to get a wholesale quote for Farm-Fresh Red Onions in bulk.",
  },
  {
    id: "potatoes",
    name: "Premium Quality Potatoes",
    watermark: "POTATOES",
    image: "/images/potato.png",
    description:
      "High-grade, sorted potatoes suited for everyday cooking, commercial curries, and frying. Thoroughly inspected for minimal spoilage and damage, packed securely in bulk sacks to ensure maximum freshness during transit and storage.",
    accentBg: "from-amber-500/10 via-yellow-500/5 to-transparent",
    quoteMessage:
      "Hello Freshway Wholesale, I would like to get a wholesale quote for Premium Quality Potatoes in bulk.",
  },
  {
    id: "eggs",
    name: "Farm-Fresh Table Eggs",
    watermark: "EGGS",
    image: "/images/eggs.png",
    description:
      "Freshly collected, uniform white table eggs delivered daily from bio-secure farms. Carefully graded, sanitized, and packed in heavy-duty wholesale trays (30-egg trays / 210-egg master cartons) for supermarkets, bakeries, and cloud kitchens.",
    accentBg: "from-orange-500/10 via-amber-500/5 to-transparent",
    quoteMessage:
      "Hello Freshway Wholesale, I would like to get a wholesale quote for Farm-Fresh Table Eggs in bulk.",
  },
  {
    id: "garlic",
    name: "Bold Clove Garlic",
    watermark: "GARLIC",
    image: "/images/Garlic.png",
    description:
      "Superior-grade whole garlic bulbs featuring tightly packed, large cloves with high essential oil content and robust aroma. Sourced for commercial food processors, spice blenders, and bulk grocery suppliers with excellent dry-storage longevity.",
    accentBg: "from-yellow-600/10 via-amber-500/5 to-transparent",
    quoteMessage:
      "Hello Freshway Wholesale, I would like to get a wholesale quote for Bold Clove Garlic in bulk.",
  },
  {
    id: "fruits",
    name: "Fresh Seasonal & Commercial Fruits",
    watermark: "FRUITS",
    image: "/images/fruits.png",
    description:
      "A versatile wholesale range of daily and seasonal fruits, including bananas, apples, citrus, and melons. Hand-picked at peak maturity and packed in ventilated crates to serve juice bars, catering events, and fruit retail outlets.",
    accentBg: "from-emerald-500/10 via-lime-500/5 to-transparent",
    quoteMessage:
      "Hello Freshway Wholesale, I would like to get a wholesale quote for Fresh Seasonal & Commercial Fruits in bulk.",
  },
];

const FEATURES: FeatureItem[] = [
  {
    id: "bulk-supply",
    title: "Bulk Supply",
    subtitle: "Available in large quantities",
    icon: (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#14532d] flex-shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 7c-2 0-3 2-3 4-4 0-7 3-7 7 0 2 1 3.5 2 4.5h16c1-1 2-2.5 2-4.5 0-4-3-7-7-7 0-2-1-4-3-4z" />
        <path d="M24 7v4" />
        <rect x="7" y="22.5" width="34" height="8" rx="2" />
        <rect x="7" y="32.5" width="34" height="8.5" rx="2" />
        <line x1="20" y1="26.5" x2="28" y2="26.5" strokeWidth="2.4" />
        <line x1="20" y1="36.5" x2="28" y2="36.5" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    id: "best-prices",
    title: "Best Prices",
    subtitle: "Lowest wholesale prices",
    icon: (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#14532d] flex-shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="9"
          y="9"
          width="30"
          height="30"
          rx="6"
          transform="rotate(45 24 24)"
        />
        <circle cx="24" cy="9.5" r="2" fill="currentColor" />
        <path
          d="M20 19h8M20 23.5h6.5M20 19v9M25.5 19a2.5 2.5 0 0 1 0 5h-5.5M23 24l5 7"
          strokeWidth="2.2"
        />
      </svg>
    ),
  },
  {
    id: "quality-assured",
    title: "Quality Assured",
    subtitle: "Strict quality checks at every step",
    icon: (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#14532d] flex-shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 6.5L39 12v12c0 10.5-6.8 17.5-15 20-8.2-2.5-15-9.5-15-20V12l15-5.5z" />
        <path d="M17.5 24.5l4.5 4.5 9-9.5" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    id: "timely-delivery",
    title: "Timely Delivery",
    subtitle: "Fast and safe delivery",
    icon: (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#14532d] flex-shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="7" y="13" width="22" height="19" rx="2" />
        <path d="M29 19h7.5l4.5 5.5v7.5h-12V19z" />
        <path d="M30 20.5h5.5l3 3.5H30v-3.5z" />
        <circle cx="15" cy="34" r="3.5" />
        <circle cx="34" cy="34" r="3.5" />
        <path d="M18.5 34h12M7 32v2h4.5M37.5 34H41v-2" />
        <line x1="2" y1="18" x2="5" y2="18" strokeWidth="2" />
        <line x1="1" y1="23" x2="4.5" y2="23" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "trusted-by-many",
    title: "Trusted by Many",
    subtitle: "Serving hotels, stores and businesses",
    icon: (
      <svg
        className="w-10 h-10 sm:w-11 sm:h-11 text-[#14532d] flex-shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 18L10 8h28l2 10v2a4 4 0 0 1-8 0 4 4 0 0 1-8 0 4 4 0 0 1-8 0 4 4 0 0 1-8 0v-2z" />
        <path d="M10 20v18a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V20" />
        <path d="M20 40V28h8v12" />
      </svg>
    ),
  },
];

export default function ProductSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Set up GSAP animations & ScrollTrigger pinning
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, PRODUCTS.length);

    const ctx = gsap.context(() => {
      // 1. Header entrance animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      headerTl
        .fromTo(
          ".prod-badge-anim",
          { y: 20, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
          },
        )
        .fromTo(
          ".prod-title-anim",
          { y: "110%", opacity: 0, rotate: 1, filter: "blur(8px)" },
          {
            y: "0%",
            opacity: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power4.out",
          },
          "-=0.4",
        );

      // 2. Scroll-driven Pinned Slides Timeline
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      if (slides.length <= 1 || !pinContainerRef.current) return;

      // Set initial positions: slide 0 is centered, slides 1..n are offscreen right (+100%)
      slides.forEach((slide, idx) => {
        gsap.set(slide, {
          xPercent: idx === 0 ? 0 : 100,
          opacity: 1,
          scale: 1,
          pointerEvents: idx === 0 ? "auto" : "none",
        });
      });

      const totalSlides = slides.length;
      // Pinned timeline with smooth scrub
      const stTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          start: "center center",
          end: () => `+=${(totalSlides - 1) * window.innerHeight * 1.5}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.min(
              totalSlides - 1,
              Math.max(0, Math.round(progress * (totalSlides - 1))),
            );
            setActiveIndex(newIndex);
            slides.forEach((s, idx) => {
              s.style.pointerEvents = idx === newIndex ? "auto" : "none";
            });
          },
        },
      });

      scrollTriggerRef.current = stTl.scrollTrigger || null;

      // Build seamless synchronized transition for each slide
      for (let i = 0; i < totalSlides - 1; i++) {
        const currentSlide = slides[i];
        const nextSlide = slides[i + 1];

        const stepTl = gsap.timeline();

        stepTl.to(
          currentSlide,
          {
            xPercent: -100,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 1.5,
          },
          0,
        );

        stepTl.fromTo(
          nextSlide,
          {
            xPercent: 100,
            opacity: 1,
            scale: 1,
          },
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 1.5,
          },
          0,
        );

        stepTl.to({}, { duration: 0.6 });

        stTl.add(stepTl);
      }

      // 3. Bottom content animations (features strip + banner) — completely separate ScrollTriggers
      const bottomContainer = bottomContentRef.current;
      if (!bottomContainer) return;

      const featureItems = bottomContainer.querySelectorAll(
        ".feature-strip-item",
      );
      const featureStrip = bottomContainer.querySelector(
        ".feature-strip-container",
      );
      const bannerCard = bottomContainer.querySelector(".bulk-banner-card");
      const bannerImage = bottomContainer.querySelector(".bulk-banner-image");

      // Animate feature strip items
      if (featureItems.length && featureStrip) {
        gsap.fromTo(
          featureItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featureStrip,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Animate bulk banner card
      if (bannerCard) {
        gsap.fromTo(
          bannerCard,
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerCard,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Animate banner image
      if (bannerImage && bannerCard) {
        gsap.fromTo(
          bannerImage,
          { x: 35, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerCard,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full bg-[#FBF9F5] overflow-hidden select-none"
    >
      {/* Background Decorative Ambient Circles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-100/35 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-amber-100/35 rounded-full blur-3xl opacity-50" />
      </div>

      {/* FULL VIEWPORT WIDTH PINNED STAGE */}
      <div
        ref={pinContainerRef}
        className="relative z-10 w-full py-8 sm:py-10 lg:py-12 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Section Header (Centered in 1280px) */}
        <div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mb-4 sm:mb-6 lg:mb-8">
          {/* Subtitle Badge */}
          <div className="prod-badge-anim inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-[#16a34a] uppercase mb-1 will-change-transform">
            <span>WE SUPPLY</span>
          </div>

          {/* Main Title (Masked Reveal) */}
          <div className="overflow-hidden py-0.5">
            <h2 className="prod-title-anim text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight will-change-transform">
              Premium Products in Bulk
            </h2>
          </div>

          {/* Decorative Leaf Divider */}
          <div className="mt-2 sm:mt-2.5 flex items-center justify-center gap-3">
            <span className="h-[2px] w-12 sm:w-16 bg-[#16a34a]/80 rounded-full" />
            <span className="text-[#16a34a] flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </span>
            <span className="h-[2px] w-12 sm:w-16 bg-[#16a34a]/80 rounded-full" />
          </div>
        </div>

        {/* Slides Stack Container - Full Viewport Width */}
        <div className="relative w-full min-h-[440px] xs:min-h-[460px] sm:min-h-[500px] lg:min-h-[440px] overflow-hidden flex items-center justify-center">
          {PRODUCTS.map((product, index) => {
            return (
              <div
                key={product.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
              >
                <div className="relative w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 xl:gap-12 items-center">
                  {/* LEFT COLUMN: Product Image with Floor Shadow & Ambient Light */}
                  <div className="lg:col-span-6 relative flex items-center justify-center z-10">
                    <div className="relative w-full max-w-[240px] xs:max-w-[270px] sm:max-w-[340px] lg:max-w-[420px] flex flex-col items-center justify-center">
                      {/* Soft Ambient Produce Glow */}
                      <div
                        className={`absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] bg-radial ${product.accentBg} blur-3xl opacity-80 pointer-events-none`}
                      />

                      {/* High-Resolution Produce Image */}
                      <div className="relative z-10 w-full h-[150px] xs:h-[180px] sm:h-[220px] lg:h-[320px] flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={1000}
                          height={900}
                          priority={index === 0}
                          className="max-h-full w-auto object-contain select-none transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 420px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Product Information & Actions */}
                  <div className="lg:col-span-6 relative z-10 flex flex-col justify-center text-center lg:text-left items-center lg:items-start px-2 sm:px-4 lg:px-0 mt-4 sm:mt-7 lg:mt-0">
                    {/* Giant Watermark Behind Title */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-4 sm:-top-10 lg:-top-13 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 select-none pointer-events-none z-0 overflow-hidden w-full text-center lg:text-left"
                    >
                      <span className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[95px] font-black tracking-widest text-[#111827]/[0.055] uppercase whitespace-nowrap block leading-none">
                        {product.watermark}
                      </span>
                    </div>
                    {/* Product Heading */}
                    <h3 className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#111827] tracking-tight leading-[1.2]">
                      {product.name}
                    </h3>

                    {/* Detailed Description */}
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-[#4b5563] font-normal leading-[1.6] sm:leading-[1.65] max-w-lg lg:max-w-xl text-center lg:text-left">
                      {product.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-3.5 sm:mt-5 flex items-center justify-center lg:justify-start gap-3 sm:gap-3.5 w-full sm:w-auto">
                      {/* Call Direct */}
                      <a
                        href="tel:+918489934449"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#14532d]/40 bg-white/80 backdrop-blur-xs px-6 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-base font-semibold text-[#1f2937] shadow-xs transition-all duration-200 hover:border-[#14532d] hover:text-[#14532d] hover:bg-white hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg
                          className="w-4 h-4 text-[#14532d]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>Call To Order</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide Indicator Dots for intuitive navigation on mobile & tablet */}
        {/* <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-5 lg:mt-6 z-20">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 sm:w-8 bg-[#16a34a]"
                  : "w-1.5 sm:w-2 bg-gray-300"
              }`}
            />
          ))}
        </div> */}
      </div>

      {/* ================================================================= */}
      {/* BOTTOM CONTENT — Normal vertical scroll after pinned slides end   */}
      {/* ================================================================= */}
      <div ref={bottomContentRef} className="relative z-10 w-full">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8 py-6 sm:py-10 lg:py-14">
          {/* 5-Feature Trust & Value Proposition Strip */}
          <div className="feature-strip-container w-full bg-[#eef5ed] border border-[#dce8da] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-4 items-center">
              {FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="feature-strip-item flex items-center gap-3 sm:gap-3.5 group transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-[13.5px] sm:text-[15px] font-bold text-[#111827] tracking-tight leading-snug">
                      {feature.title}
                    </h4>
                    <p className="text-[11.5px] sm:text-[12.5px] text-[#4b5563] font-normal leading-tight mt-0.5">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "Need Bulk Supply?" Dark Green Banner Card */}
          <div
            className="bulk-banner-card relative w-full rounded-2xl sm:rounded-3xl border border-[#0d5929]/60 overflow-hidden shadow-none sm:shadow-xl sm:shadow-emerald-950/20"
            style={{
              background:
                "linear-gradient(135deg, #032e16 0%, #065a2b 30%, #0a7e3a 55%, #05601e 80%, #043317 100%)",
            }}
          >
            {/* Subtle Ambient Lighting Overlay */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between min-h-0 sm:min-h-[190px] lg:min-h-[210px]">
              {/* Left Content Column */}
              <div className="flex-1 flex flex-col items-start justify-center text-left px-4.5 xs:px-6 sm:px-8 md:px-10 py-4 xs:py-5 sm:py-8 lg:py-10 max-w-2xl lg:max-w-[50%] xl:max-w-[46%] z-10">
                {/* Heading */}
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.15]">
                  Need Bulk Supply?
                </h2>

                {/* Subheading */}
                <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm md:text-base text-emerald-100/90 font-normal leading-relaxed max-w-md">
                  Get the best wholesale prices for your business.
                </p>

                {/* WhatsApp CTA Button */}
                <div className="mt-3 xs:mt-4 sm:mt-6 flex items-center">
                  <Link
                    href="https://wa.me/918489934449?text=Hello%20BK%20%26%20CO%2C%20I%20would%20like%20to%20get%20a%20bulk%20supply%20quote%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 xs:px-4.5 xs:py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-base font-semibold text-[#0d4722] shadow-md shadow-black/15 transition-all duration-200 hover:bg-emerald-50 hover:shadow-lg hover:shadow-black/25 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {/* WhatsApp Brand Icon */}
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-[#25D366] flex-shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.45 16.58 20.15 12.04 20.15ZM16.56 14.39C16.31 14.27 15.1 13.67 14.88 13.59C14.65 13.51 14.49 13.47 14.32 13.72C14.16 13.97 13.68 14.54 13.54 14.71C13.39 14.87 13.25 14.89 13 14.77C12.75 14.65 11.95 14.38 11 13.54C10.26 12.88 9.76 12.07 9.61 11.82C9.47 11.57 9.6 11.44 9.72 11.32C9.83 11.21 9.97 11.03 10.1 10.88C10.22 10.74 10.26 10.63 10.35 10.47C10.43 10.3 10.39 10.16 10.33 10.04C10.27 9.92 9.78 8.72 9.58 8.22C9.38 7.74 9.18 7.8 9.03 7.79C8.89 7.79 8.73 7.79 8.56 7.79C8.4 7.79 8.13 7.85 7.9 8.1C7.68 8.35 7.04 8.94 7.04 10.15C7.04 11.36 7.92 12.53 8.05 12.7C8.17 12.86 9.78 15.34 12.25 16.41C12.84 16.66 13.29 16.81 13.65 16.93C14.24 17.11 14.78 17.09 15.21 17.02C15.68 16.95 16.67 16.43 16.88 15.84C17.08 15.26 17.08 14.77 17.02 14.65C16.96 14.54 16.81 14.51 16.56 14.39Z" />
                    </svg>
                    <span>Get a Quote Now</span>
                  </Link>
                </div>
              </div>

              {/* Right Banner Image Column */}
              <div className="bulk-banner-image lg:absolute lg:right-0 lg:bottom-0 lg:top-0 lg:w-[47%] xl:w-[50%] flex items-end justify-end pointer-events-none select-none">
                <div className="relative w-full h-[120px] xs:h-[140px] sm:h-[220px] lg:h-full -mt-2 sm:mt-0 flex items-end justify-end">
                  <Image
                    src="/images/banner.png"
                    alt="Fresh Baskets of Bulk Produce - Onions, Potatoes, Garlic, Eggs, and Fruits"
                    fill
                    className="object-contain object-bottom lg:object-right-bottom drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ProductSection };
