import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import Nav from "./components/layout/Nav.jsx";
import Routing from "./utils/Routing.jsx";
import Footer from "./components/layout/Footer.jsx";
import CustomCursor from "./components/ui/CustomCursor.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import Contact from "./components/sections/Contact.jsx";

const App = () => {
  const lenis = useLenis(({ scroll }) => {
    // Optional scroll callbacks
  });

  useEffect(() => {
    if (lenis) {
      return () => {
        lenis.destroy();
      };
    }
  }, [lenis]);

  useEffect(() => {
    document.body.classList.add('loaded');
    
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/src/assets/1.mp4',
        '/src/assets/corporate.jpg',
        '/src/assets/deepak.jpg'
      ];
      
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadCriticalImages();

    return () => {
      document.body.classList.remove('loaded');
    };
  }, []);

  return (
    <>
      <CustomCursor />
      
      <ReactLenis 
        root 
        options={{
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        }}
      >
        <ScrollToTop />
        
        <div className="app-container min-h-screen bg-white">
          <Nav />
          
          <main className="main-content relative z-10">
            <Routing />
            <Contact />
          </main>
          
          <Footer />
        </div>
      </ReactLenis>

      <div className="global-loading fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 z-[1000] opacity-0 pointer-events-none"></div>
    </>
  );
};

// Error Boundary Component (Fixed)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export with Error Boundary
export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}