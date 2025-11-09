import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import twogoodgo from "../../assets/videos/twogoodgo.mp4";
import obys from "../../assets/videos/obys.mp4";
import ScrollFloat from "../ui/ScrollFloat";
import ReadMoreButton from "../ui/ReadMoreButton";
import HoverRevealCard from "../ui/HoverRevealCard";

// Enhanced Service Video Component with 3D Effects
const ServiceVideo = ({ videoSrc, title, description, delay = 0 }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    const handleEnter = () => {
      if (video) video.play();

      gsap.to(container, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(video, {
        filter: "brightness(1.2) contrast(1.1)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      if (video) video.pause();

      gsap.to(container, {
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(video, {
        filter: "brightness(1) contrast(1)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    if (container) {
      container.addEventListener("mouseenter", handleEnter);
      container.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleEnter);
        container.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="service-video-item group relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        className="w-full h-80 object-cover transition-all duration-700"
        data-cursor-size="60"
        data-cursor-text="WATCH"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
        <div className="text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-white/90 leading-relaxed">{description}</p>

          {/* Action Button */}
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Explore Service
          </button>
        </div>
      </div>

      {/* Top Badge */}
      <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        Featured
      </div>
    </div>
  );
};

// Main Services Section
const ProjectSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Creative entrance animation for service items
    gsap.utils.toArray(".service-video-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 100,
          rotationX: 10,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effect for background
    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 100%",
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
      video: twogoodgo,
      title: "Corporate Events",
      description:
        "Conferences, corporate meet, product launches, seminars, brand promotions",
      delay: 0,
    },
    {
      video: obys,
      title: "Social Events",
      description:
        "Anniversaries, birthdays, private parties, and personal celebrations",
      delay: 100,
    },
    {
      video: obys,
      title: "Concerts & Entertainment",
      description:
        "Artist management, stage shows, live performances, and entertainment events",
      delay: 200,
    },
    {
      video: twogoodgo,
      title: "Brand Promotions",
      description:
        "Mall & market activations, expos, product displays, and brand engagement",
      delay: 300,
    },
    {
      video: obys,
      title: "Talent Management",
      description:
        "Anchors, hosts, supervisors, influencers, promoters, and celebrity collaborations",
      delay: 400,
    },
    {
      video: obys,
      title: "Event Coordination",
      description:
        "Real-time supervision, logistics management, and flawless execution",
      delay: 500,
    },
  ];

  return (
    <div
      ref={sectionRef}
      id="services"
      className="relative px-40 font-semibold w-full flex flex-col gap-20 max-lg:px-4 py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      {/* Animated Header */}
      <div className="text-center">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Our Comprehensive Services
        </ScrollFloat>

        <p className="medium text-gray-600 mt-4 max-w-2xl mx-auto">
          From concept to execution, we deliver end-to-end event solutions that
          create unforgettable experiences and drive meaningful results.
        </p>
      </div>

      {/* Creative Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {services.map((service, index) => (
          <ServiceVideo
            key={index}
            videoSrc={service.video}
            title={service.title}
            description={service.description}
            delay={service.delay}
          />
        ))}
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-4 gap-8 py-16 max-md:grid-cols-2 max-sm:grid-cols-1">
        {[
          {
            number: "400+",
            label: "Events Completed",
            color: "from-green-500 to-blue-500",
          },
          {
            number: "50+",
            label: "Happy Clients",
            color: "from-purple-500 to-pink-500",
          },
          {
            number: "10+",
            label: "Years Experience",
            color: "from-orange-500 to-red-500",
          },
          {
            number: "40+",
            label: "Team Members",
            color: "from-blue-500 to-purple-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="service-video-item text-center p-6 rounded-3xl bg-white shadow-lg"
          >
            <h3
              className={`mlarge font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
            >
              {stat.number}
            </h3>
            <p className="medium text-gray-600 mt-2">{stat.label}</p>
            <div
              className={`w-12 h-1 bg-gradient-to-r ${stat.color} mx-auto mt-3 rounded-full`}
            ></div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="mmedium font-bold mb-4">
            Ready to Transform Your Vision into Reality?
          </h2>
          <p className="medium mb-8 opacity-90">
            Let's collaborate to create an unforgettable experience that exceeds
            your expectations.
          </p>
          <ReadMoreButton
            label="Start Your Project"
            to="/services"
            variant="secondary"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
