import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import foot from "../../assets/videos/foot.mp4";
import { Link } from "react-router-dom";
import useScrollMorph from "../../hooks/useScrollMorph";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useScrollMorph(footerRef, {
    borderRadius: "40px 40px 0 0",
    scale: 1.01,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:damcraftevents@gmail.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+918527846574";
  };

  const quickLinks = [
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Corporate Events",
    "Brand Activations",
    "Talent Management",
    "Advertising Solutions",
  ];

  return (
    <div
      ref={footerRef}
      className="bg-gradient-to-br from-gray-900 to-black text-white mt-[5rem] relative overflow-hidden"
    >

      {/* Hero Video Section */}
      <div className="relative h-[100vh] max-md:h-[50vh] w-full overflow-hidden">
        <video
          src={foot}
          autoPlay
          loop
          muted
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center footer-element">
            <h1 className="mlarge font-bold mb-6 text-white">
              Let's Create Magic Together
            </h1>
            <p className="medium max-w-2xl mx-auto px-4 text-white/90">
              Ready to transform your vision into an unforgettable experience
              that leaves lasting impressions?
            </p>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <button
                onClick={handleEmailClick}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <footer className="mt-[5rem] pt-0 max-md:mt-[1rem] px-20 max-md:px-4 py-16 relative z-10">
        <div className="flex justify-between gap-10 max-md:flex-col">
          {/* Left Section - Brand */}
          <div className="flex-1 footer-element">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dam Craft Events
              </h2>
              <p className="text-white/70 mt-2 max-w-md">
                Creating unforgettable experiences through innovative event
                solutions and flawless execution since 2010.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex gap-8 mt-8 flex-wrap">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300 hover:scale-105"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Section - Services */}
          <div className="flex-1 footer-element">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Contact */}
          <div className="flex flex-col gap-8 footer-element">
            {/* Business Enquiries */}
            <div className="">
              <p className="small text-white/60 uppercase mb-4 font-semibold">
                Business enquiries
              </p>
              <button
                onClick={handleEmailClick}
                className="small text-white/80 hover:text-white transition-all duration-300 block text-left hover:scale-105 transform origin-left"
              >
                damcraftevents@gmail.com
              </button>
              <button
                onClick={handlePhoneClick}
                className="small text-white/80 hover:text-white transition-all duration-300 block text-left hover:scale-105 transform origin-left mt-2"
              >
                +91 8527846574
              </button>
            </div>

            {/* Address */}
            <div className="">
              <p className="small text-white/60 uppercase mb-4 font-semibold">
                Our Location
              </p>
              <p className="small text-white/80 max-w-xs leading-relaxed">
                Building B-22, Jhilmil Industrial Area, Delhi-110092
              </p>
            </div>

            {/* Social Links */}
            <div className="">
              <p className="small text-white/60 uppercase mb-4 font-semibold">
                Follow Us
              </p>
              <div className="flex gap-4">
                {[
                  {
                    platform: "instagram",
                    color: "from-purple-500 to-pink-500",
                  },
                  { platform: "facebook", color: "from-blue-500 to-blue-600" },
                  { platform: "linkedin", color: "from-blue-400 to-blue-500" },
                  { platform: "twitter", color: "from-blue-400 to-cyan-400" },
                ].map((social) => (
                  <a
                    key={social.platform}
                    href={`https://${social.platform}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg`}
                    aria-label={social.platform}
                  >
                    <i className={`ri-${social.platform}-line text-white`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-[4rem] max-md:mt-[3rem] border-white/20" />

        {/* Bottom Section */}
        <div className="uppercase items-center mt-[2rem] text-sm max-md:text-xs flex justify-between max-md:flex-col max-md:gap-6">
          <p className="text-white/60 footer-element">
            © {currentYear} Dam Craft Events. All rights reserved.
          </p>

          <div className="flex gap-8 max-md:gap-6 items-center flex-wrap">
            <a
              href="https://instagram.com"
              className="text-white/60 hover:text-white transition-colors duration-300 footer-element"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              className="text-white/60 hover:text-white transition-colors duration-300 footer-element"
            >
              Facebook
            </a>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="small px-4 py-2 cursor-pointer bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 footer-element hover:scale-105 backdrop-blur-sm"
              aria-label="Scroll to top"
            >
              <i className="ri-arrow-up-line"></i>
              <span className="max-md:hidden">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="text-center mt-8 footer-element">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <i className="ri-award-fill text-yellow-400"></i>
            <span className="text-white/80 text-sm">
              Award Winning Event Agency
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
