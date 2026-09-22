import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { CalculatorPreset } from '../../types';
import { Calculator, Save, Plus, Trash2, Edit3, DollarSign, CheckCircle, Percent } from 'lucide-react';

export const CalculatorTab: React.FC = () => {
  const { calculatorSettings, updateCalculator } = useData();
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    defaultRatePerM3: calculatorSettings.defaultRatePerM3 || 310,
    currency: calculatorSettings.currency || 'USD',
    currencySymbol: calculatorSettings.currencySymbol || '$',
    vatPercent: calculatorSettings.vatPercent || 15,
    defaultWastagePercent: calculatorSettings.defaultWastagePercent || 10,
    minOrderValue: calculatorSettings.minOrderValue || 50,
    whatsappHotline: calculatorSettings.whatsappHotline || '263773412197',
    disclaimer: calculatorSettings.disclaimer || '',
  });

  const [presets, setPresets] = useState<CalculatorPreset[]>(calculatorSettings.presets || []);

  // Preset Modal
  const [newPreset, setNewPreset] = useState<Partial<CalculatorPreset>>({
    label: '',
    thickness: 38,
    width: 114,
    length: 4.8,
    defaultPieces: 50,
    category: 'Structural',
  });

  useEffect(() => {
    setFormData({
      defaultRatePerM3: calculatorSettings.defaultRatePerM3,
      currency: calculatorSettings.currency,
      currencySymbol: calculatorSettings.currencySymbol,
      vatPercent: calculatorSettings.vatPercent,
      defaultWastagePercent: calculatorSettings.defaultWastagePercent,
      minOrderValue: calculatorSettings.minOrderValue,
      whatsappHotline: calculatorSettings.whatsappHotline,
      disclaimer: calculatorSettings.disclaimer,
    });
    setPresets(calculatorSettings.presets || []);
  }, [calculatorSettings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await updateCalculator({
        ...formData,
        defaultRatePerM3: Number(formData.defaultRatePerM3),
        vatPercent: Number(formData.vatPercent),
        defaultWastagePercent: Number(formData.defaultWastagePercent),
        minOrderValue: Number(formData.minOrderValue),
        presets,
      });
      setSuccessMessage('Calculator rates, presets, and hotline updated successfully.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update calculator settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPreset = () => {
    if (!newPreset.label || !newPreset.thickness || !newPreset.width) {
      alert('Please fill in preset label, thickness, and width');
      return;
    }

    const preset: CalculatorPreset = {
      id: `pre-${Date.now()}`,
      label: newPreset.label,
      thickness: Number(newPreset.thickness),
      width: Number(newPreset.width),
      length: Number(newPreset.length) || 4.8,
      defaultPieces: Number(newPreset.defaultPieces) || 50,
      category: newPreset.category || 'Structural',
    };

    setPresets(prev => [...prev, preset]);
    setNewPreset({
      label: '',
      thickness: 38,
      width: 114,
      length: 4.8,
      defaultPieces: 50,
      category: 'Structural',
    });
  };

  const handleRemovePreset = (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#D9E3DC] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#2C593F]" />
            Timber Volume & Dimension Calculator Controls
          </h2>
          <p className="text-xs text-[#526B5C]">
            Manage ex-mill pricing formulas, cubic-meter ($/m³) defaults, tax rates, standard presets, and WhatsApp quoting dispatch.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2 text-sm font-semibold">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Core Pricing Parameters */}
        <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-[#14261C] uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#2C593F]" />
            Core Pricing & Tax Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                Default Rate per Cubic Metre ($/m³) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#526B5C]">
                  $
                </span>
                <input
                  type="number"
                  required
                  min={1}
                  step={1}
                  value={formData.defaultRatePerM3}
                  onChange={(e) => setFormData({ ...formData, defaultRatePerM3: Number(e.target.value) })}
                  className="w-full pl-8 pr-3 py-2 text-sm font-bold text-[#14261C] rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-[#6E887B] mt-1">
                Applies when no custom cross-section rate is designated.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                Currency & Symbol
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="USD"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  placeholder="$"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                VAT / Sales Tax (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={formData.vatPercent}
                  onChange={(e) => setFormData({ ...formData, vatPercent: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#526B5C] font-bold">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                Recommended Waste Allowance (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={formData.defaultWastagePercent}
                  onChange={(e) => setFormData({ ...formData, defaultWastagePercent: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#526B5C] font-bold">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                Minimum Order Value ($)
              </label>
              <input
                type="number"
                min={0}
                value={formData.minOrderValue}
                onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                WhatsApp Quotation Hotline Number
              </label>
              <input
                type="text"
                placeholder="263773412197"
                value={formData.whatsappHotline}
                onChange={(e) => setFormData({ ...formData, whatsappHotline: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
              />
              <p className="text-[11px] text-[#6E887B] mt-1">Country code format without '+' or spaces</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
              Calculator Disclaimer & Terms Notice
            </label>
            <textarea
              rows={2}
              value={formData.disclaimer}
              onChange={(e) => setFormData({ ...formData, disclaimer: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
            />
          </div>
        </div>

        {/* Presets Management */}
        <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#14261C] uppercase tracking-wider flex items-center gap-2">
              <Percent className="w-4 h-4 text-[#2C593F]" />
              Calculator Quick Presets (1-Click Selection Buttons)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {presets.map(pre => (
              <div
                key={pre.id}
                className="p-3 rounded-lg border border-[#D5E2D9] bg-[#FAFDFB] flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#14261C]">{pre.label}</h4>
                  <p className="text-xs text-[#526B5C]">
                    {pre.thickness}mm × {pre.width}mm × {pre.length}m • {pre.defaultPieces} pcs
                  </p>
                  <span className="text-[10px] bg-[#E8F3EC] text-[#2C593F] font-semibold px-2 py-0.5 rounded">
                    {pre.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePreset(pre.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove preset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Preset Row */}
          <div className="pt-4 border-t border-[#E8EFEA] bg-[#F7FAF8] p-4 rounded-xl space-y-3">
            <span className="text-xs font-bold text-[#2C593F] uppercase tracking-wider block">
              + Add New Quick Preset
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Preset Label (e.g. 50x76 Plates)"
                  value={newPreset.label}
                  onChange={(e) => setNewPreset({ ...newPreset, label: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#D5E2D9] bg-white"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Thick (mm)"
                  value={newPreset.thickness}
                  onChange={(e) => setNewPreset({ ...newPreset, thickness: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#D5E2D9] bg-white"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Width (mm)"
                  value={newPreset.width}
                  onChange={(e) => setNewPreset({ ...newPreset, width: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#D5E2D9] bg-white"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Length (m)"
                  value={newPreset.length}
                  onChange={(e) => setNewPreset({ ...newPreset, length: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#D5E2D9] bg-white"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleAddPreset}
                  className="w-full py-1.5 px-3 rounded bg-[#2C593F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20422E] transition-colors"
                >
                  Add Preset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-6 py-3 rounded-xl bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving Changes...' : 'Save Calculator Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
};
