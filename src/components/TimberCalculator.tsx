import React, { useState } from 'react';
import { Calculator, Send, CheckCircle2, Copy, Tag, Info } from 'lucide-react';
import { useData } from '../context/DataContext';

export const TimberCalculator: React.FC = () => {
  const { calculatorSettings } = useData();
  const [thickness, setThickness] = useState<number>(38); // mm
  const [width, setWidth] = useState<number>(114); // mm
  const [length, setLength] = useState<number>(4.8); // meters
  const [pieces, setPieces] = useState<number>(50);
  const [woodType, setWoodType] = useState<string>('Structural Pine (38/50mm)');
  const [includeWastage, setIncludeWastage] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);

  // Dynamic presets from backend
  const presets = calculatorSettings.presets && calculatorSettings.presets.length > 0
    ? calculatorSettings.presets
    : [
        { id: '1', label: '38 x 38 (Battens)', thickness: 38, width: 38, length: 3.6, defaultPieces: 100, category: 'Roofing' },
        { id: '2', label: '38 x 76 (Purlins)', thickness: 38, width: 76, length: 4.8, defaultPieces: 60, category: 'Roofing' },
        { id: '3', label: '38 x 114 (Rafters)', thickness: 38, width: 114, length: 4.8, defaultPieces: 50, category: 'Structural' },
        { id: '4', label: '38 x 152 (Joists)', thickness: 38, width: 152, length: 5.4, defaultPieces: 30, category: 'Structural' },
        { id: '5', label: '50 x 76 (Wall Plates)', thickness: 50, width: 76, length: 4.8, defaultPieces: 40, category: 'Structural' },
        { id: '6', label: '25 x 150 (Planks)', thickness: 25, width: 150, length: 3.6, defaultPieces: 40, category: 'Boards' },
      ];

  // Calculations
  // Volume in m3 = (Thickness/1000) * (Width/1000) * Length * Pieces
  const rawVolumePerPiece = (thickness / 1000) * (width / 1000) * length;
  const baseVolumeM3 = rawVolumePerPiece * pieces;
  const wastageFactor = includeWastage ? 1 + (calculatorSettings.defaultWastagePercent / 100) : 1;
  const finalVolumeM3 = baseVolumeM3 * wastageFactor;
  const totalLinearMeters = length * pieces;

  // Pricing from backend settings
  const ratePerM3 = calculatorSettings.defaultRatePerM3 || 310;
  const estimatedExMillPrice = finalVolumeM3 * ratePerM3;

  const quoteMessage = `Hello Arthco Timbers (for your quality timber), I need a quote:
- Product: ${woodType}
- Dimensions: ${thickness}mm x ${width}mm
- Length: ${length}m
- Quantity: ${pieces} pieces
- Total Linear: ${totalLinearMeters.toFixed(1)} linear meters
- Total Volume: ${finalVolumeM3.toFixed(3)} m³ ${includeWastage ? `(includes ${calculatorSettings.defaultWastagePercent}% waste allowance)` : ''}
- Indicative Value: ~$${estimatedExMillPrice.toFixed(2)} USD (@ $${ratePerM3}/m³)
- Delivery to: [Specify site/town in Zimbabwe]`;

  const handlePresetClick = (p: { thickness: number; width: number; length: number; defaultPieces?: number }) => {
    setThickness(p.thickness);
    setWidth(p.width);
    setLength(p.length);
    if (p.defaultPieces) setPieces(p.defaultPieces);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quoteMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hotline = calculatorSettings.whatsappHotline || '263773412197';
  const whatsappUrl = `https://wa.me/${hotline}?text=${encodeURIComponent(quoteMessage)}`;

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#D9E4DD] shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E8EFEA] gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#224A32] text-xs font-bold uppercase tracking-wider mb-1.5">
            <Calculator className="w-3.5 h-3.5 text-[#2C593F]" />
            <span>Builder & Merchant Utility</span>
          </div>
          <h3 className="text-xl font-bold text-[#14261C]">Timber Volume & Dimension Calculator</h3>
          <p className="text-xs text-[#52685B] mt-0.5">
            Arthco Timbers · <span className="italic font-medium text-[#C28846]">for your quality timber</span>. Calculate cubic meter (m³) requirements and send directly to sales hotlines.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="w-full sm:w-auto">
          <span className="text-[11px] font-semibold text-[#667E70] uppercase block mb-1.5">
            Quick Sizing Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p.id || p.label}
                type="button"
                onClick={() => handlePresetClick(p)}
                className={`text-xs px-2.5 py-1 rounded transition-colors font-medium border ${
                  thickness === p.thickness && width === p.width
                    ? 'bg-[#1E3B2A] text-white border-[#1E3B2A]'
                    : 'bg-[#F2F6F3] text-[#234130] border-[#DCE7E0] hover:bg-[#E2EDE5]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 my-6">
        <div>
          <label className="block text-xs font-bold text-[#2A4334] mb-1.5 uppercase tracking-wide">
            Timber Grade / Type
          </label>
          <select
            value={woodType}
            onChange={(e) => setWoodType(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] text-[#16291E] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
          >
            <option value="Structural Pine (38/50mm)">Structural Pine</option>
            <option value="Roofing Battens & Purlins">Roofing Battens & Purlins</option>
            <option value="Clean Joinery Planks">Clean Joinery Planks</option>
            <option value="Heavy Rafters & Beams">Heavy Rafters & Beams</option>
            <option value="Packaging & Pallet Timber">Packaging / Pallet Timber</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2A4334] mb-1.5 uppercase tracking-wide">
            Thickness (mm)
          </label>
          <input
            type="number"
            value={thickness}
            min={15}
            max={300}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] text-[#16291E] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2A4334] mb-1.5 uppercase tracking-wide">
            Width (mm)
          </label>
          <input
            type="number"
            value={width}
            min={25}
            max={400}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] text-[#16291E] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2A4334] mb-1.5 uppercase tracking-wide">
            Length (Meters)
          </label>
          <input
            type="number"
            step="0.3"
            value={length}
            min={1.2}
            max={7.2}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] text-[#16291E] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2A4334] mb-1.5 uppercase tracking-wide">
            Quantity (Pieces)
          </label>
          <input
            type="number"
            value={pieces}
            min={1}
            max={5000}
            onChange={(e) => setPieces(Number(e.target.value))}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] text-[#16291E] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
          />
        </div>
      </div>

      {/* Wastage factor toggle */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EBF2ED]">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="wastage-check"
            checked={includeWastage}
            onChange={(e) => setIncludeWastage(e.target.checked)}
            className="w-4 h-4 text-[#2C593F] rounded border-[#CCD8D0] focus:ring-[#2C593F]"
          />
          <label htmlFor="wastage-check" className="text-xs text-[#2A4334] font-semibold cursor-pointer">
            Include recommended site cutting allowance ({calculatorSettings.defaultWastagePercent || 10}%)
          </label>
        </div>
        <div className="text-xs text-[#52685B] flex items-center gap-1">
          <Tag className="w-3 h-3 text-[#2C593F]" />
          <span>Indicative Rate: <strong className="text-[#14261C]">${ratePerM3}/m³</strong> ex-mill</span>
        </div>
      </div>

      {/* Calculated Results Box */}
      <div className="bg-[#F5F8F6] rounded-xl p-5 border border-[#DEEAE2] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#577262] font-semibold block">
            Total Sawn Volume
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-3xl font-extrabold text-[#173322]">
              {finalVolumeM3.toFixed(3)}
            </span>
            <span className="text-sm font-bold text-[#3B664C]">m³</span>
          </div>
          <span className="text-xs text-[#70897B] block mt-0.5">
            ≈ {(finalVolumeM3 * 423.77).toFixed(0)} Board Feet
          </span>
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider text-[#577262] font-semibold block">
            Linear Distance
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-2xl font-bold text-[#173322]">
              {totalLinearMeters.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-[#3B664C]">Run Meters</span>
          </div>
          <span className="text-xs text-[#70897B] block mt-0.5">
            {pieces} pcs @ {length}m
          </span>
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider text-[#577262] font-semibold block">
            Est. Ex-Mill Price
          </span>
          <div className="flex items-baseline space-x-1.5 mt-1">
            <span className="text-2xl font-extrabold text-[#C28846]">
              ${estimatedExMillPrice.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-[#526B5C]">USD</span>
          </div>
          <span className="text-[11px] text-[#70897B] block mt-0.5">
            Subject to VAT & delivery
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-lg border border-[#C5D5CB] bg-white text-[#203D2C] hover:bg-[#F2F6F3] text-xs font-bold transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-600" />
                Copied Spec!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1.5 text-[#5A7465]" />
                Copy Specs
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] text-xs font-extrabold tracking-wide uppercase transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Send to WhatsApp
          </a>
        </div>
      </div>

      {calculatorSettings.disclaimer && (
        <div className="mt-3 flex items-start gap-1.5 text-[11px] text-[#70897B]">
          <Info className="w-3.5 h-3.5 text-[#2C593F] shrink-0 mt-0.5" />
          <p>{calculatorSettings.disclaimer}</p>
        </div>
      )}
    </div>
  );
};
