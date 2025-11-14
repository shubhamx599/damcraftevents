// EventSection.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RiPlayLine, RiPlayFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import ScrollFloat from "../ui/ScrollFloat";
import { SERVICES as META_SERVICES, EVENT_TYPES } from "../../constants/eventData";

/* ---------------------------
   Helper: safe meta lookup
   --------------------------- */
const getServiceMeta = (type, fallbackIndex = 0) => {
  if (!Array.isArray(META_SERVICES) || META_SERVICES.length === 0) return {};
  const found = META_SERVICES.find((s) => s.type === type);
  return found || META_SERVICES[fallbackIndex] || {};
};

/* ---------------------------
   Data: Services List
   --------------------------- */
const SERVICES = [
  {
    id: "corporate",
    label: "Corporate Events",
    heading: "Turning corporate visions into unforgettable realities.",
    type: EVENT_TYPES.CORPORATE,
    video: "https://www.pexels.com/download/video/5896331/",
    poster:
      "https://plus.unsplash.com/premium_photo-1663126259671-0dd162f3f494?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNvcnBvcmF0ZSUyMGV2ZW50fGVufDB8fDB8fHww",
    color: "#3b82f6",
  },
  {
    id: "mall",
    label: "Mall Activations",
    heading: "Turning Crowds into Customers.",
    type: EVENT_TYPES.MALL,
    video: "https://www.pexels.com/download/video/5897001/",
    poster:
      "https://plus.unsplash.com/premium_photo-1663089174939-5870e2e8d62e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
    color: "#8b5cf6",
  },
  {
    id: "product",
    label: "Product Advertising",
    heading: "Where Movement Meets Marketing",
    type: EVENT_TYPES.PRODUCT,
    video: "https://www.pexels.com/download/video/5896328/",
    poster: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50fGVufDB8fDB8fHww",
    color: "#ec4899",
  },
  {
    id: "market",
    label: "Market Activations",
    heading: "Creating Buzz in Market Spaces",
    type: EVENT_TYPES.MARKET,
    video: "https://www.pexels.com/download/video/3722010/",
    poster: "https://images.unsplash.com/photo-1561489396-888724a1543d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50fGVufDB8fDB8fHww",
    color: "#06b6d4",
  },
];

/* ---------------------------
   Motion small variants (lightweight)
   --------------------------- */
const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

/* ---------------------------
   VideoPlayer - optimized & safe
   --------------------------- */
const VideoPlayer = React.memo(function VideoPlayer({ src, poster, alt = "", className = "" }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Stable handlers so we can add/remove properly
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onLoaded = () => {
      setIsLoading(false);
      // Auto-play if short video (best-effort)
      try {
        if (vid.duration && vid.duration < 30) {
          vid.play().catch(() => {});
        }
      } catch (e) {
        // ignore duration access errors on some cross-origin responses
      }
    };
    const onError = () => {
      setHasError(true);
      setIsLoading(false);
    };
    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    vid.addEventListener("loadeddata", onLoaded);
    vid.addEventListener("error", onError);
    vid.addEventListener("playing", onPlaying);
    vid.addEventListener("pause", onPause);

    // muted & playsInline set for mobile autplay compatibility
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "metadata";

    return () => {
      vid.removeEventListener("loadeddata", onLoaded);
      vid.removeEventListener("error", onError);
      vid.removeEventListener("playing", onPlaying);
      vid.removeEventListener("pause", onPause);
    };
  }, []);

  // Intersection observer: set data-loaded and src when in view
  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // safe unobserve
            try {
              if (node) io.unobserve(node);
            } catch (e) {}
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px", // mobile-first
        threshold: 0.12,
      }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Load src when in view
  useEffect(() => {
    const vid = videoRef.current;
    if (!isInView || !vid || hasError) return;

    if (!vid.dataset.loaded) {
      setIsLoading(true);
      // assign src (do not reassign after loaded)
      try {
        vid.src = src;
        vid.dataset.loaded = "true";
      } catch (e) {
        setHasError(true);
        setIsLoading(false);
      }
    }
  }, [isInView, src, hasError]);

  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) {
      vid.pause();
    } else {
      vid.play().catch(() => {});
    }
  }, [isPlaying]);

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={`relative ${className} rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center`}
        role="img"
        aria-label="Video unavailable"
      >
        <div className="text-center text-gray-300 p-4">
          <RiPlayFill size={36} className="mx-auto mb-2 opacity-70" />
          <p className="text-sm font-medium">Video unavailable</p>
          <p className="text-xs opacity-70 mt-1">Please check your connection</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={togglePlay}
      className={`relative ${className} rounded-2xl overflow-hidden aspect-video group cursor-pointer`}
      aria-label={alt || "video showcase"}
    >
      {/* Poster */}
      {poster && (
        <img
          src={poster}
          alt={alt || "poster"}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoading ? "filter blur-sm scale-105" : isPlaying ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={isPlaying}
        />
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoading || !isPlaying ? "opacity-0" : "opacity-100"
        }`}
        loop
        muted
        playsInline
        aria-hidden={false}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white/80" />
            <span className="text-white text-sm font-medium">Loading video...</span>
          </div>
        </div>
      )}

      {/* Play / Pause badge */}
      {!isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-200 ${
            isPlaying ? "opacity-0 group-hover:opacity-80 bg-black/20" : "bg-black/40"
          }`}
        >
          <div
            className={`bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-transform duration-200 ${
              isPlaying ? "scale-95" : "scale-100 group-hover:scale-110"
            }`}
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-sm" />
                <div className="w-1 h-4 bg-white rounded-sm" />
              </div>
            ) : (
              <RiPlayFill size={18} />
            )}
          </div>
        </div>
      )}

      {/* small status */}
      <div className="absolute top-3 right-3 z-20">
        <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm flex items-center gap-1 font-medium">
          <RiPlayLine size={12} />
          <span>{isPlaying ? "Playing" : "Tap to play"}</span>
        </div>
      </div>
    </div>
  );
});

