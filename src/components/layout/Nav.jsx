import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { NavLink, useNavigate, Link } from "react-router-dom";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Scroll direction detection for nav show/hide
  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const curr = window.scrollY;

          // Show/hide nav based on scroll direction
          if (curr < lastScroll - 5 || curr < 100) {
            setShowNav(true);
          } else if (curr > lastScroll + 5) {
            setShowNav(false);
          }

          // Add background when scrolled
          if (curr > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }

          lastScroll = curr;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate nav in/out with creative effects
  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      y: showNav ? 0 : -100,
      autoAlpha: showNav ? 1 : 0,
      duration: 0.5,
      ease: "power3.out",
    });

    // Background animation
    gsap.to(navRef.current, {
      backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      background: scrolled
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(255, 255, 255, 0.8)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [showNav, scrolled]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Restore body scroll
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    setTimeout(() => {
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }, 100);
  };

  const activeStyle = ({ isActive }) =>
    isActive
      ? "relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-6px] after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:w-full after:-translate-x-1/2 after:scale-x-100 after:origin-center after:transition-transform after:duration-500"
      : "relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-6px] after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:w-full after:-translate-x-1/2 after:scale-x-0 after:origin-center after:transition-transform after:duration-500 hover:after:scale-x-100";

  // Enhanced animated text component
  const AnimatedText = ({ text }) => (
    <span className="relative block overflow-hidden h-[1em] leading-none group">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {text}
      </span>
      <span className="block absolute left-0 top-full transition-transform duration-300 ease-out group-hover:-translate-y-full bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {text}
      </span>
    </span>
  );

  return (
    <div className="">
      <nav
        ref={navRef}
        className="flex justify-between pt-5 px-20 max-md:px-4 pb-1 fixed top-0 left-0 w-full z-[200] backdrop-blur-md transition-all duration-500 items-center"
      >
        {/* Logo with Creative Design */}
        <Link
          to="/"
          className="text-xl uppercase font-semibold tracking-tighter leading-none cursor-pointer group"
        >
          <div className="group-hover:scale-105 transition-transform duration-300">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              dam <br /> craft <br /> events.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links flex gap-10 text-[1.2rem] h-fit font-normal relative">
          <li className="hidden sm:block">
            <NavLink
              className={({ isActive }) => `group ${activeStyle({ isActive })}`}
              to="/"
            >
              <AnimatedText text="Home" />
            </NavLink>
          </li>
          <li className="hidden sm:block">
            <NavLink
              className={({ isActive }) => `group ${activeStyle({ isActive })}`}
              to="/about"
            >
              <AnimatedText text="Company" />
            </NavLink>
          </li>
          <li className="hidden sm:block">
            <NavLink
              className={({ isActive }) => `group ${activeStyle({ isActive })}`}
              to="/services"
            >
              <AnimatedText text="Services" />
            </NavLink>
          </li>
          <li className="hidden sm:block">
            <NavLink
              className={({ isActive }) => `group ${activeStyle({ isActive })}`}
              to="/work"
            >
              <AnimatedText text="Work" />
            </NavLink>
          </li>
          <li className="hidden sm:block">
            <NavLink
              className={({ isActive }) => `group ${activeStyle({ isActive })}`}
              to="/contact"
            >
              <AnimatedText text="Contact" />
            </NavLink>
          </li>

          {/* Mobile menu toggle */}
          <li className="block sm:hidden">
            <div
              className={`w-8 h-8 flex flex-col justify-center items-center cursor-pointer group ${
                menuOpen ? "text-purple-600" : "text-gray-700"
              }`}
              onClick={toggleMenu}
            >
              <div
                className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                }`}
              ></div>
            </div>
          </li>

          {/* CTA Button for Desktop */}
          <li className="hidden sm:block">
            <button
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Quote
            </button>
          </li>
        </ul>
      </nav>

      {/* Enhanced Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-gradient-to-b from-white to-gray-50 z-[199] shadow-2xl translate-x-full p-8 flex flex-col gap-6 uppercase font-semibold text-lg sm:hidden"
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl uppercase font-semibold">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Menu
            </span>
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-600 hover:text-purple-600 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <i className="ri-close-line text-2xl"></i>
          </div>
        </div>

        {/* Navigation Links */}
        <button
          onClick={() => handleNavigate("/")}
          className="text-left border-b border-gray-200 pb-4 group text-2xl text-gray-700 hover:text-purple-600 transition-colors"
        >
          <AnimatedText text="Home" />
        </button>
        <button
          onClick={() => handleNavigate("/about")}
          className="text-left border-b border-gray-200 pb-4 group text-2xl text-gray-700 hover:text-purple-600 transition-colors"
        >
          <AnimatedText text="Company" />
        </button>
        <button
          onClick={() => handleNavigate("/services")}
          className="text-left border-b border-gray-200 pb-4 group text-2xl text-gray-700 hover:text-purple-600 transition-colors"
        >
          <AnimatedText text="Services" />
        </button>
        <button
          onClick={() => handleNavigate("/work")}
          className="text-left border-b border-gray-200 pb-4 group text-2xl text-gray-700 hover:text-purple-600 transition-colors"
        >
          <AnimatedText text="Work" />
        </button>

        {/* CTA Button in Mobile Menu */}
        <button
          onClick={() => handleNavigate("/contact")}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold mt-4 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Get Free Quote
        </button>

        {/* Contact Info in Mobile Menu */}
        <div className="mt-auto pt-8 border-t border-gray-200">
          <p className="text-sm font-normal normal-case text-gray-600 mb-4">
            Get in touch:
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">damcraftevents@gmail.com</p>
            <p className="text-sm text-gray-700">+91 8527846574</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            {["instagram", "facebook", "linkedin", "twitter"].map(
              (platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
                  aria-label={platform}
                >
                  <i className={`ri-${platform}-line`}></i>
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[198] sm:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Nav;
