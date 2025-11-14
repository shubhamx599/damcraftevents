import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiPlayFill,
  RiPauseFill,
  RiStarFill,
  RiUserHeartLine,
  RiCalendarEventLine,
  RiTeamLine,
  RiErrorWarningLine,
} from "@remixicon/react";
import ScrollFloat from "../ui/ScrollFloat";

// -----------------------------
// Small helpers / hooks
// -----------------------------

// useInView - small IntersectionObserver wrapper (mobile-first friendly defaults)
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? "100px 0px",
        threshold: options.threshold ?? 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref.current]);

  return { ref, inView };
}

// useVideoPlayer - encapsulates video lifecycle and state
function useVideoPlayer({ videoSrc, isActive }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(videoSrc));
  const [error, setError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onCanPlay = () => setIsLoading(false);
    const onError = () => {
      setError(true);
      setIsLoading(false);
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onError);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onError);
    };
  }, [videoRef.current]);

  // Auto-play when card becomes active and video ready
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isActive && !error) {
      // try to play; browsers allow autoplay if muted
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = "metadata";
      const playPromise = v.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // can't autoplay — keep paused, user can tap to play
          setIsPlaying(false);
        });
      }
    } else if (!isActive && isPlaying) {
      v.pause();
    }
  }, [isActive, error]);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v || error) return;
    v.muted = true;
    v.play().catch(() => setError(true));
  }, [videoRef.current, error]);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  }, [videoRef.current]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v || error) return;
    if (v.paused) play();
    else pause();
  }, [videoRef.current, error]);

  return {
    videoRef,
    isPlaying,
    isLoading,
    error,
    play,
    pause,
    toggle,
  };
}

// -----------------------------
// ServiceCard (mobile-first, small, focused)
// -----------------------------
const ServiceCard = React.memo(function ServiceCard({
  title,
  description,
  videoSrc,
  index,
  featured = false,
}) {
  const { ref, inView } = useInView({ rootMargin: "120px 0px" });
  const [active, setActive] = useState(false); // whether card should attempt autoplay

  // Only set active when inView — this drives the useVideoPlayer autoplay logic
  useEffect(() => {
    if (inView) setActive(true);
  }, [inView]);

  const { videoRef, isPlaying, isLoading, error, toggle } = useVideoPlayer({
    videoSrc,
    isActive: active,
  });

  const handleCardClick = useCallback((e) => {
    // if the click is on an interactive element, ignore
    if (e.target.closest("button")) return;
    toggle();
  }, [toggle]);

  const canShowVideo = inView && !error && videoSrc;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.5) }}
      viewport={{ once: true, margin: "-20px" }}
      onClick={handleCardClick}
      className={`relative overflow-hidden rounded-2xl bg-gray-900 group cursor-pointer ${featured ? "lg:col-span-2" : ""}`}
    >
      <div className="w-full aspect-video sm:aspect-[16/9] lg:aspect-[16/9] bg-gradient-to-br from-gray-800 to-black">
        {canShowVideo ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            aria-label={title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center text-gray-400">
              <RiErrorWarningLine size={28} className="mx-auto opacity-70" />
              <p className="mt-2 text-sm font-medium">{error ? "Video unavailable" : "Preview"}</p>
              <p className="mt-1 text-xs text-gray-400">{title}</p>
            </div>
          </div>
        )}

        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
          <div className="mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs uppercase tracking-wider text-white/80">Service {String(index + 1).padStart(2, "0")}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{title}</h3>
          <p className="mt-2 text-sm sm:text-base text-white/70 line-clamp-2">{description}</p>
        </div>

        {/* play/pause badge */}
        {!error && (
          <button
            aria-label={isPlaying ? "Pause video" : "Play video"}
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full border border-white/10"
          >
            {isPlaying ? <RiPauseFill size={18} /> : <RiPlayFill size={18} />}
          </button>
        )}

        {/* status badge */}
        {!error && (
          <div className="absolute left-3 top-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white/90">
            {isLoading ? "Loading..." : isPlaying ? "Playing" : "Tap to play"}
          </div>
        )}
      </div>
    </motion.article>
  );
});

// -----------------------------
// StatCard and small presentational pieces
// -----------------------------
const StatCard = React.memo(({ number, label, Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-20px" }}
    className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
  >
    <div className="flex justify-center mb-3">
      <div className="p-2 rounded-xl bg-white/10">
        <Icon size={22} className="text-red-500" />
      </div>
    </div>
    <h3 className="text-2xl font-black text-white">{number}</h3>
    <p className="text-gray-300 text-sm mt-1">{label}</p>
  </motion.div>
));

// -----------------------------
// Main ProjectSection
// -----------------------------
export default function ProjectSection() {
  const navigate = useNavigate();

  const services = useMemo(() => [
    {
      title: "Corporate Events",
      description: "Professional conferences, product launches, and corporate gatherings that leave lasting impressions.",
      video: "https://cdn.pixabay.com/video/2020/03/31/34685-403408160_tiny.mp4",
      featured: true,
    },
    {
      title: "Social Celebrations",
      description: "Memorable birthdays, anniversaries, and private parties crafted with personal touch.",
      video: "https://cdn.pixabay.com/video/2015/11/07/1275-145116912_tiny.mp4",
    },
    {
      title: "Brand Activations",
      description: "Engaging mall and market activations that turn audiences into loyal customers.",
      video: "https://cdn.pixabay.com/video/2024/02/02/198898-909564555_tiny.mp4",
    },
    {
      title: "Entertainment Shows",
      description: "Spectacular concerts, live performances, and entertainment events that captivate audiences.",
      video: "https://cdn.pixabay.com/video/2016/09/09/5026-182666667_tiny.mp4",
    },
    {
      title: "Talent Management",
      description: "Professional anchors, influencers, and celebrity collaborations for your events.",
      video: "https://cdn.pixabay.com/video/2025/04/23/273922_tiny.mp4",
    },
  ], []);

  const stats = useMemo(() => [
    { number: "400+", label: "Events Executed", icon: RiCalendarEventLine },
    { number: "50+", label: "Happy Clients", icon: RiUserHeartLine },
    { number: "10+", label: "Years Experience", icon: RiStarFill },
    { number: "40+", label: "Team Members", icon: RiTeamLine },
  ], []);

  const handleContact = useCallback(() => navigate("/contact"), [navigate]);

  return (
    <section className="relative bg-black text-white py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            textClassName="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
          >
            Our Premium Services
          </ScrollFloat>

          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            Experience the difference with our comprehensive event solutions. From intimate gatherings to grand celebrations, we bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title + i}
              title={s.title}
              description={s.description}
              videoSrc={s.video}
              index={i}
              featured={s.featured}
            />
          ))}
        </div>

        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Trusted by <span className="text-red-500">Industry Leaders</span>
            </h2>
            <p className="mt-2 text-gray-300">Our track record speaks for itself</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((st, idx) => (
              <StatCard key={st.label} number={st.number} label={st.label} Icon={st.icon} delay={idx * 0.08} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Ready to Create Magic Together?</h3>
              <p className="mt-3 text-gray-100 max-w-2xl mx-auto">Let's transform your ideas into unforgettable experiences.</p>

              <motion.button
                onClick={handleContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold"
              >
                Start Your Project
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
