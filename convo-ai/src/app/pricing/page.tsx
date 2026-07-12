import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingSection from "@/components/landing/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="pt-16">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
