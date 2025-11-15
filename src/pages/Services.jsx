import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  RiCalendarEventLine,
  RiMegaphoneLine,
  RiTeamLine,
  RiStarFill,
  RiCheckboxCircleFill,
  RiPlayLargeFill,
  RiArrowRightLine,
  RiCloseLine,
  RiExternalLinkLine,
  RiChat1Line,
  RiMap2Line,
  RiFlashlightLine,
  RiLineChartLine,
  RiSparklingFill,
} from "@remixicon/react";

// Enhanced services data with more details
const ENHANCED_SERVICES = [
  {
    id: 1,
    title: "Corporate Events",
    description: "Professional event solutions for businesses, from intimate meetings to large-scale conferences that drive engagement and deliver measurable results.",
    longDescription: "We specialize in creating impactful corporate experiences that align with your business objectives. Our comprehensive approach ensures every detail is meticulously planned and executed to perfection.",
    icon: RiCalendarEventLine,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    features: [
      "Conference & Seminars",
      "Product Launches",
      "Corporate Meetings",
      "Award Ceremonies",
      "Team Building Events",
      "Shareholder Meetings"
    ],
    stats: { events: "150+", satisfaction: "98%", clients: "45+" },
    process: ["Consultation", "Planning", "Execution", "Follow-up"],
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551833993-eea000b6c5b1?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    title: "Brand Activations",
    description: "Engaging brand experiences that create lasting impressions and drive consumer engagement across multiple touchpoints.",
    longDescription: "Transform your brand presence with innovative activations that captivate audiences. We create immersive experiences that resonate with your target market and amplify brand messaging.",
    icon: RiMegaphoneLine,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    features: [
      "Mall Activations",
      "Market Campaigns",
      "Road Shows",
      "Public Engagement",
      "Brand Launches",
      "Sampling Activities"
    ],
    stats: { events: "200+", reach: "2M+", brands: "60+" },
    process: ["Strategy", "Activation", "Engagement", "Analysis"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 3,
    title: "Talent Management",
    description: "Comprehensive talent solutions providing the perfect personalities to elevate your events and connect with your audience.",
    longDescription: "Access our curated network of professional talent including anchors, influencers, and celebrities. We match the perfect personalities to your event requirements and brand values.",
    icon: RiTeamLine,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    features: [
      "Anchors & Hosts",
      "Influencers",
      "Promoters",
      "Celebrity Management",
      "Models & Actors",
      "Technical Crew"
    ],
    stats: { talent: "500+", events: "300+", retention: "95%" },
    process: ["Sourcing", "Screening", "Booking", "Management"],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=800&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 4,
    title: "Advertising Solutions",
    description: "Innovative advertising campaigns that cut through the noise and deliver your message to the right audience effectively.",
    longDescription: "From traditional media to digital campaigns, we create advertising solutions that drive awareness and conversion. Our data-driven approach ensures maximum ROI for your marketing spend.",
    icon: RiMegaphoneLine,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    features: [
      "Digital Campaigns",
      "Outdoor Advertising",
      "Social Media Marketing",
      "Influencer Collaborations",
      "Content Creation",
      "Performance Analytics"
    ],
    stats: { campaigns: "120+", engagement: "85%", growth: "200%" },
    process: ["Research", "Strategy", "Creation", "Optimization"],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=800&auto=format&fit=crop&q=80"
    ]
  }
];

// Process steps data
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Consultation",
    description: "We begin by understanding your vision, objectives, and requirements through detailed consultations to align our approach with your goals.",
    icon: RiChat1Line,
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: "02",
    title: "Strategic Planning",
    description: "Our team creates a comprehensive plan with timelines, budgets, and creative concepts tailored to your specific needs and audience.",
    icon: RiMap2Line,
    color: "from-purple-500 to-pink-500"
  },
  {
    step: "03",
    title: "Creative Execution",
    description: "We bring your event to life with meticulous attention to detail and flawless execution across all elements, ensuring a seamless experience.",
    icon: RiFlashlightLine,
    color: "from-orange-500 to-red-500"
  },
  {
    step: "04",
    title: "Post-Event Analysis",
    description: "We provide detailed analytics and feedback to measure success, gather insights, and identify opportunities for future improvements.",
    icon: RiLineChartLine,
    color: "from-green-500 to-emerald-500"
  }
];

// Testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Tech Innovations Ltd.",
    role: "Marketing Director",
    content: "DamCraft transformed our product launch into an unforgettable experience. Their attention to detail and creative approach exceeded all expectations. The team's professionalism and dedication were evident throughout the process.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    service: "Corporate Events"
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Global Retail Chain",
    role: "Brand Manager",
    content: "The mall activation campaign by DamCraft drove unprecedented footfall and engagement. Their team is professional, creative, and results-driven. We saw a 40% increase in customer engagement during the campaign period.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop&q=80",
    service: "Brand Activations"
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "Fashion Forward",
    role: "CEO",
    content: "Outstanding talent management services! They provided the perfect hosts and influencers for our fashion show. The talent was professional, engaging, and perfectly aligned with our brand values. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    service: "Talent Management"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    company: "StartUp Ventures",
    role: "Founder",
    content: "The advertising campaign created by DamCraft helped us reach our target audience effectively. Their data-driven approach and creative execution resulted in a 200% growth in our customer base within three months.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
    service: "Advertising Solutions"
  }
];

