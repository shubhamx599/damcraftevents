import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiCalendarEventLine, 
  RiMegaphoneLine, 
  RiTeamLine, 
  RiStarFill,
  RiCheckboxCircleFill,
  RiPlayLargeFill,
  RiArrowRightLine,
  RiCloseLine,
  RiExternalLinkLine
} from "@remixicon/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollMorph from "../hooks/useScrollMorph";
import CustomButton from "../components/ui/CustomButton";
import ScrollFloat from "../components/ui/ScrollFloat";
import { SERVICES, STATS, EVENT_TYPES } from "../constants/eventData";
import { eventImages } from "../constants/eventImages";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Enhanced services data with more details
const ENHANCED_SERVICES = [
  {
    ...SERVICES[0],
    icon: "ri-calendar-event-line",
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
    stats: { events: 150, satisfaction: 98, clients: 45 },
    process: ["Consultation", "Planning", "Execution", "Follow-up"]
  },
  {
    ...SERVICES[1],
    icon: "ri-megaphone-line",
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
    stats: { events: 200, reach: "2M+", brands: 60 },
    process: ["Strategy", "Activation", "Engagement", "Analysis"]
  },
  {
    ...SERVICES[2],
    icon: "ri-team-line",
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
    stats: { talent: 500, events: 300, retention: 95 },
    process: ["Sourcing", "Screening", "Booking", "Management"]
  }
];

// Process steps data
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Consultation",
    description: "We begin by understanding your vision, objectives, and requirements through detailed consultations.",
    icon: "ri-chat-1-line"
  },
  {
    step: "02",
    title: "Strategic Planning",
    description: "Our team creates a comprehensive plan with timelines, budgets, and creative concepts tailored to your needs.",
    icon: "ri-map-2-line"
  },
  {
    step: "03", 
    title: "Creative Execution",
    description: "We bring your event to life with meticulous attention to detail and flawless execution across all elements.",
    icon: "ri-flashlight-line"
  },
  {
    step: "04",
    title: "Post-Event Analysis",
    description: "We provide detailed analytics and feedback to measure success and identify opportunities for future events.",
    icon: "ri-line-chart-line"
  }
];

// Testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Tech Innovations Ltd.",
    role: "Marketing Director",
    content: "DamCraft transformed our product launch into an unforgettable experience. Their attention to detail and creative approach exceeded all expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    service: "Corporate Events"
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Global Retail Chain",
    role: "Brand Manager", 
    content: "The mall activation campaign by DamCraft drove unprecedented footfall and engagement. Their team is professional, creative, and results-driven.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    service: "Brand Activations"
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "Fashion Forward",
    role: "CEO",
    content: "Outstanding talent management services! They provided the perfect hosts and influencers for our fashion show. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    service: "Talent Management"
  }
];

// FAQ data
const FAQ_DATA = [
  {
    question: "How far in advance should I book your services?",
    answer: "We recommend booking at least 4-6 weeks in advance for corporate events and 2-3 weeks for brand activations. For larger-scale events, 3-6 months is ideal to ensure availability and proper planning."
  },
  {
    question: "Do you handle events outside of Delhi?",
    answer: "Yes! We operate pan-India and have successfully executed events in Mumbai, Bangalore, Hyderabad, Chennai, and other major cities. We manage all logistics and local coordination."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is customized based on event scale, requirements, and duration. We offer transparent quotes with detailed breakdowns. Contact us for a personalized proposal."
  },
  {
    question: "Can you work with our existing vendors?",
    answer: "Absolutely! We're happy to collaborate with your preferred vendors while ensuring quality and coordination. We can also recommend our trusted partner network."
  },
  {
    question: "What safety measures do you implement?",
    answer: "Safety is our priority. We follow all local regulations, have emergency protocols, insured equipment, trained staff, and comprehensive risk assessments for every event."
  }
];

