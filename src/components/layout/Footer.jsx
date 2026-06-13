import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiInstagramLine,
  RiFacebookLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiArrowUpLine,
  RiMailLine,
  RiPhoneLine,
  RiAwardFill,
  RiSparklingFill,
  RiArrowRightLine,
  RiChatSmile2Line,
  RiTimerFlashLine,
  RiTeamLine,
} from "@remixicon/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Scroll to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const mailTo = () =>
    (window.location.href = "mailto:damcraftevents@gmail.com");
  const callTo = () => (window.location.href = "tel:+918527846574");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const quickLinks = [
    { name: "Services", to: "/services", icon: RiSparklingFill },
    { name: "Portfolio", to: "/work", icon: RiTeamLine },
    { name: "About", to: "/about", icon: RiChatSmile2Line },
    { name: "Contact", to: "/contact", icon: RiTimerFlashLine },
  ];

  const services = [
    { name: "Corporate Events", projects: "120+" },
    { name: "Brand Activations", projects: "85+" },
    { name: "Talent Management", projects: "200+" },
    { name: "Advertising Solutions", projects: "150+" },
  ];

  return (
    <footer className="bg-[var(--bg-darker)] text-[var(--text-primary)] relative overflow-hidden border-t border-[var(--border-glass)]">
      {/* background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* CTA Section */}
      <div className="relative border-y border-[var(--border-glass)]">
        <div className="w-full h-[78vh] sm:h-[45vh] md:h-[40vh] lg:h-[60vh] relative">
          {/* gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-yellow-900/10"></div>
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)]/85 via-[var(--bg-dark)]/45 to-[var(--bg-darker)]/95 flex items-center">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block mb-4"
                >
                  <RiSparklingFill className="text-4xl text-yellow-400" />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Ready to Create{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    Magic
                  </span>{" "}
                  Together?
                </h2>

                <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Let's transform your vision into an unforgettable experience
                  that resonates and inspires.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/contact")}
                    className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-[background-color,color,border-color,box-shadow] duration-300 flex items-center justify-center gap-3"
                  >
                    Start Your Project
                    <RiArrowRightLine size={20} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/work")}
                    className="border border-[var(--border-glass)] text-[var(--text-primary)] px-8 py-4 rounded-2xl font-semibold hover:bg-[var(--text-primary)] hover:text-[var(--bg-dark)] transition-colors duration-300"
                  >
                    View Our Work
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col">
                  <div className="text-[var(--text-primary)] pb-3 font-bold text-base md:text-lg font-[Space Grotesk] tracking-tight leading-none">
                    DAM CRAFT EVENTS
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  Premium event design & management — crafting memorable moments
                  for brands and people since 2010. Where creativity meets
                  precision.
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  {quickLinks.map((link) => (
                    <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                      <Link
                        to={link.to}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-glass)] hover:bg-[var(--border-glass)] transition-colors duration-300 group"
                      >
                        <link.icon className="text-pink-400 text-sm" />
                        <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-3 bg-[var(--bg-glass)] px-4 py-3 rounded-xl border border-[var(--border-glass)] backdrop-blur-sm"
                >
                  <RiAwardFill className="text-2xl text-yellow-400" />
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      Award Winning Agency
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Best Event Management 2023
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Services Section */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-6">
                <h5 className="text-xl font-semibold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
                  Our Services
                </h5>
                <div className="grid gap-3">
                  {services.map((service) => (
                    <motion.div
                      key={service.name}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)] hover:border-[var(--text-primary)]/20 transition-colors duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 group-hover:from-yellow-400 group-hover:to-pink-400 transition-all"></div>
                        <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] font-medium">
                          {service.name}
                        </span>
                      </div>
                      <span className="text-xs bg-[var(--border-glass)] px-2 py-1 rounded-full text-[var(--text-secondary)]">
                        {service.projects}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-[var(--border-glass)]"
                >
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Got a unique brief?
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={mailTo}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--border-glass)] border border-[var(--border-glass)] hover:bg-[var(--bg-glass)] transition-colors duration-300"
                    >
                      <RiMailLine className="text-sm" />
                      <span className="text-sm">Email</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={callTo}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--border-glass)] border border-[var(--border-glass)] hover:bg-[var(--bg-glass)] transition-colors duration-300"
                    >
                      <RiPhoneLine className="text-sm" />
                      <span className="text-sm">Call</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Contact & Social Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-6"
              >
                <h5 className="text-xl font-semibold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
                  Connect With Us
                </h5>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={mailTo}
                    className="block text-left w-full p-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-glass)] hover:bg-[var(--bg-glass)]/80 hover:border-[var(--text-primary)]/20 transition-colors duration-300 group"
                  >
                    <div className="text-xs text-[var(--text-secondary)]/80 mb-1">Email</div>
                    <div className="text-[var(--text-primary)]/80 group-hover:text-[var(--text-primary)] font-medium">
                      damcraftevents@gmail.com
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={callTo}
                    className="block text-left w-full p-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-glass)] hover:bg-[var(--bg-glass)]/80 hover:border-[var(--text-primary)]/20 transition-colors duration-300 group"
                  >
                    <div className="text-xs text-[var(--text-secondary)]/80 mb-1">Phone</div>
                    <div className="text-[var(--text-primary)]/80 group-hover:text-[var(--text-primary)] font-medium">
                      +91 85278 46574
                    </div>
                  </motion.button>

                  <div className="p-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-glass)]">
                    <div className="text-xs text-[var(--text-secondary)]/80 mb-1">Address</div>
                    <address className="not-italic text-[var(--text-secondary)] text-sm leading-relaxed">
                      Building B-22, Jhilmil Industrial Area,
                      <br />
                      Delhi - 110092, India
                    </address>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[var(--text-secondary)] uppercase mb-4 tracking-wider">
                    Follow the Journey
                  </p>
                  <div className="flex gap-3">
                    {[
                      {
                        Icon: RiInstagramLine,
                        color: "from-purple-500 to-pink-500",
                        href: "https://instagram.com",
                      },
                      {
                        Icon: RiFacebookLine,
                        color: "from-blue-500 to-blue-600",
                        href: "https://facebook.com",
                      },
                      {
                        Icon: RiLinkedinLine,
                        color: "from-blue-400 to-cyan-400",
                        href: "https://linkedin.com",
                      },
                      {
                        Icon: RiTwitterLine,
                        color: "from-sky-400 to-cyan-400",
                        href: "https://twitter.com",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${social.color} shadow-lg hover:shadow-xl transition-all`}
                        aria-label={social.Icon.name
                          .replace("Ri", "")
                          .replace("Line", "")}
                      >
                        <social.Icon className="text-white text-lg" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-glass)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm text-[var(--text-secondary)]">
                  © {currentYear} Dam Craft Events. All rights reserved.
                </div>
                <div className="text-xs text-[var(--text-secondary)]/60 mt-1">
                  Crafting extraordinary experiences since 2010
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  to="/privacy"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Terms of Service
                </Link>

                <motion.button
                  animate={isVisible ? { scale: [1, 1.1, 1] } : { scale: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={scrollToTop}
                  className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-[background-color,color,border-color,box-shadow] duration-300 shadow-lg hover:shadow-xl"
                  aria-label="back to top"
                >
                  <RiArrowUpLine className="text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
