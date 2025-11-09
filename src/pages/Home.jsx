import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import main from "../assets/videos/1.mp4";
import head from "../assets/videos/head.mp4";
import ink from "../assets/videos/ink.mp4";
import EventSection from "../components/sections/EventSection";
import ProjectSection from "../components/sections/ProjectSection";
import ReadMoreButton from "../components/ui/ReadMoreButton";

const Home = () => {
  const location = useLocation();
  const heroRef = useRef(null);
  const floatingRef1 = useRef(null);
  const floatingRef2 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Floating animation for background elements
    gsap.to(floatingRef1.current, {
      y: -30,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(floatingRef2.current, {
      y: 40,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Enhanced video scroll animation
    if (location.pathname === "/") {
      const video = document.querySelector(".vid video");
      if (video) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: video,
            start: "top 80%",
            end: "top 20%",
            scrub: 2,
          },
        });

        tl.fromTo(
          video,
          { width: "90%", borderRadius: "50px" },
          { width: "100%", borderRadius: "30px" }
        );
      }
    }

    // Animate hero text with stagger
    const heroText = heroRef.current;
    if (heroText) {
      gsap.fromTo(
        heroText.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroText,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col gap-10">
      {/* Revolutionary Hero Section */}
      <div className="min-h-screen relative flex items-center justify-center px-20 max-lg:px-4 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 animated-gradient"></div>

        {/* Floating 3D Elements */}
        <div
          ref={floatingRef1}
          className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full mix-blend-overlay opacity-20"
        ></div>
        <div
          ref={floatingRef2}
          className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500 rounded-full mix-blend-overlay opacity-30"
        ></div>

        {/* Glass Morphism Overlay */}
        <div className="absolute inset-0 glass-effect"></div>

        {/* Main Hero Content */}
        <div ref={heroRef} className="relative z-10 text-center text-white">
          <h1 className="large font-bold mb-6 leading-none">
            WE CREATE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse">
              UNFORGETTABLE
            </span>
            EXPERIENCES
          </h1>

          {/* Interactive Tagline */}
          <div className="inline-block border border-white/30 rounded-full px-6 py-3 backdrop-blur-sm mb-8 glass-effect">
            <p className="medium">Event Management Reimagined</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Explore Services
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-sm">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Creative Grid */}
      <div className="px-20 max-md:px-4">
        <div className="creative-grid gap-8 py-16">
          <div className="grid-item-large bg-black text-white rounded-3xl p-8">
            <h3 className="mlarge font-bold text-green-400 mb-4">400+</h3>
            <p className="medium">Successful Events Delivered</p>
            <p className="small mt-2 text-gray-300">
              From corporate conferences to brand activations
            </p>
          </div>

          <div className="grid-item-small bg-gradient-to-br from-green-500 to-green-600 text-white rounded-3xl p-6">
            <h3 className="mmedium font-bold">50+</h3>
            <p className="small mt-2">Happy Clients</p>
          </div>

          <div className="grid-item-medium bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-6">
            <h3 className="mmedium font-bold">10+</h3>
            <p className="small mt-2">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Main Video Section */}
      <div className="max-md:mt-[1rem] px-20 max-md:px-4 mt-[3rem]">
        <div className="relative vid flex justify-center h-[80vh] max-md:h-[40vh] overflow-hidden">
          <video
            className="h-full rounded-4xl w-[80%] object-cover shadow-2xl"
            src={main}
            autoPlay
            loop
            muted
            data-cursor-size="60"
            data-cursor-text="PLAY"
          ></video>
        </div>
      </div>

      {/* Ink Section with Creative Layout */}
      <div className="min-h-[100vh] max-lg:h-fit px-20 max-md:px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 max-lg:flex-col flex gap-10 justify-between items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        </div>

        <div className="w-[50%] max-md:hidden max-lg:w-full max-w-3xl rounded-4xl overflow-hidden shadow-2xl">
          <video
            src={ink}
            data-cursor-size="60"
            className="w-full h-full object-cover rounded-3xl"
            autoPlay
            loop
            muted
          />
        </div>

        <div className="w-[50%] max-lg:w-full max-w-3xl overflow-hidden flex flex-col gap-5 text-white p-8 relative z-10">
          <h2 className="mmedium font-bold mb-4">
            Crafting Memories Since 2010
          </h2>
          <p className="text-xl max-md:w-full max-md:text-s leading-snug">
            Since 2010, we have been helping people plan and enjoy events of all
            kinds. From small family functions to big celebrations, we focus on
            making everything smooth and stress-free. Our team takes care of the
            details, so our clients can relax and enjoy the moment.
            <br />
            <br />
            Over the years, we have created events that people remember with
            happiness. We listen to what our clients want and turn their ideas
            into reality. Every event is done with care, creativity, and
            passion. Our aim is simple — to make every occasion special and
            leave lasting memories.
          </p>
          <ReadMoreButton label="Our Story" to="/about" variant="secondary" />
        </div>
      </div>

      {/* Events Section */}
      <EventSection />
      <ProjectSection />
    </div>
  );
};

export default Home;
