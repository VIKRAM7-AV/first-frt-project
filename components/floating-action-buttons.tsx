"use client";

import React, { useState } from "react";
import Image from "next/image";
import GoogleReviewModal from "./google-review-modal";

export default function FloatingActionButtons() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. LEFT SIDE: Floating Google Review Button (z-index 999)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-[999] pointer-events-auto select-none"
        style={{ zIndex: 999 }}
      >
        <button
          type="button"
          onClick={() => setIsReviewModalOpen(true)}
          aria-label="Open Google Reviews Modal"
          title="Google Reviews — BK & Co"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(66,133,244,0.25)] hover:border-blue-400/60 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Google Logo */}
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/goo.png"
              alt="Google"
              width={28}
              height={28}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT SIDE: Floating Call Button (z-index 999)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[999] pointer-events-auto select-none"
        style={{ zIndex: 999 }}
      >
        <a
          href="tel:+918489934449"
          aria-label="Call BK & Co Wholesale: +91 84899 34449"
          title="Call Us: +91 84899 34449"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-r from-[#14532d] via-[#15803d] to-[#16a34a] text-white shadow-[0_8px_24px_rgba(20,83,45,0.35)] hover:shadow-[0_12px_28px_rgba(20,83,45,0.5)] border border-emerald-400/30 hover:border-emerald-300/60 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
         
          {/* Call Icon */}
          <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0">
            <svg
              className="w-full h-full transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
        </a>
      </div>

      {/* Google Review Standee Modal for Left Button */}
      <GoogleReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        showTrigger={false}
        businessName="BK Vegetables"
        reviewUrl="https://search.google.com/local/writereview?placeid=ChIJN_plTgDxqzsROtt3XOLD65I"
        logoText="BK & Co"
        logoSubtext="Vegetables"
      />
    </>
  );
}
