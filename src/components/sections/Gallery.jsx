import React, { useState } from "react";

// Media detector
const isVideo = (url) =>
  url.includes(".mp4") ||
  url.includes("video") ||
  url.endsWith(".webm") ||
  url.includes("pexels.com/video");

// ===============================
// MEDIA LISTS (EDIT FREELY)
// ===============================

// Mall
const mallImages = [
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
  "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
];

// Corporate
const corporateImages = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  "https://images.unsplash.com/photo-1521790361557-1a61aab04182",
];

// Advertising
const advertisingImages = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
];

// Road Shows (videos allowed)
const roadImages = [
  "https://www.pexels.com/download/video/4239882/",
  "https://videos.pexels.com/video-files/854332/854332-hd_1920_1080_30fps.mp4",
  "https://images.unsplash.com/photo-1512427691650-1ff71b8a860e",
];

// All
const allImages = [
  ...mallImages,
  ...corporateImages,
  ...advertisingImages,
  ...roadImages,
];

// Categories
const images = {
  all: allImages,
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

// ===============================
// COMPONENT
// ===============================

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = images[activeCategory];

  const open = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const next = () =>
    setLightboxIndex((i) =>
      i === galleryItems.length - 1 ? 0 : i + 1
    );

  const prev = () =>
    setLightboxIndex((i) => (i === 0 ? galleryItems.length - 1 : i - 1));

  return (
    <div className="px-4 py-8">
      <h1 className="mmedium text-center mb-8 text-xl uppercase">
        <span className="text-green-600">Dam Craft Events</span> Gallery
      </h1>

      {/* Filters */}
      <nav className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveCategory(c.id);
              setLightboxIndex(null);
            }}
            className={`px-4 py-2 rounded-full border transition ${
              activeCategory === c.id
                ? "text-green-600 border-green-600 bg-green-50"
                : "text-gray-600 border-gray-300 hover:border-green-600 hover:text-green-600"
            }`}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {galleryItems.map((media, i) => (
          <div
            key={i}
            onClick={() => open(i)}
            className="relative rounded-xl overflow-hidden shadow cursor-pointer hover:scale-105 transition-transform"
          >
            {isVideo(media) ? (
              <video
                src={media}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-64 object-cover"
              />
            ) : (
              <img
                src={media}
                alt=""
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={close}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl"
            onClick={close}
          >
            ×
          </button>

          <button
            className="absolute left-4 text-white text-5xl"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>

          <button
            className="absolute right-4 text-white text-5xl"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>

          <div
            className="max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(galleryItems[lightboxIndex]) ? (
              <video
                src={galleryItems[lightboxIndex]}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <img
                src={galleryItems[lightboxIndex]}
                alt=""
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
