// src/components/ui/ScrollDownIndicator.jsx
const ScrollDownIndicator = () => {
  return (
    <div className="w-full flex justify-center pt-6 sm:pt-10 lg:pt-9">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          {/* First chevron with bounce */}
          <div className="animate-bounce">
            <i className="ri-arrow-down-s-line text-white text-xl animate-pulse"></i>
          </div>
          {/* Second chevron with bounce and delay */}
          <div className="animate-bounce" style={{ animationDelay: "0.1s" }}>
            <i className="ri-arrow-down-s-line text-white text-xl animate-pulse"></i>
          </div>
        </div>
        {/* Pulsing Text */}
        <span className="text-white pb-6 lg:pb-12 opacity-80 text-xs tracking-widest uppercase font-light animate-pulse">
          Scroll to Explore
        </span>
      </div>
    </div>
  );
};

export default ScrollDownIndicator;
