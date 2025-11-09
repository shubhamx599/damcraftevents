import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const ReadMoreButton = ({ 
  label = "Read More", 
  to, 
  variant = "primary",
  size = "medium" 
}) => {
  const containerRef = useRef(null);
  const arrowDivRef = useRef(null);
  const arrowDivChildRef = useRef(null);
  const navigate = useNavigate();

  // Size classes
  const sizeClasses = {
    small: "px-6 py-2 text-sm",
    medium: "px-8 py-3 text-base", 
    large: "px-10 py-4 text-lg"
  };

  // Variant classes
  const variantClasses = {
    primary: "border-black text-black hover:bg-black hover:text-white",
    secondary: "border-white text-white hover:bg-white hover:text-black",
    outline: "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
  };

  useEffect(() => {
    const arrowDiv = arrowDivRef.current;
    const arrowDivChild = arrowDivChildRef.current;

    if (!arrowDiv || !arrowDivChild) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(arrowDivChild, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      transformOrigin: "center center",
    });

    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    arrowDiv.addEventListener("mouseenter", handleEnter);
    arrowDiv.addEventListener("mouseleave", handleLeave);

    return () => {
      arrowDiv.removeEventListener("mouseenter", handleEnter);
      arrowDiv.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center w-fit"
    >
      <div
        ref={arrowDivRef}
        className={`arrowdiv relative bg-transparent border-2 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]}`}
        onClick={handleClick}
      >
        <span className="relative z-10 font-semibold">{label}</span>
        <div
          ref={arrowDivChildRef}
          className={`arrowdivchild absolute w-full h-full scale-0 opacity-0 flex justify-center items-center rounded-full font-semibold ${
            variant === 'primary' ? 'bg-black text-white' :
            variant === 'secondary' ? 'bg-white text-black' :
            'bg-gray-100 text-gray-800'
          }`}
        >
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

export default ReadMoreButton;