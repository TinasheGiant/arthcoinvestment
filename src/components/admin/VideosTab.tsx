import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { VideoRecord } from '../../types';
import { Plus, Edit2, Trash2, Video as VideoIcon, Play, Star, X, ExternalLink, Upload, Layout } from 'lucide-react';

export const VideosTab: React.FC = () => {
  const { videos, images, addVideo, updateVideo, deleteVideo } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlacement, setSelectedPlacement] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Sawmilling',
    description: '',
    videoUrl: '',
    embedUrl: '',
    thumbnailUrl: '',
    duration: '03:00',
    featured: false,
    placement: 'gallery' as 'gallery' | 'homepage' | 'services' | 'all',
  });

  const destinationOptions = [
    { id: 'gallery', label: 'Gallery Page: Video Archive' },
    { id: 'homepage', label: 'Homepage: Featured Sawmill Video Showcase' },
    { id: 'services', label: 'Services Page: Sawmilling Machinery Video' },
    { id: 'all', label: 'Universal / All Pages' },
  ];

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      category: 'Sawmilling',
      description: '',
      videoUrl: '',
      embedUrl: '',
      thumbnailUrl: '/images/arthco_woodmizer_lt15.jpg',
      duration: '03:00',
      featured: false,
      placement: 'gallery',
    });
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (v: VideoRecord) => {
    setEditingVideo(v);
    setFormData({
      title: v.title,
      category: v.category,
      description: v.description,
      videoUrl: v.videoUrl,
      embedUrl: v.embedUrl,
      thumbnailUrl: v.thumbnailUrl || '/images/arthco_woodmizer_lt15.jpg',
      duration: v.duration || '03:00',
      featured: v.featured,
      placement: (v.placement || (v.featured ? 'homepage' : 'gallery')) as any,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleVideoUrlChange = (url: string) => {
    let embed = '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      if (id) embed = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      if (id) embed = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      if (id) embed = `https://player.vimeo.com/video/${id}`;
    }
    setFormData(prev => ({
      ...prev,
      videoUrl: url,
      embedUrl: embed || prev.embedUrl || url
    }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setError('File is too large. Maximum size is 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData(prev => ({ ...prev, thumbnailUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.videoUrl.trim()) {
      setError('Title and Video URL are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      featured: formData.placement === 'homepage' ? true : formData.featured,
    };

    try {
      if (editingVideo) {
        await updateVideo(editingVideo.id, payload);
      } else {
        await addVideo(payload);
      }
      setModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save video.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSetHomepage = async (v: VideoRecord) => {
    try {
      await updateVideo(v.id, {
        placement: 'homepage',
        featured: true
      });
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to set featured video');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the video "${title}"?`)) {
      try {
        await deleteVideo(id);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to delete video');
      }
    }
  };

  const filteredVideos = videos.filter(v => {
    if (selectedPlacement === 'all') return true;
    if (selectedPlacement === 'homepage') return v.placement === 'homepage' || v.featured;
    return v.placement === selectedPlacement;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#D9E3DC] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-[#2C593F]" />
            Sawmill Video Production & Destination Wiring
          </h2>
          <p className="text-xs text-[#526B5C]">
            Edit and wire operational footage from Mutare directly to the Homepage Spotlight or Gallery Video Archive.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add / Embed Video
        </button>
      </div>

      {/* Filter by destination */}
      <div className="bg-white p-4 rounded-xl border border-[#D9E3DC] shadow-sm flex items-center justify-between">
        <span className="text-xs font-bold text-[#2A4334]">
          Video Library ({filteredVideos.length} videos)
        </span>
        <select
          value={selectedPlacement}
          onChange={(e) => setSelectedPlacement(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] bg-white text-[#2C593F] font-medium"
        >
          <option value="all">Destination: All Destinations</option>
          <option value="homepage">Destination: Homepage Spotlight</option>
          <option value="gallery">Destination: Gallery Archive Only</option>
          <option value="services">Destination: Services Page</option>
        </select>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-xl border border-[#D9E3DC] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
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
                      src={v.thumbnailUrl || '/images/arthco_woodmizer_lt15.jpg'}
                      alt={v.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/arthco_sawmill_yard.jpg';
                      }}
                    />
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#2C593F] flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/75 text-white backdrop-blur-xs">
                    {v.category}
                  </span>
                  {v.placement === 'homepage' || v.featured ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C28846] text-white flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Homepage
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-[#1E432E]">
                      Gallery
                    </span>
                  )}
                </div>

                {v.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white backdrop-blur-xs">
                    {v.duration}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-[#14261C] line-clamp-1">{v.title}</h3>
                <p className="text-xs text-[#526B5C] line-clamp-2">
                  {v.description || 'No description provided.'}
                </p>
                <a
                  href={v.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[11px] text-[#2C593F] font-semibold hover:underline"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Direct Video Link
                </a>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="pt-3 border-t border-[#E8EFEA] flex items-center justify-between text-xs text-[#8BAAA4]">
                <button
                  type="button"
                  onClick={() => handleQuickSetHomepage(v)}
                  className={`text-[11px] font-bold flex items-center gap-1 ${
                    v.placement === 'homepage' || v.featured
                      ? 'text-[#C28846]'
                      : 'text-[#526B5C] hover:text-[#C28846]'
                  }`}
                  title="Make this video featured on the Homepage"
                >
                  <Star className="w-3 h-3" />
                  {v.placement === 'homepage' || v.featured ? 'Featured on Home' : 'Feature on Home'}
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(v)}
                    className="p-1.5 rounded text-[#2C593F] hover:bg-[#E8F3EC] transition-colors"
                    title="Edit Video"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id, v.title)}
                    className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="bg-white p-12 text-center rounded-xl border border-[#D5E2D9] text-[#6C8577]">
          <VideoIcon className="w-12 h-12 mx-auto text-[#ADC4B6] mb-3" />
          <p className="font-semibold text-base">No videos found</p>
          <p className="text-xs mt-1">Click "Add / Embed Video" above to add sawmill footage.</p>
        </div>
      )}

      {/* Modal Dialog for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5E2D9] my-8 animate-in zoom-in-95 duration-150">
            <div className="bg-[#14261C] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">
                  {editingVideo ? 'Edit Sawmill Video & Destination' : 'Add New Sawmill Video'}
                </h3>
                <p className="text-xs text-[#9BBBA6]">Control embed URL, destination placement, and thumbnail</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#9BBBA6] hover:text-white p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {/* Destination Placement */}
              <div className="p-3.5 bg-[#F2F7F4] rounded-xl border border-[#CCE0D4] space-y-1.5">
                <label className="block text-xs font-bold text-[#14261C] uppercase tracking-wide">
                  Frontend Destination Page *
                </label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    placement: e.target.value as any,
                    featured: e.target.value === 'homepage' ? true : formData.featured
                  })}
                  className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-[#A7C8B4] bg-white text-[#1E432E] focus:ring-2 focus:ring-[#2C593F]"
                >
                  {destinationOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#2C593F]">
                  Videos with "Homepage" destination appear in the featured interactive video player on the Home page.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wood-Mizer LT15 Thin-Kerf Sawing in Action"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  >
                    <option value="Sawmilling">Sawmilling (Wood-Mizer LT15)</option>
                    <option value="Yard Operations">Yard Operations & Loading</option>
                    <option value="Log Haulage">Log Haulage & Transport</option>
                    <option value="Product Inspection">Product Inspection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Video Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 03:45"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Video URL (YouTube, Vimeo, or Direct Video) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                  value={formData.videoUrl}
                  onChange={(e) => handleVideoUrlChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              {formData.embedUrl && (
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Embed URL Preview
                  </label>
                  <input
                    type="text"
                    value={formData.embedUrl}
                    onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#D5E2D9] bg-neutral-50 text-neutral-600 focus:outline-none mb-2"
                  />
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-[#D5E2D9]">
                    <iframe
                      src={formData.embedUrl}
                      title="Preview"
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              )}

              {/* Thumbnail Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide">
                  Cover Thumbnail
                </label>
                
                {images.length > 0 && (
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormData({ ...formData, thumbnailUrl: e.target.value });
                      }
                    }}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#CCE0D4] bg-white text-[#14261C]"
                  >
                    <option value="">-- Or choose thumbnail from photos library --</option>
                    {images.map(img => (
                      <option key={img.id} value={img.url}>
                        {img.title}
                      </option>
                    ))}
                  </select>
                )}

                <input
                  type="text"
                  placeholder="/images/arthco_woodmizer_lt15.jpg"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F]"
                />

                <label className="flex items-center justify-center p-2 rounded-lg border border-dashed border-[#A7C8B4] bg-[#F7FAF8] hover:bg-[#EEF5F0] cursor-pointer transition-colors text-xs font-semibold text-[#2C593F]">
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  <span>Upload Custom Thumbnail File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of what is demonstrated in this video footage..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E8EFEA] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#526B5C] hover:text-[#14261C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : (editingVideo ? 'Save Changes' : 'Create & Wire Video')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
