import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const HoverRevealCard = ({ image, title, description, delay = 0 }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!card) return;

    // Initial mount animation
    gsap.from(card, { opacity: 0, y: 50, duration: 0.6, delay, ease: "power3.out" });

    const handleMouseEnter = () => {
      gsap.to(overlay, { backgroundColor: "rgba(0,0,0,0.7)", duration: 0.5, ease: "power2.out" });
      gsap.to(content, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 });
      gsap.to(card.querySelector("img"), { scale: 1.1, duration: 0.8, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(overlay, { backgroundColor: "rgba(0,0,0,0)", duration: 0.5, ease: "power2.out" });
      gsap.to(content, { y: 50, opacity: 0, duration: 0.4, ease: "power2.in" });
      gsap.to(card.querySelector("img"), { scale: 1, duration: 0.6, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [delay]);

  return (
    <div ref={cardRef} className="relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl">
      <img src={image} alt={title} className="w-full h-full object-cover" />

      <div ref={overlayRef} className="absolute inset-0 flex items-end p-8 bg-black/0">
        <div ref={contentRef} className="opacity-0">
          <h3 className="text-white text-2xl font-bold mb-3">{title}</h3>
          <p className="text-white/80 leading-relaxed">{description}</p>
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default HoverRevealCard;
