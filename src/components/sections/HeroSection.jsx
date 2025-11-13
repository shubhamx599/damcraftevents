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

      // Parallax scroll effect - only for desktop
      if (window.innerWidth >= 768) {
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
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[70vh] sm:min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 pt-30 sm:py-16 md:py-24 lg:py-32 lg:pt-36"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black/90 z-0" />

      {/* Main Content */}
      <div className="relative z-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Hero Text */}
        <div className="overflow-hidden space-y-2 sm:space-y-3 md:space-y-4 w-full">
          {["We Create", "Unforgettable", "Experiences"].map((line, i) => (
            <h1
              key={i}
              ref={(el) => (textLines.current[i] = el)}
              className={`hero-title text-center font-black drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] w-full leading-tight sm:leading-tight md:leading-normal lg:leading-normal
                ${
                  line === "Unforgettable"
                    ? "hero-title-unforgettable"
                    : "text-white"
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
          className="text-center w-full max-w-xs sm:max-w-md md:max-w-2xl mt-4 sm:mt-6 md:mt-8 text-gray-300 
            text-sm leading-relaxed
            sm:text-base sm:leading-relaxed
            md:text-lg md:leading-relaxed"
        >
          Designing unforgettable event experiences that merge creativity,
          innovation, and emotion — crafted for brands that want to stand apart.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 w-full"
        >
          <button className="w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3 rounded-full text-white font-semibold border border-white/30 hover:border-white backdrop-blur-md hover:bg-white/15 transition-all duration-500 text-sm sm:text-base">
            Explore Services
          </button>
          <button className="w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3 rounded-full text-white font-semibold border border-white/30 hover:border-white backdrop-blur-md hover:bg-white/15 transition-all duration-500 text-sm sm:text-base">
            View Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
