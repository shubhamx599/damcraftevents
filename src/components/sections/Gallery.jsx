import React, { useState } from "react";
import { eventImages, getAllImages } from "../../constants/eventImages";

// Local images
import m1 from "../../assets/images/deepak.jpg";
import m2 from "../../assets/images/ashish.jpg";
import m3 from "../../assets/images/mukesh.jpg";
import c1 from "../../assets/images/corporate.jpg";
import c2 from "../../assets/images/mall.jpg";
import a1 from "../../assets/images/bike.jpg";
import a2 from "../../assets/images/market.jpg";
import r1 from "../../assets/videos/head.mp4"; // Using video thumbnail
import r2 from "../../assets/videos/ink.mp4";

// Enhanced image groups with mixed content
const mallImages = [m1, m2, m3, ...eventImages.mall].slice(0, 10);
const corporateImages = [c1, c2, ...eventImages.corporate].slice(0, 10);
const advertisingImages = [a1, a2, ...eventImages.advertising].slice(0, 10);
const roadImages = [r1, r2, ...eventImages.road].slice(0, 10);

const images = {
  all: getAllImages(),
  mall: mallImages,
  corporate: corporateImages,
  advertising: advertisingImages,
  road: roadImages,
};

const categories = [
  { id: "all", label: "All Events" },
  { id: "corporate", label: "Corporate Events" },
  { id: "mall", label: "Mall Activations" },
  { id: "advertising", label: "Advertising" },
  { id: "road", label: "Road Shows" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryImages = images[activeCategory].filter(Boolean);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () =>
    setLightboxIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  const showNext = () =>
    setLightboxIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="px-4 py-8">
      <h1 className="mmedium font-semibold uppercase mb-8 text-center">
        <span className="text-green-600">Dam Craft Events</span> Gallery
      </h1>

      {/* Category Filters */}
      <nav className="flex flex-wrap gap-4 md:gap-6 mb-8 justify-center">
        {categories.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => {
              setActiveCategory(id);
              setLightboxIndex(null);
            }}
            className={`cursor-pointer uppercase transition-all duration-300 px-4 py-2 rounded-full border ${
              activeCategory === id
                ? "text-green-600 border-green-600 bg-green-50"
                : "text-gray-600 border-gray-300 hover:text-green-600 hover:border-green-600"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => openLightbox(index)}
          >
            <img
              src={img}
              alt={`event-${index}`}
              className="w-full h-64 object-cover group-hover:brightness-75 transition duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300" />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {galleryImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 medium">
            No images found for this category.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl font-bold z-10 cursor-pointer hover:text-gray-300 transition"
          >
            &times;
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 md:left-6 text-white text-4xl font-bold z-10 cursor-pointer hover:text-gray-300 transition"
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 md:right-6 text-white text-4xl font-bold z-10 cursor-pointer hover:text-gray-300 transition"
          >
            ›
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex]}
              alt={`event-${lightboxIndex}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
