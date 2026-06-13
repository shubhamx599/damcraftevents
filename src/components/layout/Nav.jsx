// src/components/layout/Nav.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RiMenuLine, RiCloseLine, RiArrowRightUpLine, RiSunLine, RiMoonLine } from "@remixicon/react";
import Magnetic from "../ui/Magnetic";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1180px] rounded-xl transition-all duration-500 ${
        scrolled
          ? "glass-card shadow-lg backdrop-blur-2xl rounded-xl"
          : "bg-transparent border border-[var(--border-glass)] backdrop-blur-xl rounded-xl"
      }`}
    >
      {/* Layout */}
      <div className="flex items-center justify-between bg-[var(--bg-glass)] rounded-xl px-4 py-2 md:px-6 md:py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="flex flex-col">
            <div className="text-[var(--text-primary)] font-bold text-base md:text-lg font-[Space Grotesk] tracking-tight leading-none">
              DAM CRAFT
            </div>
            <div className="text-[8px] md:text-[9px] text-[var(--text-secondary)] opacity-80 tracking-[0.15em] md:tracking-[0.2em] uppercase font-[Outfit] font-medium mt-0.5">
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
              <Link
                to={path}
                className={`font-[Outfit] font-medium text-xs uppercase tracking-wider transition-colors duration-300 relative py-1 ${
                  isActiveLink(path)
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
            </motion.div>
          ))}
        </nav>

        {/* Desktop Controls - CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <Magnetic range={40} strength={0.3}>
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--border-glass)] hover:bg-[var(--border-glass)] transition-colors duration-300 text-[var(--text-primary)] cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
            </motion.button>
          </Magnetic>

          <Magnetic range={50} strength={0.25}>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="btn-gradient font-[Outfit] text-xs font-semibold inline-flex items-center gap-1 px-4 py-2"
              >
                Contact Us
                <RiArrowRightUpLine size={14} />
              </Link>
            </motion.div>
          </Magnetic>
        </div>

        {/* Mobile Menu Button - Visible only on Mobile */}
        <Magnetic range={30} strength={0.25}>
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-lg bg-[var(--border-glass)] hover:bg-[var(--border-glass)] transition-colors duration-300 text-[var(--text-primary)] border border-[var(--border-glass)] cursor-pointer"
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
                {mobileOpen ? (
                  <RiCloseLine size={16} />
                ) : (
                  <RiMenuLine size={16} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </Magnetic>
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
            <div className="px-4 py-4 bg-[var(--bg-darker)] border-t border-[var(--border-glass)] glass-card rounded-b-xl">
              <div className="flex flex-col gap-1">
                {LINKS.map(({ label, path }) => (
                  <motion.div
                    key={label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={path}
                      className={`block py-3 px-3 rounded-lg font-[Outfit] font-medium text-base transition-all duration-300 ${
                        isActiveLink(path)
                          ? "text-[var(--text-primary)] bg-[var(--border-glass)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-glass)]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Theme Toggle */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-3 px-3 flex justify-between items-center border-t border-[var(--border-glass)] mt-1"
                >
                  <span className="font-[Outfit] font-medium text-base text-[var(--text-secondary)]">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-glass)] bg-[var(--border-glass)] text-[var(--text-primary)]"
                  >
                    {theme === "dark" ? (
                      <>
                        <RiSunLine size={16} />
                        <span className="text-sm font-[Outfit] font-semibold">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <RiMoonLine size={16} />
                        <span className="text-sm font-[Outfit] font-semibold">Dark Mode</span>
                      </>
                    )}
                  </button>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="pt-3 mt-1 border-t border-[var(--border-glass)]"
                >
                  <Link
                    to="/contact"
                    className="btn-gradient font-[Outfit] font-semibold text-center block py-3 rounded-lg inline-flex items-center justify-center gap-2 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact Us
                    <RiArrowRightUpLine size={14} />
                  </Link>
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
