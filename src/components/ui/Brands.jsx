import { useRef } from "react";

// Data
const brands = [
  { src: "https://cdn.brandfetch.io/idkuvXnjOH/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 1", name: "Airbnb" },
  { src: "https://cdn.brandfetch.io/idRUNqV3ke/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 2", name: "Tripadvisor" },
  { src: "https://cdn.brandfetch.io/id20mQyGeY/w/800/h/800/theme/dark/symbol.png?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 3", name: "Spotify" },
  { src: "https://cdn.brandfetch.io/idy8eQmfJp/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 4", name: "Ford" },
  { src: "https://cdn.brandfetch.io/idsWGwlSmy/w/800/h/800/theme/dark/symbol.png?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 5", name: "Mercedes-Benz" },
  { src: "https://cdn.brandfetch.io/idX0fsMOpE/w/192/h/192/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 6", name: "BMW" },
  { src: "https://cdn.brandfetch.io/id2S-kXbuK/w/800/h/796/theme/dark/symbol.png?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 7", name: "Tesla" },
  { src: "https://cdn.brandfetch.io/idR0dj2M6E/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", alt: "Brand 8", name: "Toyota" },
];

const Brands = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-20 bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-black overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block border border-white/10 rounded-full px-6 py-2 mb-4 backdrop-blur-md bg-white/5">
          <p className="text-xs tracking-wider uppercase text-white/70">Trusted By</p>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          Industry Leaders Worldwide
        </h2>

        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
          Collaborating with renowned brands to deliver exceptional event experiences that leave a lasting impact.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
        {brands.map((logo, idx) => (
          <div
            key={idx}
            ref={(el) => (itemsRef.current[idx] = el)}
            className="brand-item p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-pink-500/0 to-yellow-400/0 group-hover:from-red-500/10 group-hover:via-pink-500/10 group-hover:to-yellow-400/10 transition-all duration-500"></div>

            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="w-20 h-20 object-cover rounded-xl grayscale-0 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 mx-auto"
            />

            <p className="text-center text-white/70 text-sm mt-4 translate-y-2  group-hover:translate-y-0 transition-all duration-500">
              {logo.name}
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 text-center">
        {[{ n: "50+", l: "Brand Partnerships" }, { n: "100%", l: "Client Satisfaction" }, { n: "10+", l: "Years Collaborating" }].map((s, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {s.n}
            </h3>
            <p className="text-white/60 mt-1">{s.l}</p>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mt-3 rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
