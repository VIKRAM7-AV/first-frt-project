"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { TargetProduct } from "@/app/api/mandi-rates/route";

interface MandiRatesApiResponse {
  success: boolean;
  dataSource: string;
  region: string;
  arrivalDate: string;
  lastUpdated: string;
  totalProducts: number;
  products: TargetProduct[];
  cache?: {
    hit: boolean;
    cachedAt: string;
    expiresInSeconds?: number;
  };
}

interface DailyMandiRatesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function IndianRupeeIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="M6 13l8.5 8" />
      <path d="M6 13h3a4.5 4.5 0 0 0 0-9H6" />
    </svg>
  );
}

export default function DailyMandiRatesDrawer({
  isOpen,
  onClose,
}: DailyMandiRatesDrawerProps) {
  const [data, setData] = useState<MandiRatesApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Unit State
  const [unitMode, setUnitMode] = useState<"kg" | "qtl">("kg");

  // DOM Refs for GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  // Tab switch animation refs
  const tabPillRef = useRef<HTMLDivElement>(null);
  const kgBtnRef = useRef<HTMLButtonElement>(null);
  const qtlBtnRef = useRef<HTMLButtonElement>(null);

  // Fetch Mandi Rates from our Server-Side Cached Real API
  const fetchRates = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const url = `/api/mandi-rates${forceRefresh ? "?refresh=true" : ""}`;
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch rates (Status ${res.status})`);
      }

      const json: MandiRatesApiResponse = await res.json();
      if (json && json.success) {
        setData(json);
      } else {
        throw new Error("Invalid response format from Mandi rates server");
      }
    } catch (err: unknown) {
      console.error("Failed to load daily rates:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Could not retrieve daily market rates.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on initial open if not yet loaded
  useEffect(() => {
    let isCancelled = false;
    if (isOpen && !data) {
      const loadInitial = async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await fetch("/api/mandi-rates");
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const json: MandiRatesApiResponse = await res.json();
          if (!isCancelled && json.success) {
            setData(json);
          }
        } catch (err: unknown) {
          if (!isCancelled) {
            setError(
              err instanceof Error
                ? err.message
                : "Could not retrieve daily market rates.",
            );
          }
        } finally {
          if (!isCancelled) {
            setLoading(false);
          }
        }
      };
      loadInitial();
    }
    return () => {
      isCancelled = true;
    };
  }, [isOpen, data]);

  // GSAP Open / Close Animations
  useEffect(() => {
    const backdrop = backdropRef.current;
    const drawer = drawerRef.current;
    const container = containerRef.current;

    if (!backdrop || !drawer || !container) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (!isOpen) {
        gsap.set(container, { visibility: "hidden", pointerEvents: "none" });
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(drawer, { x: "100%" });
        return;
      }
    }

    gsap.killTweensOf([backdrop, drawer]);

    if (isOpen) {
      // Make container visible and interactive
      gsap.set(container, { visibility: "visible", pointerEvents: "auto" });

      const tl = gsap.timeline();
      tl.fromTo(
        backdrop,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      ).fromTo(
        drawer,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.2",
      );
    } else {
      // Smooth exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { visibility: "hidden", pointerEvents: "none" });
        },
      });

      tl.to(drawer, {
        x: "100%",
        duration: 0.35,
        ease: "power3.inOut",
      }).to(
        backdrop,
        {
          opacity: 0,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "-=0.2",
      );
    }
  }, [isOpen]);

  // Tab Pill Smooth Sliding Animation
  const updateTabPill = useCallback(
    (animate = true) => {
      const activeBtn =
        unitMode === "kg" ? kgBtnRef.current : qtlBtnRef.current;
      const pill = tabPillRef.current;
      if (!activeBtn || !pill) return;

      if (animate) {
        gsap.to(pill, {
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          duration: 0.32,
          ease: "power2.out",
        });
      } else {
        gsap.set(pill, {
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
        });
      }
    },
    [unitMode],
  );

  // Animate tab indicator and price numbers on unitMode change
  useEffect(() => {
    if (hasMountedRef.current) {
      updateTabPill(true);

      if (isOpen) {
        gsap.fromTo(
          ".price-val-anim",
          { opacity: 0.35, y: 3 },
          {
            opacity: 1,
            y: 0,
            duration: 0.24,
            ease: "power2.out",
            stagger: 0.015,
          },
        );
      }
    }
  }, [unitMode, updateTabPill, isOpen]);

  // Align tab indicator when drawer opens or window resizes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        updateTabPill(false);
      }, 50);

      const handleResize = () => updateTabPill(false);
      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen, updateTabPill]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Target Products
  const products = useMemo(() => {
    return data?.products || [];
  }, [data]);

  // Formatted Date Display
  const formattedArrivalDate = useMemo(() => {
    if (!data?.arrivalDate) return "Today's Live Rates";
    return data.arrivalDate;
  }, [data]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="mandi-rates-title"
      className="fixed inset-0 z-[1050] flex justify-end overflow-hidden select-none pointer-events-none"
      style={{ visibility: "hidden" }}
    >
      {/* Dark Translucent Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel with 24px Left Side Corner Radius */}
      <div
        ref={drawerRef}
        style={{ willChange: "transform" }}
        className="relative z-10 w-[85%] sm:w-full sm:max-w-[400px] md:max-w-[400px] lg:max-w-[500px] h-full bg-white shadow-2xl flex flex-col overflow-hidden rounded-l-[24px] border-none"
      >
        {/* =========================================================================
            1. DRAWER TOP HEADER
            ========================================================================= */}
        <div className="relative bg-gradient-to-b from-[#0f4021] to-[#14532d] text-white px-3.5 sm:px-6 pt-4 sm:pt-5 pb-3.5 sm:pb-4 shadow-md flex-shrink-0">
          {/* Top Row: Close Action */}
          <div className="relative z-10 flex items-center justify-end mb-1">
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close daily rates drawer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Title & Subtitle */}
          <div className="relative z-10">
            <h2
              id="mandi-rates-title"
              className="text-lg sm:text-2xl font-semibold tracking-tight text-white flex flex-wrap items-baseline gap-1.5"
            >
              <span>Daily Market Rates</span>
              <span className="text-[10px] sm:text-xs font-normal text-emerald-200">
                ( தினசரி விலை )
              </span>
            </h2>
            <p className="text-[11px] sm:text-[13px] text-emerald-100/80 font-normal mt-0.5 flex flex-wrap items-center gap-1.5">
              <span>Govt. Mandi Feed</span>
              <span>•</span>
              <span className="font-medium text-emerald-300">
                {formattedArrivalDate}
              </span>
            </p>
          </div>

          {/* Unit Switcher Strip */}
          <div className="relative z-10 mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Unit Mode Switcher with Smooth Animated Sliding Pill */}
            <div className="relative flex items-center bg-black/30 p-0.5 sm:p-1 rounded-xl border border-white/10 select-none">
              {/* Smooth Animated Sliding Indicator */}
              <div
                ref={tabPillRef}
                className="absolute top-0.5 bottom-0.5 sm:top-1 sm:bottom-1 rounded-lg bg-[#16a34a] shadow-xs pointer-events-none"
                style={{ willChange: "left, width" }}
              />

              <button
                ref={kgBtnRef}
                type="button"
                onClick={() => setUnitMode("kg")}
                className={`relative z-10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg font-semibold text-[10.5px] sm:text-xs transition-colors duration-200 cursor-pointer inline-flex items-center gap-1 ${
                  unitMode === "kg"
                    ? "text-white"
                    : "text-emerald-200/80 hover:text-white"
                }`}
              >
                <IndianRupeeIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> / Kg
              </button>
              <button
                ref={qtlBtnRef}
                type="button"
                onClick={() => setUnitMode("qtl")}
                className={`relative z-10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg font-semibold text-[10.5px] sm:text-xs transition-colors duration-200 cursor-pointer inline-flex items-center gap-1 ${
                  unitMode === "qtl"
                    ? "text-white"
                    : "text-emerald-200/80 hover:text-white"
                }`}
              >
                <IndianRupeeIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> /
                Quintal / Tray
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. PRODUCT RATES LISTING (WhatsApp Chat List Style)
            ========================================================================= */}
        <div className="flex-1 overflow-y-auto bg-white divide-y divide-[#F0F2F5]">
          {/* Loading Skeletons */}
          {loading && (
            <div className="divide-y divide-[#F0F2F5]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 animate-pulse"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-200 flex-shrink-0" />
                    <div className="space-y-1.5 min-w-0">
                      <div className="w-24 sm:w-32 h-4 bg-stone-200 rounded-sm" />
                      <div className="w-16 sm:w-24 h-3 bg-stone-100 rounded-sm" />
                    </div>
                  </div>
                  <div className="space-y-1.5 text-right flex-shrink-0">
                    <div className="w-14 sm:w-18 h-4 bg-stone-200 rounded-sm ml-auto" />
                    <div className="w-12 sm:w-16 h-3 bg-stone-100 rounded-sm ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <div className="m-4 p-5 rounded-2xl bg-red-50 border border-red-200 text-center flex flex-col items-center">
              <span className="text-2xl sm:text-3xl mb-2">⚠️</span>
              <h3 className="font-bold text-red-900 text-xs sm:text-sm">
                Failed to Load Rates
              </h3>
              <p className="text-[11px] sm:text-xs text-red-700 mt-1 max-w-xs">
                {error}
              </p>
              <button
                type="button"
                onClick={() => fetchRates(true)}
                className="mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Retry Loading
              </button>
            </div>
          )}

          {/* Target 11 Products List (WhatsApp Chat Row Style) */}
          {!loading &&
            !error &&
            products.map((product) => {
              const isEgg = product.id.startsWith("eggs");
              const modalPrice =
                unitMode === "kg"
                  ? product.modalPriceKg
                  : product.modalPriceQtl;
              const minPrice =
                unitMode === "kg" ? product.minPriceKg : product.minPriceQtl;
              const maxPrice =
                unitMode === "kg" ? product.maxPriceKg : product.maxPriceQtl;

              const unitLabel = isEgg
                ? unitMode === "kg"
                  ? "/ pc"
                  : "/ tray"
                : unitMode === "kg"
                  ? "/ kg"
                  : "/ qtl";

              return (
                <div
                  key={product.id}
                  className="group px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-[#F5F6F6] active:bg-[#E9EDEF] transition-colors cursor-pointer"
                >
                  {/* Left: Avatar Icon + Names */}
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    {/* WhatsApp Round Profile Avatar */}
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFFFFF] overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      {product.icon && product.icon.startsWith("/") ? (
                        <Image
                          src={product.icon}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg sm:text-xl">
                          {product.icon || " "}
                        </span>
                      )}
                    </div>

                    {/* Name & Subtitle Details */}
                    <div className="min-w-0 flex flex-col">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-semibold text-[#111B21] text-[13.5px] sm:text-[15px] leading-tight group-hover:text-[#008069] transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#008069]">
                          ({product.tamilName})
                        </span>
                      </div>

                      {/* WhatsApp Message Subtitle */}
                      <div className="flex items-center gap-1 text-[10.5px] sm:text-xs text-[#667781] mt-0.5 min-w-0">
                        <span className="truncate max-w-[120px] sm:max-w-[200px]">
                          {product.variety}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Today's Price + Range with smooth animation */}
                  <div className="price-val-anim flex flex-col items-end flex-shrink-0 text-right">
                    {/* Today's Price (WhatsApp Timestamp position) */}
                    <div className="flex items-baseline gap-0.5 text-[#008069] font-bold text-[13.5px] sm:text-[15.5px]">
                      <IndianRupeeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.8]" />
                      <span>{modalPrice.toLocaleString("en-IN")}</span>
                      <span className="text-[9.5px] sm:text-[11px] text-[#667781] font-normal ml-0.5">
                        {unitLabel}
                      </span>
                    </div>

                    {/* Range Pill */}
                    <div className="mt-0.5 flex items-center gap-1">
                      <span className="text-[9px] sm:text-[10px] text-[#54656F] bg-[#F0F2F5] px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium flex items-center gap-0.5">
                        <IndianRupeeIcon className="w-2 h-2 stroke-[2.4]" />
                        {minPrice} -{" "}
                        <IndianRupeeIcon className="w-2 h-2 stroke-[2.4]" />
                        {maxPrice}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
