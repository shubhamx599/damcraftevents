import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Reusable wrapper that adds a smooth magnetic pull effect to its children.
 */
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // quickTo is highly optimized for mousemove animations on the inner container
    const xTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Get bounding rect of the outer static element
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Check if cursor is directly over the static outer element
      const isHovering =
        clientX >= left &&
        clientX <= left + width &&
        clientY >= top &&
        clientY <= top + height;

      if (isHovering) {
        // Move inner wrapper slightly towards cursor position
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        // Snap back to origin
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block">
      <div ref={innerRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
