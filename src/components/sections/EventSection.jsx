import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiArrowRightLine, RiPlayLargeFill } from "@remixicon/react";

// Video imports
import corporate from "../../assets/videos/corporate.mp4";
import mall from "../../assets/videos/mall.mp4";
import market from "../../assets/videos/market.mp4";
import advertisement from "../../assets/videos/bike.mp4";
import ScrollFloat from "../ui/ScrollFloat";

const EventSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Simple fade-in animations for each service
    gsap.utils.toArray(".service-item").forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Animate video containers on hover
    gsap.utils.toArray(".video-container").forEach((videoContainer) => {
      videoContainer.addEventListener("mouseenter", () => {
        gsap.to(videoContainer, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      videoContainer.addEventListener("mouseleave", () => {
        gsap.to(videoContainer, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  const services = [
    {
      id: "01",
      label: "Corporate Events",
      heading: "Turning corporate visions into unforgettable realities.",
      type: "corporate",
      video: corporate,
      color: "#3b82f6"
    },
    {
      id: "02",
      label: "Mall Activations",
      heading: "Turning Crowds into Customers.",
      type: "mall", 
      video: mall,
      color: "#8b5cf6"
    },
    {
      id: "03",
      label: "Product Advertising",
      heading: "Where Movement Meets Marketing",
      type: "product",
      video: advertisement,
      color: "#ec4899"
    },
    {
      id: "04",
      label: "Market Activations", 
      heading: "Creating Buzz in Market Spaces",
      type: "market",
      video: market,
      color: "#06b6d4"
    },
  ];

  // Text reveal animation component
  const RevealText = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-gray-900/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            textClassName="text-white"
          >
            Our Innovative Efforts
          </ScrollFloat>
          
          <RevealText delay={0.2}>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Transforming ordinary events into extraordinary experiences through innovative solutions and creative execution.
            </p>
          </RevealText>
        </div>

        {/* Services Grid - Vertical Stack */}
        <div className="space-y-30 lg:space-y-40">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`service-item grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Video Section */}
              <div className={`video-container ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <motion.div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <video
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-64 lg:h-96 object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
                      <RiPlayLargeFill size={16} />
                      Play
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Content Section */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="text-white">
                  <div className="flex gap-3 items-center mb-6">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: service.color }}
                    ></div>
                    <span className="text-sm uppercase tracking-wider font-semibold text-gray-300">
                      {service.label}
                    </span>
                    <span className="text-2xl font-black text-gray-400">/{service.id}</span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                    {service.heading}
                  </h3>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                    We create immersive experiences that transform ordinary events into extraordinary memories. 
                    Every detail is crafted to perfection, ensuring your vision comes to life.
                  </p>
                  
                  <motion.button
                    onClick={() => navigate(`/service/${service.type}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 group"
                  >
                    Learn More
                    <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <RevealText delay={0.5}>
          <div className="text-center mt-20 pt-20 border-t border-white/20">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">Ready to bring your vision to life?</h3>
            <p className="text-gray-300 mb-8 text-lg">Let's create something extraordinary together</p>
            <motion.button
              onClick={() => navigate("/services")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              Explore All Services
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </RevealText>
      </div>
    </section>
  );
};

export default EventSection;