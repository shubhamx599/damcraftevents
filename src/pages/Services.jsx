import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import main from "../assets/videos/1.mp4";
import MajorProjectItem from "../components/ui/MajorProjectItem";
import corporate from "../assets/images/corporate.jpg";
import HoverRevealCard from "../components/ui/HoverRevealCard";
import useScrollMorph from "../hooks/useScrollMorph";

const Services = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  // Apply scroll morph to hero section
  useScrollMorph(heroRef, {
    borderRadius: "80px",
    scale: 1.02,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Enhanced animations for service items
    gsap.utils.toArray(".service-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 80,
          rotationY: 15,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate stats counter with creative effects
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current) + "+";
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + "+";
        }
      };

      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => updateCounter(),
        once: true,
      });
    });
  }, []);

  const majorProjects = [
    {
      title: "Corporate Events",
      img: corporate,
      description:
        "Conferences, corporate meets, product launches, seminars, and brand promotions with professional execution.",
      link: "/service/corporate",
      year: "2024",
    },
    {
      title: "Promotion & Activation",
      img: "https://images.unsplash.com/photo-1746185766852-8f4dfa81c879?w=600",
      description:
        "Mall activations, market campaigns, road shows, and brand engagement activities.",
      link: "/service/mall",
      year: "2024",
    },
    {
      title: "Talent Engagement",
      img: "https://images.unsplash.com/photo-1726137569914-ae2ad1c634f6?w=600",
      description:
        "Anchors, hosts, supervisors, influencers, promoters, and celebrity management.",
      link: "/service/advertisement",
      year: "2024",
    },
    {
      title: "Advertising Solutions",
      img: "https://images.unsplash.com/photo-1745953130391-10158d7562ab?w=600",
      description:
        "Strategic brand promotion, digital campaigns, and creative advertising solutions.",
      link: "/service/advertisement",
      year: "2024",
    },
    {
      title: "Branding & Design",
      img: "https://images.unsplash.com/photo-1745953130391-10158d7562ab?w=600",
      description:
        "Vinyl pasting, stage design, venue branding, and complete visual identity solutions.",
      link: "/service/corporate",
      year: "2024",
    },
  ];

  const serviceCards = [
    {
      icon: "ri-calendar-event-line",
      title: "Event Planning",
      description: "Complete event strategy and meticulous planning",
      color: "from-green-500 to-blue-500",
      features: [
        "Strategy Development",
        "Budget Planning",
        "Timeline Management",
      ],
    },
    {
      icon: "ri-megaphone-line",
      title: "Brand Activation",
      description: "Engaging brand experiences and activations",
      color: "from-purple-500 to-pink-500",
      features: ["Mall Activations", "Road Shows", "Public Engagement"],
    },
    {
      icon: "ri-team-line",
      title: "Talent Management",
      description: "Professional talent solutions",
      color: "from-orange-500 to-red-500",
      features: ["Anchors & Hosts", "Influencers", "Celebrity Management"],
    },
  ];

  return (
    <div className="flex flex-col px-20 max-lg:px-4 gap-20">
      {/* Revolutionary Hero Section */}
      <div
        ref={heroRef}
        className="mlarge font-bold flex flex-col gap-5 mt-[12rem] max-md:mt-[6rem] justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-4xl p-20 max-md:p-8 text-white"
      >
        <h1 className="leading-none max-md:text-left text-center tracking-tight w-[76%] max-md:w-full flex flex-wrap justify-center items-center gap-2">
          Comprehensive Event
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
            Solutions
          </span>
          That Inspire
        </h1>

        <p className="medium max-md:w-full font-medium w-[60%] text-center max-md:text-left leading-none opacity-90">
          From concept to execution, we deliver end-to-end event management
          services that create lasting impressions and drive meaningful results.
        </p>

        <div className="relative vid flex justify-center w-full mt-[5rem] h-[80vh] max-md:h-[40vh] overflow-hidden rounded-3xl">
          <video
            className="h-full rounded-3xl w-[100%] object-cover shadow-2xl"
            src={main}
            autoPlay
            loop
            muted
          ></video>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
        </div>
      </div>

      {/* Creative Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
        {serviceCards.map((service, index) => (
          <div
            key={index}
            className="service-item group relative p-8 rounded-3xl bg-white shadow-xl overflow-hidden"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            ></div>

            {/* Animated Icon */}
            <div
              className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
            >
              <i className={`${service.icon} text-3xl text-white`}></i>
            </div>

            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Hover Action */}
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Major Services Section */}
      <div className="major h-fit leading-[0.9] mt-20 max-md:mt-7 p-[3rem] font-extrabold bg-gradient-to-br from-gray-50 to-white rounded-4xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="py-[1rem] mmedium text-stroke w-fit">
            Our Core Services
          </h1>
          <div className="flex gap-2">
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
              Filter
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
              Sort
            </button>
          </div>
        </div>

        {majorProjects.map((proj, i) => (
          <a key={i} href={proj.link || "#"} className="service-item block">
            <MajorProjectItem {...proj} />
          </a>
        ))}
      </div>

      {/* Creative Process Section */}
      <div className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 rounded-4xl p-12">
        <h2 className="mlarge font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Our Creative Process
        </h2>

        <div className="grid grid-cols-4 gap-8 max-md:grid-cols-1">
          {[
            {
              icon: "ri-lightbulb-flash-line",
              title: "Concept",
              desc: "Creative ideation and strategy development",
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: "ri-planning-line",
              title: "Planning",
              desc: "Detailed planning and resource allocation",
              color: "from-green-400 to-blue-500",
            },
            {
              icon: "ri-tools-line",
              title: "Execution",
              desc: "Flawless implementation and management",
              color: "from-purple-400 to-pink-500",
            },
            {
              icon: "ri-star-smile-line",
              title: "Delivery",
              desc: "Exceptional results and client satisfaction",
              color: "from-blue-400 to-purple-500",
            },
          ].map((step, index) => (
            <div key={index} className="service-item text-center group">
              {/* Step Number */}
              <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                {index + 1}
              </div>

              {/* Animated Icon */}
              <div
                className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}
              >
                <i className={`${step.icon} text-2xl text-white`}></i>
              </div>

              <h3 className="medium font-semibold mb-2">{step.title}</h3>
              <p className="small text-gray-600">{step.desc}</p>

              {/* Connecting Line */}
              {index < 3 && (
                <div className="hidden md:block absolute top-12 right-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-100 transform translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div
        ref={statsRef}
        className="text-center py-16 bg-black text-white rounded-4xl relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 animate-pulse"></div>
        </div>

        <h2 className="mlarge font-bold mb-4">Our Impact in Numbers</h2>
        <p className="medium mb-12 max-w-2xl mx-auto opacity-90">
          Delivering exceptional results through creativity, dedication, and
          flawless execution.
        </p>

        <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1 relative z-10">
          {[
            { number: "400", label: "Events Completed", suffix: "+" },
            { number: "50", label: "Happy Clients", suffix: "+" },
            { number: "10", label: "Years Experience", suffix: "+" },
            { number: "40", label: "Team Members", suffix: "+" },
          ].map((stat, index) => (
            <div key={index} className="service-item">
              <h3 className="mlarge font-bold text-green-400 mb-2">
                <span className="counter" data-target={stat.number}>
                  0
                </span>
                {stat.suffix}
              </h3>
              <p className="medium opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="text-center py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-4xl relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-float-slow"></div>

        <h2 className="mlarge font-bold mb-4">Ready to Get Started?</h2>
        <p className="medium mb-8 max-w-2xl mx-auto opacity-90">
          Let's discuss your event requirements and create something
          extraordinary together.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#contact"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            Start Your Project
          </a>
          <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
