"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  onOpenMandiRates?: () => void;
}

export default function Navbar({ onOpenMandiRates }: NavbarProps) {
  return (
    <header className="w-full font-sans">
      {/* 1. Top Bar / Batch Bar (Announcement & Info Bar) */}
      <div className="hidden lg:block w-full bg-[#14532d] text-emerald-50 text-[12px] sm:text-[13px] py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/40">
        <div className="mx-auto max-w-[1280px] flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          {/* Left Location */}
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-emerald-300 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-normal tracking-wide">
              No.28, Chairman Rajarathnam Street, Opp. Kamala Hospital, Salem -
              636001
            </span>
          </div>

          {/* Right Info Items */}
          <div className="flex items-center gap-4 sm:gap-6 font-regular">

            {/* Operating Hours */}
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-emerald-300 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Mon - Sat: 4:00 AM - 5:00 PM | Sun: 4:00 AM - 12:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="w-full bg-white border-b border-stone-200/90 shadow-xs relative z-30">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group select-none flex-shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="BK AND CO"
              width={160}
              height={48}
              priority
              className="h-5 sm:h-7 w-auto object-contain"
            />
          </Link>

          {/* Right Action Elements (Daily Rates Modal Button + Call Us) */}
          <div className="flex items-center gap-2.5 sm:gap-7 lg:gap-10 flex-shrink-0">
            {/* Daily Tamil Nadu Rates Modal Trigger Button */}
            {onOpenMandiRates && (
              <button
                type="button"
                onClick={onOpenMandiRates}
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-600/30 text-[#14532d] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer text-xs sm:text-sm font-semibold"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                <span className="tracking-tight">
                  Today Market Rate
                </span>
              </button>
            )}

            {/* Call Us Contact */}
            <a
              href="tel:+918489934449"
              className="hidden sm:flex items-center gap-2 sm:gap-2.5 group/call transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-emerald-600/35 bg-emerald-50 flex items-center justify-center text-[#14532d] transition-colors group-hover/call:bg-[#14532d] group-hover/call:text-white">
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-none mb-0.5">
                  Call Us
                </span>
                <span className="text-[12.5px] sm:text-[13.5px] font-bold text-[#111827] leading-tight tracking-tight whitespace-nowrap">
                  +91 84899 34449
                </span>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { Navbar };
