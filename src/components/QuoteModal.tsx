import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/timberData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timberType, setTimberType] = useState('Structural Pine (38x114 / 38x152)');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const quoteSummary = `*Arthco Timber Quote Request:*
- Customer: ${name || 'Prospective Buyer'}
- Phone: ${phone || 'Not given'}
- Timber Type: ${timberType}
- Quantity: ${quantity || 'Standard bundle'}
- Location: ${location || 'Mutare / Delivery needed'}`;

  const whatsappUrl = `https://wa.me/263773412197?text=${encodeURIComponent(quoteSummary)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5E2D9] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#152B1E] text-white p-5 flex items-center justify-between border-b border-[#254633]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white p-0.5 border border-[#3E6C51] shrink-0">
              <img
                src="/logo.svg"
                alt="Arthco Timbers"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Request a Timber Quote</h3>
              <p className="text-xs text-[#E2C08D] italic">Arthco Timbers · for your quality timber</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9BBBA6] hover:text-white hover:bg-[#254633] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#E8F5EC] text-[#2C593F] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#14261C]">Quote Details Prepared!</h4>
              <p className="text-xs text-[#526B5C]">
                Send this directly to Arthco's sales desk on WhatsApp for instant pricing:
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Forward to WhatsApp (0773 412 197)
                </a>
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-lg border border-[#CCD8D0] text-[#344F3F] text-xs font-semibold hover:bg-[#F2F6F3]"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farai Chikwanha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0773 412 197"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                  Timber Category
                </label>
                <select
                  value={timberType}
                  onChange={(e) => setTimberType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                >
                  <option value="Structural Pine (38x114 / 38x152)">Structural Pine (38x114 / 38x152)</option>
                  <option value="Roofing Battens (38x38) & Purlins (38x76)">Roofing Battens & Purlins</option>
                  <option value="Joinery Boards & Planks (25x150 / 25x225)">Joinery Boards & Planks</option>
                  <option value="Packaging & Pallet Timber">Packaging & Pallet Timber</option>
                  <option value="Clean Sawdust / Biomass">Clean Sawdust / Biomass</option>
                  <option value="Custom Cut Order">Custom Cut Order</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                  Quantity or Dimensions
                </label>
                <input
                  type="text"
                  placeholder="e.g. 80 pieces @ 4.8m lengths"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mutare site or Harare"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Generate Quote
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] font-bold text-xs transition-colors flex items-center"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
