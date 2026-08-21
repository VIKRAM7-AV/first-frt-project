"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
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

            {/* Wholesale Only Badge */}
            {/* <div className="flex items-center gap-1.5 pl-3 sm:pl-4 border-l border-emerald-700/60">
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
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Wholesale Only</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="w-full bg-white border-b border-stone-200/90 shadow-xs relative z-30">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-2 sm:py-2 flex items-center justify-between gap-4">
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
              className="h-10 sm:h-14 w-auto object-contain"
            />
          </Link>

          {/* Right Action Elements (Quote + Call Us) */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-shrink-0">
            {/* Get a Quote Button */}
            {/* <Link
              href="https://wa.me/918489934449?text=Hello%20BK%20%26%20CO%2C%20I%20would%20like%20to%20get%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#14532d] bg-white px-3.5 sm:px-4.5 py-2 text-xs sm:text-sm font-semibold text-[#14532d] shadow-xs transition-all duration-200 hover:bg-[#14532d] hover:text-white hover:shadow-sm"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.45 16.58 20.15 12.04 20.15ZM16.56 14.39C16.31 14.27 15.1 13.67 14.88 13.59C14.65 13.51 14.49 13.47 14.32 13.72C14.16 13.97 13.68 14.54 13.54 14.71C13.39 14.87 13.25 14.89 13 14.77C12.75 14.65 11.95 14.38 11 13.54C10.26 12.88 9.76 12.07 9.61 11.82C9.47 11.57 9.6 11.44 9.72 11.32C9.83 11.21 9.97 11.03 10.1 10.88C10.22 10.74 10.26 10.63 10.35 10.47C10.43 10.3 10.39 10.16 10.33 10.04C10.27 9.92 9.78 8.72 9.58 8.22C9.38 7.74 9.18 7.8 9.03 7.79C8.89 7.79 8.73 7.79 8.56 7.79C8.4 7.79 8.13 7.85 7.9 8.1C7.68 8.35 7.04 8.94 7.04 10.15C7.04 11.36 7.92 12.53 8.05 12.7C8.17 12.86 9.78 15.34 12.25 16.41C12.84 16.66 13.29 16.81 13.65 16.93C14.24 17.11 14.78 17.09 15.21 17.02C15.68 16.95 16.67 16.43 16.88 15.84C17.08 15.26 17.08 14.77 17.02 14.65C16.96 14.54 16.81 14.51 16.56 14.39Z" />
              </svg>
              <span>Get a Quote</span>
            </Link> */}

            {/* Call Us Contact */}
            <a
              href="tel:+918489934449"
              className="flex items-center gap-2 sm:gap-2.5 group/call transition-opacity hover:opacity-90"
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
