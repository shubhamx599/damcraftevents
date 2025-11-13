// src/components/layout/Nav.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RiMenuLine, RiCloseLine, RiArrowRightUpLine } from "@remixicon/react";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "#services" },
  { label: "Work", path: "#work" },
  { label: "Gallery", path: "#gallery" },
  { label: "About", path: "#about" }
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.hash === path;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1180px] rounded-xl transition-all duration-500 ${
        scrolled 
          ? "glass-card shadow-lg backdrop-blur-2xl rounded-xl" 
          : "bg-transparent border border-(--border-glass) backdrop-blur-xl"
      }`}
    >
      {/* Mobile First Layout */}
      <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3">
        
        {/* Logo - Mobile First */}
        <Link 
          to="/" 
          className="flex items-center group"
        >
          <div className="flex flex-col">
            <div className="text-white font-bold text-base md:text-lg font-[Space Grotesk] tracking-tight leading-none">
              DAM CRAFT
            </div>
            <div className="text-[8px] md:text-[9px] text-[rgba(255,255,255,0.6)] tracking-[0.15em] md:tracking-[0.2em] uppercase font-[Outfit] font-medium mt-0.5">
              Events & Activations
            </div>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {LINKS.map(({ label, path }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {path.startsWith("#") ? (
                <a
                  href={path}
                  className={`font-[Outfit] font-medium text-xs uppercase tracking-wider transition-colors duration-300 relative py-1 ${
                    isActiveLink(path)
                      ? "text-white"
                      : "text-[rgba(255,255,255,0.7)] hover:text-white"
                  }`}
                >
                  {label}
                  {isActiveLink(path) && (
                    <motion.span
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#8b5cf6]"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </a>
              ) : (
                <Link
                  to={path}
                  className={`font-[Outfit] font-medium text-xs uppercase tracking-wider transition-colors duration-300 relative py-1 ${
                    isActiveLink(path)
                      ? "text-white"
                      : "text-[rgba(255,255,255,0.7)] hover:text-white"
                  }`}
                >
                  {label}
                  {isActiveLink(path) && (
                    <motion.span
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#8b5cf6]"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* CTA Button - Hidden on Mobile */}
        <div className="hidden md:block">
          <motion.a
            href="#contact"
            className="btn-gradient font-[Outfit] text-xs font-semibold inline-flex items-center gap-1 px-4 py-2"
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
            <RiArrowRightUpLine size={14} />
          </motion.a>
        </div>

        {/* Mobile Menu Button - Visible only on Mobile */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 text-white border border-[rgba(255,255,255,0.1)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <RiCloseLine size={16} /> : <RiMenuLine size={16} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu - Only for Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden rounded-b-xl"
          >
            <div className="px-4 py-4 bg-[#050505] border-t border-[rgba(255,255,255,0.1)] glass-card">
              <div className="flex flex-col gap-1">
                {LINKS.map(({ label, path }) => (
                  <motion.div
                    key={label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {path.startsWith("#") ? (
                      <a
                        href={path}
                        className={`block py-3 px-3 rounded-lg font-[Outfit] font-medium text-base transition-all duration-300 ${
                          isActiveLink(path)
                            ? "text-white bg-[rgba(255,255,255,0.05)]"
                            : "text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={path}
                        className={`block py-3 px-3 rounded-lg font-[Outfit] font-medium text-base transition-all duration-300 ${
                          isActiveLink(path)
                            ? "text-white bg-[rgba(255,255,255,0.05)]"
                            : "text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="pt-3 mt-1 border-t border-[rgba(255,255,255,0.1)]"
                >
                  <a
                    href="#contact"
                    className="btn-gradient font-[Outfit] font-semibold text-center block py-3 rounded-lg inline-flex items-center justify-center gap-2 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact Us
                    <RiArrowRightUpLine size={14} />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;