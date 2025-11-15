import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  RiPlayFill,
  RiPauseFill,
  RiExternalLinkLine,
  RiCalendarLine,
  RiMapPinLine,
  RiUserLine,
  RiVideoLine,
  RiImageLine,
} from "@remixicon/react";

const ProjectCard = ({ project, index, onProjectClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => onProjectClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-500">
        {/* Media Container */}
        <div className="aspect-video relative overflow-hidden">
          {project.video ? (
            <>
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster={project.image}
              />
              <div className={`absolute inset-0 bg-black/40 transition-all duration-300 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`} />
              
              {/* Video Play Button */}
              <button
                onClick={toggleVideo}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/20 group-hover:scale-110 transition-transform">
                  {isVideoPlaying ? (
                    <RiPauseFill size={24} className="text-white" />
                  ) : (
                    <RiPlayFill size={24} className="text-white" />
                  )}
                </div>
              </button>
            </>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}

          {/* Media Type Badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-2">
            {project.video ? <RiVideoLine size={12} /> : <RiImageLine size={12} />}
            {project.video ? 'Video' : 'Image'}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-xs text-white font-medium">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
              {project.title}
            </h3>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <RiExternalLinkLine size={20} className="text-gray-400" />
            </motion.div>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Project Meta */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <RiCalendarLine size={12} />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiMapPinLine size={12} />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiUserLine size={12} />
              <span>{project.attendees}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-500 rounded-full" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;