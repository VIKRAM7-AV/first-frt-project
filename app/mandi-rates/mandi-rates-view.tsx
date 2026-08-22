"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/home/footer-section";
import FloatingActionButtons from "@/components/floating-action-buttons";
import DailyMandiRatesDrawer from "@/components/mandi/daily-mandi-rates-drawer";
import { TargetProduct } from "@/lib/mandi";

interface MandiRatesViewProps {
  initialProducts: TargetProduct[];
  arrivalDate: string;
  lastUpdated: string;
}

function IndianRupeeIcon({ className = "w-4 h-4" }: { className?: string }) {
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

const FAQS = [
  {
    q: "How are the daily Tamil Nadu Mandi rates calculated?",
    a: "Our rates are sourced directly from the Government of India's Agricultural Marketing Board (Data.gov.in / Agmarknet) across Tamil Nadu state agricultural markets. We present the Minimum, Maximum, and Modal (prevailing wholesale transaction) prices.",
  },
  {
    q: "What is the difference between Modal Price and Minimum / Maximum Price in Tamil Nadu Mandis?",
    a: "The Minimum and Maximum prices represent the day's auction range based on quality grades. The Modal Price is the most frequent wholesale trading rate at which the highest volume of produce was transacted across Tamil Nadu state markets.",
  },
  {
    q: "Can businesses place bulk wholesale orders directly through BK & Co across Tamil Nadu?",
    a: "Yes. BK & Co specializes in wholesale supply for supermarkets, hotels, restaurants, catering companies, hostel messes, and retail vendors across Tamil Nadu. You can request customized daily or weekly wholesale consignments in bags (25kg/50kg), crates, or trays.",
  },
  {
    q: "Which locations are covered for wholesale doorstep delivery across Tamil Nadu?",
    a: "We provide daily bulk dispatch and delivery across Salem, Namakkal, Erode, Dharmapuri, Krishnagiri, Coimbatore, Tirupur, Dindigul, and surrounding districts of Tamil Nadu with dedicated transport.",
  },
  {
    q: "What time are the Tamil Nadu market rates updated daily?",
    a: "Tamil Nadu Mandi daily wholesale auction prices are synchronized every morning as soon as the daily arrivals and market records are finalized by the Agricultural Marketing authorities.",
  },
];

export default function MandiRatesView({
  initialProducts,
  arrivalDate,
  lastUpdated,
}: MandiRatesViewProps) {
  const [products] = useState<TargetProduct[]>(initialProducts);
  const [unitMode, setUnitMode] = useState<"kg" | "qtl">("kg");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "vegetables" | "fruits" | "eggs">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const isEgg = item.id.startsWith("eggs");
      const isFruit = ["orange", "mango", "watermelon", "muskmelon", "pomegranate"].includes(item.id);
      const isVeg = !isEgg && !isFruit;

      if (categoryFilter === "vegetables" && !isVeg) return false;
      if (categoryFilter === "fruits" && !isFruit) return false;
      if (categoryFilter === "eggs" && !isEgg) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchTamil = item.tamilName.toLowerCase().includes(q);
        const matchVariety = item.variety.toLowerCase().includes(q);
        return matchName || matchTamil || matchVariety;
      }

      return true;
    });
  }, [products, categoryFilter, searchQuery]);

  const handleWhatsAppQuote = (product: TargetProduct, modalPrice: number, unitLabel: string) => {
    const text = encodeURIComponent(
      `வணக்கம் / Hello BK & Co, I am inquiring from your Tamil Nadu Mandi Rates page regarding bulk wholesale order for *${product.name} (${product.tamilName})*.\nToday's Modal Rate: ₹${modalPrice} ${unitLabel}.\nCould you please share minimum order quantities and bulk delivery schedule?`
    );
    window.open(`https://wa.me/918489934449?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Navigation */}
      <Navbar onOpenMandiRates={() => setIsDrawerOpen(true)} />

      {/* Hero / Header Section */}
      <section className="relative bg-gradient-to-b from-[#0f4021] via-[#14532d] to-[#1b5e35] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-300 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-yellow-300 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Live Sync Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium mb-4 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>Live Govt. Tamil Nadu Mandi Feed</span>
            <span className="text-emerald-400">•</span>
            <span className="font-semibold text-white">{arrivalDate}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Today Tamil Nadu Mandi Wholesale Rates
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            தமிழ்நாடு தினசரி காய்கறி மற்றும் பழங்கள் மொத்த விலை நிலவரம் — Live daily wholesale agricultural commodity market prices for Onion, Shallots, Potato, Garlic, Eggs & Seasonal Fruits across Tamil Nadu.
          </p>

          {/* Quick Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 text-center">
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider block">State Market</span>
              <span className="font-bold text-sm sm:text-base text-white">Tamil Nadu (State-wide)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 text-center">
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider block">Arrival Date</span>
              <span className="font-bold text-sm sm:text-base text-white">{arrivalDate}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 text-center">
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider block">Commodities</span>
              <span className="font-bold text-sm sm:text-base text-white">{products.length} Key Products</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 text-center">
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider block">Wholesale Supply</span>
              <span className="font-bold text-sm sm:text-base text-white">BK & Co Tamil Nadu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-20 w-full mb-16">
        {/* Controls Card (Filter Pills + Unit Switcher + Search) */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/90 p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setCategoryFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  categoryFilter === "all"
                    ? "bg-[#14532d] text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                All Produce ({products.length})
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter("vegetables")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  categoryFilter === "vegetables"
                    ? "bg-[#14532d] text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Vegetables
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter("fruits")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  categoryFilter === "fruits"
                    ? "bg-[#14532d] text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Fruits
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter("eggs")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  categoryFilter === "eggs"
                    ? "bg-[#14532d] text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Eggs
              </button>
            </div>

            {/* Right side: Search Box & Unit Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 sm:w-56">
                <input
                  type="text"
                  placeholder="Search item (e.g. Onion, பூண்டு)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <svg
                  className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Unit Switcher */}
              <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => setUnitMode("kg")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    unitMode === "kg"
                      ? "bg-[#14532d] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <IndianRupeeIcon className="w-3 h-3" /> / Kg
                </button>
                <button
                  type="button"
                  onClick={() => setUnitMode("qtl")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    unitMode === "qtl"
                      ? "bg-[#14532d] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <IndianRupeeIcon className="w-3 h-3" /> / Qtl / Tray
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <section
          aria-label="Tamil Nadu Mandi Rate Items"
          itemScope
          itemType="https://schema.org/ItemList"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredProducts.map((product, idx) => {
            const isEgg = product.id.startsWith("eggs");
            const modalPrice = unitMode === "kg" ? product.modalPriceKg : product.modalPriceQtl;
            const minPrice = unitMode === "kg" ? product.minPriceKg : product.minPriceQtl;
            const maxPrice = unitMode === "kg" ? product.maxPriceKg : product.maxPriceQtl;

            const unitLabel = isEgg
              ? unitMode === "kg"
                ? "/ piece"
                : "/ tray (30)"
              : unitMode === "kg"
                ? "/ kg"
                : "/ quintal (100kg)";

            return (
              <article
                key={product.id}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Product"
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group"
              >
                <meta itemProp="position" content={String(idx + 1)} />

                <div>
                  {/* Top Bar: Icon + Names */}
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="relative w-14 h-14 rounded-2xl bg-stone-100 overflow-hidden flex items-center justify-center flex-shrink-0 border border-stone-200/80 group-hover:scale-105 transition-transform">
                      {product.icon && product.icon.startsWith("/") ? (
                        <Image
                          src={product.icon}
                          alt={`${product.name} wholesale mandi rate Tamil Nadu`}
                          width={56}
                          height={56}
                          itemProp="image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">{product.icon || " "}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-1">
                        <h2
                          itemProp="name"
                          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate"
                        >
                          {product.name}
                        </h2>
                      </div>
                      <p className="text-xs font-medium text-emerald-700 mt-0.5">
                        {product.tamilName}
                      </p>
                      <span
                        itemProp="description"
                        className="inline-block text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md mt-1 truncate max-w-full"
                      >
                        {product.variety}
                      </span>
                    </div>
                  </div>

                  {/* Price Board with Offer Schema */}
                  <div
                    className="bg-stone-50 rounded-xl p-3 border border-stone-200/70 mb-4"
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/AggregateOffer"
                  >
                    <meta itemProp="priceCurrency" content="INR" />
                    <meta itemProp="lowPrice" content={String(minPrice)} />
                    <meta itemProp="highPrice" content={String(maxPrice)} />
                    <meta itemProp="price" content={String(modalPrice)} />
                    <link itemProp="availability" href="https://schema.org/InStock" />

                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                        Today State Modal Price
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                        Govt. TN Mandi
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 text-[#14532d] font-bold text-2xl sm:text-3xl">
                      <IndianRupeeIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.8]" />
                      <span>{modalPrice.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-stone-600 font-normal ml-1">
                        {unitLabel}
                      </span>
                    </div>

                    {/* Market Range */}
                    <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
                      <span>State Auction Range:</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-0.5">
                        <IndianRupeeIcon className="w-2.5 h-2.5" />
                        {minPrice} — <IndianRupeeIcon className="w-2.5 h-2.5" />
                        {maxPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Button (WhatsApp Bulk Inquiry) */}
                <button
                  type="button"
                  onClick={() => handleWhatsAppQuote(product, modalPrice, unitLabel)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Inquire Wholesale Quote</span>
                </button>
              </article>
            );
          })}
        </section>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 mt-6">
            <p className="text-stone-500 text-sm">No produce found matching &quot;{searchQuery}&quot;.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
              }}
              className="mt-3 px-4 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* SEO In-Depth Guide & Market Information Section */}
        <section className="mt-14 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>🌾</span>
              <span>About Tamil Nadu Mandi Produce Rates & Wholesale Distribution</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Tamil Nadu is one of India&apos;s leading agricultural powerhouses, linking major farming belts across Namakkal, Dharmapuri, Krishnagiri, Dindigul, Erode, and Coimbatore with retail and institutional markets across South India. Daily commodity auctions conducted under Agricultural Produce Market Committees (APMC) and verified through Government of India feeds establish the benchmark wholesale prices for staple produce including Red Onions, Small Onions (Shallots), Potatoes, Bold Garlic, and Farm-Fresh Poultry Eggs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Direct Farm Gate Sourcing
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                By eliminating multiple middlemen layers, BK & Co secures farm-gate procurement from trusted cultivators across Tamil Nadu, passing competitive state modal mandi pricing directly to wholesale buyers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Rigorous Quality Grading
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Every consignment undergoes manual inspection and mechanized grading for uniform size, moisture curing, and zero spoilage before bagging and dispatch across Tamil Nadu.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Statewide B2B Logistics
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Equipped for commercial scale delivery to hotel chains, institutional caterers, supermarkets, and wholesale distributors with scheduled morning dispatches.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ) Section for Search Engine Snippets */}
        <section className="mt-10 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Buyer Questions Answered
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mt-3">
              Frequently Asked Questions on Tamil Nadu Mandi Rates
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1.5">
              Everything you need to know about wholesale mandi rates, minimum order quantities, and bulk delivery terms across Tamil Nadu.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-4 sm:px-5 py-3.5 text-left font-semibold text-slate-800 text-xs sm:text-sm flex items-center justify-between gap-3 bg-stone-50/70 hover:bg-stone-100/80 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-stone-500 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 py-3.5 bg-white text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#14532d] to-[#0f4021] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-lg">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-white">
              Need Custom Wholesale Volume Pricing in Tamil Nadu?
            </h3>
            <p className="text-emerald-200/90 text-xs sm:text-sm mt-1 max-w-xl">
              Connect with BK & Co wholesale produce desk for customized bulk contract pricing, hotel daily supplies, or retail distribution trucks across Tamil Nadu.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="tel:+918489934449"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Call: +91 84899 34449
            </a>
            <a
              href="https://wa.me/918489934449?text=Hello%20BK%20%26%20Co%2C%20I%20would%20like%20to%20place%20a%20bulk%20wholesale%20produce%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold shadow-md transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />

      {/* Slide-over Drawer instance */}
      <DailyMandiRatesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Site Footer */}
      <FooterSection />
    </main>
  );
}
