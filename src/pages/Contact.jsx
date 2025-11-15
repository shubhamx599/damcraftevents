import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Brands from "../components/ui/Brands.jsx";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiArrowRightUpLine,
  RiWhatsappLine,
  RiCalendarLine,
  RiInstagramLine,
  RiFacebookLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiUserLine,
  RiBuildingLine,
  RiMessageLine,
  RiSparklingFill,
} from "@remixicon/react";

const Contact = () => {
  const sectionRef = useRef(null);

  const handleEmailClick = () => {
    window.location.href = "mailto:damcraftevents@gmail.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+918527846574";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/918527846574", "_blank");
  };

  const handleScheduleCall = () => {
    window.open("https://calendly.com/damcraftevents", "_blank");
  };

  const contactInfo = [
    {
      icon: RiMailLine,
      title: "Business Enquiries",
      value: "damcraftevents@gmail.com",
      description: "Get a quote or discuss your project",
      action: handleEmailClick,
      gradient: "from-purple-500 to-pink-500",
      buttonText: "Send Email",
    },
    {
      icon: RiPhoneLine,
      title: "Call Us Anytime",
      value: "+91 8527846574",
      description: "Available 24/7 for urgent events",
      action: handlePhoneClick,
      gradient: "from-green-500 to-blue-500",
      buttonText: "Call Now",
    },
    {
      icon: RiMapPinLine,
      title: "Visit Our Office",
      value: "Building B-22, Jhilmil Industrial Area",
      subValue: "Delhi-110092",
      description: "Meet us for a detailed consultation",
      gradient: "from-orange-500 to-red-500",
      buttonText: "Get Directions",
      action: () =>
        window.open(
          "https://maps.google.com?q=Building+B-22+Jhilmil+Industrial+Area+Delhi+110092",
          "_blank"
        ),
    },
    {
      icon: RiWhatsappLine,
      title: "Quick Chat",
      value: "WhatsApp Message",
      description: "Instant response for quick queries",
      action: handleWhatsAppClick,
      gradient: "from-green-400 to-green-600",
      buttonText: "Message Now",
    },
  ];

  const stats = [
    { number: "500+", label: "Events Executed" },
    { number: "50+", label: "Cities Covered" },
    { number: "12+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  const services = [
    "Corporate Events",
    "Brand Activations",
    "Talent Management",
    "Advertising Solutions",
    "Wedding Planning",
    "Product Launches",
    "Mall Activations",
    "Market Activations",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div
        ref={sectionRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-10 lg:mt-21"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
              Let's Create Magic Together
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Get In{" "}
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to create something extraordinary? Choose your preferred way
            to connect with us. We're here to bring your vision to life with
            premium event experiences.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gray-600/60 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
              />

              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 rounded-2xl blur-md opacity-30`}
                  />
                  <div className="relative bg-black/50 rounded-2xl p-4 w-16 h-16 flex items-center justify-center border border-white/10">
                    <contact.icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    {contact.title}
                  </h3>

                  <div className="space-y-2">
                    <p className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {contact.value}
                    </p>
                    {contact.subValue && (
                      <p className="text-lg text-white/80 font-medium">
                        {contact.subValue}
                      </p>
                    )}
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {contact.description}
                  </p>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={contact.action}
                    className={`w-full bg-gradient-to-r ${contact.gradient} text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn mt-4`}
                  >
                    {contact.buttonText}
                    <RiArrowRightUpLine
                      size={18}
                      className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300"
                    />
                  </motion.button>
                </div>

                {/* Hover Border */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${contact.gradient} group-hover:w-3/4 transition-all duration-500 rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block mb-6"
            >
              <RiSparklingFill className="text-4xl text-yellow-400" />
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              For urgent events or quick consultations, we're just a call away
            </p>

            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch sm:items-center w-full">
              {/* Call Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePhoneClick}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white 
               w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold 
               hover:shadow-2xl hover:shadow-green-500/25 transition-all 
               duration-300 flex items-center justify-center gap-4 text-base sm:text-lg"
              >
                <RiPhoneLine size={22} />
                +91 8527846574
              </motion.button>

              {/* WhatsApp Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="border border-white/30 text-white 
               w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold 
               hover:bg-white hover:text-black transition-all duration-300 
               flex items-center justify-center gap-4 text-base sm:text-lg 
               backdrop-blur-sm"
              >
                <RiWhatsappLine size={22} />
                WhatsApp Instant
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Our Services
            </h2>
            <p className="text-gray-300 text-lg">
              Comprehensive event solutions for every occasion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-center group cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <p className="text-white/80 group-hover:text-white font-medium text-xs md:text-sm sm:text-sm lg:text-base">
                    {service}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social & Trust Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Social Links */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">
              Follow Our Journey
            </h4>
            <p className="text-gray-300 mb-6">
              Stay updated with our latest events and behind-the-scenes moments
            </p>

            <div className="flex gap-4 flex-wrap">
              {[
                {
                  Icon: RiInstagramLine,
                  color: "from-purple-500 to-pink-500",
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  Icon: RiFacebookLine,
                  color: "from-blue-500 to-blue-600",
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  Icon: RiLinkedinLine,
                  color: "from-blue-400 to-cyan-400",
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  Icon: RiTwitterLine,
                  color: "from-sky-400 to-cyan-400",
                  href: "https://twitter.com",
                  label: "Twitter",
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
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`flex-1 min-w-[120px] bg-gradient-to-r ${social.color} text-white py-4 px-4 rounded-2xl font-semibold hover:shadow-2xl transition-all flex items-center justify-center gap-3 flex-col text-center`}
                >
                  <social.Icon className="text-white text-2xl" />
                  <span className="text-sm">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">
              Why Choose Us?
            </h4>
            <div className="space-y-4">
              {[
                "✓ 24/7 Premium Support",
                "✓ Free Initial Consultation",
                "✓ 500+ Successful Events",
                "✓ 5-Star Client Ratings",
                "✓ Award Winning Team",
                "✓ End-to-End Management",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full" />
                  {feature}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Brands />
    </div>
  );
};

export default Contact;
