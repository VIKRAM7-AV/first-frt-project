import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/hero-section";
import ProductSection from "@/components/home/product-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] overflow-x-hidden flex flex-col">
      <Navbar />
      <HeroSection />
      <ProductSection />
    </main>
  );
}



