import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollDownIndicator from "../ui/ScrollDownIndicator";
import CustomButton from "../ui/CustomButton";

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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[85vh] sm:min-h-screen md:min-h-screen lg:min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-6 lg:px-8  pt-30 sm:pt-16 md:pt-24 lg:pt-39"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black/90 z-0" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
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
          <CustomButton
            label="Explore Services"
            variant="primary"
            size="medium"
            to="/services"
            onClick={() => console.log("Explore Services clicked")}
          />
          <CustomButton
            label="View Work"
            variant="secondary"
            size="medium"
            to="/work"
            onClick={() => console.log("View Work clicked")}
          />
        </motion.div>
      </div>
      <ScrollDownIndicator />
    </section>
  );
};

export default HeroSection;
