import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mainVideo from "../../assets/videos/1.mp4";
import corporate from "../../assets/videos/corporate.mp4";
import mall from "../../assets/videos/mall.mp4";
import market from "../../assets/videos/market.mp4";
import advertisement from "../../assets/videos/bike.mp4";
import corp from "../../assets/videos/corp.mp4";

const contentMap = {
  corporate: {
    title: "Corporate Events",
    description: "Turning corporate visions into unforgettable realities.",
    subtitle: "Professional event solutions for businesses",
    video: corporate,
    corp: corp,
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
    video: mall,
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
    video: market,
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
    video: advertisement,
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
    video: advertisement,
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

    // Animate sections on scroll
    gsap.utils.toArray(".animate-on-scroll").forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 60,
        },
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
      {/* Hero Section */}
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
            src={data.video || mainVideo}
            autoPlay
            loop
            muted
          ></video>
          <div className="absolute inset-0 bg-black/20 flex items-end p-8">
            <p className="text-white medium max-w-2xl">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-8 py-16 max-md:grid-cols-1 animate-on-scroll">
        {Object.entries(data.stats).map(([key, value], index) => (
          <div key={key} className="text-center">
            <h3 className="mlarge font-bold text-green-600">{value}</h3>
            <p className="medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
          </div>
        ))}
      </div>

      {/* Features Section */}
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

      {/* Content Sections */}
      <div className="part w-full min-h-screen mt-[10rem] flex flex-col gap-[5rem] overflow-hidden">
        {/* Section 1 */}
        <div className="view2 w-full flex justify-between gap-10 max-md:flex-col animate-on-scroll">
          <div className="w-[50%] max-md:w-full">
            <div className="w-full h-[86vh] rounded-2xl overflow-hidden">
              <img
                className="object-center object-cover h-full w-full"
                src="https://images.unsplash.com/photo-1625539867671-af969da3a214"
                alt="Event Setup"
              />
            </div>
            <h1 className="uppercase font-semibold text-lg tracking-tight mt-4">
              Professional Setup
            </h1>
          </div>
          <div className="w-[50%] max-md:w-full">
            <img
              className="w-full object-top object-cover h-[68vh] rounded-2xl"
              src="https://images.unsplash.com/photo-1628336358317-0582bfa7519d"
              alt="Event Execution"
            />
            <div className="flex gap-10 mt-6 max-md:flex-col">
              <h1 className="font-semibold w-[50%] max-md:w-full leading-7 text-sm">
                {data.description}
              </h1>
              <p className="w-fit text-[1rem] max-md:w-full text-gray-600">
                Every event we craft is designed to make an impression — not
                just on the day it happens, but long after. From strategy to
                storytelling, our goal is to bring brands to life in the most
                immersive and impactful way.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="view3 w-full h-[90vh] flex gap-10 max-md:flex-col overflow-hidden animate-on-scroll">
          <div className="flex flex-col w-[40%] max-md:w-full items-center justify-between">
            <i className="ri-arrow-right-line text-[5rem] mt-[8rem] max-md:mt-0 text-gray-400"></i>
            <h1 className="font-semibold leading-7 text-sm text-center">
              Designed for Engagement. Delivered with Precision.
            </h1>
          </div>
          <img
            className="w-[60%] max-md:w-full h-full object-center object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1445384763658-0400939829cd"
            alt="Event Engagement"
          />
        </div>

        {/* Section 3 */}
        <div className="animate-on-scroll">
          <img
            className="w-full h-[90vh] object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1667498234868-dfb09fdd5c3b"
            alt="Event Showcase"
          />
        </div>

        {/* Section 4 */}
        <div className="view5 min-h-screen w-full flex gap-10 max-md:flex-col max-md:gap-4 animate-on-scroll">
          <img
            className="w-[50%] max-md:w-full h-[90vh] object-cover max-md:h-[50vh] rounded-2xl"
            src="https://images.unsplash.com/photo-1629003796219-50be87eaf428"
            alt="Event Moments"
          />

          <div className="w-[50%] max-md:w-full h-[90vh] flex flex-col gap-8 max-md:gap-2">
            <h1 className="uppercase font-bold text-lg tracking-tight">
              Captivating Moments
            </h1>
            <p className="font-semibold w-full leading-7 text-sm">
              Creating moments that stay with your brand.
            </p>
            <p className="text-gray-600">
              We believe that great events don't just happen — they're built.
              With detail-oriented execution and creative direction, we ensure
              that every frame, every interaction, and every moment delivers
              value.
            </p>
            <div className="flex gap-5 max-md:flex-col w-full overflow-hidden">
              <img
                className="object-center object-cover max-md:h-[50%] max-md:w-full w-[60%] rounded-xl"
                src="https://images.unsplash.com/photo-1625539867671-af969da3a214"
                alt="Event Detail 1"
              />
              <img
                className="object-center object-cover max-md:h-[50%] max-md:w-full h-full w-[40%] rounded-xl"
                src="https://images.unsplash.com/photo-1628336358317-0582bfa7519d"
                alt="Event Detail 2"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-20 bg-black text-white rounded-2xl animate-on-scroll">
          <h2 className="mlarge font-bold mb-4">Ready to {data.title}?</h2>
          <p className="medium mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create an unforgettable{" "}
            {data.title.toLowerCase()} experience.
          </p>
          <a
            href="#contact"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
