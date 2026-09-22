import React, { useState } from 'react';
import { PageId, GalleryImage } from '../../types';
import { useData } from '../../context/DataContext';
import { 
  Eye, 
  X, 
  ArrowRight, 
  Camera, 
  Video, 
  Play, 
  ExternalLink 
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { images, videos } = useData();
  const [mediaType, setMediaType] = useState<'all' | 'photos' | 'videos'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'operations', label: 'Sawmill Operations & LT15' },
    { id: 'products', label: 'Sawn Timber Products' },
    { id: 'yard', label: 'Yard & Log Stacking' },
    { id: 'sustainability', label: 'Forestry & Residue Recovery' },
  ];

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-12 py-10">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#152B1E] rounded-2xl text-white p-8 sm:p-12 relative overflow-hidden border border-[#274B35]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              Visual Portfolio & Video Footage
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Arthco Sawmill & Timber Gallery
            </h1>
            <p className="text-base text-[#BCD8C7] leading-relaxed">
              Explore our day-to-day operations at Nixwood 10314, Nyakamete in Mutare, Zimbabwe. From raw pine log loading to precision Wood-Mizer LT15 sawing, dimensional timber stacks, and wholesale transport.
            </p>
          </div>
          <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none">
            <Camera className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

      {/* Media Type & Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Photos vs Videos toggle */}
        <div className="flex items-center justify-center gap-2 border-b border-[#D5E2D9] pb-4">
          <button
            onClick={() => setMediaType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              mediaType === 'all'
                ? 'bg-[#14261C] text-white shadow-sm'
                : 'bg-white text-[#4A6454] border border-[#D5E2D9] hover:bg-[#F2F6F3]'
            }`}
          >
            All Media ({images.length + videos.length})
          </button>
          <button
            onClick={() => setMediaType('photos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
              mediaType === 'photos'
                ? 'bg-[#14261C] text-white shadow-sm'
                : 'bg-white text-[#4A6454] border border-[#D5E2D9] hover:bg-[#F2F6F3]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Photos ({images.length})
          </button>
          <button
            onClick={() => setMediaType('videos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
              mediaType === 'videos'
                ? 'bg-[#14261C] text-white shadow-sm'
                : 'bg-white text-[#4A6454] border border-[#D5E2D9] hover:bg-[#F2F6F3]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Videos ({videos.length})
          </button>
        </div>

        {/* Categories (for photos) */}
        {mediaType !== 'videos' && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1E432E] text-white shadow-xs'
                    : 'bg-white text-[#4A6454] border border-[#D5E2D9] hover:bg-[#F2F6F3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Videos Section */}
      {(mediaType === 'all' || mediaType === 'videos') && videos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2">
              <Video className="w-5 h-5 text-[#2C593F]" />
              Production & Yard Operational Footage
            </h2>
            <span className="text-xs text-[#526B5C] font-semibold">
              {videos.length} videos available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(v => (
              <div
                key={v.id}
                className="bg-white rounded-xl border border-[#D8E3DC] overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-[#0E1A14]">
                  {v.embedUrl ? (
                    <iframe
                      src={v.embedUrl}
                      title={v.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full relative group flex items-center justify-center">
                      <img
                        src={v.thumbnailUrl || '/images/arthco_sawmill_yard.jpg'}
                        alt={v.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#2C593F] flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white backdrop-blur-xs">
                    {v.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-[#14261C] leading-snug">{v.title}</h3>
                  <p className="text-xs text-[#526B5C] line-clamp-2">{v.description}</p>
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-[#2C593F]">Mutare Milling</span>
                    <a
                      href={v.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#0F5B9E] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Watch <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Images Grid */}
      {(mediaType === 'all' || mediaType === 'photos') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {mediaType === 'all' && (
            <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2 pt-4">
              <Camera className="w-5 h-5 text-[#2C593F]" />
              Sawmill & Yard Photo Showcase
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group bg-white rounded-xl overflow-hidden border border-[#D8E3DC] shadow-sm hover:shadow-lg hover:border-[#2C593F] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-[#16291E]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/arthco_sawmill_yard.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {item.highlight && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#13251B]/90 text-[#E2C08D] text-[10px] uppercase font-bold tracking-wider border border-[#30533C]/60 backdrop-blur-xs">
                      {item.highlight}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] text-[#A6C5B3] uppercase tracking-wider font-semibold block mb-0.5">
                      {item.categoryLabel || item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E2C08D] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/90 text-[#142318] flex items-center justify-center shadow">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <p className="text-xs text-[#526B5C] line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#EDF3EF] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-[#1E432E] uppercase">
                      Mutare Facility
                    </span>
                    <span className="text-[11px] font-semibold text-[#C28846] flex items-center">
                      Click to view <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-[#14261C] border border-[#2B4E38] text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 sm:h-[450px] bg-black">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/arthco_sawmill_yard.jpg';
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#244230] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold text-[#E2C08D] tracking-wider">
                    {selectedImage.categoryLabel || selectedImage.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                    {selectedImage.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/263773412197?text=Hello%20Arthco%2C%20I%20saw%20this%20in%20your%20gallery%3A%20${encodeURIComponent(selectedImage.title)}.%20Can%20you%20provide%20pricing%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>

              <p className="text-sm text-[#B7D2C2] leading-relaxed">
                {selectedImage.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#90B29F]">
                <div className="bg-[#1C3325] p-3 rounded-lg border border-[#2B4B36]">
                  <span className="font-bold text-white block">Location</span>
                  <span>Nixwood 10314, Nyakamete</span>
                </div>
                <div className="bg-[#1C3325] p-3 rounded-lg border border-[#2B4B36]">
                  <span className="font-bold text-white block">Milling Equipment</span>
                  <span>Wood-Mizer LT15 Band Sawmill</span>
                </div>
                <div className="bg-[#1C3325] p-3 rounded-lg border border-[#2B4B36]">
                  <span className="font-bold text-white block">Supply Availability</span>
                  <span>Wholesale & Retail Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sawmill Tour / Yard Visit CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-2xl border border-[#D8E3DC] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#14261C]">Want to inspect our timber stacks in person?</h3>
            <p className="text-sm text-[#4E6657]">
              Visit our Nyakamete yard in Mutare to view our wet-off-saw and seasoned timber stacks before placing your order.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-lg bg-[#1E432E] hover:bg-[#285A3E] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Get Directions & Contact
            </button>
            <a
              href="tel:0773412197"
              className="px-6 py-3 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Call 0773 412 197
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
