"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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

export default function ProductSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
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

      // Build seamless synchronized transition for each slide:
      // Current slide smoothly glides left all the way out of screen (0 -> -100%)
      // Next slide simultaneously glides in from the right edge into center (100% -> 0)
      for (let i = 0; i < totalSlides - 1; i++) {
        const currentSlide = slides[i];
        const nextSlide = slides[i + 1];

        const stepTl = gsap.timeline();

        // 1. Current slide smoothly moves left out of the viewport
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

        // 2. Next slide simultaneously moves in from right into center
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

        // Comfortable resting hold when slide is perfectly centered
        stepTl.to({}, { duration: 0.6 });

        stTl.add(stepTl);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full bg-[#FBF9F5] py-8 sm:py-10 lg:py-12 overflow-hidden select-none"
    >
      {/* Background Decorative Ambient Circles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-100/35 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-amber-100/35 rounded-full blur-3xl opacity-50" />
      </div>

      {/* FULL VIEWPORT WIDTH PINNED STAGE */}
      <div
        ref={pinContainerRef}
        className="relative z-10 w-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Section Header (Centered in 1280px) */}
        <div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mb-6 sm:mb-8">
          {/* Subtitle Badge */}
          <div className="prod-badge-anim inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-[#16a34a] uppercase mb-1.5 will-change-transform">
            <span>WE SUPPLY</span>
          </div>

          {/* Main Title (Masked Reveal) */}
          <div className="overflow-hidden py-0.5">
            <h2 className="prod-title-anim text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight will-change-transform">
              Premium Products in Bulk
            </h2>
          </div>

          {/* Decorative Leaf Divider */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-3">
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
        <div className="relative w-full min-h-[380px] sm:min-h-[410px] lg:min-h-[440px] overflow-hidden flex items-center justify-center">
          {PRODUCTS.map((product, index) => {
            return (
              <div
                key={product.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
              >
                <div className="relative w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">

                  {/* LEFT COLUMN: Product Image with Floor Shadow & Ambient Light */}
                  <div className="lg:col-span-6 relative flex items-center justify-center z-10">
                    <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-center justify-center">
                      {/* Soft Ambient Produce Glow */}
                      <div
                        className={`absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] bg-radial ${product.accentBg} blur-3xl opacity-80 pointer-events-none`}
                      />

                      {/* High-Resolution Produce Image */}
                      <div className="relative z-10 w-full h-[220px] sm:h-[270px] lg:h-[320px] flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={1000}
                          height={900}
                          priority={index === 0}
                          className="max-h-full w-auto object-contain select-none transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Product Information & Actions */}
                  <div className="lg:col-span-6 relative z-10 flex flex-col justify-center text-left">
                    {/* Giant Watermark Behind Title */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-13 left-0 select-none pointer-events-none z-0 overflow-hidden w-full"
                    >
                      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[95px] font-black tracking-widest text-[#111827]/[0.055] uppercase whitespace-nowrap block leading-none">
                        {product.watermark}
                      </span>
                    </div>
                    {/* Product Heading */}
                    <h3 className="relative z-10 text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#111827] tracking-tight leading-[1.2]">
                      {product.name}
                    </h3>

                    {/* Detailed Description */}
                    <p className="mt-3 text-sm sm:text-base text-[#4b5563] font-normal leading-[1.65] max-w-xl">
                      {product.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-3.5">
                      {/* Get Bulk Quote (WhatsApp Link) */}
                      {/* <Link
                        href={`https://wa.me/?text=${encodeURIComponent(
                          product.quoteMessage,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#14532d] px-4.5 sm:px-5 py-2.5 text-sm sm:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0f4022] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg
                          className="w-4.5 h-4.5 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.45 16.58 20.15 12.04 20.15ZM16.56 14.39C16.31 14.27 15.1 13.67 14.88 13.59C14.65 13.51 14.49 13.47 14.32 13.72C14.16 13.97 13.68 14.54 13.54 14.71C13.39 14.87 13.25 14.89 13 14.77C12.75 14.65 11.95 14.38 11 13.54C10.26 12.88 9.76 12.07 9.61 11.82C9.47 11.57 9.6 11.44 9.72 11.32C9.83 11.21 9.97 11.03 10.1 10.88C10.22 10.74 10.26 10.63 10.35 10.47C10.43 10.3 10.39 10.16 10.33 10.04C10.27 9.92 9.78 8.72 9.58 8.22C9.38 7.74 9.18 7.8 9.03 7.79C8.89 7.79 8.73 7.79 8.56 7.79C8.4 7.79 8.13 7.85 7.9 8.1C7.68 8.35 7.04 8.94 7.04 10.15C7.04 11.36 7.92 12.53 8.05 12.7C8.17 12.86 9.78 15.34 12.25 16.41C12.84 16.66 13.29 16.81 13.65 16.93C14.24 17.11 14.78 17.09 15.21 17.02C15.68 16.95 16.67 16.43 16.88 15.84C17.08 15.26 17.08 14.77 17.02 14.65C16.96 14.54 16.81 14.51 16.56 14.39Z" />
                        </svg>
                        <span>Get Bulk Quote</span>
                      </Link> */}

                      {/* Call Direct */}
                      <a
                        href="tel:+919363526993"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#14532d]/40 px-7 sm:px-10 py-2.5 text-sm sm:text-base font-semibold text-[#1f2937] shadow-xs transition-all duration-200 hover:border-[#14532d] hover:text-[#14532d] hover:-translate-y-0.5 active:translate-y-0"
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
      </div>
    </section>
  );
}

export { ProductSection };
