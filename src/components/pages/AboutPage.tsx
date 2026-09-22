import React from 'react';
import { PageId } from '../../types';
import { COMPANY_INFO, CORE_VALUES } from '../../data/timberData';
import { 
  TreePine, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Scale, 
  Users, 
  Leaf, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Hammer,
  Truck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#1E432E]" />;
      case 'Scale': return <Scale className="w-6 h-6 text-[#1E432E]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#1E432E]" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-[#1E432E]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#1E432E]" />;
      default: return <TreePine className="w-6 h-6 text-[#1E432E]" />;
    }
  };

  return (
    <div className="space-y-16 py-10">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#152B1E] rounded-2xl text-white p-8 sm:p-14 relative overflow-hidden border border-[#274B35]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              About Arthco Investments
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Rapidly Growing Timber Producer in Mutare, Zimbabwe
            </h1>
            <p className="text-base sm:text-lg text-[#BCD8C7] leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>
          </div>
          <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
            <TreePine className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

      {/* BRAND IDENTITY & MOTTO CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D5E2D9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-1.5 shadow-md border border-[#CDE0D3] shrink-0">
              <img
                src="/logo.svg"
                alt="Arthco Timbers Trademark Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                }}
              />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#0F5B9E] font-extrabold bg-[#EBF3FB] px-2.5 py-1 rounded-md border border-[#CCE1F5]">
                Official Brand Trademark
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261C] mt-1.5">
                Arthco Timbers
              </h2>
              <p className="text-base sm:text-lg font-semibold text-[#C28846] italic mt-0.5">
                "{COMPANY_INFO.motto}"
              </p>
            </div>
          </div>
          <div className="text-xs text-[#526B5C] max-w-sm md:text-right border-t md:border-t-0 md:border-l border-[#E2EBE5] pt-4 md:pt-0 md:pl-6">
            <p className="leading-relaxed">
              Our emblem pairs the majestic Eastern Highlands pine tree silhouette with the capital 'A' of Arthco—representing our steadfast dedication to sustainable timber harvesting and structural sawing excellence across Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION WITH HIGH EMPHASIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-[#1E432E] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E]">
                  <TreePine className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#C28846] font-bold">
                    Core Commitment
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#14261C]">Our Mission</h2>
                </div>
              </div>
              <blockquote className="text-base sm:text-lg text-[#2A4032] italic font-medium leading-relaxed bg-[#F8FAF8] p-5 rounded-xl border-l-4 border-[#1E432E] my-4">
                "{COMPANY_INFO.mission}"
              </blockquote>
            </div>
            <p className="text-xs text-[#526B5C]">
              Focused on delivering reliable quality sawn timber products tailored to the exact specifications of building contractors, carpenters, and retailers.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#172E21] text-white rounded-2xl p-8 sm:p-10 border border-[#2B523B] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#274D37] flex items-center justify-center text-[#E2C08D]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#E2C08D] font-bold">
                    Future Horizon
                  </span>
                  <h2 className="text-2xl font-extrabold text-white">Our Vision</h2>
                </div>
              </div>
              <blockquote className="text-base sm:text-lg text-[#D0E2D7] italic font-medium leading-relaxed bg-[#112318] p-5 rounded-xl border-l-4 border-[#C28846] my-4">
                "{COMPANY_INFO.vision}"
              </blockquote>
            </div>
            <p className="text-xs text-[#8EB29D]">
              Driving growth, employment, and sustainable timber processing throughout Manicaland and the broader nation of Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      {/* COMPANY STORY & FACILITY IN NYAKAMETE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
              Our Roots & Location
            </span>
            <h2 className="text-3xl font-extrabold text-[#14261C]">
              Strategically Located in Mutare's Timber Corridor
            </h2>
            <p className="text-sm text-[#465E50] leading-relaxed">
              Arthco Investments is headquartered at <strong>Nixwood 10314, Nyakamete</strong> in Mutare, Zimbabwe. Positioned at the base of the Eastern Highlands—Zimbabwe’s premier forestry zone—we enjoy direct logistical access to abundant pine and eucalyptus plantations.
            </p>
            <p className="text-sm text-[#465E50] leading-relaxed">
              From harvesting selected round logs in high-altitude forestry compartments, transporting them on our heavy-duty timber haulage vehicles, to milling them on our high-precision Wood-Mizer LT15 sawmills, our integrated operation eliminates unnecessary intermediaries and delivers superior value to our wholesale and retail customers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start space-x-2 text-xs text-[#304739]">
                <CheckCircle2 className="w-4 h-4 text-[#2C593F] shrink-0 mt-0.5" />
                <span>Nixwood 10314, Nyakamete sawmill yard</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-[#304739]">
                <CheckCircle2 className="w-4 h-4 text-[#2C593F] shrink-0 mt-0.5" />
                <span>Wood-Mizer LT15 band sawing equipment</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-[#304739]">
                <CheckCircle2 className="w-4 h-4 text-[#2C593F] shrink-0 mt-0.5" />
                <span>Wholesale bundles & retail yard walk-ins</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-[#304739]">
                <CheckCircle2 className="w-4 h-4 text-[#2C593F] shrink-0 mt-0.5" />
                <span>Dedicated logistics fleet across Zimbabwe</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#D5E2D9] shadow-md">
              <img
                src="/images/arthco_sawmill_yard.jpg"
                alt="Arthco Sawmill Timber Processing"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-white space-y-3">
                <div className="flex items-center space-x-2 text-xs text-[#C28846] font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Facility Address</span>
                </div>
                <h3 className="text-lg font-bold text-[#14261C]">
                  {COMPANY_INFO.address}
                </h3>
                <p className="text-xs text-[#526B5C]">
                  Equipped with expansive timber stacking grounds, dedicated sawdust collection, and direct access for heavy 30-ton interlink trucks and local builder pick-ups.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {COMPANY_INFO.phones.map((p) => (
                    <a
                      key={p.number}
                      href={`tel:${p.clean}`}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EBF3ED] text-[#1E432E] hover:bg-[#D5E6DA] transition-colors"
                    >
                      {p.number} ({p.label})
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden border border-[#D5E2D9] relative h-32 group">
                <img
                  src="/images/arthco_woodmizer_lt15.jpg"
                  alt="Wood-Mizer LT15 Sawmill"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[#E2C08D] text-[10px] uppercase font-bold">
                  Wood-Mizer LT15
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#D5E2D9] relative h-32 group">
                <img
                  src="/images/arthco_milled_timber.jpg"
                  alt="Milled Timber Planks on Bed"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[#E2C08D] text-[10px] uppercase font-bold">
                  Milled Planks
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT DRIVES US & CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C28846] font-extrabold">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14261C] mt-2">
            The Five Pillars of Arthco Investments
          </h2>
          <p className="text-sm text-[#4E6657] mt-3">
            Every log harvested, every timber board sawn, and every contract fulfilled is governed by these core values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_VALUES.map((val) => (
            <div
              key={val.title}
              className="bg-white rounded-xl p-7 border border-[#D8E3DC] shadow-sm hover:border-[#2C593F] transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-[#EBF3ED] flex items-center justify-center mb-4">
                {getIcon(val.iconName)}
              </div>
              <h3 className="text-xl font-bold text-[#14261C]">
                {val.title}
              </h3>
              <p className="text-xs uppercase tracking-wider font-bold text-[#C28846] mt-0.5 mb-3">
                {val.subtitle}
              </p>
              <p className="text-sm text-[#4E6657] leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}

          {/* Growth & Future Plan Box */}
          <div className="bg-[#162D20] text-white rounded-xl p-7 border border-[#274B36] flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E2C08D] font-bold block mb-1">
                Strategic Expansion
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                Expanding Across Zimbabwe
              </h3>
              <p className="text-sm text-[#B4CCC0] leading-relaxed">
                Arthco Investments is rapidly establishing reliable timber distribution corridors connecting Mutare to Harare, Bulawayo, Gweru, Masvingo, and Chimoio border trade.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-6 py-2.5 px-4 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
            >
              Contact Sales Management
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ARTHCO */}
      <section className="bg-[#F0F5F2] py-14 border-y border-[#D6E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
              The Arthco Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261C] mt-1">
              Why Builders and Merchants Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#D8E3DC] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E] mb-4">
                <Hammer className="w-5 h-5 text-[#1E432E]" />
              </div>
              <h3 className="text-base font-bold text-[#14261C] mb-2">
                Precision Wood-Mizer Cut
              </h3>
              <p className="text-xs text-[#526B5C] leading-relaxed">
                Accurate cross-sections minimize warping and reduce costly manual trimming on construction sites and truss plants.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D8E3DC] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E] mb-4">
                <Truck className="w-5 h-5 text-[#1E432E]" />
              </div>
              <h3 className="text-base font-bold text-[#14261C] mb-2">
                Reliable Transport Fleet
              </h3>
              <p className="text-xs text-[#526B5C] leading-relaxed">
                Direct mill-to-site delivery reduces handling damage and guarantees that project deadlines in Harare or Mutare are met.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D8E3DC] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E] mb-4">
                <Scale className="w-5 h-5 text-[#1E432E]" />
              </div>
              <h3 className="text-base font-bold text-[#14261C] mb-2">
                Transparent Pricing & Sizing
              </h3>
              <p className="text-xs text-[#526B5C] leading-relaxed">
                Honest measurement by cubic meter and running length, fair quotes, and no surprise deductions on bulk deliveries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#162D20] text-white p-8 rounded-2xl text-center space-y-4 border border-[#274B35]">
          <h3 className="text-2xl font-bold">Have Questions About Our Mutare Timber Operations?</h3>
          <p className="text-sm text-[#A8C6B4] max-w-xl mx-auto">
            Our management and mill technicians are available to answer your technical questions or schedule a visit to our Nyakamete yard.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Contact Arthco Today
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-6 py-3 rounded-lg bg-[#244633] hover:bg-[#2F5841] text-white font-bold text-xs uppercase tracking-wider transition-colors border border-[#3C6E52]"
            >
              View Our Sawmill Gallery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
