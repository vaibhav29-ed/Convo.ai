import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import DemoPreview from "@/components/landing/DemoPreview";
import Features from "@/components/landing/Features";
import Steps from "@/components/landing/Steps";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main>
        <Hero />
        <DemoPreview />
        <Features />
        <Steps />
      </main>
      <Footer />
    </div>
  );
}
