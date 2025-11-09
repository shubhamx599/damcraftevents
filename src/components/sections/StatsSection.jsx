import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiStarFill,
  RiUserHeartLine,
  RiCalendarEventLine,
  RiTeamLine,
  RiAwardLine,
} from "@remixicon/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 3D Floating Particles
const FloatingParticles = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.children.forEach((particle, index) => {
        particle.position.y =
          Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(12)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.05, 8, 8]}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 2,
          ]}
        >
          <meshBasicMaterial
            color={
              i % 3 === 0 ? "#ff6b6b" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6"
            }
            opacity={0.3}
            transparent
          />
        </Sphere>
      ))}
    </group>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const countRef = useRef();
  const hasPlus = value.includes("+");
  const numericValue = hasPlus ? value.replace("+", "") : value;

  useEffect(() => {
    const count = countRef.current;
    if (!count) return;

    let start = 0;
    const end = parseInt(numericValue);
    const increment = end / (duration * 60); // 60 FPS

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        count.textContent = hasPlus ? `${end}+` : value;
        clearInterval(timer);
      } else {
        count.textContent = hasPlus
          ? `${Math.floor(start)}+`
          : Math.floor(start).toString();
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration, hasPlus, numericValue]);

  return <span ref={countRef}>0{hasPlus && "+"}</span>;
};

// Individual Stat Card
const StatCard = ({ stat, index }) => {
  const cardRef = useRef();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationY: 10,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

      {/* Main Card */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500">
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur-md opacity-30" />
          <div className="relative bg-black/50 rounded-2xl p-4 w-16 h-16 mx-auto flex items-center justify-center border border-white/10">
            <stat.icon size={28} className="text-white" />
          </div>
        </div>

        {/* Animated Number */}
        <div className="mb-4">
          <h3 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            <AnimatedCounter value={stat.number} duration={2} />
          </h3>
        </div>

        {/* Label */}
        <p className="text-lg font-semibold text-white mb-2">{stat.label}</p>

        {/* Description */}
        {stat.description && (
          <p className="text-white/60 text-sm leading-relaxed">
            {stat.description}
          </p>
        )}

        {/* Animated Border */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-3/4 transition-all duration-500 rounded-full" />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef();

  useEffect(() => {
    // Parallax effect
    gsap.to(sectionRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const stats = [
    {
      number: "400+",
      label: "Successful Events",
      description: "Corporate conferences to brand activations",
      icon: RiCalendarEventLine,
    },
    {
      number: "50+",
      label: "Happy Clients",
      description: "Trusted by industry leaders",
      icon: RiUserHeartLine,
    },
    {
      number: "10+",
      label: "Years Experience",
      description: "Crafting memories since 2010",
      icon: RiAwardLine,
    },
    {
      number: "5",
      label: "Star Rating",
      description: "Excellence in every event",
      icon: RiStarFill,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-30 pb-0 bg-black text-white overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Canvas>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} />
          <FloatingParticles />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Impressive
            </span>{" "}
            Track Record
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Numbers that speak volumes about our commitment to excellence and
            dedication to creating unforgettable experiences
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom Pattern */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default StatsSection;
