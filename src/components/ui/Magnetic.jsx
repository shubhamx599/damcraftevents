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
      
      // Get the bounding rect of the inner transformed element
      const rectInner = inner.getBoundingClientRect();
      
      // Get the current GSAP translations to compute the static layout position
      const currentX = parseFloat(gsap.getProperty(inner, "x")) || 0;
      const currentY = parseFloat(gsap.getProperty(inner, "y")) || 0;
      
      // Compute the original layout position (untranslated)
      const leftUntranslated = rectInner.left - currentX;
      const topUntranslated = rectInner.top - currentY;
      const { width, height } = rectInner;
      
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
