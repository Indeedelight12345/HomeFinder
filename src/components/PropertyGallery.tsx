import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Sparkles,
  Camera
} from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Large Image Container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 shadow-md group">
        <img
          src={images[currentIndex]}
          alt={`${title} - Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-101"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

        {/* Previous / Next Arrow buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-transform hover:scale-105 cursor-pointer backdrop-blur-xs"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-transform hover:scale-105 cursor-pointer backdrop-blur-xs"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Bottom controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="bg-slate-950/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-auto">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentIndex + 1} / {images.length} Photos</span>
          </div>

          <button
            onClick={() => setLightboxOpen(true)}
            className="bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 pointer-events-auto transition-transform hover:scale-105 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Gallery</span>
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-amber-600 ring-2 ring-amber-600/30'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between text-white pb-4">
            <div>
              <h4 className="text-lg font-bold font-serif">{title}</h4>
              <p className="text-xs text-slate-400">Photo {currentIndex + 1} of {images.length}</p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Display */}
          <div className="relative flex-1 flex items-center justify-center max-h-[75vh]">
            <img
              src={images[currentIndex]}
              alt={title}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail list */}
          <div className="flex justify-center gap-2 pt-4 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 ${
                  currentIndex === idx ? 'border-amber-500' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
