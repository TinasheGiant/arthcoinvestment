import React, { useState } from 'react';
import { PageId, QuoteRequest } from '../../types';
import { COMPANY_INFO } from '../../data/timberData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  TreePine,
  HelpCircle,
  Truck
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    phone: '',
    email: '',
    productType: 'Structural Framing Pine (38x114 / 38x152)',
    quantity: '50 pieces (4.8m)',
    destination: 'Mutare / Delivery to site',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = `*New Timber Inquiry for Arthco Investments:*
- Name: ${formData.name || 'Customer'}
- Phone: ${formData.phone || 'Not provided'}
- Product: ${formData.productType}
- Quantity / Spec: ${formData.quantity}
- Destination: ${formData.destination}
- Notes: ${formData.notes || 'None'}`;

  const whatsappUrl = `https://wa.me/263773412197?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-16 py-10">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#152B1E] rounded-2xl text-white p-8 sm:p-14 relative overflow-hidden border border-[#274B35]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-[#203D2C] border border-[#345F45] text-[#E2C08D] text-xs font-bold">
              <div className="w-5 h-5 rounded bg-white p-0.5 shrink-0">
                <img 
                  src="/logo.svg" 
                  alt="Arthco Timbers" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                  }}
                />
              </div>
              <span>Arthco Timbers · <span className="italic font-normal text-white">"for your quality timber"</span></span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Contact Arthco Investments
            </h1>
            <p className="text-base sm:text-lg text-[#BCD8C7] leading-relaxed">
              We welcome inquiries for wholesale contracts, builder timber packs, custom Wood-Mizer milling orders, or direct yard collection at Nixwood 10314, Nyakamete in Mutare, Zimbabwe.
            </p>
          </div>
          <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none">
            <Phone className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

      {/* CORE CONTACT CHANNELS & DIRECT DIALING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPANY_INFO.phones.map((phone, idx) => (
            <div
              key={phone.number}
              className="bg-white rounded-xl p-6 border border-[#D8E3DC] shadow-sm hover:border-[#2C593F] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E]">
                    <Phone className="w-5 h-5 text-[#1E432E]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2F6F3] text-[#30533C]">
                    Line #{idx + 1}
                  </span>
                </div>
                <span className="text-xs uppercase font-bold text-[#C28846] tracking-wider block mb-1">
                  {phone.label}
                </span>
                <h3 className="text-2xl font-extrabold text-[#14261C] mb-2 font-mono">
                  {phone.number}
                </h3>
                <p className="text-xs text-[#526B5C]">
                  Direct calls, SMS, and WhatsApp messages are monitored throughout operating hours.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#EDF3EF] flex items-center gap-2">
                <a
                  href={`tel:${phone.clean}`}
                  className="flex-1 py-2 rounded-lg bg-[#1E432E] hover:bg-[#29593E] text-white text-xs font-bold uppercase tracking-wider text-center transition-colors"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${phone.clean}?text=Hello%20Arthco%20Investments%2C%20I%20would%20like%20to%20inquire%20about%20timber%20supply.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] text-xs font-bold transition-colors flex items-center justify-center"
                  aria-label={`WhatsApp ${phone.number}`}
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM & LOCATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Quote Request Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 border border-[#D8E3DC] shadow-sm">
            <div className="border-b border-[#E8EFEA] pb-6 mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
                  Online Order Inquiry
                </span>
                <h2 className="text-2xl font-extrabold text-[#14261C] mt-1">
                  Request a Timber Quotation
                </h2>
                <p className="text-xs text-[#526B5C] mt-1">
                  Arthco Timbers · <span className="italic font-medium text-[#C28846]">for your quality timber</span>. Fill in your specifications below for instant pricing.
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#D5E2D9] shadow-sm shrink-0 hidden sm:block">
                <img
                  src="/logo.svg"
                  alt="Arthco Timbers Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                  }}
                />
              </div>
            </div>

            {submitted ? (
              <div className="bg-[#EBF5EE] border border-[#BFDEC9] rounded-xl p-6 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-[#2C593F] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#14261C]">
                  Thank You, {formData.name || 'Valued Customer'}!
                </h3>
                <p className="text-xs text-[#3C5747] max-w-md mx-auto leading-relaxed">
                  Your timber quotation request has been compiled. To receive an immediate response with current board prices and delivery lead times, click below to send directly via WhatsApp:
                </p>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send via WhatsApp (0773 412 197)
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center px-4 py-3 rounded-lg border border-[#BACCC0] bg-white text-[#203D2C] hover:bg-[#F2F6F3] text-xs font-bold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tendai Moyo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0773 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                      Timber Product Category
                    </label>
                    <select
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
                    >
                      <option value="Structural Framing Pine (38x114 / 38x152)">Structural Framing Pine (38x114 / 38x152)</option>
                      <option value="Roofing Battens & Purlins (38x38 / 38x76)">Roofing Battens & Purlins (38x38 / 38x76)</option>
                      <option value="Joinery & Furniture Planks (25x150 / 25x225)">Joinery & Furniture Planks (25x150 / 25x225)</option>
                      <option value="Industrial Pallet & Packaging Timber">Industrial Pallet & Packaging Timber</option>
                      <option value="Clean Pine Sawdust / Biomass Residue">Clean Pine Sawdust / Biomass Residue</option>
                      <option value="Custom Cut Wood-Mizer Order">Custom Cut Wood-Mizer Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                      Estimated Quantity & Lengths
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 100 pcs @ 4.8m or 10 cubic meters"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                    Delivery Destination / Collection
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Direct yard collection in Nyakamete OR delivery to Harare"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] mb-1 uppercase tracking-wide">
                    Additional Specifications / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific truss profiles, moisture requirements (wet-off-saw or air-dried), or preferred delivery dates..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#CCD8D0] bg-[#FAFCFA] focus:outline-none focus:ring-2 focus:ring-[#2C593F]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center shadow-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Timber Inquiry
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Direct WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right: Location & Yard Operating Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="bg-[#172E21] text-white rounded-2xl p-7 border border-[#2B523B] space-y-4">
              <div className="flex items-center space-x-2 text-[#E2C08D] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Physical Yard & Mill Location</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {COMPANY_INFO.address}
              </h3>
              <p className="text-xs text-[#ABC9B7] leading-relaxed">
                Situated in the Nyakamete Industrial Area, Mutare. Easily accessible for commercial 30-ton interlink haulage trucks and local contractor utility vehicles.
              </p>

              <div className="pt-3 border-t border-[#264A35] space-y-2 text-xs text-[#ABC9B7]">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#E2C08D] shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Operating Hours:</span>
                    <span>Monday – Friday: 07:30 AM – 05:00 PM</span>
                    <br />
                    <span>Saturday: 08:00 AM – 01:00 PM</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <Truck className="w-4 h-4 text-[#E2C08D] shrink-0" />
                  <span>On-site forklift and crane loading available for bulk orders</span>
                </div>
              </div>
            </div>

            {/* Simulated Map Visual */}
            <div className="bg-white rounded-2xl p-6 border border-[#D8E3DC] shadow-sm space-y-3">
              <span className="text-xs uppercase font-bold text-[#C28846] tracking-wider block">
                Regional Logistics Map
              </span>
              <div className="h-44 rounded-xl bg-[#E8EFEA] border border-[#CCDCD2] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1E432E_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 space-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#1E432E] text-[#E2C08D] flex items-center justify-center mx-auto shadow">
                    <TreePine className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#14261C]">Nyakamete Industrial Hub</h4>
                  <p className="text-[11px] text-[#556F60]">
                    Mutare · Eastern Highlands Pine Transport Corridor
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#526B5C]">
                For GPS directions, search <em>Nixwood, Nyakamete, Mutare</em> or call our dispatch desk at <strong className="text-[#1E432E]">0771 744 334</strong> upon entering the industrial area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
            Customer FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261C] mt-1">
            Common Questions From Timber Buyers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#D8E3DC] shadow-sm">
            <h3 className="text-sm font-bold text-[#14261C] mb-2 flex items-center">
              <HelpCircle className="w-4 h-4 text-[#C28846] mr-2 shrink-0" />
              Do you deliver timber outside of Mutare?
            </h3>
            <p className="text-xs text-[#526B5C] leading-relaxed">
              Yes. We regularly dispatch full truckload and consolidated wholesale orders to Harare, Bulawayo, Masvingo, Chiredzi, and other major building centers across Zimbabwe.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#D8E3DC] shadow-sm">
            <h3 className="text-sm font-bold text-[#14261C] mb-2 flex items-center">
              <HelpCircle className="w-4 h-4 text-[#C28846] mr-2 shrink-0" />
              Can I buy smaller quantities as an individual builder?
            </h3>
            <p className="text-xs text-[#526B5C] leading-relaxed">
              Yes. We serve both wholesale merchants and retail walk-in builders. You can purchase single bundles of roofing battens or exact quantities needed for your roof structure.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#D8E3DC] shadow-sm">
            <h3 className="text-sm font-bold text-[#14261C] mb-2 flex items-center">
              <HelpCircle className="w-4 h-4 text-[#C28846] mr-2 shrink-0" />
              What are the benefits of your Wood-Mizer LT15 cut?
            </h3>
            <p className="text-xs text-[#526B5C] leading-relaxed">
              The thin-kerf band blade produces exceptionally consistent board thickness with minimal dimensional variation, saving carpenters time during roof assembly and wall framing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#D8E3DC] shadow-sm">
            <h3 className="text-sm font-bold text-[#14261C] mb-2 flex items-center">
              <HelpCircle className="w-4 h-4 text-[#C28846] mr-2 shrink-0" />
              Do you sell sawdust for poultry or agriculture?
            </h3>
            <p className="text-xs text-[#526B5C] leading-relaxed">
              Yes. As part of our zero-waste sustainability practice, dry and clean pine sawdust is available by the bag or truckload at our Nyakamete yard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
