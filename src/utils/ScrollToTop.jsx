// src/utils/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.out"
    });

    const loadingBar = document.querySelector('.global-loading');
    if (loadingBar) {
      gsap.timeline()
        .to(loadingBar, { opacity: 1, duration: 0.1 })
        .to(loadingBar, { opacity: 0, duration: 0.3, delay: 0.5 });
    }

    const updatePageTitle = () => {
      const titles = {
        '/': 'Dam Craft Events - Premier Event Management',
        '/about': 'About Us - Dam Craft Events',
        '/services': 'Our Services - Dam Craft Events',
        '/work': 'Our Work - Dam Craft Events',
        '/service/corporate': 'Corporate Events - Dam Craft Events',
        '/service/mall': 'Mall Activations - Dam Craft Events',
      };
      
      document.title = titles[pathname] || 'Dam Craft Events - Event Management Experts';
    };

    updatePageTitle();
  }, [pathname]);

  return null;
}
