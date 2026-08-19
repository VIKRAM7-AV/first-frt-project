"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 1. Subtitle Badge ("WE SUPPLY")
      tl.fromTo(
        ".prod-badge-anim",
        {
          y: 20,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
        }
      )
        // 2. Headline masked reveal with cinematic blur
        .fromTo(
          ".prod-title-anim",
          {
            y: "110%",
            opacity: 0,
            rotate: 1.5,
            filter: "blur(8px)",
          },
          {
            y: "0%",
            opacity: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power4.out",
          },
          "-=0.45"
        )
        // 3. Divider Lines expanding smoothly
        .fromTo(
          ".prod-divider-line-left",
          {
            scaleX: 0,
            transformOrigin: "right center",
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.4"
        )
        // 4. Center Leaf Icon pop with playful bounce
        .fromTo(
          ".prod-divider-leaf",
          {
            scale: 0,
            rotate: -45,
            opacity: 0,
            filter: "blur(4px)",
          },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "back.out(1.8)",
          },
          "-=0.5"
        )
        .fromTo(
          ".prod-divider-line-right",
          {
            scaleX: 0,
            transformOrigin: "left center",
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.55"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full bg-[#FBF9F5] pt-14 pb-20 sm:pt-16 sm:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          {/* Subtitle Badge */}
          <div className="prod-badge-anim inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-[#16a34a] uppercase mb-2 will-change-transform">
            <span>WE SUPPLY</span>
          </div>

          {/* Main Title (Masked Wrapper for smooth reveal) */}
          <div className="overflow-hidden py-1">
            <h2 className="prod-title-anim text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight will-change-transform">
              Premium Products in Bulk
            </h2>
          </div>

          {/* Decorative Divider */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3">
            {/* Left Line */}
            <span className="prod-divider-line-left h-[2px] w-12 sm:w-16 bg-[#16a34a]/80 rounded-full will-change-transform" />

            {/* Center Leaf Icon */}
            <span className="prod-divider-leaf text-[#16a34a] flex items-center justify-center will-change-transform">
              <svg
                className="w-5 h-5 fill-none stroke-current"
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

            {/* Right Line */}
            <span className="prod-divider-line-right h-[2px] w-12 sm:w-16 bg-[#16a34a]/80 rounded-full will-change-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}



