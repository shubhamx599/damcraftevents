import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollMorph = (ref, options = {}) => {
  const animationRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const {
      borderRadius = "100px",
      scale = 1.05,
      start = "top 80%",
      end = "bottom 20%",
      scrub = true
    } = options;

    animationRef.current = gsap.to(element, {
      borderRadius: borderRadius,
      scale: scale,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: start,
        end: end,
        scrub: scrub,
        markers: false,
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
      }
    };
  }, [ref, options]);

  return animationRef;
};

export default useScrollMorph;