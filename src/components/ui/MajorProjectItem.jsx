import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const MajorProjectItem = ({ title, year, img, description }) => {
  const itemRef = useRef(null);
  const imgDivRef = useRef(null);
  const headingRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    const item = itemRef.current;
    const imgDiv = imgDivRef.current;
    const heading = headingRef.current;
    const yearElement = yearRef.current;
    
    if (!item) return;

    let prevX = 0;

    const handleEnter = () => {
      gsap.to(imgDiv, {
        opacity: 1,
        zIndex: 100,
        display: "block",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(heading, {
        marginLeft: "1.5rem",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(yearElement, {
        color: "#22c55e",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(imgDiv, {
        opacity: 0,
        display: "none",
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(heading, {
        marginLeft: "0rem",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(yearElement, {
        color: "inherit",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMove = (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) * 0.05;
      const rotateY = (x - centerX) * -0.05;

      const diffX = e.clientX - prevX;
      prevX = e.clientX;

      const flatRotate = gsap.utils.clamp(-15, 15, diffX * 0.4);

      gsap.to(imgDiv, {
        top: y,
        left: x,
        rotateX,
        rotateY,
        rotate: flatRotate,
        transformPerspective: 800,
        transformOrigin: "center",
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    item.addEventListener("mouseenter", handleEnter);
    item.addEventListener("mouseleave", handleLeave);
    item.addEventListener("mousemove", handleMove);

    return () => {
      item.removeEventListener("mouseenter", handleEnter);
      item.removeEventListener("mouseleave", handleLeave);
      item.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className="view2img relative flex items-center justify-between border-y py-10 max-md:py-6 hover:bg-gray-50 transition-colors duration-300 cursor-pointer group"
    >
      <div className="flex items-center flex-1">
        <h1 ref={headingRef} className="mmedium font-bold transition-all duration-400">
          {title}
        </h1>
        {description && (
          <p className="small text-gray-600 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-md">
            {description}
          </p>
        )}
      </div>
      
      <h4 ref={yearRef} className="medium font-normal w-[30%] transition-colors duration-300">
        {year}
      </h4>
      
      <div
        ref={imgDivRef}
        className="imgdiv pointer-events-none absolute h-[11rem] w-[11rem] opacity-0 -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl"
      >
        <img
          src={img}
          className="h-full w-full object-cover rounded-xl"
          alt={title}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MajorProjectItem;