// FAQ data
const FAQ_DATA = [
  {
    question: "How far in advance should I book your services?",
    answer: "We recommend booking at least 4-6 weeks in advance for corporate events and 2-3 weeks for brand activations. For larger-scale events, 3-6 months is ideal to ensure availability and proper planning. Early booking also allows us to secure the best venues and talent."
  },
  {
    question: "Do you handle events outside of Delhi?",
    answer: "Yes! We operate pan-India and have successfully executed events in Mumbai, Bangalore, Hyderabad, Chennai, and other major cities. We manage all logistics and local coordination, ensuring consistent quality regardless of location."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is customized based on event scale, requirements, and duration. We offer transparent quotes with detailed breakdowns covering all aspects of the event. Contact us for a personalized proposal tailored to your specific needs and budget."
  },
  {
    question: "Can you work with our existing vendors?",
    answer: "Absolutely! We're happy to collaborate with your preferred vendors while ensuring quality and coordination. We can also recommend our trusted partner network that has been vetted for quality and reliability across various event requirements."
  },
  {
    question: "What safety measures do you implement?",
    answer: "Safety is our priority. We follow all local regulations, have emergency protocols, insured equipment, trained staff, and comprehensive risk assessments for every event. We also implement crowd management strategies and have medical support on standby for larger events."
  },
  {
    question: "Do you provide post-event analytics?",
    answer: "Yes, we provide comprehensive post-event analysis including attendance metrics, engagement data, feedback collection, and ROI measurement. This helps you understand the impact of your event and make data-driven decisions for future initiatives."
  }
];

// Stats data
const STATS_DATA = [
  { number: "500+", label: "Events Executed", suffix: "+" },
  { number: "200+", label: "Happy Clients", suffix: "+" },
  { number: "12+", label: "Years Experience", suffix: "+" },
  { number: "40+", label: "Team Members", suffix: "+" }
];

const Services = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [counters, setCounters] = useState({});
  const statsRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            STATS_DATA.forEach((stat, index) => {
              const target = parseInt(stat.number);
              const duration = 2000;
              const step = target / (duration / 16);
              let current = 0;

              const updateCounter = () => {
                current += step;
                if (current < target) {
                  setCounters(prev => ({
                    ...prev,
                    [stat.label]: Math.ceil(current)
                  }));
                  requestAnimationFrame(updateCounter);
                } else {
                  setCounters(prev => ({
                    ...prev,
                    [stat.label]: target
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

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 mt-12">
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6"
            >
              <RiSparklingFill className="text-yellow-400" size={16} />
              <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                Premium Event Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Comprehensive
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Event Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              End-to-end event management services that transform your vision into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 font-semibold">
                unforgettable experiences.
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              From intimate corporate gatherings to large-scale brand activations, 
              we deliver exceptional results through creativity, precision, and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
              >
                Explore Our Services
                <RiArrowRightLine size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openVideoModal}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 transition-all duration-300 group"
              >
                <RiPlayLargeFill size={20} className="group-hover:scale-110 transition-transform" />
                Watch Showreel
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our Impact in <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Numbers</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Delivering exceptional results through creativity, dedication, and flawless execution
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  {counters[stat.label] || 0}{stat.suffix}
                </div>
                <div className="text-sm sm:text-base text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive event solutions tailored to your unique needs and objectives
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {ENHANCED_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                      <service.icon size={28} className="text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Service {service.id}
                      </span>
                      <h3 className="text-2xl lg:text-4xl font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3"
                      >
                        <RiCheckboxCircleFill className="text-green-400 flex-shrink-0" size={20} />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/contact')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300"
                    >
                      Get Quote
                    </motion.button>
                  </div>
                </div>

                {/* Visual */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-3xl p-6 bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm border border-white/10`}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black/50 mb-6">
                      <img
                        src={service.images[0]}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(service.stats).map(([key, value], idx) => (
                        <motion.div
                          key={key}
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-4 rounded-xl bg-black/30 border border-white/10"
                        >
                          <div className="text-xl font-bold text-white">{value}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                            {key}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A structured approach that ensures seamless execution and outstanding results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                  <div className={`absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.step}
                  </div>
                  
                  <div className="mt-8">
                    <div className={`w-14 h-14 border border-white/10 hover:border-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon size={28} className="text-cyan-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Client <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear what our clients have to say about their experience working with us
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <img
                    src={TESTIMONIALS[activeTestimonial].image}
                    alt={TESTIMONIALS[activeTestimonial].name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 mx-auto sm:mx-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {TESTIMONIALS[activeTestimonial].name}
                        </h3>
                        <p className="text-gray-400">
                          {TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:ml-auto">
                        {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                          <RiStarFill key={i} className="text-yellow-400" size={20} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      "{TESTIMONIALS[activeTestimonial].content}"
                    </p>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                      {TESTIMONIALS[activeTestimonial].service}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get answers to common questions about our services and process
            </p>
          </motion.div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white flex-1 text-left">
                    {faq.question}
                  </h3>
                  <RiArrowRightLine 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RiCloseLine size={24} />
              </motion.button>
              
              <div className="aspect-video">
                <video
                  src="https://assets.mixkit.co/videos/48504/48504-720.mp4"
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;