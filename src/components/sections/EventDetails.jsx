import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Stock videos (Pexels CDN – fast + free)
const STOCK = {
  main: "https://videos.pexels.com/video-files/3184326/3184326-hd_1280_720_25fps.mp4",
  corporate:
    "https://videos.pexels.com/video-files/5877761/5877761-uhd_2560_1440_30fps.mp4",
  mall: "https://videos.pexels.com/video-files/5634242/5634242-hd_1920_1080_30fps.mp4",
  market:
    "https://videos.pexels.com/video-files/854113/854113-hd_1280_720_24fps.mp4",
  advertisement:
    "https://videos.pexels.com/video-files/754616/754616-hd_1280_720_24fps.mp4",
  product:
    "https://videos.pexels.com/video-files/3130149/3130149-hd_1920_1080_25fps.mp4",
};

const contentMap = {
  corporate: {
    title: "Corporate Events",
    description: "Turning corporate visions into unforgettable realities.",
    subtitle: "Professional event solutions for businesses",
    video: STOCK.corporate,
    corp: STOCK.main,
    features: [
      "Conference & Seminars",
      "Product Launches",
      "Corporate Meetings",
      "Award Ceremonies",
      "Team Building Events",
    ],
    stats: { events: "150+", clients: "50+", satisfaction: "98%" },
  },
  mall: {
    title: "Mall Activations",
    description: "Turning crowds into customers.",
    subtitle: "Engaging brand experiences in retail spaces",
    video: STOCK.mall,
    features: [
      "Brand Promotions",
      "Product Demonstrations",
      "Customer Engagement",
      "Live Performances",
      "Interactive Installations",
    ],
    stats: { events: "200+", reach: "1M+", engagement: "85%" },
  },
  market: {
    title: "Market Activations",
    description: "Where movement meets marketing.",
    subtitle: "Dynamic campaigns in high-traffic areas",
    video: STOCK.market,
    features: [
      "Road Shows",
      "Sampling Campaigns",
      "Street Marketing",
      "Public Engagement",
      "Brand Awareness",
    ],
    stats: { campaigns: "100+", cities: "25+", impact: "90%" },
  },
  advertisement: {
    title: "Advertising Solutions",
    description: "Smart advertising. Real results.",
    subtitle: "Creative and strategic advertising campaigns",
    video: STOCK.advertisement,
    features: [
      "Digital Campaigns",
      "Print Advertising",
      "Outdoor Media",
      "Social Media Marketing",
      "Brand Storytelling",
    ],
    stats: { campaigns: "300+", reach: "5M+", conversion: "25%" },
  },
  product: {
    title: "Product Advertisement",
    description: "Where innovation meets audience.",
    subtitle: "Strategic product promotion and launch campaigns",
    video: STOCK.product,
    features: [
      "Product Launches",
      "Demo Events",
      "Influencer Marketing",
      "Media Coverage",
      "Consumer Engagement",
    ],
    stats: { launches: "80+", products: "200+", success: "95%" },
  },
};

const EventDetails = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const data = contentMap[type];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".animate-on-scroll").forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [type]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-20 max-md:px-4">
        <div className="text-center">
          <h1 className="mlarge font-bold mb-4">Event Not Found</h1>
          <p className="medium mb-8">
            The requested event service doesn't exist.
          </p>
          <button
            onClick={() => navigate("/services")}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-20 max-md:px-4">
      <div className="hero w-full h-[90vh] mt-[5rem] animate-on-scroll">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="mmedium font-semibold uppercase">{data.title}</h1>
            <p className="medium text-gray-600 mt-2">{data.subtitle}</p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
            Back to Services
          </button>
        </div>

        <div className="relative w-full h-full rounded-4xl overflow-hidden">
          <video
            className="h-full w-full object-cover object-top"
            src={data.video || STOCK.main}
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-black/20 flex items-end p-8">
            <p className="text-white medium max-w-2xl">{data.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 py-16 max-md:grid-cols-1 animate-on-scroll">
        {Object.entries(data.stats).map(([key, value]) => (
          <div key={key} className="text-center">
            <h3 className="mlarge font-bold text-green-600">{value}</h3>
            <p className="medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
          </div>
        ))}
      </div>

      <div className="py-16 animate-on-scroll">
        <h2 className="mmedium font-semibold uppercase mb-8">What We Offer</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-md:grid-cols-1">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
            >
              <i className="ri-checkbox-circle-line text-green-600"></i>
              <span className="medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Your remaining image sections stay unchanged */}
      {/* (Because they already use Unsplash URLs) */}

    </div>
  );
};

export default EventDetails;
