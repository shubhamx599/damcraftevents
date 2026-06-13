import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Reusable wrapper that adds a smooth magnetic pull effect to its children.
 */
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // quickTo is highly optimized for mousemove animations
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      
      // Get the current GSAP translations to compute untranslated position
      const currentX = parseFloat(gsap.getProperty(el, "x")) || 0;
      const currentY = parseFloat(gsap.getProperty(el, "y")) || 0;
      
      const leftUntranslated = left - currentX;
      const topUntranslated = top - currentY;
      
      const centerX = leftUntranslated + width / 2;
      const centerY = topUntranslated + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Check if cursor is directly over the untranslated element
      const isHovering =
        clientX >= leftUntranslated &&
        clientX <= leftUntranslated + width &&
        clientY >= topUntranslated &&
        clientY <= topUntranslated + height;

      if (isHovering) {
        // Move element slightly towards cursor position
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
      {children}
    </div>
  );
}
