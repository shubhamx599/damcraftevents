import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home.jsx'))
const Services = lazy(() => import('../pages/Services.jsx'))
const Work = lazy(() => import('../pages/Work.jsx'))
const Gallery = lazy(() => import('../pages/Gallery.jsx'))
const About = lazy(() => import('../pages/About.jsx'))
const Contact = lazy(() => import('../pages/Contact.jsx'))

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="medium text-gray-600">Loading...</p>
    </div>
  </div>
)

const Routing = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center px-4">
              <div className="text-center">
                <h1 className="mlarge font-bold mb-4">404 - Page Not Found</h1>
                <p className="medium mb-8 text-gray-600">
                  Oops! The page you're looking for doesn't exist.
                </p>
                <div className="flex gap-4 justify-center">
                  <a 
                    href="/" 
                    className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors inline-block"
                  >
                    Go Home
                  </a>
                  <button 
                    onClick={() => window.history.back()}
                    className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default Routing;