/* ---------------------------
   ServiceCard (mobile-first)
   --------------------------- */
const ServiceCard = React.memo(function ServiceCard({ service, index }) {
  const isReverse = index % 2 === 1;
  const meta = getServiceMeta(service.type);
  // Keep explicit precedence: service fields override meta
  const merged = { ...meta, ...service };
  const features = merged.features || [];
  const description = merged.description || merged.heading;

  return (
    <motion.article
      className="relative"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      variants={{
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      {/* subtle background accent */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-8 rounded-3xl blur-3xl -z-10"
        style={{ backgroundColor: merged.color || "rgba(255,255,255,0.04)" }}
      />

      <div
        className={`grid grid-cols-1 gap-6 items-center ${
          isReverse ? "lg:grid-cols-2 lg:grid-flow-col-dense lg:auto-cols-fr" : "lg:grid-cols-2 lg:auto-cols-fr"
        }`}
      >
        {/* Video - mobile first: top */}
        <div className={`relative rounded-2xl overflow-hidden shadow-lg ${isReverse ? "lg:col-start-2" : ""}`}>
          <VideoPlayer
            src={merged.video}
            poster={merged.poster}
            alt={`${merged.label} showcase`}
            className="w-full"
          />
        </div>

        {/* Text column */}
        <div className={`${isReverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
          <div className="text-white">
            <div className="flex gap-3 items-center mb-3 md:mb-4">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: merged.color }}
              />
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">
                {merged.label}
              </span>
              <div className="h-px bg-gradient-to-r from-white to-transparent flex-grow ml-2" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4 leading-tight">
              {merged.heading}
            </h3>

            <p className="text-gray-300 mb-4 text-base sm:text-lg leading-relaxed">
              {description}
            </p>

            {features.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-gray-300">
                {features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-3 py-1">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: merged.color }}
                    />
                    <span className="font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ---------------------------
   Header & CTA (kept minimal)
   --------------------------- */
const HeaderSection = () => (
  <section className="text-center mb-12 md:mb-16">
    <ScrollFloat
      animationDuration={1.1}
      ease="back.inOut(2)"
      scrollStart="center bottom+=50%"
      scrollEnd="bottom bottom-=40%"
      stagger={0.02}
      containerClassName="mb-4"
      textClassName="text-white text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300"
    >
      Our Innovative Efforts
    </ScrollFloat>

    <motion.p
      className="mt-4 text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
      {...fadeInUp}
    >
      Transforming ordinary events into extraordinary experiences through creative execution.
      <span className="block mt-2 text-xs sm:text-sm text-gray-400">
        Where every detail matters and every moment creates impact.
      </span>
    </motion.p>
  </section>
);

const CTASection = ({ onExplore, loading }) => (
  <div className="relative mt-6">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/6 via-purple-600/6 to-pink-600/6 rounded-3xl -z-10" />
    <div className="text-center py-8 md:py-12 px-4 rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Ready to bring your vision to life?</h3>
      <p className="text-gray-300 mb-5 max-w-2xl mx-auto text-sm sm:text-base">
        Let's create something extraordinary together. Our team is ready to transform your ideas into unforgettable experiences.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <CustomButton label="Explore All Services" variant="secondary" size="large" loading={loading} onClick={onExplore} />
        <CustomButton label="Contact Us" variant="primary" size="large" to="/contact" />
      </div>
    </div>
  </div>
);

/* ---------------------------
   Main Exported Component
   --------------------------- */
export default function EventSection() {
  const navigate = useNavigate?.() || ((p) => (window.location.href = p));
  const [loading, setLoading] = useState(false);

  const onExplore = useCallback(() => {
    // start loader ASAP
    setLoading(true);
    try {
      navigate("/services");
      // navigation will usually unmount this component, so clearing loading is optional.
    } catch (e) {
      // fallback: hard redirect
      window.location.href = "/services";
    }
  }, [navigate]);

  // merge meta (service-level keys take precedence)
  const servicesWithMeta = useMemo(
    () => SERVICES.map((s) => ({ ...getServiceMeta(s.type), ...s })),
    []
  );

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* subtle global background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-gray-900/40 -z-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeaderSection />

        <div className="space-y-12 md:space-y-16">
          {servicesWithMeta.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <CTASection onExplore={onExplore} loading={loading} />
        </div>
      </div>
    </section>
  );
}
