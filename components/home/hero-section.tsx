"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function HeroSection() {
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.15,
      });

      // 1. Headline Masked & Blur Entrance (One by one lines)
      tl.fromTo(
        ".hero-title-line",
        {
          y: "120%",
          rotate: 1.5,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.14,
        }
      )
        // 2. Subtitle / Paragraph with smooth blur dissolve
        .fromTo(
          ".hero-anim-desc",
          {
            y: 35,
            opacity: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.75"
        )
        // 3. Action Buttons with energetic scale & elevation
        .fromTo(
          ".hero-anim-btn",
          {
            y: 30,
            opacity: 0,
            scale: 0.94,
            filter: "blur(4px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "back.out(1.3)",
            stagger: 0.12,
          },
          "-=0.6"
        )
        // 4. Feature Badges cascading in one by one
        .fromTo(
          ".hero-anim-badge",
          {
            y: 24,
            opacity: 0,
            scale: 0.94,
            filter: "blur(4px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.09,
          },
          "-=0.55"
        );
    }, leftColRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-[#FBF9F5] text-slate-900 py-10 sm:py-14 lg:py-16 overflow-hidden">
      {/* Background Subtle Ambiance & Animated Leaves */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Soft warm sunlit glow behind the produce on the right */}
        <div className="absolute -top-24 right-0 w-[650px] lg:w-[850px] h-[650px] bg-radial from-amber-100/40 via-orange-50/15 to-transparent blur-3xl opacity-80" />
        {/* Faint natural greenery glow on the left */}
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-radial from-emerald-100/30 to-transparent blur-3xl opacity-50" />

        {/* Floating / Swaying Leaf Texture Background */}
        <div className="hero-leaves">
          <Image
            src="/images/leafimag.png"
            alt="Natural leaf ambiance background"
            fill
            priority
            className="object-contain object-center select-none pointer-events-none leaf-shadow-filter"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Headline, Description, CTAs, Features */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-10"
          >
            {/* Headline with Masked Line Wrappers for Cinematic Reveal */}
            <h1 className="text-4xl sm:text-5xl md:text-[54px] lg:text-[50px] xl:text-[62px] font-semibold tracking-tight text-[#111827] leading-[1.12]">
              <span className="block overflow-hidden py-1">
                <span className="hero-title-line inline-block origin-bottom-left will-change-transform">
                  Fresh Quality.
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="hero-title-line inline-block origin-bottom-left text-[#166534] whitespace-nowrap will-change-transform">
                  Wholesale Prices.
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="hero-anim-desc mt-5 sm:mt-6 text-base sm:text-lg text-[#4b5563] font-normal leading-[1.65] max-w-[480px] will-change-transform">
              We supply premium quality Onion, Potato, Garlic, Eggs &amp; Fruits in
              bulk at the best wholesale prices.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
              {/* WhatsApp / Get a Quote Button */}
              <Link
                href="https://wa.me/918489934449?text=Hello%20BK%20%26%20CO%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20bulk%20produce"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-anim-btn inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#14532d] px-6 sm:px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0f4022] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 will-change-transform"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.45 16.58 20.15 12.04 20.15ZM16.56 14.39C16.31 14.27 15.1 13.67 14.88 13.59C14.65 13.51 14.49 13.47 14.32 13.72C14.16 13.97 13.68 14.54 13.54 14.71C13.39 14.87 13.25 14.89 13 14.77C12.75 14.65 11.95 14.38 11 13.54C10.26 12.88 9.76 12.07 9.61 11.82C9.47 11.57 9.6 11.44 9.72 11.32C9.83 11.21 9.97 11.03 10.1 10.88C10.22 10.74 10.26 10.63 10.35 10.47C10.43 10.3 10.39 10.16 10.33 10.04C10.27 9.92 9.78 8.72 9.58 8.22C9.38 7.74 9.18 7.8 9.03 7.79C8.89 7.79 8.73 7.79 8.56 7.79C8.4 7.79 8.13 7.85 7.9 8.1C7.68 8.35 7.04 8.94 7.04 10.15C7.04 11.36 7.92 12.53 8.05 12.7C8.17 12.86 9.78 15.34 12.25 16.41C12.84 16.66 13.29 16.81 13.65 16.93C14.24 17.11 14.78 17.09 15.21 17.02C15.68 16.95 16.67 16.43 16.88 15.84C17.08 15.26 17.08 14.77 17.02 14.65C16.96 14.54 16.81 14.51 16.56 14.39Z" />
                </svg>
                <span>Get a Quote</span>
              </Link>

              {/* View Products Button */}
              <button
                onClick={() => {
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="hero-anim-btn inline-flex items-center justify-center rounded-lg border border-[#14532d]/40 bg-white px-6 sm:px-7 py-3.5 text-base font-semibold text-[#1f2937] shadow-xs transition-all duration-200 hover:bg-[#14532d]/5 hover:border-[#14532d] hover:text-[#14532d] hover:-translate-y-0.5 active:translate-y-0 will-change-transform cursor-pointer"
              >
                <span>View Products</span>
              </button>
            </div>

            {/* Feature Badges Row */}
            <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 sm:gap-x-8 lg:gap-x-7 xl:gap-x-9 gap-y-4 sm:gap-y-3">
              {/* 1. Farm Produce */}
              <div className="hero-anim-badge flex items-center gap-2.5 will-change-transform">
                <div className="flex-shrink-0 text-[#14532d]">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Produce crate */}
                    <rect x="4" y="14" width="24" height="13" rx="1.5" />
                    <line x1="4" y1="20.5" x2="28" y2="20.5" />
                    <line x1="10" y1="14" x2="10" y2="27" />
                    <line x1="22" y1="14" x2="22" y2="27" />
                    {/* Produce content */}
                    <circle cx="10" cy="10.5" r="2.5" />
                    <circle cx="16" cy="9.5" r="3" />
                    <circle cx="22" cy="10.5" r="2.5" />
                    <path d="M16 4.5V6.5" />
                    <path d="M10 5.5L11.5 7.5" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#111827] text-[13.5px] sm:text-[14.5px] leading-tight">
                    Farm
                  </span>
                  <span className="text-[#4b5563] text-[11.5px] sm:text-[12px] font-medium leading-tight">
                    Produce
                  </span>
                </div>
              </div>

              {/* 2. Best Wholesale Prices */}
              <div className="hero-anim-badge flex items-center gap-2.5 will-change-transform">
                <div className="flex-shrink-0 text-[#14532d]">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Price tag */}
                    <path d="M25.5 15.5L16.5 6.5C15.8 5.8 14.8 5.5 13.8 5.5H7.5C6.4 5.5 5.5 6.4 5.5 7.5V13.8C5.5 14.8 5.8 15.8 6.5 16.5L15.5 25.5C16.9 26.9 19.1 26.9 20.5 25.5L25.5 20.5C26.9 19.1 26.9 16.9 25.5 15.5Z" />
                    <circle cx="10.5" cy="10.5" r="1.75" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#111827] text-[13.5px] sm:text-[14.5px] leading-tight">
                    Best
                  </span>
                  <span className="text-[#4b5563] text-[11.5px] sm:text-[12px] font-medium leading-tight whitespace-nowrap">
                    Wholesale Prices
                  </span>
                </div>
              </div>

              {/* 3. On-time Delivery */}
              <div className="hero-anim-badge flex items-center gap-2.5 will-change-transform">
                <div className="flex-shrink-0 text-[#14532d]">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Delivery van */}
                    <rect x="3.5" y="8.5" width="16" height="13.5" rx="1.5" />
                    <path d="M19.5 12H25L28.5 16.5V22H19.5" />
                    <circle cx="8.5" cy="23.5" r="2.5" />
                    <circle cx="23.5" cy="23.5" r="2.5" />
                    <path d="M6 13H11" />
                    <path d="M6 16H9" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#111827] text-[13.5px] sm:text-[14.5px] leading-tight">
                    On-time
                  </span>
                  <span className="text-[#4b5563] text-[11.5px] sm:text-[12px] font-medium leading-tight">
                    Delivery
                  </span>
                </div>
              </div>

              {/* 4. Quality Assured */}
              <div className="hero-anim-badge flex items-center gap-2.5 will-change-transform">
                <div className="flex-shrink-0 text-[#14532d]">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Quality rosette badge */}
                    <circle cx="16" cy="13" r="8" />
                    <path d="M12.5 13L15 15.5L19.5 10.5" />
                    <path d="M11 20L8 28L13 25.5L16 28L15 20.5" />
                    <path d="M21 20L24 28L19 25.5L16 28" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#111827] text-[13.5px] sm:text-[14.5px] leading-tight">
                    Quality
                  </span>
                  <span className="text-[#4b5563] text-[11.5px] sm:text-[12px] font-medium leading-tight">
                    Assured
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Produce */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[620px] lg:max-w-none flex flex-col items-center">
              <Image
                src="/vegetables.png"
                alt="Fresh farm produce - onions, garlic, potatoes, eggs, and fruits"
                width={1743}
                height={1536}
                priority
                className="relative z-10 w-full h-auto object-contain select-none"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              />

              {/* Realistic Ground / Floor Shadow */}
              {/* 1. Deep Contact Core Shadow (tight, dense directly under basket base) */}
              <div 
                aria-hidden="true"
                className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-[72%] sm:w-[70%] h-4 sm:h-6 rounded-[100%] bg-black/40 blur-[6px] sm:blur-[8px] z-0 pointer-events-none" 
              />
              {/* 2. Mid Diffuse Floor Shadow */}
              <div 
                aria-hidden="true"
                className="absolute -bottom-1 sm:bottom-0 md:bottom-1 left-1/2 -translate-x-1/2 w-[86%] sm:w-[84%] h-8 sm:h-12 rounded-[100%] bg-amber-950/25 blur-md sm:blur-lg z-0 pointer-events-none" 
              />
              {/* 3. Soft Ambient Floor Spread Shadow */}
              <div 
                aria-hidden="true"
                className="absolute -bottom-3 sm:-bottom-2 md:-bottom-1 left-1/2 -translate-x-1/2 w-[96%] sm:w-[94%] h-12 sm:h-16 rounded-[100%] bg-slate-900/15 blur-xl sm:blur-2xl z-0 pointer-events-none" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
