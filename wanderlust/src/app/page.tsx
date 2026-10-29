import { Banner } from "@/components/Home/Banner";
import { CtaSection } from "@/components/Home/CtaSection";
import FeatureDestination from "@/components/Home/FeatureDestination";
import { Footer } from "@/components/Home/Footer";
import { Navbar } from "@/components/Home/Navbar";
import { Testimonials } from "@/components/Home/Testimonials";
import { WhyChooseUs } from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-50 dark:bg-black">
      {/* <Navbar /> */}
      <Banner />
      <FeatureDestination />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection />
      {/* <Footer /> */}
    </div>
  );
}
