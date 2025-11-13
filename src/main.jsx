import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";

// Create root and render app
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <App />
    </Router>
  </StrictMode>,
);

// Service Worker Registration (Optional - for PWA)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Development mode active');
  
  // Log performance metrics
  window.addEventListener('load', () => {
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`📊 Page load time: ${loadTime}ms`);
    }

    // Log Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`📈 ${entry.name}: ${entry.value}`);
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  });

  // Hot Module Replacement for development
  if (import.meta.hot) {
    import.meta.hot.accept();
  }
}

// Global error handler for better error tracking
window.addEventListener('error', (event) => {
  console.error('🚨 Global Error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled Promise Rejection:', event.reason);
});

// Add loaded class when everything is ready
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Remove loading state
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
});

// Add beforeunload for cleanup
window.addEventListener('beforeunload', () => {
  // Cleanup any ongoing processes if needed
  console.log('🧹 Cleaning up before unload...');
});