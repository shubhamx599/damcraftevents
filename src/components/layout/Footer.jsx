import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  RiChatSmile2Line,
  RiTimerFlashLine,
  RiTeamLine,
} from "@remixicon/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const mailTo = () => (window.location.href = "mailto:damcraftevents@gmail.com");
  const callTo = () => (window.location.href = "tel:+918527846574");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

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

  const stats = [
    { number: "500+", label: "Events Executed" },
    { number: "50+", label: "Cities Covered" },
    { number: "12+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Stats Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Enhanced Video */}
      <div className="relative border-b border-white/10">
        <div className="w-full h-[50vh] sm:h-[45vh] md:h-[40vh] lg:h-[35vh] relative">
          {/* Fallback gradient background if video fails */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-yellow-900/20"></div>
          
          <video
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://assets.mixkit.co/videos/preview/mixkit-audience-clapping-at-a-concert-43537-large.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          />

          {/* Enhanced overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 flex items-center">
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
                    repeatType: "reverse"
                  }}
                  className="inline-block mb-4"
                >
                  <RiSparklingFill className="text-4xl text-yellow-400" />
                </motion.div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Ready to create
                  </span>{" "}
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    something extraordinary?
                  </span>
                </h3>
                
                <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Let's transform your vision into an unforgettable experience that resonates and inspires.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={mailTo}
                    className="group relative px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <RiMailLine className="inline-block mr-3 text-lg" /> 
                      Start Your Project
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.assign("/portfolio")}
                    className="group px-8 py-4 rounded-full border-2 border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 hover:border-white/30 transition-all"
                  >
                    <span className="flex items-center">
                      View Our Portfolio
                    </span>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h4 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-3">
                  Dam Craft Events
                </h4>
                <p className="text-white/70 leading-relaxed mb-4">
                  Premium event design & management — crafting memorable moments
                  for brands and people since 2010. Where creativity meets precision.
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  {quickLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link
                        to={link.to}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                      >
                        <link.icon className="text-pink-400 text-sm" />
                        <span className="text-sm text-white/80 group-hover:text-white">
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-white/5 to-white/10 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm"
                >
                  <RiAwardFill className="text-2xl text-yellow-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">Award Winning Agency</div>
                    <div className="text-xs text-white/60">Best Event Management 2023</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Services Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-6"
              >
                <h5 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Our Services
                </h5>
                
                <div className="grid gap-3">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/20 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 group-hover:from-yellow-400 group-hover:to-pink-400 transition-all"></div>
                        <span className="text-white/80 group-hover:text-white font-medium">
                          {service.name}
                        </span>
                      </div>
                      <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">
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
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                >
                  <p className="text-sm text-white/80 mb-3">Got a unique brief?</p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={mailTo}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <RiMailLine className="text-sm" />
                      <span className="text-sm">Email</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={callTo}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <RiPhoneLine className="text-sm" />
                      <span className="text-sm">Call</span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-6"
              >
                <h5 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Stay Updated
                </h5>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white/70 text-sm mb-4">
                    Get exclusive insights, event tips, and industry trends delivered to your inbox.
                  </p>
                  
                  <AnimatePresence>
                    {isSubscribed ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-4"
                      >
                        <RiSparklingFill className="text-2xl text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 text-sm font-semibold">
                          Welcome to the inner circle! 🎉
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleNewsletter}
                        className="space-y-3"
                      >
                        <div className="relative">
                          <input
                            type="email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all text-white placeholder-white/40"
                            required
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition-all"
                        >
                          Subscribe Now
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
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
                <h5 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Connect With Us
                </h5>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={mailTo}
                    className="block text-left w-full p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="text-xs text-white/60 mb-1">Email</div>
                    <div className="text-white/80 group-hover:text-white font-medium">
                      damcraftevents@gmail.com
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={callTo}
                    className="block text-left w-full p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="text-xs text-white/60 mb-1">Phone</div>
                    <div className="text-white/80 group-hover:text-white font-medium">
                      +91 85278 46574
                    </div>
                  </motion.button>

                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-white/60 mb-1">Address</div>
                    <address className="not-italic text-white/70 text-sm leading-relaxed">
                      Building B-22, Jhilmil Industrial Area,<br />
                      Delhi - 110092, India
                    </address>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-white/60 uppercase mb-4 tracking-wider">
                    Follow the Journey
                  </p>
                  <div className="flex gap-3">
                    {[
                      { Icon: RiInstagramLine, color: "from-purple-500 to-pink-500", href: "https://instagram.com" },
                      { Icon: RiFacebookLine, color: "from-blue-500 to-blue-600", href: "https://facebook.com" },
                      { Icon: RiLinkedinLine, color: "from-blue-400 to-cyan-400", href: "https://linkedin.com" },
                      { Icon: RiTwitterLine, color: "from-sky-400 to-cyan-400", href: "https://twitter.com" },
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
                        aria-label={social.Icon.name.replace('Ri', '').replace('Line', '')}
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
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm text-white/60">
                  © {currentYear} Dam Craft Events. All rights reserved.
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Crafting extraordinary experiences since 2010
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Link to="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                
                <motion.button
                  animate={isVisible ? { scale: [1, 1.1, 1] } : { scale: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={scrollToTop}
                  className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
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