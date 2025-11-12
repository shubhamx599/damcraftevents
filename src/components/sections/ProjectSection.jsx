import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiArrowRightLine,
  RiPlayLargeFill,
  RiStarFill,
  RiUserHeartLine,
  RiCalendarEventLine,
  RiTeamLine,
} from "@remixicon/react";
import ScrollFloat from "../ui/ScrollFloat";

// Service Card Component
const ServiceCard = ({ title, description, videoSrc, index, isFeatured = false }) => {
  const cardRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;

    const handleEnter = () => {
      if (video) video.play();
      gsap.to(card, { y: -10, scale: 1.02, duration: 0.3, ease: "power2.out" });
    };

    const handleLeave = () => {
      if (video) video.pause();
      gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    if (card) {
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer ${isFeatured ? "lg:col-span-2" : ""}`}
    >
      <div className="relative h-80 lg:h-96">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                Service {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{title}</h3>
            <p className="text-white/70 leading-relaxed mb-6">{description}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 w-fit"
            >
              Explore <RiArrowRightLine size={16} />
            </motion.button>
          </div>
        </div>

        {/* Play Icon */}
        <div className="absolute top-6 right-6 bg-black/60 text-white p-3 rounded-full backdrop-blur-sm border border-white/20">
          <RiPlayLargeFill size={20} />
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Featured Service
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ number, label, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
  >
    <div className="flex justify-center mb-4">
      <div className="p-4 rounded-2xl bg-white/10">
        <Icon size={32} className="text-red-500" />
      </div>
    </div>
    <h3 className="text-4xl lg:text-5xl font-black text-white mb-2">{number}</h3>
    <p className="text-gray-300 text-lg font-medium">{label}</p>
  </motion.div>
);

const ProjectSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

  const services = [
    {
      title: "Corporate Events",
      description: "Professional conferences, product launches, and corporate gatherings that leave lasting impressions.",
      video: "https://www.pexels.com/download/video/12695736/",
      featured: true,
    },
    {
      title: "Social Celebrations",
      description: "Memorable birthdays, anniversaries, and private parties crafted with personal touch.",
      video: "https://www.pexels.com/download/video/34594434/",
      featured: false,
    },
    {
      title: "Brand Activations",
      description: "Engaging mall and market activations that turn audiences into loyal customers.",
      video: "https://www.pexels.com/download/video/7722222/",
      featured: false,
    },
    {
      title: "Entertainment Shows",
      description: "Spectacular concerts, live performances, and entertainment events that captivate audiences.",
      video: "https://www.pexels.com/download/video/7647630/",
      featured: false,
    },
    {
      title: "Talent Management",
      description: "Professional anchors, influencers, and celebrity collaborations for your events.",
      video: "https://www.pexels.com/download/video/7647795/",
      featured: false,
    },
  ];

  const stats = [
    { number: "400+", label: "Events Executed", icon: RiCalendarEventLine },
    { number: "50+", label: "Happy Clients", icon: RiUserHeartLine },
    { number: "10+", label: "Years Experience", icon: RiStarFill },
    { number: "40+", label: "Team Members", icon: RiTeamLine },
  ];

  const RevealText = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white overflow-hidden py-28">
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03} textClassName="text-white">
            Our Premium Services
          </ScrollFloat>

          <RevealText delay={0.2}>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Experience the difference with our comprehensive event solutions. From intimate gatherings to grand celebrations, we bring your vision to life with unmatched creativity and precision.
            </p>
          </RevealText>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-28">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              videoSrc={service.video}
              index={index}
              isFeatured={service.featured}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-28">
          <RevealText delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Trusted by <span className="text-red-500">Industry Leaders</span>
              </h2>
              <p className="text-xl text-gray-300">Our track record speaks for itself</p>
            </div>
          </RevealText>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} number={stat.number} label={stat.label} icon={stat.icon} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <RevealText delay={0.3}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Create Magic Together?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's transform your ideas into unforgettable experiences that will be remembered for years to come.
                </p>
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  Start Your Project
                  <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
};

export default ProjectSection;
