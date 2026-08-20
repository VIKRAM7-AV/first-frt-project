import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/hero-section";
import ProductSection from "@/components/home/product-section";
import CustomerReviewSection from "@/components/home/customer-review-section";
import FooterSection from "@/components/home/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] overflow-x-hidden flex flex-col">
      <Navbar />
      <HeroSection />
      <ProductSection />
      <CustomerReviewSection />
      <FooterSection />
    </main>
  );
}



