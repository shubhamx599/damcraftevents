import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useHorizontalScroll = (ref, options = {}) => {
  const {
    trigger = null,
    start = "top top",
    end = "+=200%",
    scrub = 1,
    pin = true,
  } = options;

  const animationRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const sections = gsap.utils.toArray(".horizontal-panel");

    animationRef.current = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        scrub,
        pin,
        anticipatePin: 1,
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
      }
    };
  }, [ref, trigger, start, end, scrub, pin]);

  return animationRef;
};

export default useHorizontalScroll;
