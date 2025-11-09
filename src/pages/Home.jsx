import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import main from "../assets/videos/1.mp4";
import ink from "../assets/videos/ink.mp4";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import EventSection from "../components/sections/EventSection";
import ProjectSection from "../components/sections/ProjectSection";
import ReadMoreButton from "../components/ui/ReadMoreButton";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const location = useLocation();
  const videoRef = useRef();

  useEffect(() => {
    // Video scroll animation
    if (location.pathname === "/" && videoRef.current) {
      const video = videoRef.current;
      gsap.to(video, {
        width: "100%",
        borderRadius: "30px",
        scrollTrigger: {
          trigger: video,
          start: "top 80%",
          end: "top 20%",
          scrub: 2,
        },
      });
    }
  }, [location.pathname]);

  // Text reveal animation component
  const RevealText = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <HeroSection />
      <StatsSection />

      {/* Main Video Section */}
      <section className="py-20 px-4 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealText>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Crafting <span className="text-red-500">Unforgettable</span>{" "}
                Moments
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                From corporate gatherings to grand celebrations, we transform
                visions into breathtaking realities
              </p>
            </div>
          </RevealText>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center h-[40vh] md:h-[60vh] lg:h-[80vh] overflow-hidden rounded-3xl md:rounded-4xl"
          >
            <video
              ref={videoRef}
              className="h-full w-full md:w-[90%] object-cover shadow-2xl"
              src={main}
              autoPlay
              loop
              muted
              data-cursor-size="60"
              data-cursor-text="🎬 PLAY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Ink Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex flex-col gap-6 text-white relative z-10"
            >
              <h2 className="text-4xl md:text-6xl font-bold">
                Crafting Memories Since 2010
              </h2>
              <div className="text-lg md:text-xl leading-relaxed text-white/90 space-y-4">
                <p>
                  Since 2010, we have been helping people plan and enjoy events
                  of all kinds. From small family functions to big celebrations,
                  we focus on making everything smooth and stress-free. Our team
                  takes care of the details, so our clients can relax and enjoy
                  the moment.
                </p>
                <p>
                  Over the years, we have created events that people remember
                  with happiness. We listen to what our clients want and turn
                  their ideas into reality. Every event is done with care,
                  creativity, and passion. Our aim is simple — to make every
                  occasion special and leave lasting memories.
                </p>
              </div>
              <div className="mt-4">
                <ReadMoreButton
                  label="Our Story"
                  to="/about"
                  variant="secondary"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl"
            >
              <video
                src={ink}
                className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl"
                autoPlay
                loop
                muted
                data-cursor-size="60"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
      <EventSection />
      <ProjectSection />
    </div>
  );
};

export default Home;
