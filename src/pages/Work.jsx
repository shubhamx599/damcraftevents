import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  RiArrowRightLine, 
  RiPlayLargeFill, 
  RiCloseLine,
  RiExternalLinkLine,
  RiFilterLine,
  RiSearchLine,
  RiCalendarLine,
  RiUserLine,
  RiMapPinLine,
  RiEyeLine,
  RiHeartLine,
  RiShareLine
} from "@remixicon/react";
import CustomButton from "../components/ui/CustomButton";
import ScrollFloat from "../components/ui/ScrollFloat";
import TiltedCard from "../components/ui/TiltedCard";
import MajorProjectItem from "../components/ui/MajorProjectItem";
import Gallery from "../components/sections/Gallery";
import useScrollMorph from "../hooks/useScrollMorph";

// Enhanced portfolio data with more details
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    title: "Tech Summit 2024",
    category: "corporate",
    description: "Annual technology conference with 500+ industry leaders and innovators",
    year: "2024",
    duration: "3 Days",
    location: "Delhi Convention Center",
    client: "Tech Innovations Ltd.",
    teamSize: "25 Members",
    budget: "Premium",
    highlights: ["Keynote Sessions", "Networking Lounge", "Product Demos", "Award Ceremony"],
    testimonial: "DamCraft delivered an exceptional tech summit that exceeded our expectations in every aspect.",
    results: "95% attendee satisfaction, 150+ media coverage"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    title: "Luxury Mall Activation",
    category: "mall",
    description: "Interactive brand experience in premium mall reaching 50K+ visitors",
    year: "2024",
    duration: "2 Weeks",
    location: "Select Citywalk, Delhi",
    client: "Global Retail Chain",
    teamSize: "18 Members",
    budget: "Premium",
    highlights: ["VR Experience Zone", "Live Performances", "Social Media Wall", "Sampling Stations"],
    testimonial: "The activation drove unprecedented engagement and social media buzz.",
    results: "2M+ social media reach, 15K+ direct engagements"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    title: "Product Launch Campaign",
    category: "advertising",
    description: "Nationwide product launch with influencer collaborations and digital campaigns",
    year: "2023",
    duration: "1 Month",
    location: "Pan-India",
    client: "Fashion Forward",
    teamSize: "30 Members",
    budget: "Enterprise",
    highlights: ["Influencer Marketing", "Digital Campaign", "PR Events", "Retail Activations"],
    testimonial: "Outstanding campaign execution that positioned our product perfectly in the market.",
    results: "300% sales increase, 5M+ impressions"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    title: "Road Show Tour",
    category: "road",
    description: "Multi-city road show reaching diverse audiences across 8 cities",
    year: "2023",
    duration: "45 Days",
    location: "8 Major Cities",
    client: "Auto Motors Inc.",
    teamSize: "35 Members",
    budget: "Enterprise",
    highlights: ["Mobile Experience Center", "Test Drive Events", "Celebrity Appearances", "Live Entertainment"],
    testimonial: "The road show successfully connected us with customers across the country.",
    results: "50K+ engagements, 5K+ test drives"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    title: "Executive Summit",
    category: "corporate",
    description: "C-level executive networking and strategy summit",
    year: "2023",
    duration: "2 Days",
    location: "Taj Palace, Delhi",
    client: "Fortune 500 Consortium",
    teamSize: "20 Members",
    budget: "Luxury",
    highlights: ["Roundtable Discussions", "Gala Dinner", "One-on-One Meetings", "Strategy Sessions"],
    testimonial: "Flawless execution that facilitated meaningful connections among industry leaders.",
    results: "100% client satisfaction, 200+ executive attendees"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Festival Activation",
    category: "mall",
    description: "Seasonal festival engagement program with cultural performances",
    year: "2023",
    duration: "1 Month",
    location: "Multiple Malls",
    client: "Cultural Heritage Board",
    teamSize: "22 Members",
    budget: "Premium",
    highlights: ["Cultural Performances", "Art Installations", "Workshops", "Food Festivals"],
    testimonial: "Beautifully captured the festival spirit while driving massive footfall.",
    results: "1M+ footfall, 10K+ workshop participants"
  }
];

const FILTERS = [
  { id: "all", label: "All Projects", count: PORTFOLIO_ITEMS.length },
  { id: "corporate", label: "Corporate Events", count: PORTFOLIO_ITEMS.filter(item => item.category === "corporate").length },
  { id: "mall", label: "Mall Activations", count: PORTFOLIO_ITEMS.filter(item => item.category === "mall").length },
  { id: "advertising", label: "Advertising", count: PORTFOLIO_ITEMS.filter(item => item.category === "advertising").length },
  { id: "road", label: "Road Shows", count: PORTFOLIO_ITEMS.filter(item => item.category === "road").length }
];

