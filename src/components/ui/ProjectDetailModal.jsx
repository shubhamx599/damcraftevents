import { motion, AnimatePresence } from "framer-motion";
import {
  RiCloseLine,
  RiCalendarLine,
  RiMapPinLine,
  RiUserLine,
  RiSparklingFill,
  RiExternalLinkLine,
  RiVideoLine,
  RiImageLine,
} from "@remixicon/react";

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-[var(--bg-dark)] border border-[var(--border-glass)] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-[var(--border-glass)] backdrop-blur-md rounded-full p-3 border border-[var(--border-glass)] hover:bg-[var(--border-glass)]/80 text-[var(--text-primary)] transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RiCloseLine size={20} className="text-current" />
            </motion.button>

            {/* Media Section */}
            <div className="relative h-64 sm:h-80 lg:h-96">
              {project.video ? (
                <video
                  src={project.video}
                  controls
                  autoPlay
                  className="w-full h-full object-cover rounded-t-3xl"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] to-transparent rounded-t-3xl" />

              {/* Media Type Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white flex items-center gap-2">
                {project.video ? (
                  <RiVideoLine size={14} />
                ) : (
                  <RiImageLine size={14} />
                )}
                {project.video ? "Video" : "Image"}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8">
              {/* Header Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm text-white font-medium">
                  {project.category}
                </span>
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[var(--border-glass)] rounded-full text-sm text-[var(--text-secondary)] border border-[var(--border-glass)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                {project.longDescription}
              </p>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[var(--border-glass)]/50 rounded-2xl p-4 border border-[var(--border-glass)] shadow-sm"
                >
                  <RiCalendarLine className="text-purple-400 mb-2" size={20} />
                  <div className="text-sm text-[var(--text-secondary)]">Year</div>
                  <div className="text-[var(--text-primary)] font-semibold">{project.year}</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[var(--border-glass)]/50 rounded-2xl p-4 border border-[var(--border-glass)] shadow-sm"
                >
                  <RiMapPinLine className="text-pink-400 mb-2" size={20} />
                  <div className="text-sm text-[var(--text-secondary)]">Location</div>
                  <div className="text-[var(--text-primary)] font-semibold">
                    {project.location}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[var(--border-glass)]/50 rounded-2xl p-4 border border-[var(--border-glass)] shadow-sm"
                >
                  <RiUserLine className="text-yellow-400 mb-2" size={20} />
                  <div className="text-sm text-[var(--text-secondary)]">Attendees</div>
                  <div className="text-[var(--text-primary)] font-semibold">
                    {project.attendees}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[var(--border-glass)]/50 rounded-2xl p-4 border border-[var(--border-glass)] shadow-sm"
                >
                  <RiSparklingFill className="text-green-400 mb-2" size={20} />
                  <div className="text-sm text-[var(--text-secondary)]">Duration</div>
                  <div className="text-[var(--text-primary)] font-semibold">
                    {project.duration}
                  </div>
                </motion.div>
              </div>

              {/* Client Info */}
              {project.client && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[var(--border-glass)]/50 rounded-2xl p-4 border border-[var(--border-glass)] mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[var(--text-secondary)]">Client</div>
                      <div className="text-[var(--text-primary)] font-semibold text-lg">
                        {project.client}
                      </div>
                    </div>
                    <RiExternalLinkLine className="text-[var(--text-secondary)]" size={20} />
                  </div>
                </motion.div>
              )}

              {/* Highlights Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[var(--border-glass)]/50 rounded-2xl p-6 border border-[var(--border-glass)] mb-6"
              >
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  Event Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Additional Media Gallery */}
              {project.additionalImages &&
                project.additionalImages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[var(--border-glass)]/50 rounded-2xl p-6 border border-[var(--border-glass)]"
                  >
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                      Event Gallery
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {project.additionalImages.map((image, idx) => (
                        <motion.img
                          key={idx}
                          src={image}
                          alt={`${project.title} ${idx + 1}`}
                          className="w-full h-24 sm:h-32 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => window.open(image, "_blank")}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
