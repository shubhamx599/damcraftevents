import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollMorph from "../hooks/useScrollMorph";

const interests = [
  "Corporate Event",
  "Market Activation",
  "Advertising",
  "Mall Activation",
  "Manager Meet",
  "Wedding Event",
  "Product Launch",
  "Brand Promotion",
  "Other",
];

const Contact = () => {

  const sectionRef = useRef(null);

  useScrollMorph(sectionRef, {
    borderRadius: "60px",
    scale: 1.01,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Creative entrance animation for contact section
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 100,
        rotationX: 10,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Floating animation for background elements
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="mt-[2rem] text-black font-sans px-20 max-lg:px-4 py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-4xl mx-4 relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="floating-element absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20"></div>
      <div className="floating-element absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
      <div className="floating-element absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-25"></div>

      {/* Header */}
      <div className="flex justify-between items-start gap-10 max-md:flex-col mb-16 relative z-10">
        <div>
          <div className="flex items-center gap-2 form-element">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 w-3 rounded-full"></div>
            <p className="uppercase text-sm font-semibold text-purple-600">
              Let's Create Together
            </p>
          </div>
        </div>
        <h1 className="normal font-light leading-tight text-end max-md:text-start max-w-2xl form-element bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Ready to create unforgettable experiences that leave lasting
          impressions?
        </h1>
      </div>

      <div className="flex gap-10 max-md:flex-col justify-between relative z-10">
        <div className="w-1/3 max-md:w-full">
          <div className="flex items-center gap-2 mb-4 form-element">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 w-3 rounded-full"></div>
            <p className="uppercase text-sm font-semibold text-purple-600">
              Get In Touch
            </p>
          </div>

          <h2 className="mt-4 normal font-light leading-tight form-element bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            We believe in the power of memorable events, and we love
            collaborating with brands that feel the same. Let's connect and
            create something extraordinary.
          </h2>

          {/* Contact Info */}
          <div className="mt-8 space-y-6 form-element">
            <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
              <p className="text-sm font-semibold text-purple-600 mb-1">
                EMAIL
              </p>
              <a
                href="mailto:damcraftevents@gmail.com"
                className="medium hover:text-purple-600 transition-colors"
              >
                damcraftevents@gmail.com
              </a>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
              <p className="text-sm font-semibold text-purple-600 mb-1">
                PHONE
              </p>
              <a
                href="tel:+918527846574"
                className="medium hover:text-purple-600 transition-colors"
              >
                +91 8527846574
              </a>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
              <p className="text-sm font-semibold text-purple-600 mb-1">
                ADDRESS
              </p>
              <p className="medium">
                Building B-22, Jhilmil Industrial Area, Delhi-110092
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8 form-element">
            {[
              { platform: "instagram", color: "from-purple-500 to-pink-500" },
              { platform: "facebook", color: "from-blue-500 to-blue-600" },
              { platform: "linkedin", color: "from-blue-400 to-blue-500" },
              { platform: "twitter", color: "from-blue-400 to-cyan-400" },
            ].map((social) => (
              <a
                key={social.platform}
                href={`https://${social.platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-gradient-to-r ${social.color} text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg`}
                aria-label={social.platform}
              >
                <i className={`ri-${social.platform}-line text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
