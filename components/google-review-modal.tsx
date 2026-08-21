"use client";

import React, { useEffect, useState, useCallback, useId } from "react";
import Image from "next/image";

export interface GoogleReviewModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  businessName?: string;
  reviewUrl?: string;
  logoText?: string;
  logoSubtext?: string;
  customLogo?: React.ReactNode;
  triggerText?: string;
  showTrigger?: boolean;
  className?: string;
}

export interface GoogleReviewCardProps {
  businessName?: string;
  reviewUrl?: string;
  logoText?: string;
  logoSubtext?: string;
  customLogo?: React.ReactNode;
  onReviewClick?: () => void;
  onClose?: () => void;
  className?: string;
  showStandBase?: boolean;
}

/* =========================================================================
   1. HIGH-PRECISION SVG GRAPHICS & ASSETS (Matching Reference Image)
   ========================================================================= */

// Top-Left Fluid Blue Wave Blob
function TopLeftBlueBlob() {
  return (
    <svg
      className="absolute top-0 left-0 w-[42%] h-[24%] pointer-events-none z-0"
      viewBox="0 0 170 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0H118.5C118.5 0 98 22 75 36C52 50 38 68 22 92C10 106 0 110 0 110V0Z"
        fill="#1A73E8"
      />
    </svg>
  );
}

// Top-Right Fluid Red Wave Blob
function TopRightRedBlob() {
  return (
    <svg
      className="absolute top-0 right-0 w-[38%] h-[22%] pointer-events-none z-0"
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M160 0H42C42 0 62 20 84 34C106 48 122 66 138 88C148 98 160 100 160 100V0Z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Bottom-Left Fluid Green Wave Blob
function BottomLeftGreenBlob() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-[36%] h-[24%] pointer-events-none z-0"
      viewBox="0 0 150 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 110V0C0 0 16 16 32 38C48 60 70 82 108 96C130 104 150 110 150 110H0Z"
        fill="#00A859"
      />
    </svg>
  );
}

// Bottom-Right Fluid Yellow Wave Blob
function BottomRightYellowBlob() {
  return (
    <svg
      className="absolute bottom-0 right-0 w-[38%] h-[24%] pointer-events-none z-0"
      viewBox="0 0 160 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M160 110V0C160 0 144 18 128 40C112 62 90 84 52 98C30 106 0 110 0 110H160Z"
        fill="#FBBC04"
      />
    </svg>
  );
}

// Sparkle Star 4-Point
function SparkleStar({
  className,
  color = "#FBBC04",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill={color}
      />
    </svg>
  );
}

// Smiley Face Sticker Icon
function SmileyFace({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" fill="#FBBC04" />
      <circle cx="11.5" cy="12.5" r="2" fill="#78350F" />
      <circle cx="20.5" cy="12.5" r="2" fill="#78350F" />
      <path
        d="M10 18C11.5 22 20.5 22 22 18"
        stroke="#78350F"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Action Burst Ray Lines (Left & Right of "Share Your Experience")
function BurstRaysLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="22"
        y1="14"
        x2="6"
        y2="14"
        stroke="#1A73E8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="7"
        x2="9"
        y2="3"
        stroke="#1A73E8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="21"
        x2="9"
        y2="25"
        stroke="#1A73E8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BurstRaysRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="6"
        y1="14"
        x2="22"
        y2="14"
        stroke="#1A73E8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="7"
        x2="19"
        y2="3"
        stroke="#1A73E8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="21"
        x2="19"
        y2="25"
        stroke="#1A73E8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Official Google Logo Image (from /images/google.png)
function FullGoogleLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <Image
        src="/images/google.png"
        alt="Google"
        width={160}
        height={54}
        className="h-7 xs:h-8 sm:h-11 md:h-12 w-auto object-contain"
        priority
      />
    </div>
  );
}

// Center Illustration: Vegetable Market Storefront Image (/images/shop.png)
function StorefrontVegetableIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-34 md:h-34 flex items-center justify-center">
        <Image
          src="/images/shop.png"
          alt="BK Vegetables Storefront"
          width={150}
          height={150}
          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}

// "Thank you!" Badge Image (/images/thank.png)
function ThankYouSection({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <div className="relative w-36 xs:w-42 sm:w-48 md:w-52 h-12 md:h-16 flex items-center justify-center">
        <Image
          src="/images/thank.png"
          alt="Thank you!"
          width={220}
          height={55}
          className="w-auto h-full object-contain"
          priority
        />
      </div>
    </div>
  );
}

