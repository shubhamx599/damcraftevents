import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollMorph = (ref, options = {}) => {
  const animationRef = useRef(null);

  const {
    borderRadius = "100px",
    scale = 1.05,
    start = "top 80%",
    end = "bottom 20%",
    scrub = true
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Kill existing animation
    if (animationRef.current) animationRef.current.kill();

    animationRef.current = gsap.to(element, {
      borderRadius,
      scale,
      ease: "power1.out",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers: false,
      }
    });

    return () => {
      animationRef.current.scrollTrigger?.kill();
      animationRef.current.kill();
    };
  }, [ref, borderRadius, scale, start, end, scrub]);

  return animationRef;
};

export default useScrollMorph;
