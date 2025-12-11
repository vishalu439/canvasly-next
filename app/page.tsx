import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import YouTubeShorts from "@/components/YoutubeShorts";
import HeroSlideshow from "@/components/HeroSlideshow";
import Testimonials from "@/components/Testimonials";
import RecentOrders from "@/components/RecentOrders";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { products } from "@/data/product";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <HeroSlideshow />

      <section className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </section>

      <YouTubeShorts />
      <Testimonials />
      <RecentOrders />
      <About />
      <Footer />
    </div>
  );
}
