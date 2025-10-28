'use client';
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Desktop slides
const desktopSlides = [
  { id: 1, image: "/assets/tshirt1.avif", caption: "Custom Printed T-Shirts 👕", bgPosition: "center 10%" },
  { id: 2, image: "/assets/totebag1.avif", caption: "Trendy Tote Bags 👜", bgPosition: "center 40%" },
];

// Mobile slides
const mobileSlides = [
  { id: 1, image: "/assets/mobile/1.avif", caption: "Custom Printed T-Shirts 👕", bgPosition: "center 10%" },
  { id: 2, image: "/assets/mobile/2.avif", caption: "Trendy Tote Bags 👜", bgPosition: "center 40%" },
  { id: 3, image: "/assets/mobile/3.avif", caption: "Custom Printed T-Shirts 👕", bgPosition: "center 10%" },
  { id: 4, image: "/assets/mobile/4.avif", caption: "Custom Printed T-Shirts 👕", bgPosition: "center 10%" },
  { id: 5, image: "/assets/mobile/5.avif", caption: "Custom Printed T-Shirts 👕", bgPosition: "center 30%" },
  { id: 6, image: "/assets/mobile/6.avif", caption: "Trendy Tote Bags 👜", bgPosition: "center center" },
];

const HeroSlideshow = () => {
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Set device type on mount (no SSR window access error)
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);

    const handleResize = () => {
      clearTimeout(window.__resizeTimer);
      window.__resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 640);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(window.__resizeTimer);
    };
  }, []);

  // ✅ Memoized slides to avoid re-renders
  const slides = useMemo(() => (isMobile ? mobileSlides : desktopSlides), [isMobile]);

  // ✅ Preload next-slide images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  return (
    <section
      className="relative w-full h-[65vh] sm:h-[85vh] bg-gray-50 overflow-hidden"
      aria-label="Hero slideshow of Canvasly custom print products"
    >
      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center text-gray-400">
            Loading...
          </div>
        }
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} aria-label={slide.caption}>
              <div className="relative w-full h-full flex items-center justify-center text-white">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: slide.bgPosition,
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-black/25 z-10"></div>

                {/* Caption + Button */}
                <div className="z-20 text-center px-4 animate-fadeIn">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg leading-tight">
                    {slide.caption}
                  </h2>
                  <button
                    onClick={() =>
                      window.open("https://wa.me/7619538167", "_blank")
                    }
                    aria-label="Order on WhatsApp"
                    className="bg-pink-500 hover:bg-pink-600 text-white text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg transition-transform hover:scale-105"
                  >
                    Order on WhatsApp 💬
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Suspense>
    </section>
  );
};

export default HeroSlideshow;
