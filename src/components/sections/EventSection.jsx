import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollMorph from "../../hooks/useScrollMorph";

// Video imports
import main from "../../assets/videos/1.mp4";
import corporate from "../../assets/videos/corporate.mp4";
import mall from "../../assets/videos/mall.mp4";
import market from "../../assets/videos/market.mp4";
import advertisement from "../../assets/videos/bike.mp4";
import ScrollFloat from "../ui/ScrollFloat";
import HoverRevealCard from "../ui/HoverRevealCard";

const EventSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Apply scroll morph effect to the section
  useScrollMorph(sectionRef, {
    borderRadius: "50px",
    scale: 1.02,
    start: "top bottom",
    end: "bottom top",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Enhanced animations for video sections
    gsap.utils.toArray(".video-overview").forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
          rotationY: 10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const videos = {
    corporate,
    mall,
    market,
    advertisement,
    product: advertisement,
  };

  const handleNavigate = (type) => {
    navigate(`/service/${type}`);
  };

  const services = [
    {
      id: "01",
      label: "Corporate Events",
      heading: "Turning corporate visions into unforgettable realities.",
      type: "corporate",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    },
    {
      id: "02",
      label: "Mall Activations",
      heading: "Turning Crowds into Customers.",
      type: "mall",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      id: "03",
      label: "Product Advertising",
      heading: "Where Movement Meets Marketing",
      type: "product",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    },
    {
      id: "04",
      label: "Market Activations",
      heading: "Where Movement Meets Marketing",
      type: "market",
      image: "https://images.unsplash.com/photo-1445384763658-0400939829cd",
    },
    {
      id: "05",
      label: "Advertising",
      heading: "Smart Advertising. Real Results.",
      type: "advertisement",
      image: "https://images.unsplash.com/photo-1462826303086-329426d1aef5",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="mt-[2rem] relative max-md:rounded-none bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white p-40 max-lg:p-8 max-md:py-20 overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 mix-blend-overlay animate-pulse"></div>
      </div>

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

      {/* Creative Grid Layout for Services */}
      <div className="mt-[4rem] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={service.id} className="video-overview">
            <HoverRevealCard
              image={service.image}
              title={service.label}
              description={service.heading}
              delay={index * 100}
            />

            <div className="flex gap-2 items-center mt-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="small uppercase tracking-wider">
                {service.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-20 pt-10 border-t border-white/20">
        <p className="medium mb-6">Ready to bring your vision to life?</p>
        <button
          onClick={() => navigate("/services")}
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 magnetic-btn"
        >
          Explore All Services
          <i className="ri-arrow-right-line ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default EventSection;
