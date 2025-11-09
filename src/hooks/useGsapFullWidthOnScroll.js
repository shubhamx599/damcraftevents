import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP full width scroll animation
 * @param {Object} options - Animation options
 * @param {string} options.start - ScrollTrigger start position
 * @param {string} options.end - ScrollTrigger end position  
 * @param {number} options.scrub - Scroll scrub intensity
 * @param {string} options.initialWidth - Initial width (default: "80%")
 * @param {string} options.finalWidth - Final width (default: "100%")
 * @param {boolean} options.autoRegister - Auto register ScrollTrigger
 */
export const useGsapFullWidthOnScroll = (ref, options = {}) => {
  const {
    start = "top 80%",
    end = "top 20%", 
    scrub = 2,
    initialWidth = "80%",
    finalWidth = "100%",
    autoRegister = true
  } = options;
  
  const animationRef = useRef(null);

  useEffect(() => {
    if (autoRegister) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const element = ref.current;
    if (!element) return;

    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers: false, // Set to true for debugging
      },
    });

    animationRef.current.fromTo(
      element,
      { width: initialWidth },
      { width: finalWidth }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
      }
    };
  }, [ref, start, end, scrub, initialWidth, finalWidth, autoRegister]);

  return animationRef;
};

export default useGsapFullWidthOnScroll;