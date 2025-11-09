import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiArrowRightLine,
  RiFolderOpenLine,
} from "@remixicon/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 3D Background Component
const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#ff6b6b"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0.2}
        metalness={0.1}
      />
    </Sphere>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

    // Parallax effect for hero
    gsap.to(heroRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Floating elements animation
    gsap.to(".floating-element-1", {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".floating-element-2", {
      y: 40,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".floating-element-3", {
      x: 20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.div ref={titleRef} className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-none tracking-tight">
            <div className="hero-line">WE CREATE</div>
            <div className="hero-line unforgettable-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500">
              UNFORGETTABLE
            </div>
            <div className="hero-line">EXPERIENCES</div>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          ref={subtitleRef}
          className="inline-block border border-white/30 rounded-full px-6 py-3 backdrop-blur-sm mb-8 bg-white/10 border-white/40"
        >
          <p className="text-base md:text-lg font-medium">
            Event Management Reimagined
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={() => navigate("/services")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 group transition-all duration-300"
            data-cursor-size="60"
            data-cursor-text="🚀 EXPLORE"
          >
            <span>Explore Services</span>
            <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          <motion.button
            onClick={() => navigate("/work")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 group transition-all duration-300"
            data-cursor-size="60"
            data-cursor-text="📁 VIEW"
          >
            <span>View Portfolio</span>
            <RiFolderOpenLine className="group-hover:scale-110 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/80 text-sm font-medium">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;