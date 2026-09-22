import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DimensionRecord } from '../../types';
import { Plus, Edit2, Trash2, Ruler, CheckCircle2, XCircle, X } from 'lucide-react';

export const DimensionsTab: React.FC = () => {
  const { dimensions, addDimension, updateDimension, deleteDimension } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDim, setEditingDim] = useState<DimensionRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    thickness: 38,
    width: 114,
    standardLengths: '3.6m, 4.2m, 4.8m, 5.4m',
    category: 'Structural',
    idealFor: 'Engineered roof trusses and framing',
    pricePerM3: 310,
    active: true,
  });

  const handleOpenAdd = () => {
    setEditingDim(null);
    setFormData({
      title: '',
      thickness: 38,
      width: 114,
      standardLengths: '3.6m, 4.2m, 4.8m, 5.4m',
      category: 'Structural',
      idealFor: '',
      pricePerM3: 310,
      active: true,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (dim: DimensionRecord) => {
    setEditingDim(dim);
    setFormData({
      title: dim.title,
      thickness: dim.thickness,
      width: dim.width,
      standardLengths: dim.standardLengths,
      category: dim.category,
      idealFor: dim.idealFor,
      pricePerM3: dim.pricePerM3,
      active: dim.active,
    });
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (editingDim) {
        await updateDimension(editingDim.id, formData);
      } else {
        await addDimension(formData);
      }
      setModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save timber dimension');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete dimension "${name}"?`)) {
      try {
        await deleteDimension(id);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to delete dimension');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#D9E3DC] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#2C593F]" />
            Common Sizes & Common Dimensions (CRUD)
          </h2>
          <p className="text-xs text-[#526B5C]">
            Configure standard milled cross-sections, lengths, structural classifications, and pricing displayed across website specs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Dimension
        </button>
      </div>

      {/* Dimensions Table */}
      <div className="bg-white rounded-xl border border-[#D5E2D9] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F4F8F5] text-[#2C593F] border-b border-[#D5E2D9] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Size Name / Title</th>
                <th className="py-3.5 px-4">Cross Section</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Common Stock Lengths</th>
                <th className="py-3.5 px-4">Ideal Applications</th>
                <th className="py-3.5 px-4">Rate ($/m³)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF2ED]">
              {dimensions.map(dim => (
                <tr key={dim.id} className="hover:bg-[#F9FCFA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#14261C]">
                    {dim.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-[#EBF3EE] text-[#2C593F]">
                      {dim.thickness}mm × {dim.width}mm
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-semibold text-[#526B5C]">
                    {dim.category}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#2A4334]">
                    {dim.standardLengths}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#526B5C] max-w-xs truncate">
                    {dim.idealFor}
                  </td>
                  <td className="py-3 px-4 font-bold text-xs text-[#14261C]">
                    ${dim.pricePerM3}
                  </td>
                  <td className="py-3 px-4">
                    {dim.active ? (
                      <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3 mr-1" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEdit(dim)}
                        className="p-1.5 rounded text-[#2C593F] hover:bg-[#E8F3EC] transition-colors"
                        title="Edit Dimension"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dim.id, dim.title)}
                        className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Dimension"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5E2D9] my-8 animate-in zoom-in-95 duration-150">
            <div className="bg-[#14261C] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">
                  {editingDim ? 'Edit Timber Dimension' : 'Add Common Dimension'}
                </h3>
                <p className="text-xs text-[#9BBBA6]">Specify cross-section thickness, width, and standard lengths</p>
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
                  Dimension Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Structural Rafters & Joists"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Thickness (mm) *
                  </label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={300}
                    value={formData.thickness}
                    onChange={(e) => setFormData({ ...formData, thickness: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Width (mm) *
                  </label>
                  <input
                    type="number"
                    required
                    min={20}
                    max={400}
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  >
                    <option value="Structural">Structural</option>
                    <option value="Roofing">Roofing & Battens</option>
                    <option value="Planks & Boards">Planks & Boards</option>
                    <option value="Industrial & Packaging">Industrial & Crating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Price per m³ ($ USD)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={2000}
                    value={formData.pricePerM3}
                    onChange={(e) => setFormData({ ...formData, pricePerM3: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Common Standard Lengths
                </label>
                <input
                  type="text"
                  placeholder="3.6m, 4.2m, 4.8m, 5.4m, 6.0m"
                  value={formData.standardLengths}
                  onChange={(e) => setFormData({ ...formData, standardLengths: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Ideal Applications
                </label>
                <textarea
                  rows={2}
                  placeholder="Recommended architectural usage..."
                  value={formData.idealFor}
                  onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="dim-active-check"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-[#2C593F] rounded border-[#D5E2D9] focus:ring-[#2C593F]"
                />
                <label htmlFor="dim-active-check" className="text-xs font-semibold text-[#2A4334] cursor-pointer">
                  Display this dimension as active in public technical tables
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
                  {isSubmitting ? 'Saving...' : (editingDim ? 'Save Changes' : 'Create Dimension')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
