import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const CustomCursor = () => {
  const circleRef = useRef(null);
  const isInteractiveRef = useRef(false);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    let mouse = { x: 0, y: 0 };
    let circlePos = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let xprev = 0;
    let yprev = 0;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const xdiff = e.clientX - xprev;
      const ydiff = e.clientY - yprev;

      velocity.x = xdiff;
      velocity.y = ydiff;

      xprev = e.clientX;
      yprev = e.clientY;

      // Show cursor when mouse moves
      if (!isVisibleRef.current) {
        showCursor();
      }
    };

    const handleMouseEnter = () => {
      showCursor();
    };

    const handleMouseLeave = () => {
      hideCursor();
    };

    const showCursor = () => {
      isVisibleRef.current = true;
      gsap.to(circle, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const hideCursor = () => {
      isVisibleRef.current = false;
      gsap.to(circle, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const tick = () => {
      circlePos.x += (mouse.x - circlePos.x) * 0.15;
      circlePos.y += (mouse.y - circlePos.y) * 0.15;

      velocity.x *= 0.9;
      velocity.y *= 0.9;

      const wobbleX = 1 + velocity.x * 0.02;
      const wobbleY = 1 + velocity.y * 0.02;

      gsap.set(circle, {
        x: circlePos.x,
        y: circlePos.y,
        scaleX: gsap.utils.clamp(0.9, 1.3, wobbleX),
        scaleY: gsap.utils.clamp(0.9, 1.3, wobbleY),
        transformOrigin: "center center",
        translateX: "-50%",
        translateY: "-50%",
      });
    };

    // Enhanced hover effects
    const handleElementEnter = (e) => {
      isInteractiveRef.current = true;
      const size = e.target.getAttribute("data-cursor-size") || 40;
      const color = e.target.getAttribute("data-cursor-color") || "#fff";
      const text = e.target.getAttribute("data-cursor-text");

      gsap.to(circle, {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        duration: 0.3,
        ease: "power2.out",
      });

      // Add text for specific elements
      if (text) {
        circle.textContent = text;
        circle.style.display = "flex";
        circle.style.alignItems = "center";
        circle.style.justifyContent = "center";
        circle.style.fontSize = "10px";
        circle.style.fontWeight = "bold";
        circle.style.color = color === "#fff" ? "#000" : "#fff";
        circle.style.textAlign = "center";
        circle.style.lineHeight = "1";
      }
    };

    const handleElementLeave = (e) => {
      isInteractiveRef.current = false;

      gsap.to(circle, {
        width: "20px",
        height: "20px",
        backgroundColor: "#000",
        duration: 0.3,
        ease: "power2.out",
      });

      // Remove text
      circle.textContent = "";
      circle.style.display = "block";
      circle.style.fontSize = "0";
      circle.style.color = "#fff";
    };

    // Add event listeners
    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor-size], video, input, textarea, .interactive"
    );

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleElementEnter);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    // Page boundary events
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);

    gsap.ticker.add(tick);

    // Initial hide (will show on first mouse move)
    hideCursor();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      gsap.ticker.remove(tick);

      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, []);

  return createPortal(
    <div
      ref={circleRef}
      className="minicircle pointer-events-none w-[20px] h-[20px] bg-black rounded-full fixed top-0 left-0 z-[99999] transition-opacity duration-300 mix-blend-difference"
      style={{
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        boxShadow: "0 0 0 2px #fff, 0 0 8px 2px rgba(0,0,0,0.15)",
      }}
    />,
    document.body
  );
};

export default CustomCursor;