const Services = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Apply scroll morph to hero section
  useScrollMorph(heroRef, {
    borderRadius: "80px",
    scale: 1.02,
  });

  // Enhanced animations with GSAP
  useEffect(() => {
    const triggers = [];

    // Service cards animation
    gsap.utils.toArray(".service-card").forEach((card, index) => {
      const anim = gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 100,
          rotationX: 15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      triggers.push(anim.scrollTrigger);
    });

    // Process steps animation
    gsap.utils.toArray(".process-step").forEach((step, index) => {
      const anim = gsap.fromTo(
        step,
        { 
          opacity: 0, 
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      triggers.push(anim.scrollTrigger);
    });

    // Stats counter animation
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2500;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      const st = ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        onEnter: () => updateCounter(),
        once: true,
      });
      triggers.push(st);
    });

    // Testimonial auto-rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    // Cleanup
    return () => {
      triggers.forEach((t) => t?.kill());
      clearInterval(testimonialInterval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleFaq = useCallback((index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  }, [expandedFaq]);

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <ScrollFloat
              animationDuration={1.5}
              ease="power3.out"
              scrollStart="center bottom+=60%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.02}
              textClassName="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              containerClassName="mb-8"
            >
              Comprehensive Event Solutions
            </ScrollFloat>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              End-to-end event management services that transform your vision into 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 font-semibold">
                {" "}unforgettable experiences
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              From intimate corporate gatherings to large-scale brand activations, 
              we deliver exceptional results through creativity, precision, and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <CustomButton
                label="Explore Our Services"
                to="#services"
                variant="secondary"
                size="large"
              />
              <button
                onClick={openVideoModal}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 group"
              >
                <RiPlayLargeFill size={20} className="group-hover:scale-110 transition-transform" />
                Watch Showreel
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our Impact in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Numbers</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Delivering exceptional results through creativity, dedication, and flawless execution
            </p>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: STATS.EVENTS_COMPLETED, label: "Events Completed", suffix: "+" },
              { number: STATS.HAPPY_CLIENTS, label: "Happy Clients", suffix: "+" },
              { number: STATS.YEARS_EXPERIENCE, label: "Years Experience", suffix: "+" },
              { number: STATS.TEAM_MEMBERS, label: "Team Members", suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group"
              >
                <h3 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="counter" data-target={stat.number}>
                    0
                  </span>
                  {stat.suffix}
                </h3>
                <p className="text-lg text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive event solutions tailored to your unique needs and objectives
            </p>
          </motion.div>

          <div className="space-y-12">
            {ENHANCED_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                        <i className={`${service.icon} text-2xl text-white`} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                          Service {service.id}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <RiCheckboxCircleFill className="text-green-400 flex-shrink-0" size={20} />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-6">
                      <CustomButton
                        label="Learn More"
                        to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                        variant="secondary"
                        size="medium"
                      />
                      <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <span>View Case Studies</span>
                        <RiExternalLinkLine size={16} />
                      </button>
                    </div>
                  </motion.div>

                  {/* Visual */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                    className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  >
                    <div className={`rounded-3xl p-8 bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm border border-white/10`}>
                      <div className="aspect-video rounded-2xl overflow-hidden bg-black/50">
                        <img
                          src={eventImages[service.title.toLowerCase().includes('corporate') ? 'corporate' : 
                                service.title.toLowerCase().includes('brand') ? 'mall' : 
                                service.title.toLowerCase().includes('talent') ? 'advertising' : 'road'][0]}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {Object.entries(service.stats).map(([key, value], idx) => (
                          <div key={key} className="text-center p-4 rounded-xl bg-black/30">
                            <div className="text-2xl font-bold text-white">{value}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A structured approach that ensures seamless execution and outstanding results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                className="process-step group"
              >
                <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  
                  <div className="mt-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className={`${step.icon} text-3xl text-cyan-400`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Testimonials</span>
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
                <div className="flex items-start gap-6">
                  <img
                    src={TESTIMONIALS[activeTestimonial].image}
                    alt={TESTIMONIALS[activeTestimonial].name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {TESTIMONIALS[activeTestimonial].name}
                        </h3>
                        <p className="text-gray-400">
                          {TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                          <RiStarFill key={i} className="text-yellow-400" size={20} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      "{TESTIMONIALS[activeTestimonial].content}"
                    </p>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                      <i className="ri-checkbox-circle-line" />
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
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Questions</span>
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
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white flex-1">
                    {faq.question}
                  </h3>
                  <RiArrowRightLine 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-300 ${
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to Create Something Extraordinary?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto relative z-10">
              Let's discuss your vision and bring it to life with our expert event solutions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <CustomButton
                label="Get Started Today"
                to="/contact"
                variant="primary"
                size="large"
              />
              <CustomButton
                label="View Our Work"
                to="/work"
                variant="secondary"
                size="large"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                <RiCloseLine size={24} />
              </button>
              
              <div className="aspect-video">
                <video
                  src="/assets/videos/services-showreel.mp4"
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