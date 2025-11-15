import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiPlayFill,
  RiPauseFill,
  RiCloseLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiFullscreenFill,
  RiImageLine,
  RiVideoLine,
  RiFilter3Line,
  RiSearchLine,
} from "@remixicon/react";

// ===============================
// ENHANCED MEDIA DATA
// ===============================

const galleryData = {
  all: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&auto=format&fit=crop&q=80",
      title: "Grand Mall Opening",
      category: "mall",
      year: "2023"
    },
    {
      type: "image", 
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80",
      title: "Corporate Conference",
      category: "corporate",
      year: "2024"
    },
    {
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-audience-clapping-at-a-concert-43537-large.mp4",
      title: "Music Festival",
      category: "road",
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
      title: "Brand Campaign",
      category: "advertising", 
      year: "2024"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?w=800&auto=format&fit=crop&q=80",
      title: "Shopping Festival",
      category: "mall",
      year: "2023"
    },
    {
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-music-festival-43535-large.mp4",
      title: "Cultural Event",
      category: "road",
      year: "2024"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
      title: "Product Launch",
      category: "corporate",
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80",
      title: "Outdoor Advertising",
      category: "advertising",
      year: "2024"
    },
    {
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-group-of-people-dancing-at-a-wedding-43536-large.mp4",
      title: "Wedding Celebration", 
      category: "road",
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1521790361557-1a61aab04182?w=800&auto=format&fit=crop&q=80",
      title: "Business Summit",
      category: "corporate",
      year: "2024"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=80",
      title: "Retail Activation",
      category: "mall",
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1512427691650-1ff71b8a860e?w=800&auto=format&fit=crop&q=80",
      title: "Roadshow Event",
      category: "road",
      year: "2024"
    }
  ],
  corporate: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80",
      title: "Corporate Conference",
      category: "corporate",
      year: "2024"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80", 
      title: "Product Launch",
      category: "corporate",
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1521790361557-1a61aab04182?w=800&auto=format&fit=crop&q=80",
      title: "Business Summit",
      category: "corporate",
      year: "2024"
    }
  ],
  mall: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&auto=format&fit=crop&q=80",
      title: "Grand Mall Opening",
      category: "mall",
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?w=800&auto=format&fit=crop&q=80",
      title: "Shopping Festival", 
      category: "mall",
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=80",
      title: "Retail Activation",
      category: "mall",
      year: "2023"
    }
  ],
  advertising: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
      title: "Brand Campaign",
      category: "advertising",
      year: "2024"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80",
      title: "Outdoor Advertising",
      category: "advertising",
      year: "2024"
    }
  ],
  road: [
    {
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-audience-clapping-at-a-concert-43537-large.mp4",
      title: "Music Festival",
      category: "road",
      year: "2023"
    },
    {
      type: "video", 
      url: "https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-music-festival-43535-large.mp4",
      title: "Cultural Event",
      category: "road",
      year: "2024"
    },
    {
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-group-of-people-dancing-at-a-wedding-43536-large.mp4",
      title: "Wedding Celebration",
      category: "road", 
      year: "2023"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1512427691650-1ff71b8a860e?w=800&auto=format&fit=crop&q=80",
      title: "Roadshow Event",
      category: "road",
      year: "2024"
    }
  ]
};

const categories = [
  { id: "all", label: "All Events", count: galleryData.all.length, icon: RiImageLine },
  { id: "corporate", label: "Corporate Events", count: galleryData.corporate.length, icon: RiVideoLine },
  { id: "mall", label: "Mall Activations", count: galleryData.mall.length, icon: RiImageLine },
  { id: "advertising", label: "Advertising", count: galleryData.advertising.length, icon: RiVideoLine },
  { id: "road", label: "Road Shows", count: galleryData.road.length, icon: RiVideoLine },
];

// ===============================
// MAIN COMPONENT
// ===============================

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const galleryItems = galleryData[activeCategory].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Lightbox navigation
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsPlaying(false);
  };

  const nextItem = () => {
    setLightboxIndex(prev => 
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
    setIsPlaying(false);
  };

  const prevItem = () => {
    setLightboxIndex(prev => 
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
    setIsPlaying(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextItem();
          break;
        case 'ArrowLeft':
          prevItem();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const currentMedia = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6"
            >
              <RiImageLine className="text-purple-400" size={16} />
              <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                Our Portfolio
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Event
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of unforgettable events, brand activations, and creative experiences 
              that have captivated audiences across the nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-md mx-auto mb-8"
          >
            <RiSearchLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-white/40"
            />
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                    : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <category.icon size={16} />
                <span className="font-medium">{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id 
                    ? "bg-white/20 text-white" 
                    : "bg-white/10 text-white/60"
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  {/* Media Container */}
                  <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
                    {item.type === "video" ? (
                      <div className="aspect-square relative">
                        <video
                          src={item.url}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                          <RiVideoLine size={12} className="inline mr-1" />
                          Video
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                          <RiImageLine size={12} className="inline mr-1" />
                          Image
                        </div>
                      </div>
                    )}

                    {/* Overlay Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                      <div className="flex justify-between items-center text-xs text-white/70">
                        <span className="capitalize">{item.category}</span>
                        <span>{item.year}</span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {galleryItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <RiSearchLine size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RiCloseLine size={24} className="text-white" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                prevItem();
              }}
              className="absolute left-4 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RiArrowLeftLine size={24} className="text-white" />
            </motion.button>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                nextItem();
              }}
              className="absolute right-4 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RiArrowRightLine size={24} className="text-white" />
            </motion.button>

            {/* Media Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-6xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {currentMedia.type === "video" ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={currentMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  {!isPlaying && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg"
                    >
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/20">
                        <RiPlayFill size={32} className="text-white" />
                      </div>
                    </motion.button>
                  )}
                </div>
              ) : (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
              )}

              {/* Media Info */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
              >
                <h3 className="text-white font-semibold text-lg mb-2">{currentMedia.title}</h3>
                <div className="flex justify-between items-center text-sm text-white/70">
                  <div className="flex gap-4">
                    <span className="capitalize">{currentMedia.category}</span>
                    <span>{currentMedia.year}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    {currentMedia.type === "video" ? <RiVideoLine size={14} /> : <RiImageLine size={14} />}
                    {currentMedia.type}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-sm"
            >
              {lightboxIndex + 1} / {galleryItems.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;