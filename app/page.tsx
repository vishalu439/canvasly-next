
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import YouTubeShorts from "@/components/YoutubeShorts";
import HeroSlideshow from "@/components/HeroSlideshow";
import Testimonials from "@/components/Testimonials";
import RecentOrders from "@/components/RecentOrders";
import About from "@/components/About";
import Footer from "@/components/Footer";

const products = [
  { id: 1, name: "BTS Tote Bag", image: "/assets/mobile/2.avif", price: 199 },
  { id: 2, name: "TV Show T-Shirt", image: "/assets/mobile/3.avif", price: 399 },
  { id: 3, name: "Custom Tote Bag", image: "/assets/product3.avif", price: 199 },
  { id: 4, name: "Polaroids Mini Photo Prints", image: "/assets/product4.avif", price: 199 },
  { id: 5, name: "Custom PhotoFrame For Gifting", image: "/assets/product5.avif", price: 199 },
  { id: 6, name: "Custom Tshirts", image: "/assets/product6.avif", price: 399 },
];

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

      <YouTubeShorts  />
      <Testimonials />
      <RecentOrders />
      <About />
      <Footer />
    </div>
  );
}
