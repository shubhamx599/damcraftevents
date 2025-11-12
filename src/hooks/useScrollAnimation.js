// src/hooks/useScrollAnimation.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook for scroll-based animations
 */
export const useScrollAnimation = (options = {}) => {
  const {
    trigger = null,
    start = "top 80%",
    end = "bottom 20%",
    toggleActions = "play none none reverse",
    markers = false
  } = options;

  const elementRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = elementRef.current;
    if (!element) return;

    // Clear existing animation
    if (animationRef.current) {
      animationRef.current.scrollTrigger?.kill();
    }

    animationRef.current = gsap.fromTo(element, 
      {
        opacity: 0,
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger || element,
          start,
          end,
          toggleActions,
          markers
        }
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
      }
    };
  }, [trigger, start, end, toggleActions, markers]);

  return elementRef;
};

/**
 * Hook for staggered animations
 */
export const useStaggerAnimation = (selector, options = {}) => {
  const {
    stagger = 0.1,
    start = "top 80%",
    y = 60,
    duration = 0.8
  } = options;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.toArray(selector);

    elements.forEach((element, index) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: y,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: duration,
          delay: index * stagger,
          scrollTrigger: {
            trigger: element,
            start: start,
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, [selector, stagger, start, y, duration]);
};