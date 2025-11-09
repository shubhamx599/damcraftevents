import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import suz from "../../assets/logos/suz.svg";
import tvs from "../../assets/logos/tvs.svg";
import yamaha from "../../assets/logos/yamaha.svg";
import disney from "../../assets/logos/disney.svg";
import offroad from "../../assets/logos/offroad.svg";
import trimuph from "../../assets/logos/trimuph.svg";
import deloitte from "../../assets/logos/deloitte.svg";
import urban from "../../assets/logos/urban.svg";

const logos = [
  { src: suz, alt: "Suzuki logo", name: "Suzuki" },
  { src: tvs, alt: "TVS logo", name: "TVS" },
  { src: yamaha, alt: "Yamaha logo", name: "Yamaha" },
  { src: disney, alt: "Disney logo", name: "Disney" },
  { src: offroad, alt: "Offroad logo", name: "Offroad" },
  { src: trimuph, alt: "Triumph logo", name: "Triumph" },
  { src: deloitte, alt: "Deloitte logo", name: "Deloitte" },
  { src: urban, alt: "Urban logo", name: "Urban Company" },
];

const Logo = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Creative staggered animation for logos
    gsap.utils.toArray('.logo-item').forEach((logo, index) => {
      gsap.fromTo(logo, {
        opacity: 0,
        y: 100,
        rotationY: 90,
        scale: 0.5
      }, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 1,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: logo,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Floating animation for the entire section
    gsap.to(sectionRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div ref={sectionRef} className="w-full px-20 max-lg:px-4 py-20 bg-gradient-to-br from-gray-50 to-white rounded-4xl mx-4">
      <div className="text-center mb-16">
        <div className="inline-block border border-gray-300 rounded-full px-6 py-2 mb-4">
          <p className="small uppercase tracking-wider text-gray-600">Trusted By</p>
        </div>
        <h2 className="mmedium font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Industry Leaders Worldwide
        </h2>
        <p className="medium text-gray-600 max-w-2xl mx-auto">
          Collaborating with renowned brands to deliver exceptional event experiences that create lasting impact.
        </p>
      </div>

      {/* Creative Logo Grid with Hover Effects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-md:gap-6 items-center justify-items-center relative">
        {logos.map((logo, idx) => (
          <div 
            key={idx} 
            className="logo-item flex flex-col items-center justify-center group cursor-pointer p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift relative overflow-hidden"
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient group-hover:from-purple-500 group-hover:to-blue-500 rounded-3xl transition-all duration-500"></div>
            
            <div className="w-32 h-16 flex items-center justify-center mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 w-auto object-contain max-w-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
                loading="lazy"
              />
            </div>
            <span className="text-sm text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 relative z-10">
              {logo.name}
            </span>
          </div>
        ))}
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-3 gap-8 mt-20 max-md:grid-cols-1 text-center">
        <div className="stat-item p-6 rounded-3xl bg-white shadow-lg hover-lift">
          <h3 className="mlarge font-bold text-green-600 mb-2">50+</h3>
          <p className="medium text-gray-600">Brand Partnerships</p>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="stat-item p-6 rounded-3xl bg-white shadow-lg hover-lift">
          <h3 className="mlarge font-bold text-green-600 mb-2">100%</h3>
          <p className="medium text-gray-600">Client Satisfaction</p>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="stat-item p-6 rounded-3xl bg-white shadow-lg hover-lift">
          <h3 className="mlarge font-bold text-green-600 mb-2">10+</h3>
          <p className="medium text-gray-600">Years Collaborating</p>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 pt-8 border-t border-gray-200">
        <p className="medium text-gray-600 mb-6">Ready to join our prestigious client portfolio?</p>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 magnetic-btn">
          Start Your Project
        </button>
      </div>
    </div>
  );
};

export default Logo;