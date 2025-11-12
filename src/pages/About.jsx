import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverRevealCard from "../components/ui/HoverRevealCard";
import useScrollMorph from "../hooks/useScrollMorph";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);

  // Apply scroll morph
  useScrollMorph(heroRef, { borderRadius: "60px", scale: 1.01 });

  useEffect(() => {
    // Counter animation
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

    // Stagger team animation
    gsap.utils.toArray(".team-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotationY: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
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
    });
  }, []);

  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328f1a49",
      name: "Mukesh Kumar",
      role: "Founder & CEO",
      description: "Visionary leader with 10+ years in event management",
    },
    {
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      name: "Deepak Sharma",
      role: "Co-Founder & COO",
      description: "Operations expert ensuring flawless execution",
    },
    {
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      name: "Ashish Jain",
      role: "Co-Founder & CMO",
      description: "Creative strategist driving brand partnerships",
    },
  ];

  const values = [
    { icon: "ri-team-line", title: "Collaboration", description: "Working together to achieve extraordinary results" },
    { icon: "ri-lightbulb-flash-line", title: "Innovation", description: "Pushing boundaries with creative solutions" },
    { icon: "ri-heart-line", title: "Passion", description: "Driven by love for creating memorable experiences" },
    { icon: "ri-award-line", title: "Excellence", description: "Committed to delivering the highest quality" },
  ];

  const stockVideo = "https://player.vimeo.com/external/566246469.sd.mp4?s=bddf87cf9345ab4c3de24ff44e54e95ea058edcf&profile_id=164&oauth2_token_id=57447761";

  return (
    <div className="flex flex-col px-20 max-lg:px-4 gap-20">
      {/* Hero Section */}
      <div ref={heroRef} className="mlarge font-bold flex flex-col gap-5 mt-[12rem] max-md:mt-[6rem] justify-center items-center bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 rounded-4xl p-20 max-md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full animate-float-slow"></div>
        <h1 className="leading-none max-md:text-left text-center tracking-tight w-[76%] max-md:w-full flex flex-wrap justify-center items-center gap-2">
          We Plan Magic,
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
            You Enjoy The Moment
          </span>
        </h1>
        <p className="medium max-md:w-full font-medium w-[60%] text-center max-md:text-left leading-none opacity-90">
          Crafting unforgettable experiences through creativity, precision, and passion since 2010.
        </p>
        <div className="relative vid flex justify-center w-full mt-[5rem] h-[80vh] max-md:h-[40vh] overflow-hidden rounded-3xl">
          <video className="h-full rounded-3xl w-[100%] object-cover shadow-2xl" src={stockVideo} autoPlay loop muted></video>
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-white text-center medium">"Creating moments that matter, experiences that last"</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="p-20 max-lg:p-3 bg-gradient-to-br from-gray-50 to-white rounded-4xl">
        <div className="text-center mb-16">
          <h2 className="mmedium font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Meet Our Visionaries</h2>
          <p className="medium text-gray-600 max-w-2xl mx-auto">The passionate minds behind Dam Craft Events, dedicated to transforming your vision into reality.</p>
        </div>
        <div className="mt-[2rem] grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card group">
              <HoverRevealCard image={member.image} title={member.name} description={member.role} delay={index * 100} />
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="min-h-[80vh] px-20 max-lg:px-2 gap-8 flex flex-col justify-between bg-gradient-to-br from-blue-50 to-purple-50 rounded-4xl p-12">
        <div className="flex justify-between max-md:gap-5 max-md:flex-col">
          <div className="flex gap-2 items-center h-fit">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-[12px] w-[12px] rounded-full"></div>
            <p className="uppercase small font-semibold">Our Values</p>
          </div>
          <h1 className="medium w-[60%] max-md:w-full max-md:text-start text-end leading-none bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">The principles that guide every event we create.</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="service-item text-center group p-6 rounded-3xl bg-white shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <i className={`${value.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-lg font-bold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex px-20 max-lg:px-2 py-20 max-lg:py-10 gap-40 max-md:gap-5 max-md:flex-col bg-gradient-to-br from-gray-900 to-black text-white rounded-4xl p-12">
        <div className="flex gap-2 items-center h-fit">
          <p className="uppercase small font-semibold text-green-400">Our Impact</p>
        </div>
        <div className="w-[62%] max-md:w-full">
          <h1 className="medium leading-relaxed opacity-90">
            We create unforgettable events with passion and precision.
          </h1>
          <div className="grid grid-cols-3 gap-8 mt-[4rem] max-md:grid-cols-1">
            <div className="stat-item text-center">
              <h1 className="mlarge counter text-green-400" data-target="40">0+</h1>
              <p className="medium opacity-90">Team Members</p>
            </div>
            <div className="stat-item text-center">
              <h1 className="mlarge counter text-green-400" data-target="400">0+</h1>
              <p className="medium opacity-90">Events Completed</p>
            </div>
            <div className="stat-item text-center">
              <h1 className="mlarge text-green-400">10+ Years</h1>
              <p className="medium opacity-90">Of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
