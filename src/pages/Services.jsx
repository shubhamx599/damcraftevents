import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    const triggers = [];

    // Animate service items
    gsap.utils.toArray(".service-item").forEach((item, index) => {
      const anim = gsap.fromTo(
        item,
        { opacity: 0, y: 80, rotationY: 15, scale: 0.9 },
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
      triggers.push(anim.scrollTrigger);
    });

    // Animate counters
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      const st = ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => updateCounter(),
        once: true,
      });
      triggers.push(st);
    });

    // Cleanup GSAP triggers on unmount
    return () => {
      triggers.forEach((t) => t?.kill());
      ScrollTrigger.clearScrollMemory && ScrollTrigger.clearScrollMemory();
    };
  }, []);

  const majorProjects = [
    {
      title: "Corporate Events",
      img: "https://images.unsplash.com/photo-1595379990255-f2a49ef84216?w=600",
      description:
        "Conferences, corporate meets, product launches, seminars, and brand promotions with professional execution.",
      link: "/service/corporate",
      year: "2024",
    },
    {
      title: "Promotion & Activation",
      img: "https://images.unsplash.com/photo-1581093588401-37f0c8d84e8d?w=600",
      description:
        "Mall activations, market campaigns, road shows, and brand engagement activities.",
      link: "/service/mall",
      year: "2024",
    },
    {
      title: "Talent Engagement",
      img: "https://images.unsplash.com/photo-1555529771-2b82e7f55db1?w=600",
      description:
        "Anchors, hosts, supervisors, influencers, promoters, and celebrity management.",
      link: "/service/advertisement",
      year: "2024",
    },
    {
      title: "Advertising Solutions",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600",
      description:
        "Strategic brand promotion, digital campaigns, and creative advertising solutions.",
      link: "/service/advertisement",
      year: "2024",
    },
    {
      title: "Branding & Design",
      img: "https://images.unsplash.com/photo-1581092795368-5e1523a2b4d5?w=600",
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
      features: ["Strategy Development", "Budget Planning", "Timeline Management"],
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
      {/* Hero Section */}
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
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            loop
            muted
          ></video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
        {serviceCards.map((service, index) => (
          <div
            key={index}
            className="service-item group relative p-8 rounded-3xl bg-white shadow-xl overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            ></div>

            <div
              className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
            >
              <i className={`${service.icon} text-3xl text-white`}></i>
            </div>

            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <i className="ri-checkbox-circle-line text-green-500 mr-2"></i>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-6 bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Major Projects Section */}
      <section className="flex flex-col gap-10 py-20">
        <h2 className="mlarge font-bold text-center">Our Major Projects</h2>
        <p className="medium text-center max-w-2xl mx-auto opacity-80">
          A glimpse into some of our top-notch event and brand management projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {majorProjects.map((project, index) => (
            <div
              key={index}
              className="service-item group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-block text-blue-600 font-semibold hover:underline"
                >
                  Explore →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className="text-center py-16 bg-black text-white rounded-4xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 animate-pulse"></div>
        </div>

        <h2 className="mlarge font-bold mb-4">Our Impact in Numbers</h2>
        <p className="medium mb-12 max-w-2xl mx-auto opacity-90">
          Delivering exceptional results through creativity, dedication, and flawless execution.
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
    </div>
  );
};

export default Services;
