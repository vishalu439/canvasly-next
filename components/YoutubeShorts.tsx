'use client'
import React, { useEffect, useRef, useState, useMemo } from "react";

const YouTubeShorts = () => {
  const videoRefs = useRef([]);
  const [visibleVideos, setVisibleVideos] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const videos = useMemo(
    () => ["ClYcj8Au_7E", "sNGsOTxX27Q", "FFVY0UqkhKU", "vS3zAc9mChE"],
    []
  );
  const mobileVideos = useMemo(
    () => ["/videos/short1.mp4", "/videos/short2.mp4", "/videos/short3.mp4"],
    []
  );

  // Detect device and setup observer
  useEffect(() => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    if (!isMobileDevice) {
      const observer = new IntersectionObserver(
        (entries) => {
          const updated = {};
          for (const entry of entries) {
            const id = entry.target.getAttribute("data-id");
            updated[id] = entry.isIntersecting;
          }
          setVisibleVideos((prev) => ({ ...prev, ...updated }));
        },
        { threshold: 0.5 }
      );

      videoRefs.current.forEach((el) => el && observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);

  const slides = isMobile ? mobileVideos : videos;

  return (
    <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        Trending on <span className="text-pink-500">Canvasly</span>
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Watch our latest custom tote bags, T-shirt prints, and frame designs come alive 🎥
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-screen-2xl px-6">
        {slides.map((item, index) => (
          <div
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            data-id={isMobile ? `mobile-${index}` : item}
            className="relative w-full aspect-[9/16] rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:scale-105 transition-transform duration-500 bg-gray-100"
          >
            {isMobile ? (
              <video
                src={item}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
              />
            ) : visibleVideos[item] ? (
              <iframe
                src={`https://www.youtube.com/embed/${item}?autoplay=1&mute=1&modestbranding=1&controls=0&loop=1&playlist=${item}`}
                title={`YouTube Short ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                playsInline
                loading="lazy"
              ></iframe>
            ) : (
              <img
                src={`https://i.ytimg.com/vi/${item}/hqdefault.jpg`}
                alt={`YouTube preview ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-10 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold transition-all"
        onClick={() => window.open("https://wa.me/7619538167", "_blank")}
      >
        Order on WhatsApp 💬
      </button>
    </section>
  );
};

export default YouTubeShorts;