const STATS = [
  { number: "400+", label: "Events Completed", icon: RiCalendarLine },
  { number: "50+", label: "Happy Clients", icon: RiUserLine },
  { number: "10+", label: "Years Experience", icon: RiMapPinLine },
  { number: "40+", label: "Team Members", icon: RiUserLine }
];

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const heroRef = useRef(null);

  useScrollMorph(heroRef, {
    borderRadius: "80px",
    scale: 1.02,
  });

  // Filter and sort projects
  const filteredProjects = PORTFOLIO_ITEMS.filter(project => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "newest") return b.year - a.year;
    if (sortBy === "oldest") return a.year - b.year;
    return 0;
  });

  // GSAP Animations
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate filter buttons
    gsap.utils.toArray(".filter-btn").forEach((btn, index) => {
      gsap.fromTo(btn, 
        { opacity: 0, x: -50, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: btn,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate stats
    gsap.utils.toArray(".stat-item").forEach((stat, index) => {
      gsap.fromTo(stat,
        { opacity: 0, y: 100, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // Project Modal Component
  const ProjectModal = useCallback(({ project, onClose }) => (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-80 lg:h-96">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                <RiCloseLine size={24} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    {project.year}
                  </span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {project.budget}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-white/80 text-lg">{project.description}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Project Details */}
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-6">Project Overview</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <RiCalendarLine className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold">{project.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RiMapPinLine className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RiUserLine className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <p className="font-semibold">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RiUserLine className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Team Size</p>
                        <p className="font-semibold">{project.teamSize}</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Key Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold mb-2">Client Testimonial</h4>
                    <p className="text-gray-600 italic">"{project.testimonial}"</p>
                    <p className="text-sm text-gray-500 mt-2">- {project.client}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">Results Delivered</h3>
                  <p className="text-white/90 leading-relaxed">{project.results}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Client Satisfaction</span>
                      <span className="font-bold">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Project Success</span>
                      <span className="font-bold">A+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Timeline Adherence</span>
                      <span className="font-bold">100%</span>
                    </div>
                  </div>

                  <CustomButton
                    label="View Case Study"
                    to={`/work/${project.id}`}
                    variant="secondary"
                    size="medium"
                    className="w-full mt-6"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ), []);

  // Project Card Component
  const ProjectCard = useCallback(({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => setSelectedProject(project)}
    >
      <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                {project.category}
              </span>
              <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                {project.year}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{project.description}</p>
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="flex items-center gap-2 text-white text-sm">
                <RiEyeLine size={16} />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
          <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
            {project.year}
          </span>
        </div>
        <p className="text-gray-600 mb-3">{project.description}</p>
        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
            {project.category}
          </span>
          <span className="text-gray-500 text-sm">{project.client}</span>
        </div>
      </div>
    </motion.div>
  ), []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        
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
              Our Creative Portfolio
            </ScrollFloat>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Explore our diverse range of successful events and campaigns that have
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 font-semibold">
                {" "}left lasting impressions
              </span> and driven real results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <CustomButton
                label="View Our Work"
                to="#portfolio"
                variant="secondary"
                size="large"
              />
              <CustomButton
                label="Get In Touch"
                to="/contact"
                variant="primary"
                size="large"
              />
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={24} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A curated selection of our most impactful work across various event categories
            </p>
          </motion.div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
            {/* Search */}
            <div className="relative w-full lg:w-auto">
              <RiSearchLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <RiFilterLine size={16} />
                  {filter.label}
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    viewMode === "grid" ? "bg-white shadow-md" : "text-gray-500"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    viewMode === "list" ? "bg-white shadow-md" : "text-gray-500"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <MajorProjectItem
                  key={project.id}
                  title={project.title}
                  year={project.year}
                  img={project.image}
                  description={project.description}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiSearchLine className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Immerse yourself in our visual storytelling through captivating moments from our most memorable events.
            </p>
          </motion.div>
          <Gallery />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden"
          >
            <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-white/5 rounded-full animate-float-slow"></div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-6 relative z-10">
              Inspired by Our Work?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto relative z-10">
              Let's collaborate to create your next unforgettable experience that exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <CustomButton
                label="Start Your Project"
                to="/contact"
                variant="primary"
                size="large"
              />
              <CustomButton
                label="View Case Studies"
                to="/work/case-studies"
                variant="secondary"
                size="large"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default Work;