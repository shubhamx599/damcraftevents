import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gallery from "../components/sections/Gallery";
import main from "../assets/videos/1.mp4";
import HoverRevealCard from "../components/ui/HoverRevealCard";
import useScrollMorph from "../hooks/useScrollMorph";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef = useRef(null);

  useScrollMorph(heroRef, {
    borderRadius: "70px",
    scale: 1.02,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Creative animations for filter buttons
    gsap.utils.toArray(".filter-btn").forEach((btn, index) => {
      gsap.fromTo(
        btn,
        {
          opacity: 0,
          x: -50,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: btn,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      title: "Corporate Conference 2024",
      category: "corporate",
      description: "Annual corporate meet with 500+ attendees",
      year: "2024",
    },
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      title: "Mall Brand Activation",
      category: "mall",
      description: "Interactive brand experience in premium mall",
      year: "2024",
    },
    {
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
      title: "Product Launch Campaign",
      category: "advertising",
      description: "Nationwide product launch with influencers",
      year: "2023",
    },
    {
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      title: "Road Show Tour",
      category: "road",
      description: "Multi-city road show reaching 50K+ people",
      year: "2023",
    },
    {
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
      title: "Executive Summit",
      category: "corporate",
      description: "C-level executive networking event",
      year: "2023",
    },
    {
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      title: "Festival Activation",
      category: "mall",
      description: "Seasonal festival engagement program",
      year: "2023",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "corporate", label: "Corporate Events" },
    { id: "mall", label: "Mall Activations" },
    { id: "advertising", label: "Advertising" },
    { id: "road", label: "Road Shows" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <div className="flex flex-col px-20 max-lg:px-4 gap-20">
      {/* Enhanced Hero Section */}
      <div
        ref={heroRef}
        className="mlarge font-bold flex flex-col gap-5 mt-[12rem] max-md:mt-[6rem] justify-center items-center bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 rounded-4xl p-20 max-md:p-8 text-white relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-float-slow"></div>

        <h1 className="leading-none max-md:text-left text-center tracking-tight w-[76%] max-md:w-full flex flex-wrap justify-center items-center gap-2">
          Our Creative
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
            Portfolio
          </span>
        </h1>

        <p className="medium max-md:w-full font-medium w-[60%] text-center max-md:text-left leading-none opacity-90">
          Explore our diverse range of successful events and campaigns that have
          left lasting impressions and driven real results.
        </p>

        <div className="relative vid flex justify-center w-full mt-[5rem] h-[80vh] max-md:h-[40vh] overflow-hidden rounded-3xl">
          <video
            className="h-full rounded-3xl w-[100%] object-cover shadow-2xl"
            src={main}
            autoPlay
            loop
            muted
          ></video>

          {/* Stats Overlay */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">400+</div>
                <div className="text-white/80 text-sm">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-white/80 text-sm">Clients</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-white/80 text-sm">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Filter Section */}
      <div className="text-center">
        <h2 className="mmedium font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Featured Work
        </h2>

        {/* Animated Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 magnetic-btn ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div key={index} className="service-item">
              <HoverRevealCard
                image={item.image}
                title={item.title}
                description={item.description}
                delay={index * 100}
              />
              <div className="mt-4 text-left">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {item.year}
                  </span>
                </div>
                <p className="text-gray-600">{item.description}</p>
                <div className="flex items-center mt-3">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-search-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500">
              Try selecting a different filter category
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-3 gap-8 py-20 max-md:grid-cols-1 max-md:py-10 bg-gradient-to-br from-gray-50 to-white rounded-4xl p-12">
        <div className="text-center service-item">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-calendar-check-line text-2xl text-white"></i>
          </div>
          <h3 className="mlarge font-bold text-green-600">400+</h3>
          <p className="medium text-gray-600">Events Completed</p>
        </div>
        <div className="text-center service-item">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-smile-line text-2xl text-white"></i>
          </div>
          <h3 className="mlarge font-bold text-green-600">50+</h3>
          <p className="medium text-gray-600">Happy Clients</p>
        </div>
        <div className="text-center service-item">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-award-line text-2xl text-white"></i>
          </div>
          <h3 className="mlarge font-bold text-green-600">10+</h3>
          <p className="medium text-gray-600">Years Experience</p>
        </div>
      </div>

      {/* Interactive Gallery Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black rounded-4xl p-12 text-white">
        <div className="text-center mb-16">
          <h2 className="mmedium font-bold mb-4 text-white">Visual Journey</h2>
          <p className="medium opacity-90 max-w-2xl mx-auto">
            Immerse yourself in our visual storytelling through captivating
            moments from our most memorable events.
          </p>
        </div>
        <Gallery />
      </div>

      {/* CTA Section */}
      <div className="text-center py-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-4xl text-white relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-white/5 rounded-full animate-float-slow"></div>

        <h2 className="mlarge font-bold mb-4">Inspired by Our Work?</h2>
        <p className="medium mb-8 max-w-2xl mx-auto opacity-90">
          Let's collaborate to create your next unforgettable experience that
          exceeds expectations.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 magnetic-btn">
            Start Your Project
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 magnetic-btn">
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Work;
