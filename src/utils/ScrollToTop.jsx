import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top with animation
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.out"
    });

    // Add page transition animation
    const loadingBar = document.querySelector('.global-loading');
    if (loadingBar) {
      gsap.timeline()
        .to(loadingBar, { opacity: 1, duration: 0.1 })
        .to(loadingBar, { opacity: 0, duration: 0.3, delay: 0.5 });
    }

    // Update page title based on route
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