import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollMorph from "../../hooks/useScrollMorph";

const interests = [
  "Corporate Event",
  "Market Activation",
  "Advertising",
  "Mall Activation",
  "Manager Meet",
  "Wedding Event",
  "Product Launch",
  "Brand Promotion",
  "Other",
];

const Contact = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useScrollMorph(sectionRef, {
    borderRadius: "60px",
    scale: 1.01,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Creative entrance animation for contact section
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 100,
        rotationX: 10,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stagger animation for form elements
    gsap.utils.toArray(".form-element").forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -50,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Floating animation for background elements
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, []);

  const toggleInterest = (item) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");

      // Reset form
      e.target.reset();
      setSelectedInterests([]);
      setSelectedBudget("");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="mt-[2rem] text-black font-sans px-20 max-lg:px-4 py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-4xl mx-4 relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="floating-element absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20"></div>
      <div className="floating-element absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
      <div className="floating-element absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-25"></div>

      {/* Header */}
      <div className="flex justify-between items-start gap-10 max-md:flex-col mb-16 relative z-10">
        <div>
          <div className="flex items-center gap-2 form-element">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 w-3 rounded-full"></div>
            <p className="uppercase text-sm font-semibold text-purple-600">
              Let's Create Together
            </p>
          </div>
        </div>
        <h1 className="normal font-light leading-tight text-end max-md:text-start max-w-2xl form-element bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Ready to create unforgettable experiences that leave lasting
          impressions?
        </h1>
      </div>

      {/* Contact Form Section */}
      <div className="flex gap-10 max-md:flex-col justify-between relative z-10">
        {/* Left Side Text */}
        <div className="w-1/3 max-md:w-full">
          <div className="flex items-center gap-2 mb-4 form-element">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 w-3 rounded-full"></div>
            <p className="uppercase text-sm font-semibold text-purple-600">
              Get In Touch
            </p>
          </div>

          <h2 className="mt-4 normal font-light leading-tight form-element bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            We believe in the power of memorable events, and we love
            collaborating with brands that feel the same. Let's connect and
            create something extraordinary.
          </h2>

          {/* Contact Info */}
          <div className="mt-8 space-y-6 form-element">
            <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
              <p className="text-sm font-semibold text-purple-600 mb-1">
                EMAIL
              </p>
              <a
                href="mailto:damcraftevents@gmail.com"
                className="medium hover:text-purple-600 transition-colors"
              >
                damcraftevents@gmail.com
              </a>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
              <p className="text-sm font-semibold text-purple-600 mb-1">
                PHONE
              </p>
              <a
                href="tel:+918527846574"
                className="medium hover:text-purple-600 transition-colors"
              >
                +91 8527846574
              </a>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
              <p className="text-sm font-semibold text-purple-600 mb-1">
                ADDRESS
              </p>
              <p className="medium">
                Building B-22, Jhilmil Industrial Area, Delhi-110092
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8 form-element">
            {[
              { platform: "instagram", color: "from-purple-500 to-pink-500" },
              { platform: "facebook", color: "from-blue-500 to-blue-600" },
              { platform: "linkedin", color: "from-blue-400 to-blue-500" },
              { platform: "twitter", color: "from-blue-400 to-cyan-400" },
            ].map((social) => (
              <a
                key={social.platform}
                href={`https://${social.platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-gradient-to-r ${social.color} text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg`}
                aria-label={social.platform}
              >
                <i className={`ri-${social.platform}-line text-xl`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-[50%] max-md:w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Form Fields */}
          <div className="form-element">
            <label className="block text-sm font-semibold text-purple-600 mb-2">
              Your Name *
            </label>
            <input
              className="w-full border-b-2 border-gray-300 py-3 outline-none placeholder-gray-400 focus:border-purple-500 transition-colors bg-transparent"
              placeholder="Enter your full name"
              type="text"
              required
            />
          </div>

          <div className="form-element">
            <label className="block text-sm font-semibold text-purple-600 mb-2">
              Company Name
            </label>
            <input
              className="w-full border-b-2 border-gray-300 py-3 outline-none placeholder-gray-400 focus:border-purple-500 transition-colors bg-transparent"
              placeholder="Your company name"
              type="text"
            />
          </div>

          <div className="form-element">
            <label className="block text-sm font-semibold text-purple-600 mb-2">
              Your Email *
            </label>
            <input
              className="w-full border-b-2 border-gray-300 py-3 outline-none placeholder-gray-400 focus:border-purple-500 transition-colors bg-transparent"
              placeholder="your.email@company.com"
              type="email"
              required
            />
          </div>

          <div className="form-element">
            <label className="block text-sm font-semibold text-purple-600 mb-2">
              Your Phone
            </label>
            <input
              className="w-full border-b-2 border-gray-300 py-3 outline-none placeholder-gray-400 focus:border-purple-500 transition-colors bg-transparent"
              placeholder="+91 00000 00000"
              type="tel"
            />
          </div>

          {/* Interests */}
          <div className="col-span-2 mt-4 form-element">
            <p className="mb-3 font-semibold text-purple-600">
              I'm interested in...
            </p>
            <div className="flex flex-wrap gap-3">
              {interests.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`px-4 py-2 cursor-pointer border-2 rounded-full transition-all duration-300 form-element ${
                    selectedInterests.includes(item)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                      : "text-gray-600 border-gray-300 hover:border-purple-500 hover:text-purple-600 bg-white"
                  }`}
                  onClick={() => toggleInterest(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="col-span-2 mt-6 form-element">
            <label className="block text-sm font-semibold text-purple-600 mb-2">
              Project Details *
            </label>
            <textarea
              rows={5}
              className="w-full border-b-2 border-gray-300 py-3 outline-none placeholder-gray-400 focus:border-purple-500 transition-colors resize-none bg-transparent"
              placeholder="Tell us about your event vision, requirements, timeline, budget, and any specific ideas you have in mind..."
              required
            ></textarea>
          </div>

          {/* Budget Selection */}
          <div className="col-span-2 mt-6 form-element">
            <p className="mb-3 font-semibold text-purple-600">
              Estimated Budget
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["₹50K-1L", "₹1L-5L", "₹5L-10L", "₹10L+"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                    selectedBudget === range
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                      : "bg-white border-gray-300 hover:border-purple-500"
                  }`}
                  onClick={() => setSelectedBudget(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button & Status */}
          <div className="col-span-2 mt-8 flex items-center gap-4 form-element">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 cursor-pointer px-12 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Message...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line"></i>
                  Send Message
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <span className="text-green-600 medium flex items-center gap-2">
                <i className="ri-checkbox-circle-line"></i>
                Message sent successfully!
              </span>
            )}
            {submitStatus === "error" && (
              <span className="text-red-600 medium flex items-center gap-2">
                <i className="ri-error-warning-line"></i>
                Failed to send message. Please try again.
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-center form-element">
        <p className="text-gray-600 medium">
          Typically respond within 2-4 hours during business days
        </p>
      </div>
    </div>
  );
};

export default Contact;
