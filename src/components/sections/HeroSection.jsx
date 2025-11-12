import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const textLines = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text with smooth stagger
      gsap.from(textLines.current, {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "back.out(1.7)",
        stagger: 0.15,
      });

      // Parallax scroll effect
      gsap.to(heroRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex flex-col justify-center items-center text-center bg-black overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black/90 z-0" />

      {/* Main Content */}
      <div className="relative z-1 max-w-5xl mx-auto px-6 pt-20 flex flex-col items-center justify-center">

        {/* Hero Text */}
        <div className="overflow-hidden space-y-3">
          {["We Create", "Unforgettable", "Experiences"].map((line, i) => (
            <h1
              key={i}
              ref={(el) => (textLines.current[i] = el)}
              className={`hero-title text-center text-6xl md:text-8xl font-black drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] ${
                line === "Unforgettable" ? "hero-title-unforgettable" : "text-white"
              }`}
            >
              {line}
            </h1>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center max-w-2xl mt-6 text-gray-300 text-lg leading-relaxed"
        >
          Designing unforgettable event experiences that merge creativity,
          innovation, and emotion — crafted for brands that want to stand apart.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          <button className="px-8 py-3 rounded-full text-white font-semibold border border-white/30 hover:border-white backdrop-blur-md hover:bg-white/15 transition-all duration-500">
            Explore Services
          </button>
          <button className="px-8 py-3 rounded-full text-white font-semibold border border-white/30 hover:border-white backdrop-blur-md hover:bg-white/15 transition-all duration-500">
            View Work
          </button>
        </motion.div>
      </div>

      {/* Floating Blurred Shapes */}
      <div className="absolute w-[320px] h-[320px] bg-gradient-to-tr from-red-500/20 to-blue-500/20 blur-[120px] rounded-full top-16 right-20 animate-pulse z-[0]" />
      <div className="absolute w-[260px] h-[260px] bg-gradient-to-tr from-blue-500/20 to-pink-500/20 blur-[100px] rounded-full bottom-16 left-16 animate-pulse z-[0]" />
    </section>
  );
};

export default HeroSection;
