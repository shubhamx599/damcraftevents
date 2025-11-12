// src/hooks/useSmoothScroll.js
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scroller = {
      target: document.querySelector("#smooth-wrapper"),
      ease: 0.08,
      endY: 0,
      y: 0,
      resizeRequest: 1,
      scrollRequest: 0,
    };

    let requestId = null;

    gsap.set(scroller.target, { y: 0 });

    const onRequest = () => {
      scroller.scrollRequest++;
      if (!requestId) requestId = requestAnimationFrame(updateScroller);
    };

    const updateScroller = () => {
      const resized = scroller.resizeRequest > 0;
      if (resized) {
        const height = scroller.target.clientHeight;
        body.style.height = height + "px";
        scroller.resizeRequest = 0;
      }

      const scrollY = window.pageYOffset;
      scroller.endY = scrollY;
      scroller.y += (scroller.endY - scroller.y) * scroller.ease;

      if (Math.abs(scroller.y - scroller.endY) < 0.05 || resized) {
        scroller.y = scroller.endY;
        scroller.scrollRequest = 0;
      }

      gsap.set(scroller.target, { y: -scroller.y });
      requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
    };

    window.addEventListener("resize", () => (scroller.resizeRequest = 1));
    window.addEventListener("scroll", onRequest);
    ScrollTrigger.scrollerProxy(scroller.target, {
      scrollTop(value) {
        return arguments.length ? (scroller.endY = scroller.y = value) : scroller.endY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", () => {});
      window.removeEventListener("scroll", onRequest);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);
};