import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({ children, className = "", id }) => {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
    });
    gsap.set(el, { opacity: 0, y: 80 });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-20 lg:py-32 px-4 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
};
export default SectionWrapper;