/* =========================================================================
   2. CORE EMBEDDABLE STAND-ALONE CARD (GoogleReviewCard)
   ========================================================================= */

export const DEFAULT_WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJN_plTgDxqzsROtt3XOLD65I";

export function getDirectReviewUrl(url?: string): string {
  if (!url) {
    return DEFAULT_WRITE_REVIEW_URL;
  }
  if (url.includes("writereview")) {
    return url;
  }
  const placeIdMatch =
    url.match(/place_id:([a-zA-Z0-9_-]+)/) ||
    url.match(/placeid=([a-zA-Z0-9_-]+)/);
  if (placeIdMatch && placeIdMatch[1]) {
    return `https://search.google.com/local/writereview?placeid=${placeIdMatch[1]}`;
  }
  if (
    url.includes("maps.app.goo.gl") ||
    url.includes("maps.google.com/?q=") ||
    url.includes("cid=")
  ) {
    return DEFAULT_WRITE_REVIEW_URL;
  }
  return url;
}

export function GoogleReviewCard({
  businessName = "BK Fruits & Vegetables",
  reviewUrl = DEFAULT_WRITE_REVIEW_URL,
  customLogo,
  onReviewClick,
  onClose,
  className = "",
  showStandBase = false,
}: GoogleReviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleAction = () => {
    if (onReviewClick) {
      onReviewClick();
    }
    const finalUrl = getDirectReviewUrl(reviewUrl);
    if (finalUrl) {
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* 1. The Main Plaque Card */}
      <div
        className="relative w-full max-w-[330px] xs:max-w-[360px] sm:max-w-[440px] md:max-w-[480px] bg-white rounded-[22px] xs:rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300"
        style={{
          aspectRatio: "1 / 1.34",
        }}
      >
        {/* Close Button if inside Modal */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-2.5 right-2.5 xs:top-3.5 xs:right-3.5 sm:top-4 sm:right-4 z-30 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 hover:bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all duration-200 cursor-pointer"
          >
            <svg
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Four Colorful Fluid Waves in the Corners */}
        <TopLeftBlueBlob />
        <TopRightRedBlob />
        <BottomLeftGreenBlob />
        <BottomRightYellowBlob />

        {/* Card Body Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between px-4 xs:px-6 sm:px-8 md:px-10 py-4.5 xs:py-5.5 sm:py-7 md:py-8">
          {/* Top Section: Playful Floating Stickers */}
          <div className="relative w-full flex justify-center items-center pointer-events-none">
            {/* Yellow 4-point sparkle (Upper-Left) */}
            <SparkleStar
              color="#FBBC04"
              className="absolute left-15 sm:left-12 top-2 w-5 h-5 sm:w-6 sm:h-6 animate-pulse"
            />

            {/* Green filled circle dot (Upper-Right) */}
            <div className="absolute right-17 sm:right-20 -top-0.5 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#00A859]" />

            {/* Blue 4-point sparkle (Upper-Right) */}
            <SparkleStar
              color="#1A73E8"
              className="absolute right-7 sm:right-10 top-30 sm:top-6 w-4 h-4 sm:w-5 sm:h-5"
            />

            {/* Yellow Smiley Face (Middle-Right) */}
            {/* <SmileyFace className="absolute right-3 sm:right-5 top-11 sm:top-14 w-5 h-5 sm:w-7 sm:h-7 rotate-6 shadow-xs" /> */}
          </div>

          {/* Middle Section 1: Google Logo & Title */}
          <div className="flex flex-col items-center text-center mt-1 sm:mt-2 w-full">
            {/* Google Logo Image / Custom Logo */}
            {customLogo ? (
              customLogo
            ) : (
              <FullGoogleLogo className="mb-1.5 sm:mb-2" />
            )}

            {/* "Share Your Experience" with Dynamic Burst Rays */}
            <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 w-full">
              <BurstRaysLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <h3 className="text-base xs:text-lg sm:text-[22px] md:text-[25px] font-semibold text-gray-900 tracking-tight whitespace-nowrap">
                Share Your Experience
              </h3>
              <BurstRaysRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            </div>

            {/* Subtitle with bolded business name */}
            <p className="text-[10.5px] xs:text-[11.5px] sm:text-[13px] text-gray-700 font-normal max-w-[270px] xs:max-w-[300px] sm:max-w-[380px] mt-1 sm:mt-1.5 leading-snug">
              We&apos;d love to hear about your experience with our business.
            </p>
          </div>

          {/* Middle Section 2: Storefront & Vegetable Basket Art */}
          <div>
            <StorefrontVegetableIllustration />
          </div>

          {/* Bottom Section 1: Primary Action Button & Footnote */}
          <div className="w-full flex flex-col items-center px-1">
            {/* "Continue with Google ->" Button */}
            <button
              type="button"
              onClick={handleAction}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              className={`w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 rounded-xl sm:rounded-2xl bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#0D47A1] text-white font-semibold text-xs xs:text-sm sm:text-base flex items-center justify-center gap-2 xs:gap-3 transition-all duration-200 cursor-pointer ${
                isPressed
                  ? "scale-98"
                  : isHovered
                    ? "scale-[1.02]"
                    : "scale-100"
              }`}
            >
              {/* Button Text + Animated Arrow */}
              <span className="tracking-tight text-[13px] xs:text-[14.5px] sm:text-[16px] font-semibold">
                Continue with Google
              </span>

              <span
                className={`text-base sm:text-lg font-bold transition-transform duration-200 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              >
                →
              </span>
            </button>

            {/* Subtext Footnote */}
            <p className="text-[10px] xs:text-[11px] sm:text-xs text-gray-500 font-normal text-center mt-2 sm:mt-2.5">
              Your review will be posted directly on Google.
            </p>
          </div>

          {/* Bottom Section 2: Thank You */}
          <div className="w-full pt-0.5 pb-0.5 flex justify-center">
            <ThankYouSection />
          </div>
        </div>
      </div>

      {/* Optional Standee Acrylic Base Plate (if enabled) */}
      {showStandBase && (
        <div className="w-[86%] sm:w-[88%] h-3 sm:h-3.5 bg-gradient-to-b from-white/90 via-gray-100/70 to-gray-300/80 rounded-b-xl border-x border-b border-gray-300/70 shadow-[0_12px_24px_rgba(0,0,0,0.15)] relative -mt-0.5 z-0 flex justify-center items-center">
          {/* Subtle glossy acrylic highlight streak */}
          <div className="w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
        </div>
      )}
    </div>
  );
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/* =========================================================================
   3. FULL INTERACTIVE MODAL DIALOG (GoogleReviewModal)
   ========================================================================= */

export default function GoogleReviewModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  businessName = "BK Fruits & Vegetables",
  reviewUrl = DEFAULT_WRITE_REVIEW_URL,
  customLogo,
  triggerText = "Leave a Google Review",
  showTrigger = true,
  className = "",
}: GoogleReviewModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isClient = useIsClient();
  const dialogId = useId();

  const isControlled = controlledIsOpen !== undefined;
  const isVisible = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpen = useCallback(() => {
    if (!isControlled) setInternalIsOpen(true);
  }, [isControlled]);

  const handleClose = useCallback(() => {
    if (controlledOnClose) {
      controlledOnClose();
    }
    if (!isControlled) {
      setInternalIsOpen(false);
    }
  }, [controlledOnClose, isControlled]);

  // Handle ESC key to dismiss modal and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };
    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isVisible, handleClose]);

  if (!isClient) return null;

  return (
    <>
      {/* Optional Trigger Button */}
      {showTrigger && (
        <button
          type="button"
          onClick={handleOpen}
          className={`inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white border border-gray-200/90 shadow-sm hover:shadow-md hover:border-blue-300 text-gray-800 font-semibold text-sm transition-all duration-200 cursor-pointer group ${className}`}
        >
          <span className="group-hover:text-[#1A73E8] transition-colors">
            {triggerText}
          </span>
          <span className="text-xs text-[#1A73E8] font-bold group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </button>
      )}

      {/* The Dialog Overlay & Modal */}
      {isVisible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${dialogId}-title`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop with Smooth Glass Blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container - Perfectly Centered Standee */}
          <div className="relative z-10 my-auto flex flex-col items-center max-w-[92vw] sm:max-w-[460px] md:max-w-[490px] w-full animate-scaleUp">
            {/* Review Card */}
            <GoogleReviewCard
              businessName={businessName}
              reviewUrl={reviewUrl}
              customLogo={customLogo}
              onClose={handleClose}
              onReviewClick={() => {
                // Keep modal open or trigger feedback
              }}
              showStandBase={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
