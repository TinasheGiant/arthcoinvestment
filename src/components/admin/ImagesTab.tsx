import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GalleryImage } from '../../types';
import { Plus, Edit2, Trash2, Image as ImageIcon, Star, Check, X, Search, Upload, Layout, ArrowRight } from 'lucide-react';

export const ImagesTab: React.FC = () => {
  const { images, services, addImage, updateImage, deleteImage, updateService } = useData();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlacement, setSelectedPlacement] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'operations',
    categoryLabel: 'Sawmill Operations',
    description: '',
    url: '',
    highlight: '',
    featured: false,
    placement: 'gallery' as 'gallery' | 'homepage_spotlight' | 'services' | 'about' | 'sustainability' | 'all',
    targetServiceId: '',
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'operations', label: 'Sawmill Operations' },
    { id: 'yard', label: 'Yard & Milling Site' },
    { id: 'products', label: 'Sawn Products' },
    { id: 'sustainability', label: 'Sustainability' },
  ];

  const destinationOptions = [
    { id: 'gallery', label: 'Gallery Page Portfolio' },
    { id: 'homepage_spotlight', label: 'Homepage Spotlight (Inside Operations 4-Photo Showcase)' },
    { id: 'services', label: 'Services Page Feature Image' },
    { id: 'about', label: 'About Us Facility Showcase' },
    { id: 'sustainability', label: 'Sustainability Page Showcase' },
    { id: 'all', label: 'Universal / All Pages' },
  ];

  const handleOpenAdd = () => {
    setEditingImage(null);
    setFormData({
      title: '',
      category: 'operations',
      categoryLabel: 'Sawmill Operations',
      description: '',
      url: '',
      highlight: '',
      featured: false,
      placement: 'gallery',
      targetServiceId: services[0]?.id || '',
    });
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (img: GalleryImage) => {
    setEditingImage(img);
    setFormData({
      title: img.title,
      category: img.category,
      categoryLabel: img.categoryLabel || 'Sawmill Operations',
      description: img.description || '',
      url: img.url,
      highlight: img.highlight || '',
      featured: Boolean(img.featured),
      placement: (img.placement || (img.featured ? 'homepage_spotlight' : 'gallery')) as any,
      targetServiceId: img.targetServiceId || services[0]?.id || '',
    });
    setError(null);
    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setError('File is too large. Maximum size is 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData(prev => ({ ...prev, url: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) {
      setError('Title and Image URL are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        featured: formData.placement === 'homepage_spotlight' ? true : formData.featured,
      };

      if (editingImage) {
        await updateImage(editingImage.id, payload);
      } else {
        await addImage(payload);
      }

      // If assigned specifically to a service, update that service's image immediately!
      if (formData.placement === 'services' && formData.targetServiceId) {
        try {
          await updateService(formData.targetServiceId, { image: formData.url });
        } catch (srvErr) {
          console.error('Failed to sync service image:', srvErr);
        }
      }

      setModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save image.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSetSpotlight = async (img: GalleryImage) => {
    try {
      await updateImage(img.id, {
        placement: 'homepage_spotlight',
        featured: true
      });
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to set spotlight');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteImage(id);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to delete image');
      }
    }
  };

  const filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(search.toLowerCase()) ||
      (img.description && img.description.toLowerCase().includes(search.toLowerCase())) ||
      (img.highlight && img.highlight.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    const matchesPlacement = selectedPlacement === 'all' || 
      (selectedPlacement === 'homepage_spotlight' && (img.placement === 'homepage_spotlight' || img.featured)) ||
      img.placement === selectedPlacement;
    return matchesSearch && matchesCategory && matchesPlacement;
  });

  const getPlacementBadge = (img: GalleryImage) => {
    if (img.placement === 'homepage_spotlight' || img.featured) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C28846] bg-[#FDF6ED] border border-[#E9D4BB] px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3 fill-current" />
          Homepage Spotlight
        </span>
      );
    }
    if (img.placement === 'services') {
      const srvName = services.find(s => s.id === img.targetServiceId)?.title || 'Services';
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1E432E] bg-[#EBF3EE] border border-[#CDE0D4] px-2 py-0.5 rounded-full truncate max-w-[150px]">
          <Layout className="w-3 h-3" />
          Service: {srvName}
        </span>
      );
    }
    if (img.placement === 'about') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F5B9E] bg-[#EBF3FB] border border-[#CCE1F5] px-2 py-0.5 rounded-full">
          About Page
        </span>
      );
    }
    if (img.placement === 'sustainability') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2A754B] bg-[#EDF7F1] border border-[#C3E4D1] px-2 py-0.5 rounded-full">
          Sustainability
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#526B5C] bg-[#F0F5F2] border border-[#D5E2D9] px-2 py-0.5 rounded-full">
        Gallery: {img.categoryLabel || img.category}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#D9E3DC] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#2C593F]" />
            Website Images & Destination Wiring
          </h2>
          <p className="text-xs text-[#526B5C]">
            Edit and wire photos directly to their destination frontend pages: Gallery, Homepage Spotlight, or Services.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add / Upload Image
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#D9E3DC] shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#8BAAA4] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search images by title, badge, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedPlacement}
              onChange={(e) => setSelectedPlacement(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none font-medium bg-white text-[#2C593F]"
              title="Filter by Frontend Destination"
            >
              <option value="all">Destination: All Destinations</option>
              <option value="homepage_spotlight">Destination: Homepage Spotlight</option>
              <option value="services">Destination: Services Page</option>
              <option value="gallery">Destination: Gallery Only</option>
              <option value="about">Destination: About Us</option>
              <option value="sustainability">Destination: Sustainability</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none text-[#14261C] bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  Category: {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl border border-[#D9E3DC] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-video bg-[#0E1A14] overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/arthco_sawmill_yard.jpg';
                  }}
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start max-w-[85%]">
                  {getPlacementBadge(img)}
                </div>
                {img.highlight && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/75 text-[#E2C08D] backdrop-blur-xs">
                    {img.highlight}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-[#14261C] line-clamp-1">{img.title}</h3>
                <p className="text-xs text-[#526B5C] line-clamp-2">
                  {img.description || 'No description provided.'}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 space-y-2">
              <div className="pt-2.5 border-t border-[#E8EFEA] flex items-center justify-between text-xs text-[#8BAAA4]">
                <button
                  type="button"
                  onClick={() => handleQuickSetSpotlight(img)}
                  className={`text-[11px] font-bold flex items-center gap-1 ${
                    img.placement === 'homepage_spotlight' || img.featured
                      ? 'text-[#C28846]'
                      : 'text-[#526B5C] hover:text-[#C28846]'
                  }`}
                  title="Make this photo appear in the Homepage 4-Photo Operations showcase"
                >
                  <Star className="w-3 h-3" />
                  {img.placement === 'homepage_spotlight' || img.featured ? 'Spotlighted' : 'Set Spotlight'}
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(img)}
                    className="p-1.5 rounded text-[#2C593F] hover:bg-[#E8F3EC] transition-colors"
                    title="Edit destination & details"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(img.id, img.title)}
                    className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="bg-white p-12 text-center rounded-xl border border-[#D5E2D9] text-[#6C8577]">
          <ImageIcon className="w-12 h-12 mx-auto text-[#ADC4B6] mb-3" />
          <p className="font-semibold text-base">No images found matching your search</p>
          <p className="text-xs mt-1">Try selecting another filter or click "Add / Upload Image" above.</p>
        </div>
      )}

      {/* Modal Dialog for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5E2D9] my-8 animate-in zoom-in-95 duration-150">
            <div className="bg-[#14261C] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">
                  {editingImage ? 'Edit Website Image & Wiring' : 'Add New Website Image'}
                </h3>
                <p className="text-xs text-[#9BBBA6]">Control image details, destination page, and service assignment</p>
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

              {/* Destination Page Selector */}
              <div className="p-3.5 bg-[#F2F7F4] rounded-xl border border-[#CCE0D4] space-y-2">
                <label className="block text-xs font-bold text-[#14261C] uppercase tracking-wide">
                  Frontend Destination Page *
                </label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    placement: e.target.value as any,
                    featured: e.target.value === 'homepage_spotlight' ? true : formData.featured
                  })}
                  className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-[#A7C8B4] bg-white text-[#1E432E] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                >
                  {destinationOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {formData.placement === 'services' && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <label className="block text-[11px] font-bold text-[#2A4334] mb-1">
                      Choose which Service will display this image:
                    </label>
                    <select
                      value={formData.targetServiceId}
                      onChange={(e) => setFormData({ ...formData, targetServiceId: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#CCE0D4] bg-white text-[#14261C] focus:ring-2 focus:ring-[#2C593F]"
                    >
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.placement === 'homepage_spotlight' && (
                  <p className="text-[11px] text-[#2C593F] font-medium">
                    This photo will be displayed in the 4-photo "Inside Our Nyakamete Milling Operations" spotlight grid on the Home page.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wood-Mizer LT15 Sawmill Bed"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Gallery Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const match = categories.find(c => c.id === cat);
                      setFormData({
                        ...formData,
                        category: cat,
                        categoryLabel: match ? match.label : 'Sawmill Operations'
                      });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  >
                    <option value="operations">Sawmill Operations</option>
                    <option value="yard">Yard & Milling Site</option>
                    <option value="products">Sawn Timber Products</option>
                    <option value="sustainability">Sustainability</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Highlight Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wood-Mizer LT15"
                    value={formData.highlight}
                    onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Image Source (URL or Upload File) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Paste URL (/images/photo.jpg or https://...)"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none mb-2"
                />

                <label className="flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-[#C5D9CC] bg-[#F7FAF8] hover:bg-[#EEF5F0] cursor-pointer transition-colors text-xs font-semibold text-[#2C593F]">
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Upload Image File from Computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {formData.url && (
                  <div className="mt-2 relative rounded-lg overflow-hidden border border-[#D5E2D9] aspect-video bg-neutral-100">
                    <img
                      src={formData.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-2 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">
                      Preview
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  placeholder="Details about this photograph or sawmill scene..."
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
                  {isSubmitting ? 'Saving...' : (editingImage ? 'Save Changes' : 'Create & Wire Image')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
