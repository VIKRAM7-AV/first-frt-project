"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/hero-section";
import ProductSection from "@/components/home/product-section";
import CustomerReviewSection from "@/components/home/customer-review-section";
import FooterSection from "@/components/home/footer-section";
import FloatingActionButtons from "@/components/floating-action-buttons";
import DailyMandiRatesDrawer from "@/components/mandi/daily-mandi-rates-drawer";

export default function Home() {
  const [isMandiRatesOpen, setIsMandiRatesOpen] = useState(false);

  // useEffect(() => {
  //   const disableContextMenu = (e: any) => {
  //     e.preventDefault();
  //   };

  //   const disableKeys = (e: any) => {
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey &&
  //         e.shiftKey &&
  //         ["I", "J", "C"].includes(e.key.toUpperCase())) ||
  //       (e.ctrlKey && ["U", "S"].includes(e.key.toUpperCase()))
  //     ) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.addEventListener("contextmenu", disableContextMenu);
  //   document.addEventListener("keydown", disableKeys);

  //   return () => {
  //     document.removeEventListener("contextmenu", disableContextMenu);
  //     document.removeEventListener("keydown", disableKeys);
  //   };
  // }, []);

  return (
    <main className="min-h-screen bg-[#FBF9F5] overflow-x-hidden flex flex-col relative">
      <Navbar onOpenMandiRates={() => setIsMandiRatesOpen(true)} />
      <HeroSection />
      <ProductSection />
      <CustomerReviewSection />
      <FooterSection />
      <FloatingActionButtons />

      {/* Right Side Slide-Over Modal for Daily Salem Mandi Rates */}
      <DailyMandiRatesDrawer
        isOpen={isMandiRatesOpen}
        onClose={() => setIsMandiRatesOpen(false)}
      />
    </main>
  );
}
