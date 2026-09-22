import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceItem } from '../../types';
import { Plus, Edit2, Trash2, Trees, Truck, Hammer, Building2, Store, Recycle, CheckCircle2, XCircle, X, Upload, Image as ImageIcon } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Trees,
  Truck,
  Hammer,
  Building2,
  Store,
  Recycle,
};

export const ServicesTab: React.FC = () => {
  const { services, images, addService, updateService, deleteService } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    bulletPoints: '',
    icon: 'Trees',
    image: '/images/arthco_woodmizer_lt15.jpg',
    order: 1,
    active: true,
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      tagline: '',
      description: '',
      bulletPoints: 'High quality precision sawing\nSustainably harvested timber\nFast dispatch and transport',
      icon: 'Trees',
      image: '/images/arthco_woodmizer_lt15.jpg',
      order: services.length + 1,
      active: true,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      tagline: srv.tagline,
      description: srv.description,
      bulletPoints: (srv.bulletPoints || []).join('\n'),
      icon: srv.icon || 'Trees',
      image: srv.image || '/images/arthco_woodmizer_lt15.jpg',
      order: srv.order || 1,
      active: srv.active !== false,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setError('File is too large. Maximum size is 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Service title is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const bulletArray = formData.bulletPoints
      .split('\n')
      .map(b => b.trim())
      .filter(b => b.length > 0);

    const payload = {
      title: formData.title,
      tagline: formData.tagline,
      description: formData.description,
      bulletPoints: bulletArray,
      icon: formData.icon,
      image: formData.image,
      order: Number(formData.order),
      active: formData.active,
    };

    try {
      if (editingService) {
        await updateService(editingService.id, payload);
      } else {
        await addService(payload);
      }
      setModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the service "${title}"?`)) {
      try {
        await deleteService(id);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to delete service');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#D9E3DC] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2">
            <Hammer className="w-5 h-5 text-[#2C593F]" />
            Services Management & Destination Imagery
          </h2>
          <p className="text-xs text-[#526B5C]">
            Manage all company services, key deliverables, and their feature images displayed on the Services Page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Service
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services
          .slice()
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((srv) => {
            const IconComponent = ICON_MAP[srv.icon || 'Trees'] || Trees;
            return (
              <div
                key={srv.id}
                className={`bg-white rounded-xl border overflow-hidden shadow-sm flex flex-col justify-between transition-all ${
                  srv.active !== false
                    ? 'border-[#D9E3DC] hover:border-[#2C593F]'
                    : 'border-neutral-200 opacity-60'
                }`}
              >
                <div>
                  <div className="relative aspect-video bg-[#0E1A14] overflow-hidden group">
                    <img
                      src={srv.image || '/images/arthco_woodmizer_lt15.jpg'}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/arthco_sawmill_yard.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#14261C]/90 text-[#E2C08D] backdrop-blur-xs">
                        Order #{srv.order || 1}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-[#1E432E]">
                        Services Page
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded bg-white/90 text-[#1E432E] flex items-center justify-center">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold truncate max-w-[180px]">
                          {srv.title}
                        </span>
                      </div>

                      {srv.active !== false ? (
                        <span className="inline-flex items-center text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-bold text-neutral-300 bg-neutral-900/60 px-1.5 py-0.5 rounded">
                          <XCircle className="w-3 h-3 mr-1" /> Hidden
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-[11px] font-bold text-[#C28846] uppercase tracking-wider">
                      {srv.tagline}
                    </p>
                    <p className="text-xs text-[#4E6657] line-clamp-3">
                      {srv.description}
                    </p>

                    {srv.bulletPoints && srv.bulletPoints.length > 0 && (
                      <div className="pt-2 border-t border-[#E8EFEA] space-y-1">
                        <span className="text-[10px] font-bold text-[#14261C] uppercase tracking-wide block">
                          Key Deliverables ({srv.bulletPoints.length})
                        </span>
                        {srv.bulletPoints.slice(0, 3).map((bp, i) => (
                          <div key={i} className="text-[11px] text-[#526B5C] flex items-start gap-1">
                            <span className="text-[#2C593F] font-bold">•</span>
                            <span className="truncate">{bp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-[#E8EFEA] flex items-center justify-between text-xs text-[#8BAAA4]">
                    <span className="text-[11px] truncate max-w-[120px]">ID: {srv.id}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="px-2.5 py-1.5 rounded text-xs font-bold text-[#2C593F] bg-[#E8F3EC] hover:bg-[#D5EADB] transition-colors flex items-center gap-1"
                        title="Edit Service Details and Picture"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit Image & Details
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id, srv.title)}
                        className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Modal Dialog for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5E2D9] my-8 animate-in zoom-in-95 duration-150">
            <div className="bg-[#14261C] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">
                  {editingService ? 'Edit Service & Destination Picture' : 'Add New Sawmill Service'}
                </h3>
                <p className="text-xs text-[#9BBBA6]">Directly updates the Services Page cards and visuals</p>
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

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Precision Sawmilling & Processing"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  placeholder="e.g. State-of-the-art Wood-Mizer thin-kerf band sawing"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Display Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  >
                    <option value="Trees">Trees (Harvesting / Forestry)</option>
                    <option value="Hammer">Hammer (Sawmilling / Processing)</option>
                    <option value="Truck">Truck (Logistics / Haulage)</option>
                    <option value="Building2">Building2 (Wholesale Supply)</option>
                    <option value="Store">Store (Retail & Walk-in)</option>
                    <option value="Recycle">Recycle (Biomass / Eco Residue)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Sort Order Priority
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Service Feature Image Wiring */}
              <div className="p-3.5 bg-[#F2F7F4] rounded-xl border border-[#CCE0D4] space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#14261C] uppercase tracking-wide">
                    Service Feature Image (Destination: Services Page)
                  </label>
                  <span className="text-[10px] text-[#2C593F] font-semibold">
                    Live Sync
                  </span>
                </div>

                {/* Quick picker from uploaded gallery images */}
                {images.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-medium text-[#2A4334] mb-1">
                      Quick Select from Sawmill Media Library:
                    </label>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setFormData({ ...formData, image: e.target.value });
                        }
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#CCE0D4] bg-white text-[#14261C]"
                    >
                      <option value="">-- Choose from existing uploaded photos --</option>
                      {images.map(img => (
                        <option key={img.id} value={img.url}>
                          {img.title} ({img.categoryLabel || img.category})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <input
                    type="text"
                    placeholder="Image URL (/images/... or https://...)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5E2D9] bg-white focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />

                  <label className="flex items-center justify-center p-2.5 rounded-lg border border-dashed border-[#A7C8B4] bg-white hover:bg-[#EEF5F0] cursor-pointer transition-colors text-xs font-semibold text-[#2C593F]">
                    <Upload className="w-3.5 h-3.5 mr-1.5" />
                    <span>Upload New Photo from Computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {formData.image && (
                  <div className="relative rounded-lg overflow-hidden border border-[#D5E2D9] aspect-video bg-neutral-100">
                    <img
                      src={formData.image}
                      alt="Service Feature Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-2 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded">
                      Live Destination Preview
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Comprehensive service description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Key Deliverables / Bullet Points (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="One feature per line"
                  value={formData.bulletPoints}
                  onChange={(e) => setFormData({ ...formData, bulletPoints: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="srv-active-check"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-[#2C593F] rounded border-[#D5E2D9] focus:ring-[#2C593F]"
                />
                <label htmlFor="srv-active-check" className="text-xs font-semibold text-[#2A4334] cursor-pointer">
                  Service active and visible on Services Page
                </label>
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
                  {isSubmitting ? 'Saving...' : (editingService ? 'Save Changes' : 'Create Service')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
