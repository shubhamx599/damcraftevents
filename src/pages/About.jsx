import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  RiTeamLine,
  RiLightbulbFlashLine,
  RiHeartLine,
  RiAwardLine,
  RiStarFill,
  RiUserHeartLine,
  RiCalendarEventLine,
  RiMapPinLine,
  RiArrowRightLine,
  RiPlayFill,
  RiPauseFill,
  RiSparklingFill,
} from "@remixicon/react";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const navigate = useNavigate();

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Video state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Stats counter animation
  const [counters, setCounters] = useState({
    events: 0,
    clients: 0,
    years: 0,
    team: 0
  });

  const stats = [
    { target: 500, key: 'events', label: 'Events Executed' },
    { target: 200, key: 'clients', label: 'Happy Clients' },
    { target: 12, key: 'years', label: 'Years Experience' },
    { target: 40, key: 'team', label: 'Team Members' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              const duration = 2000;
              const step = stat.target / (duration / 16);
              let current = 0;

              const updateCounter = () => {
                current += step;
                if (current < stat.target) {
                  setCounters(prev => ({
                    ...prev,
                    [stat.key]: Math.ceil(current)
                  }));
                  requestAnimationFrame(updateCounter);
                } else {
                  setCounters(prev => ({
                    ...prev,
                    [stat.key]: stat.target
                  }));
                }
              };

              setTimeout(updateCounter, index * 300);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328f1a49",
      name: "Mukesh Kumar",
      role: "Founder & CEO",
      description: "Visionary leader with 10+ years in event management",
      expertise: ["Strategic Planning", "Client Relations", "Innovation"]
    },
    {
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      name: "Deepak Sharma",
      role: "Co-Founder & COO",
      description: "Operations expert ensuring flawless execution",
      expertise: ["Operations", "Logistics", "Team Management"]
    },
    {
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      name: "Ashish Jain",
      role: "Co-Founder & CMO",
      description: "Creative strategist driving brand partnerships",
      expertise: ["Marketing", "Brand Strategy", "Creative Direction"]
    },
  ];

  const values = [
    {
      icon: RiTeamLine,
      title: "Collaboration",
      description: "Working together to achieve extraordinary results",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: RiLightbulbFlashLine,
      title: "Innovation",
      description: "Pushing boundaries with creative solutions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: RiHeartLine,
      title: "Passion",
      description: "Driven by love for creating memorable experiences",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: RiAwardLine,
      title: "Excellence",
      description: "Committed to delivering the highest quality",
      color: "from-green-500 to-emerald-500"
    },
  ];

  const milestones = [
    { year: "2010", event: "Founded Dam Craft Events", description: "Started with a vision to transform event experiences" },
    { year: "2014", event: "First Major Corporate Event", description: "Executed 1000+ attendee conference successfully" },
    { year: "2018", event: "Expanded to Pan-India", description: "Started operations in 10+ major cities" },
    { year: "2023", event: "Award Winning Agency", description: "Recognized as Best Event Management Company" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1, rotate }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 mt-12">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6"
            >
              <RiSparklingFill className="text-yellow-400" size={16} />
              <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                Since 2010
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Creating
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Moments
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Crafting unforgettable experiences through creativity, precision, and passion. 
              Where every event tells a story and every moment creates lasting memories.
            </p>
          </motion.div>

          {/* Video Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-12 rounded-3xl overflow-hidden aspect-video max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-green-600/20" />
            
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              muted
              loop
              playsInline
            >
              <source src="https://assets.mixkit.co/videos/48507/48507-720.mp4" type="video/mp4" />
            </video>

            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleVideo}
                className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/20"
              >
                {isVideoPlaying ? (
                  <RiPauseFill size={32} className="text-white" />
                ) : (
                  <RiPlayFill size={32} className="text-white" />
                )}
              </motion.button>
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <p className="text-white text-center text-lg font-medium">
                "Creating moments that matter, experiences that last forever"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Impact</span> in Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Years of dedication reflected through our achievements and client success stories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  {counters[stat.key]}+
                </div>
                <div className="text-sm sm:text-base text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide every event we create and every relationship we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 mx-auto`}>
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-3">{value.title}</h3>
                <p className="text-gray-300 text-center text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Visionaries</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The passionate minds behind Dam Craft Events, dedicated to transforming your vision into reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-green-400 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-4">{member.description}</p>
                    
                    {/* Expertise */}
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-3/4 transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Milestones that shaped our story and defined our excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transform -translate-x-1/2" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10`}>
                  <div className="text-sm text-yellow-400 font-semibold mb-2">{milestone.year}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{milestone.event}</h3>
                  <p className="text-gray-300 text-sm">{milestone.description}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black transform -translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;