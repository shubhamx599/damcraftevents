import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomButton from "../../components/ui/CustomButton";

gsap.registerPlugin(ScrollTrigger);

const mainVideo = "https://www.pexels.com/download/video/2066560/";
const storyVideo = "https://www.pexels.com/download/video/6519561/";

const StorySection = () => {
  const videoRef = useRef();

  // Scroll Animation for main video
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      gsap.to(video, {
        width: "100%",
        borderRadius: "30px",
        ease: "power2.out",
        scrollTrigger: {
          trigger: video,
          start: "top 80%",
          end: "top 20%",
          scrub: 2,
        },
      });
    }
  }, []);

  // Text Reveal Component
  const RevealText = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );

  return (
    <div>
      {/* Video Section */}
      <section className="py-24 pt-0 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealText>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Crafting{" "}
                <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Unforgettable
                </span>{" "}
                Experiences
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                From corporate summits to grand celebrations, we turn visions
                into immersive, lasting memories.
              </p>
            </div>
          </RevealText>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center h-[45vh] md:h-[60vh] lg:h-[75vh] overflow-hidden rounded-3xl md:rounded-4xl"
          >
            <video
              ref={videoRef}
              className="h-full w-full md:w-[90%] object-cover shadow-2xl"
              src={mainVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      {/* Story Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-20 flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col gap-6 text-white"
          >
            <h2 className="text-4xl md:text-6xl font-bold">
              Crafting Memories Since{" "}
              <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                2010
              </span>
            </h2>

            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              For over a decade, we’ve been designing unforgettable experiences.
              Whether it’s a boardroom or a ballroom, our mission is simple — to
              deliver excellence with emotion.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              From concept to celebration, every event we create tells a story —
              your story — brought to life with design, detail, and dedication.
            </p>

            {/* Button */}
            <div className="mt-4">
              <CustomButton label="Our Story" to="/about" variant="secondary" />
            </div>
          </motion.div>

          {/* Right Video */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 rounded-3xl md:rounded-4xl overflow-hidden shadow-[0_0_80px_-10px_rgba(255,255,255,0.1)]"
          >
            <video
              src={storyVideo}
              className="w-full h-[400px] md:h-[600px] object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StorySection;
