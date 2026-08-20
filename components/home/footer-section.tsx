"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#products" },
  { label: "Reviews", href: "#customer-reviews" },
];

const PRODUCTS = [
  { label: "Red Onions", href: "#" },
  { label: "Potatoes", href: "#" },
  { label: "Table Eggs", href: "#" },
  { label: "Garlic", href: "#" },
  { label: "Seasonal Fruits", href: "#" },
];

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Staggered entrance of footer columns */
      gsap.fromTo(
        ".footer-col",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      /* Bottom bar slide up */
      gsap.fromTo(
        ".footer-bottom-bar",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-bottom-bar",
            start: "top 98%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #222222 30%, #2a2a2a 55%, #1e1e1e 80%, #141414 100%)",
      }}
    >
      {/* Ambient glow overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-12">
          {/* Column 1: Brand & About */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-block mb-5">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
                BK AND CO
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              Your trusted wholesale partner for premium farm-fresh produce.
              Serving hotels, restaurants, supermarkets, and businesses across
              the region.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919363526993?text=Hello%20BK%20%26%20CO%2C%20I%20would%20like%20to%20get%20a%20bulk%20supply%20quote."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:-translate-y-0.5"
              >
                <svg
                  className="w-4.5 h-4.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C16.58 3.67 20.28 7.37 20.28 11.91C20.28 16.45 16.58 20.15 12.04 20.15ZM16.56 14.39C16.31 14.27 15.1 13.67 14.88 13.59C14.65 13.51 14.49 13.47 14.32 13.72C14.16 13.97 13.68 14.54 13.54 14.71C13.39 14.87 13.25 14.89 13 14.77C12.75 14.65 11.95 14.38 11 13.54C10.26 12.88 9.76 12.07 9.61 11.82C9.47 11.57 9.6 11.44 9.72 11.32C9.83 11.21 9.97 11.03 10.1 10.88C10.22 10.74 10.26 10.63 10.35 10.47C10.43 10.3 10.39 10.16 10.33 10.04C10.27 9.92 9.78 8.72 9.58 8.22C9.38 7.74 9.18 7.8 9.03 7.79C8.89 7.79 8.73 7.79 8.56 7.79C8.4 7.79 8.13 7.85 7.9 8.1C7.68 8.35 7.04 8.94 7.04 10.15C7.04 11.36 7.92 12.53 8.05 12.7C8.17 12.86 9.78 15.34 12.25 16.41C12.84 16.66 13.29 16.81 13.65 16.93C14.24 17.11 14.78 17.09 15.21 17.02C15.68 16.95 16.67 16.43 16.88 15.84C17.08 15.26 17.08 14.77 17.02 14.65C16.96 14.54 16.81 14.51 16.56 14.39Z" />
                </svg>
              </a>

              {/* Phone */}
              <a
                href="tel:+919363526993"
                aria-label="Call Us"
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white hover:text-[#1a1a1a] hover:border-white hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>

              {/* Google Maps / Location */}
              <a
                href="https://maps.google.com/?q=No.28,+Chairman+Rajarathnam+Street,+Opp.+Kamala+Hospital,+Salem+-+636001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find us on Google Maps"
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335] hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="text-[15px] font-bold text-white tracking-tight mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 font-normal transition-all duration-200 hover:text-white hover:pl-1 inline-flex items-center gap-2 group"
                  >
                    <svg
                      className="w-3 h-3 text-gray-600 transition-all duration-200 group-hover:text-gray-300 group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="footer-col">
            <h4 className="text-[15px] font-bold text-white tracking-tight mb-5">
              Our Products
            </h4>
            <ul className="flex flex-col gap-3">
              {PRODUCTS.map((product) => (
                <li key={product.label}>
                  <Link
                    href={product.href}
                    className="text-sm text-gray-500 font-normal transition-all duration-200 hover:text-white hover:pl-1 inline-flex items-center gap-2 group"
                  >
                    <svg
                      className="w-3 h-3 text-gray-600 transition-all duration-200 group-hover:text-gray-300 group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col">
            <h4 className="text-[15px] font-bold text-white tracking-tight mb-5">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1">
                    Address
                  </span>
                  <span className="text-sm text-gray-400 leading-relaxed">
                    No.28, Chairman Rajarathnam Street,
                    Opp. Kamala Hospital, Salem - 636001
                  </span>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-gray-400"
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
                  <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1">
                    Phone
                  </span>
                  <a
                    href="tel:+919363526993"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    +91 93635 26993
                  </a>
                  <a
                    href="tel:+918489934449"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    +91 84899 34449
                  </a>
                </div>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wider mb-1">
                    Working Hours
                  </span>
                  <span className="text-sm text-gray-400 leading-relaxed">
                    Mon - Sat: 4:00 AM - 5:00 PM
                    <br />
                    Sun: 4:00 AM - 12:00 PM
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 sm:mt-14 mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="footer-bottom-bar flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] sm:text-[13px] text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">BK AND CO</span>
            . All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Wholesale Fresh Produce</span>
            <span className="text-gray-600">•</span>
            <span>Salem, Tamil Nadu</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export { FooterSection };
